"use client";

import { useEffect, useState } from "react";
import { cn } from "@/lib/utils";

const randomIndex = (length: number) => Math.floor(Math.random() * length);

export function TextSpinner({
  games,
  items,
}: {
  games: string[];
  items: string[];
}) {
  const [gameIndex, setGameIndex] = useState(0);
  const [itemIndex, setItemIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsTransitioning(true);
      setTimeout(() => {
        const newGameIndex = randomIndex(games.length);
        const newItemIndex = randomIndex(items.length);
        setGameIndex(
          newGameIndex === gameIndex
            ? (newGameIndex + 1) % games.length
            : newGameIndex
        );
        setItemIndex(
          newItemIndex === itemIndex
            ? (newItemIndex + 1) % items.length
            : newItemIndex
        );
        setIsTransitioning(false);
      }, 500); // Matches animation duration
    }, 5000);

    return () => clearInterval(interval);
  }, [gameIndex, itemIndex]);

  return (
    <span
      className={cn(
        "relative inline-block bg-accent-foreground text-accent -m-4 p-4 motion-safe:transition-[opacity,transform] motion-safe:duration-500",
        isTransitioning
          ? "motion-safe:opacity-0 motion-safe:translate-y-[-10px]"
          : "motion-safe:opacity-100 motion-safe:translate-y-0"
      )}
    >
      {games[gameIndex]} {items[itemIndex]}
    </span>
  );
}
