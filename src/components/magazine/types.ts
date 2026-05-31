export type MagazineImage = {
  src: string;
};

export type MagazinePageConfig = {
  hoverColor: string;
  gloss: number;
  curve: number;
};

export type MagazineCamera = {
  position: { x: number; y: number; z: number };
  rotation: { x: number; y: number; z: number };
  zoom: number;
  fov: number;
};

export type ThreeDMagazineProps = {
  cover: {
    front: MagazineImage;
    back: MagazineImage;
    frontRoughness?: MagazineImage;
  };
  pages: { image: MagazineImage }[];
  pageConfig?: MagazinePageConfig;
  shadow?: boolean;
  camera?: MagazineCamera;
  float?: {
    enabled: boolean;
    intensity: number;
    speed: number;
    rotationIntensity: number;
  };
  orbitControls?: {
    enabled: boolean;
    zoom: { enabled: boolean; min: number; max: number };
    rotation: {
      enabled: boolean;
      polarInfinite: boolean;
      polarMin: number;
      polarMax: number;
      azimuthInfinite: boolean;
      azimuthMin: number;
      azimuthMax: number;
    };
  };
  lights?: {
    baseIntensity: number;
    lightsIntensity: number;
  };
  className?: string;
};
