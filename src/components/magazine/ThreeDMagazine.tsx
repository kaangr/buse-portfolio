"use client";

import type { ThreeDMagazineProps } from "@/components/magazine/types";
import { portfolioMagazineImages } from "@/data/portfolio-magazine";
import { Float, OrbitControls, PerspectiveCamera, useCursor, useTexture } from "@react-three/drei";
import { Canvas, useFrame } from "@react-three/fiber";
import { dampAngle } from "maath/easing";
import {
  createContext,
  Suspense,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import {
  Bone,
  BoxGeometry,
  Color,
  Float32BufferAttribute,
  MathUtils,
  MeshStandardMaterial,
  Skeleton,
  SkinnedMesh,
  SRGBColorSpace,
  Uint16BufferAttribute,
  Vector3,
  type Group,
  type Material,
  type PerspectiveCamera as PerspectiveCameraType,
  type SkinnedMesh as SkinnedMeshType,
} from "three";

const DEFAULT_IMAGE_SRC =
  "https://framerusercontent.com/images/Y7mY2oDZzgAYS8RjwXBm2XyxKsw.png?scale-down-to=512&width=1000&height=1000";

const DEFAULT_PROPS: Required<
  Pick<ThreeDMagazineProps, "pageConfig" | "shadow" | "camera" | "float" | "orbitControls" | "lights">
> = {
  pageConfig: { hoverColor: "#1a1a1a", gloss: 40, curve: 20 },
  shadow: true,
  camera: {
    position: { x: -0.5, y: 1, z: 4 },
    rotation: { x: 70, y: 0, z: 0 },
    zoom: 1.2,
    fov: 45,
  },
  float: { enabled: true, intensity: 1, speed: 2, rotationIntensity: 2 },
  orbitControls: {
    enabled: true,
    zoom: { enabled: false, min: 0.1, max: 10 },
    rotation: {
      enabled: true,
      polarInfinite: true,
      polarMin: 0,
      polarMax: 180,
      azimuthInfinite: true,
      azimuthMin: -180,
      azimuthMax: 180,
    },
  },
  lights: { baseIntensity: 0.5, lightsIntensity: 1 },
};

const PAGE_WIDTH = 1.28;
const PAGE_HEIGHT = 1.71;
const PAGE_DEPTH = 0.003;
const PAGE_SEGMENTS = 30;
const SEGMENT_WIDTH = PAGE_WIDTH / PAGE_SEGMENTS;

const easingFactor = 0.5;
const easingFactorFold = 0.3;
const insideCurveStrength = 0.18;
const outsideCurveStrength = 0.05;
const turningCurveStrength = 0.09;

const whiteColor = new Color("white");
const pageMaterials = [
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: "#111" }),
  new MeshStandardMaterial({ color: whiteColor }),
  new MeshStandardMaterial({ color: whiteColor }),
];

function createPageGeometry() {
  const pageGeometry = new BoxGeometry(
    PAGE_WIDTH,
    PAGE_HEIGHT,
    PAGE_DEPTH,
    PAGE_SEGMENTS,
    2,
  );
  pageGeometry.translate(PAGE_WIDTH / 2, 0, 0);
  const position = pageGeometry.attributes.position;
  const vertex = new Vector3();
  const skinIndexes: number[] = [];
  const skinWeights: number[] = [];

  for (let i = 0; i < position.count; i++) {
    vertex.fromBufferAttribute(position, i);
    const x = vertex.x;
    const skinIndex = Math.max(0, Math.floor(x / SEGMENT_WIDTH));
    const skinWeight = (x % SEGMENT_WIDTH) / SEGMENT_WIDTH;
    skinIndexes.push(skinIndex, skinIndex + 1, 0, 0);
    skinWeights.push(1 - skinWeight, skinWeight, 0, 0);
  }

  pageGeometry.setAttribute(
    "skinIndex",
    new Uint16BufferAttribute(skinIndexes, 4),
  );
  pageGeometry.setAttribute(
    "skinWeight",
    new Float32BufferAttribute(skinWeights, 4),
  );
  return pageGeometry;
}

