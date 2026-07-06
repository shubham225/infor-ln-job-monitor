"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { cn } from "@/lib/utils";
import { ReactNode } from "react";

export interface ConfirmDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
  processLabel?: string;
  cancelLabel?: string;
  onProcess: () => void | Promise<void>;
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
export function DialogWindow({
  open,
  onOpenChange,
  processLabel = "Save",
  cancelLabel = "Cancel",
  onProcess: onConfirm,
  loading,
  children,
}: ConfirmDialogProps) {
  const handleConfirm = async () => {
    await onConfirm();
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-64 rounded-2xl p-6 text-center sm:min-w-64 sm:max-w-[425px] [&>button]:top-3 [&>button]:right-3 [&>button]:rounded-full [&>button]:bg-muted [&>button]:p-1 [&>button]:opacity-100 [&>button]:hover:bg-muted-foreground/20">
        <div className="flex flex-col items-center gap-6">
          <div className="space-y-1 w-full">{children}</div>
          <div className="space-y-1 flex justify-between w-full">
            <div className=""></div>
            <div className="flex gap-3 pt-1">
              <Button
                variant="outline"
                className="flex-1"
                disabled={loading}
                onClick={() => onOpenChange(false)}
              >
                {cancelLabel}
              </Button>
              <Button
                className={cn("flex-1")}
                disabled={loading}
                onClick={handleConfirm}
              >
                {processLabel}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
