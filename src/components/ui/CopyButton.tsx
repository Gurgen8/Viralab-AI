"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Check, Copy } from "lucide-react";
import { useCopyToClipboard } from "@/hooks/useCopyToClipboard";
import { cn } from "@/lib/utils";
import { useToast } from "@/components/providers/ToastProvider";

export function CopyButton({
  text,
  label = "Копировать",
  toastMessage = "Скопировано в буфер обмена",
  showLabel = false,
  visibleLabel,
  className,
}: {
  text: string;
  label?: string;
  toastMessage?: string;
  showLabel?: boolean;
  visibleLabel?: string;
  className?: string;
}) {
  const { copied, copy } = useCopyToClipboard();
  const { toast } = useToast();

  return (
    <button
      type="button"
      onClick={async () => {
        const ok = await copy(text);
        toast(ok ? toastMessage : "Не удалось скопировать — скопируйте вручную", ok ? "success" : "error");
      }}
      aria-label={label}
      title={label}
      className={cn(
        "inline-flex h-8 shrink-0 items-center gap-1.5 rounded-lg px-2 text-xs font-medium text-zinc-400 ring-1 ring-inset ring-white/10 transition hover:bg-white/[0.06] hover:text-white",
        copied && "text-emerald-300 ring-emerald-400/30",
        className,
      )}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={copied ? "ok" : "copy"}
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.6, opacity: 0 }}
          transition={{ duration: 0.15 }}
          className="grid place-items-center"
        >
          {copied ? <Check className="size-3.5" /> : <Copy className="size-3.5" />}
        </motion.span>
      </AnimatePresence>
      {showLabel && <span className="hidden sm:inline">{copied ? "Скопировано" : (visibleLabel ?? label)}</span>}
    </button>
  );
}
