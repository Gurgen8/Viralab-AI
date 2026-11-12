"use client";

import { ArrowUpRight } from "lucide-react";
import type { ComponentProps } from "react";
import { useAuthModal } from "@/components/providers/AuthModalProvider";
import type { AuthMode, PlanId } from "@/types";
import { Button } from "./Button";

/** Button that opens the signup/login dialog — usable from server components. */
export function AuthButton({
  mode = "signup",
  plan,
  arrow = false,
  children,
  onClick,
  ...props
}: ComponentProps<typeof Button> & { mode?: AuthMode; plan?: PlanId; arrow?: boolean }) {
  const { openAuth } = useAuthModal();
  return (
    <Button
      {...props}
      onClick={(e) => {
        onClick?.(e);
        openAuth({ mode, plan });
      }}
    >
      {children}
      {arrow && <ArrowUpRight className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />}
    </Button>
  );
}
