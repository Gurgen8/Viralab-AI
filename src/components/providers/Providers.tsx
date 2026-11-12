"use client";

import { MotionConfig } from "framer-motion";
import type { ReactNode } from "react";
import { AuthModalProvider } from "./AuthModalProvider";
import { ToastProvider } from "./ToastProvider";

export function Providers({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AuthModalProvider>{children}</AuthModalProvider>
      </ToastProvider>
    </MotionConfig>
  );
}
