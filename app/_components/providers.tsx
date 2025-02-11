"use client";

import { MotionConfig } from "framer-motion";
import { PropsWithChildren } from "react";

export function Providers({ children }: PropsWithChildren) {
  return <MotionConfig reducedMotion="user">{children}</MotionConfig>;
}
