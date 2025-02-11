"use client";

import { useEffect, useState, useRef, useMemo } from "react";
import { motion } from "framer-motion";
import { cn, RandomNumberGenerator } from "@/lib/utils";

const DURATION = 15;
const CARD_COUNT = 30;

interface Card {
  id: string;
  x: number;
  rotationX: number;
  rotationY: number;
  rotationZ: number;
  targetRotationX: number;
  targetRotationY: number;
  targetRotationZ: number;
  image: string;
  depth: number;
}

const generateCard = (
  images: string[],
  weightedRandom: RandomNumberGenerator
): Card => ({
  id: crypto.randomUUID(),
  x: weightedRandom.generate(),
  rotationX: Math.random() * 20 - 10,
  rotationY: Math.random() * 20 - 10,
  rotationZ: Math.random() * 20 - 10,
  targetRotationX: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 45 + 20),
  targetRotationY: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 45 + 20),
  targetRotationZ: (Math.random() < 0.5 ? 1 : -1) * (Math.random() * 45 + 20),
  image: images[Math.floor(Math.random() * images.length)],
  depth: Math.random() * 1000 - 500,
});

const TradingCardRain = ({
  images,
  className,
}: {
  images: string[];
  className?: string;
}) => {
  const [cards, setCards] = useState<Card[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [parentSize, setParentSize] = useState({ width: 0, height: 0 });
  const cardSize = useMemo(
    () => Math.max(parentSize.width * 0.1, 100),
    [parentSize]
  );
  const weightedRandom = useMemo(
    () => new RandomNumberGenerator({ min: -cardSize, max: parentSize.width }),
    [parentSize, cardSize]
  );

  useEffect(() => {
    const updateSize = () => {
      if (containerRef.current) {
        setParentSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateSize();
    window.addEventListener("resize", updateSize);
    return () => window.removeEventListener("resize", updateSize);
  }, []);

  useEffect(() => {
    if (parentSize.width > 0 && parentSize.height > 0) {
      setCards([generateCard(images, weightedRandom)]);
    }
  }, [parentSize, images, weightedRandom]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCards((prev) =>
        [...prev, generateCard(images, weightedRandom)].slice(-60)
      );
    }, (DURATION * 1000) / CARD_COUNT);

    return () => clearInterval(interval);
  }, [parentSize, images, weightedRandom]);

  return (
    <div
      ref={containerRef}
      className={cn(
        "absolute -z-10 inset-0 overflow-hidden pointer-events-none w-full h-full",
        className
      )}
      style={{
        perspective: "1000px",
        transformStyle: "preserve-3d",
      }}
    >
      {cards.map((card) => {
        const normalizedZIndex = Math.floor(card.depth - 500);
        return (
          <motion.img
            key={card.id}
            src={card.image}
            className="absolute object-cover shadow-lg rounded-md"
            initial={{
              y: -cardSize * (-normalizedZIndex / cardSize),
              rotateX: card.rotationX,
              rotateY: card.rotationY,
              rotateZ: card.rotationZ,
              z: card.depth,
            }}
            animate={{
              y: parentSize.height + cardSize * (-normalizedZIndex / cardSize),
              rotateX: card.targetRotationX,
              rotateY: card.targetRotationY,
              rotateZ: card.targetRotationZ,
            }}
            transition={{
              duration: DURATION * (-normalizedZIndex / 2000 + 0.5),
              ease: "linear",
            }}
            style={{
              left: card.x,
              width: `${cardSize}px`,
              transform: `rotateX(${card.rotationX}deg) rotateY(${card.rotationY}deg) rotateZ(${card.rotationZ}deg) translateZ(${card.depth}px)`,
              zIndex: normalizedZIndex,
            }}
          />
        );
      })}
      <div className="absolute inset-0 bg-background opacity-50" />
      <div className="absolute inset-0 -z-[500] bg-background opacity-50" />
    </div>
  );
};

export default TradingCardRain;