const pageGeometry = createPageGeometry();

type MagazineContextValue = {
  page: number;
  setPage: (n: number) => void;
};

const MagazineContext = createContext<MagazineContextValue>({
  page: 0,
  setPage: () => {},
});

function MagazineProvider({ children }: { children: ReactNode }) {
  const [page, setPage] = useState(0);
  return (
    <MagazineContext.Provider value={{ page, setPage }}>
      {children}
    </MagazineContext.Provider>
  );
}

function degreesToRadians(degrees: number) {
  return degrees * (Math.PI / 180);
}

type PageData = { front: { src: string }; back: { src: string } };

function generatePages(bookProps: ThreeDMagazineProps): PageData[] {
  const pictures = bookProps.pages.map((p) => p.image);
  const pages: PageData[] = [
    { front: bookProps.cover.front, back: pictures[0] },
  ];
  for (let i = 1; i < pictures.length - 1; i += 2) {
    pages.push({
      front: pictures[i % pictures.length],
      back: pictures[(i + 1) % pictures.length],
    });
  }
  pages.push({
    front: pictures[pictures.length - 1],
    back: bookProps.cover.back,
  });
  return pages;
}

type PageProps = {
  number: number;
  front: { src: string };
  back: { src: string };
  frontRoughness?: { src: string };
  page: number;
  opened: boolean;
  bookClosed: boolean;
  hoverColor: string;
  baseRoughness: number;
  bend: number;
};

