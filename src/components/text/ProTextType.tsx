"use client";

import { motion } from "framer-motion";
import {
  createElement,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ElementType,
  type HTMLAttributes,
} from "react";

export type ProTextTypeProps = {
  text: string | string[];
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  typingSpeed?: number;
  deletingSpeed?: number;
  initialDelay?: number;
  pauseDuration?: number;
  loop?: boolean;
  showCursor?: boolean;
  hideCursorWhileTyping?: boolean;
  cursorCharacter?: string;
  cursorBlinkDuration?: number;
  textColors?: string[];
  cursorColor?: string;
  variableSpeed?: { min: number; max: number };
  startOnVisible?: boolean;
  reverseMode?: boolean;
  sizingMode?: "fixed" | "fluid";
  minFont?: number;
  maxFont?: number;
  fluidVw?: number;
  textAlign?: CSSProperties["textAlign"];
} & Omit<HTMLAttributes<HTMLElement>, "children">;

/**
 * Typing text effect ported from Framer ProTextType
 * https://framer.com/m/ProTextType-KXoZ.js@zQQ6Rh7yVYyuhKxBRwZJ
 */
export function ProTextType({
  text,
  as: Tag = "p",
  className,
  style,
  typingSpeed = 50,
  deletingSpeed = 30,
  initialDelay = 0,
  pauseDuration = 2000,
  loop = true,
  showCursor = true,
  hideCursorWhileTyping = false,
  cursorCharacter = "|",
  cursorBlinkDuration = 0.5,
  textColors = ["#1a1a1a"],
  cursorColor,
  variableSpeed,
  startOnVisible = false,
  reverseMode = false,
  sizingMode = "fluid",
  minFont = 18,
  maxFont = 64,
  fluidVw = 6,
  textAlign = "left",
  ...rest
}: ProTextTypeProps) {
  const textArray = useMemo(
    () => (Array.isArray(text) ? text : [text ?? ""]),
    [text],
  );

  const [displayedText, setDisplayedText] = useState("");
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(!startOnVisible);

  const containerRef = useRef<HTMLElement>(null);
  const firstColor = textColors[0] ?? "#1a1a1a";
  const resolvedCursorColor = cursorColor ?? firstColor;

  const getRandomSpeed = useCallback(() => {
    if (!variableSpeed) return typingSpeed;
    const lo = Math.max(0, Number(variableSpeed.min) || 0);
    const hi = Math.max(lo, Number(variableSpeed.max) || lo);
    return Math.random() * (hi - lo) + lo;
  }, [variableSpeed, typingSpeed]);

  const getCurrentTextColor = useCallback(() => {
    if (!textColors.length) return firstColor;
    return textColors[currentTextIndex % textColors.length];
  }, [textColors, currentTextIndex, firstColor]);

  useEffect(() => {
    if (!startOnVisible || !containerRef.current) return;
    const el = containerRef.current;
    const obs = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setIsVisible(true);
        });
      },
      { threshold: 0.1 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, [startOnVisible]);

  useEffect(() => {
    if (!isVisible) return;

    let timeout: ReturnType<typeof setTimeout> | undefined;
    const currentText = textArray[currentTextIndex] ?? "";
    const processed = reverseMode
      ? currentText.split("").reverse().join("")
      : currentText;

    const run = () => {
      if (isDeleting) {
        if (displayedText.length === 0) {
          setIsDeleting(false);
          if (currentTextIndex === textArray.length - 1 && !loop) return;
          setCurrentTextIndex((i) => (i + 1) % textArray.length);
          setCurrentCharIndex(0);
          timeout = setTimeout(() => {}, pauseDuration);
        } else {
          timeout = setTimeout(() => {
            setDisplayedText((prev) => prev.slice(0, -1));
          }, deletingSpeed);
        }
      } else if (currentCharIndex < processed.length) {
        timeout = setTimeout(() => {
          setDisplayedText((prev) => prev + processed[currentCharIndex]);
          setCurrentCharIndex((i) => i + 1);
        }, variableSpeed ? getRandomSpeed() : typingSpeed);
      } else if (
        textArray.length > 1 &&
        (loop || currentTextIndex < textArray.length - 1)
      ) {
        timeout = setTimeout(() => setIsDeleting(true), pauseDuration);
      }
    };

    if (currentCharIndex === 0 && !isDeleting && displayedText === "") {
      timeout = setTimeout(run, initialDelay);
    } else {
      run();
    }

    return () => {
      if (timeout) clearTimeout(timeout);
    };
  }, [
    isVisible,
    textArray,
    currentTextIndex,
    loop,
    currentCharIndex,
    displayedText,
    isDeleting,
    typingSpeed,
    deletingSpeed,
    pauseDuration,
    initialDelay,
    reverseMode,
    variableSpeed,
    getRandomSpeed,
  ]);

  const fluidStyle: CSSProperties =
    sizingMode === "fluid"
      ? { fontSize: `clamp(${minFont}px, ${fluidVw}vw, ${maxFont}px)` }
      : {};

  const currentSource = textArray[currentTextIndex] ?? "";
  const shouldHideCursor =
    hideCursorWhileTyping &&
    (currentCharIndex < currentSource.length || isDeleting);

  const baseStyle: CSSProperties = {
    display: "block",
    width: "100%",
    whiteSpace: "pre-wrap",
    textAlign,
    ...fluidStyle,
    ...style,
  };

  return createElement(
    Tag,
    {
      ref: containerRef,
      className,
      style: baseStyle,
      ...rest,
    },
    <>
      <span
        style={{
          display: "inline",
          color: getCurrentTextColor(),
        }}
      >
        {displayedText}
      </span>
      {showCursor && !shouldHideCursor ? (
        <motion.span
          aria-hidden
          style={{
            marginLeft: "0.25rem",
            display: "inline-block",
            color: resolvedCursorColor,
            ...fluidStyle,
          }}
          animate={{ opacity: [1, 0] }}
          transition={{
            duration: cursorBlinkDuration,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          }}
        >
          {cursorCharacter}
        </motion.span>
      ) : null}
    </>,
  );
}
