"use client";

import { AlertTriangle, CheckCircle2, Info, Trash2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

export type ConfirmDialogType = "error" | "warning" | "info" | "success";

/** Any icon component that accepts a className (lucide-react and
 * @tabler/icons-react components both satisfy this). */
type DialogIcon = React.ComponentType<{ className?: string }>;

const TYPE_PRESETS: Record<
  ConfirmDialogType,
  { icon: DialogIcon; iconBg: string; iconColor: string; confirmClass: string }
> = {
  error: {
    icon: Trash2,
    iconBg: "bg-red-50",
    iconColor: "text-red-500",
    confirmClass: "bg-red-500 text-white hover:bg-red-600",
  },
  warning: {
    icon: AlertTriangle,
    iconBg: "bg-amber-50",
    iconColor: "text-amber-500",
    confirmClass: "bg-amber-500 text-white hover:bg-amber-600",
  },
  info: {
    icon: Info,
    iconBg: "bg-sky-50",
    iconColor: "text-sky-500",
    confirmClass: "bg-sky-500 text-white hover:bg-sky-600",
  },
  success: {
    icon: CheckCircle2,
    iconBg: "bg-emerald-50",
    iconColor: "text-emerald-500",
    confirmClass: "bg-emerald-500 text-white hover:bg-emerald-600",
  },
};

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  /** Drives default icon + color scheme. Override the icon itself with `icon`. */
  type?: ConfirmDialogType;
  /** Custom icon — overrides the type's default icon, keeps the type's colors */
  icon?: DialogIcon;
  title: string;
  description: string;
  confirmLabel?: string;
  cancelLabel?: string;
  onConfirm: () => void | Promise<void>;
  /** Show a spinner / disable buttons while true. If omitted, the dialog
   * manages its own busy state around an async onConfirm automatically. */
  loading?: boolean;
}

/**
 * Generic confirm/alert popup — pass `type` for one of the built-in
 * color schemes (error, warning, info, success) or override `icon` for a
 * fully custom look while keeping that type's color scheme.
 *
 * Prefer using this through the `useConfirmDialog()` hook rather than
 * managing `open` state by hand — see use-confirm-dialog.tsx.
 */
export function ConfirmDialog({
  open,
  onOpenChange,
  type = "info",
  icon,
  title,
  description,
  confirmLabel = "Confirm",
  cancelLabel = "Cancel",
  onConfirm,
  loading,
}: ConfirmDialogProps) {
  const preset = TYPE_PRESETS[type];
  const Icon = icon ?? preset.icon;

  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[340px] rounded-2xl p-6 text-center sm:max-w-[340px] [&>button]:top-3 [&>button]:right-3 [&>button]:rounded-full [&>button]:bg-muted [&>button]:p-1 [&>button]:opacity-100 [&>button]:hover:bg-muted-foreground/20">
        <div className="flex flex-col items-center gap-6">
          <div
            className={cn(
              "flex h-14 w-14 items-center justify-center rounded-full",
              preset.iconBg
            )}
          >
            <Icon className={cn("h-6 w-6", preset.iconColor)} />
          </div>

          <div className="space-y-1">
            <h2 className="text-base font-semibold text-foreground">
              {title}
            </h2>
            <p className="text-sm text-muted-foreground">{description}</p>
          </div>

          <div className="flex w-full gap-3 pt-1">
            <Button
              variant="outline"
              className="flex-1 "
              disabled={loading}
              onClick={() => onOpenChange(false)}
            >
              {cancelLabel}
            </Button>
            <Button
              className={cn("flex-1 ", preset.confirmClass)}
              disabled={loading}
              onClick={handleConfirm}
            >
              {confirmLabel}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