function Page({
  number,
  front,
  back,
  frontRoughness,
  page,
  opened,
  bookClosed,
  hoverColor,
  baseRoughness,
  bend,
}: PageProps) {
  const { setPage } = useContext(MagazineContext);
  const [highlighted, setHighlighted] = useState(false);
  useCursor(highlighted);

  const textureUrls = [front?.src || DEFAULT_IMAGE_SRC, back?.src || DEFAULT_IMAGE_SRC];
  if (frontRoughness?.src) textureUrls.push(frontRoughness.src);

  const emissiveColor = new Color(hoverColor);
  const textures = useTexture(textureUrls);
  const picture = textures[0];
  const picture2 = textures[1];
  const pictureRoughness = frontRoughness ? textures[2] : undefined;
  picture.colorSpace = picture2.colorSpace = SRGBColorSpace;

  const groupRef = useRef<Group>(null);
  const turnedAt = useRef(0);
  const lastOpened = useRef(opened);
  const skinnedMeshRef = useRef<SkinnedMeshType>(null);

  const manualSkinnedMesh = useMemo(() => {
    const bones: Bone[] = [];
    for (let i = 0; i <= PAGE_SEGMENTS; i++) {
      const bone = new Bone();
      bones.push(bone);
      bone.position.x = i === 0 ? 0 : SEGMENT_WIDTH;
      if (i > 0) bones[i - 1].add(bone);
    }
    const skeleton = new Skeleton(bones);
    const materials = [
      ...pageMaterials,
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture,
        ...(frontRoughness && pictureRoughness
          ? { roughnessMap: pictureRoughness }
          : { roughness: baseRoughness }),
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
      new MeshStandardMaterial({
        color: whiteColor,
        map: picture2,
        roughness: baseRoughness,
        emissive: emissiveColor,
        emissiveIntensity: 0,
      }),
    ];
    const mesh = new SkinnedMesh(pageGeometry, materials);
    mesh.castShadow = true;
    mesh.receiveShadow = true;
    mesh.frustumCulled = false;
    mesh.add(skeleton.bones[0]);
    mesh.bind(skeleton);
    return mesh;
  }, [picture, picture2, pictureRoughness, frontRoughness, baseRoughness, emissiveColor]);

  useFrame((_, delta) => {
    if (!skinnedMeshRef.current) return;
    const materials = skinnedMeshRef.current.material as Material[];
    const frontMat = materials[4] as MeshStandardMaterial;
    const backMat = materials[5] as MeshStandardMaterial;
    const targetIntensity = highlighted ? 0.22 : 0;
    frontMat.emissiveIntensity = MathUtils.lerp(
      frontMat.emissiveIntensity,
      targetIntensity,
      0.1,
    );
    backMat.emissiveIntensity = MathUtils.lerp(
      backMat.emissiveIntensity,
      targetIntensity,
      0.1,
    );

    if (lastOpened.current !== opened) {
      turnedAt.current = Date.now();
      lastOpened.current = opened;
    }

    let turningTime = Math.min(400, Date.now() - turnedAt.current) / 400;
    turningTime = Math.sin(turningTime * Math.PI);

    let targetRotation = opened ? -Math.PI / 2 : Math.PI / 2;
    if (!bookClosed) targetRotation += MathUtils.degToRad(number * 0.8);

    const bones = skinnedMeshRef.current.skeleton.bones;

    for (let i = 0; i < 10 + bend; i++) {
      const target = i === 0 ? groupRef.current : bones[i];
      if (!target) continue;

      const insideCurveIntensity = i < 8 ? Math.sin(i * 0.2 + 0.25) : 0;
      const outsideCurveIntensity = i >= 8 ? Math.cos(i * 0.3 + 0.09) : 0;
      const turningIntensity =
        Math.sin(i * Math.PI * (1 / bones.length)) * turningTime;

      let rotationAngle =
        insideCurveStrength * insideCurveIntensity * targetRotation -
        outsideCurveStrength * outsideCurveIntensity * targetRotation +
        turningCurveStrength * turningIntensity * targetRotation;

      let foldRotationAngle = MathUtils.degToRad(Math.sign(targetRotation) * 2);

      if (bookClosed) {
        if (i === 0) {
          rotationAngle = targetRotation;
          foldRotationAngle = 0;
        } else {
          rotationAngle = 0;
          foldRotationAngle = 0;
        }
      }

      dampAngle(target.rotation, "y", rotationAngle, easingFactor, delta);
      const foldIntensity =
        i > 8 ? Math.sin(i * Math.PI * (1 / bones.length) - 0.5) * turningTime : 0;
      dampAngle(
        target.rotation,
        "x",
        foldRotationAngle * foldIntensity,
        easingFactorFold,
        delta,
      );
    }
  });

  return (
    <group
      ref={groupRef}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHighlighted(true);
      }}
      onPointerOut={(e) => {
        e.stopPropagation();
        setHighlighted(false);
      }}
      onClick={(e) => {
        e.stopPropagation();
        setPage(opened ? number : number + 1);
        setHighlighted(false);
      }}
    >
      <primitive
        object={manualSkinnedMesh}
        ref={skinnedMeshRef}
        position-z={-number * PAGE_DEPTH + page * PAGE_DEPTH}
      />
    </group>
  );
}

function Magazine({ bookProps }: { bookProps: ThreeDMagazineProps }) {
  const { page } = useContext(MagazineContext);
  const [delayedPage, setDelayedPage] = useState(page);
  const pages = useMemo(() => generatePages(bookProps), [bookProps]);
  const baseRoughness = 1 - (bookProps.pageConfig?.gloss ?? 40) / 100;

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const goToPage = () => {
      setDelayedPage((prev) => {
        if (page === prev) return prev;
        timeout = setTimeout(
          () => goToPage(),
          Math.abs(page - prev) > 2 ? 50 : 150,
        );
        return page > prev ? prev + 1 : prev - 1;
      });
    };
    goToPage();
    return () => clearTimeout(timeout);
  }, [page]);

  return (
    <group rotation-y={-Math.PI / 2}>
      {pages.map((pageData, index) => (
        <Page
          key={index}
          page={delayedPage}
          number={index}
          opened={delayedPage > index}
          bookClosed={delayedPage === 0 || delayedPage === pages.length}
          front={pageData.front}
          back={pageData.back}
          frontRoughness={
            index === 0 ? bookProps.cover.frontRoughness : undefined
          }
          hoverColor={bookProps.pageConfig?.hoverColor ?? "#1a1a1a"}
          baseRoughness={baseRoughness}
          bend={bookProps.pageConfig?.curve ?? 20}
        />
      ))}
    </group>
  );
}

