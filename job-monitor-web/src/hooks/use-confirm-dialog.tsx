"use client";

import { useCallback, useState } from "react";

import {
  ConfirmDialog,
  ConfirmDialogProps,
  ConfirmDialogType,
} from "@/components/confirm-dialog";

type ConfirmOptions = Omit<
  ConfirmDialogProps,
  "open" | "onOpenChange" | "onConfirm" | "loading"
>;

interface PendingConfirm extends ConfirmOptions {
  resolve: (confirmed: boolean) => void;
}

/**
 * Promise-based confirmation dialog — works like `window.confirm()` but
 * async, styled, and reusable for any action (delete, warning, info...).
 *
 * const { confirmDelete, dialog } = useConfirmDialog();
 *
 * async function handleDelete(row) {
 *   const ok = await confirmDelete({
 *     title: "Delete Server Mapping",
 *     description: `Are you sure you want to delete "${row.hostname}"?`,
 *   });
 *   if (!ok) return;
 *   await deleteServerMappings(row.id); // runs only after the user confirms
 * }
 *
 * return (
 *   <>
 *     {dialog}
 *     ...rest of your component
 *   </>
 * );
 */
export function useConfirmDialog() {
  const [pending, setPending] = useState<PendingConfirm | null>(null);

  const open = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending({ ...options, resolve });
    });
  }, []);

  const close = useCallback(
    (confirmed: boolean) => {
      pending?.resolve(confirmed);
      setPending(null);
    },
    [pending]
  );

  const confirm = useCallback((options: ConfirmOptions) => open(options), [open]);
  const confirmDelete = useCallback(
    (options: Omit<ConfirmOptions, "type">) =>
      open({ type: "error", confirmLabel: "Delete", ...options }),
    [open]
  );
  const confirmWarning = useCallback(
    (options: Omit<ConfirmOptions, "type">) => open({ type: "warning", ...options }),
    [open]
  );
  const confirmInfo = useCallback(
    (options: Omit<ConfirmOptions, "type">) => open({ type: "info", ...options }),
    [open]
  );
  const confirmSuccess = useCallback(
    (options: Omit<ConfirmOptions, "type">) => open({ type: "success", ...options }),
    [open]
  );

  const dialog = pending ? (
    <ConfirmDialog
      open
      onOpenChange={(next) => {
        if (!next) close(false);
      }}
      type={pending.type}
      icon={pending.icon}
      title={pending.title}
      description={pending.description}
      confirmLabel={pending.confirmLabel}
      cancelLabel={pending.cancelLabel}
      onConfirm={() => close(true)}
    />
  ) : null;

  return {
    confirm,
    confirmDelete,
    confirmWarning,
    confirmInfo,
    confirmSuccess,
    dialog,
  };
}

export type { ConfirmDialogType };