function StudioLighting({
  lights,
}: {
  lights: { baseIntensity: number; lightsIntensity: number };
}) {
  return (
    <group>
      <directionalLight
        position={[2, 5, 2]}
        intensity={1.8 * lights.lightsIntensity}
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.0001}
        color="#ffffff"
      />
      <rectAreaLight
        width={6}
        height={4}
        intensity={3 * lights.lightsIntensity}
        color="#ffffff"
        position={[-3, 4, 3]}
        rotation-y={Math.PI * 0.25}
      />
      <rectAreaLight
        width={4}
        height={3}
        intensity={2 * lights.lightsIntensity}
        color="#f0f5ff"
        position={[4, 3, 2]}
        rotation-y={-Math.PI * 0.3}
      />
      <rectAreaLight
        width={5}
        height={5}
        intensity={3.5 * lights.lightsIntensity}
        color="#fff8f0"
        position={[0, 6, 0]}
        rotation-x={-Math.PI * 0.5}
      />
      <ambientLight intensity={lights.baseIntensity} color="#f5f5f5" />
    </group>
  );
}

function MagazineCamera({
  camera,
  orbitEnabled,
}: {
  camera: ThreeDMagazineProps["camera"];
  orbitEnabled: boolean;
}) {
  const cam = { ...DEFAULT_PROPS.camera, ...camera };
  const cameraRef = useRef<PerspectiveCameraType>(null);

  useEffect(() => {
    if (!orbitEnabled && cameraRef.current) {
      cameraRef.current.rotation.set(
        degreesToRadians(cam.rotation.x),
        degreesToRadians(cam.rotation.y),
        degreesToRadians(cam.rotation.z),
      );
    }
  }, [cam.rotation.x, cam.rotation.y, cam.rotation.z, orbitEnabled]);

  return (
    <PerspectiveCamera
      ref={cameraRef}
      makeDefault
      position={[cam.position.x, cam.position.y, cam.position.z]}
      fov={cam.fov}
      zoom={cam.zoom}
    />
  );
}

function MagazineOrbitControls({
  orbit,
  initialRotation,
}: {
  orbit: NonNullable<ThreeDMagazineProps["orbitControls"]>;
  initialRotation: { x: number; y: number; z: number };
}) {
  const controlsRef = useRef<React.ComponentRef<typeof OrbitControls>>(null);

  useEffect(() => {
    const controls = controlsRef.current;
    if (!controls) return;
    const minAz = orbit.rotation.azimuthInfinite
      ? -Infinity
      : degreesToRadians(orbit.rotation.azimuthMin);
    const maxAz = orbit.rotation.azimuthInfinite
      ? Infinity
      : degreesToRadians(orbit.rotation.azimuthMax);
    const minPol = orbit.rotation.polarInfinite
      ? -Infinity
      : degreesToRadians(orbit.rotation.polarMin);
    const maxPol = orbit.rotation.polarInfinite
      ? Infinity
      : degreesToRadians(orbit.rotation.polarMax);
    const az = Math.max(
      minAz,
      Math.min(maxAz, degreesToRadians(initialRotation.y)),
    );
    const pol = Math.max(
      minPol,
      Math.min(maxPol, degreesToRadians(initialRotation.x)),
    );
    controls.setAzimuthalAngle?.(az);
    controls.setPolarAngle?.(pol);
    controls.update?.();
  }, [orbit, initialRotation]);

  return (
    <OrbitControls
      ref={controlsRef}
      minAzimuthAngle={
        orbit.rotation.azimuthInfinite
          ? -Infinity
          : degreesToRadians(orbit.rotation.azimuthMin)
      }
      maxAzimuthAngle={
        orbit.rotation.azimuthInfinite
          ? Infinity
          : degreesToRadians(orbit.rotation.azimuthMax)
      }
      minPolarAngle={
        orbit.rotation.polarInfinite
          ? -Infinity
          : degreesToRadians(orbit.rotation.polarMin)
      }
      maxPolarAngle={
        orbit.rotation.polarInfinite
          ? Infinity
          : degreesToRadians(orbit.rotation.polarMax)
      }
      minZoom={orbit.zoom.min}
      maxZoom={orbit.zoom.max}
      enablePan={false}
      enableRotate={orbit.rotation.enabled}
      enableZoom={orbit.zoom.enabled}
    />
  );
}

function MagazineScene({ bookProps }: { bookProps: ThreeDMagazineProps }) {
  const shadow = bookProps.shadow ?? DEFAULT_PROPS.shadow;
  const camera = { ...DEFAULT_PROPS.camera, ...bookProps.camera };
  const floatCfg = { ...DEFAULT_PROPS.float, ...bookProps.float };
  const orbit = { ...DEFAULT_PROPS.orbitControls, ...bookProps.orbitControls };
  const lights = { ...DEFAULT_PROPS.lights, ...bookProps.lights };

  return (
    <>
      <MagazineCamera camera={camera} orbitEnabled={orbit.enabled} />
      <group position-y={0}>
        <Suspense fallback={null}>
          <Float
            rotation-x={-Math.PI / 5}
            floatIntensity={floatCfg.enabled ? floatCfg.intensity : 0}
            speed={floatCfg.enabled ? floatCfg.speed : 0}
            rotationIntensity={
              floatCfg.enabled ? floatCfg.rotationIntensity : 0
            }
          >
            <Magazine bookProps={bookProps} />
          </Float>
          {orbit.enabled ? (
            <MagazineOrbitControls orbit={orbit} initialRotation={camera.rotation} />
          ) : null}
          <StudioLighting lights={lights} />
          {shadow ? (
            <mesh
              position-y={-1.5}
              rotation-x={-Math.PI / 2}
              receiveShadow
            >
              <planeGeometry args={[100, 100]} />
              <shadowMaterial transparent opacity={0.2} />
            </mesh>
          ) : null}
        </Suspense>
      </group>
    </>
  );
}

/**
 * Framer 3D Magazine — https://framer.com/m/ThreeD-magazine-framer-vWSZ.js
 */
export function ThreeDMagazine(props: ThreeDMagazineProps) {
  const merged: ThreeDMagazineProps = {
    ...props,
    pageConfig: { ...DEFAULT_PROPS.pageConfig, ...props.pageConfig },
  };

  const isSetup =
    (merged.pages?.length ?? 0) > 1 &&
    merged.cover?.front?.src &&
    merged.cover?.back?.src;

  if (!isSetup) {
    return (
      <div className="text-gallery-black/55 flex h-full min-h-[320px] items-center justify-center p-8 text-center text-sm">
        Add at least two page images plus front and back cover.
      </div>
    );
  }

  return (
    <div className={props.className} style={{ width: "100%", height: "100%" }}>
      <MagazineProvider>
        <Canvas
          shadows={merged.shadow ? "percentage" : false}
          resize={{ offsetSize: true }}
          gl={{
            antialias: true,
            powerPreference: "high-performance",
          }}
          dpr={[1, 2]}
          style={{ width: "100%", height: "100%" }}
        >
          <MagazineScene bookProps={merged} />
        </Canvas>
      </MagazineProvider>
    </div>
  );
}

/** Default portfolio magazine config (placeholder pages until PDF export) */
export function buildPortfolioMagazineProps(): ThreeDMagazineProps {
  const { coverFront, coverBack, pages } = portfolioMagazineImages;
  return {
    cover: {
      front: { src: coverFront },
      back: { src: coverBack },
    },
    pages: pages.map((src) => ({ image: { src } })),
    pageConfig: {
      hoverColor: "#1a1a1a",
      gloss: 38,
      curve: 18,
    },
    shadow: true,
    camera: DEFAULT_PROPS.camera,
    float: { enabled: true, intensity: 0.85, speed: 1.6, rotationIntensity: 1.2 },
    orbitControls: DEFAULT_PROPS.orbitControls,
    lights: DEFAULT_PROPS.lights,
  };
}
