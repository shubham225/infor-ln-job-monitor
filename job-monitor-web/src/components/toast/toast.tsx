"use client"

import * as React from "react"
import * as ToastPrimitives from "@radix-ui/react-toast"
import { cva, type VariantProps } from "class-variance-authority"
import { X, Info, AlertTriangle, CheckCircle2, XCircle } from "lucide-react"

import { cn } from "@/lib/utils"

const ToastProvider = ToastPrimitives.Provider

type ToastPosition =
  | "top-left"
  | "top-center"
  | "top-right"
  | "bottom-left"
  | "bottom-center"
  | "bottom-right"

  // Corner + alignment classes, and whether new toasts stack toward or away
// from the screen edge (bottom-* reverses order so the newest sits closest
// to the edge it entered from).
const positionClasses: Record<ToastPosition, string> = {
  "top-left": "top-0 left-0 flex-col",
  "top-center": "top-0 left-1/2 -translate-x-1/2 flex-col",
  "top-right": "top-0 right-0 flex-col",
  "bottom-left": "bottom-0 left-0 flex-col-reverse",
  "bottom-center": "bottom-0 left-1/2 -translate-x-1/2 flex-col-reverse",
  "bottom-right": "bottom-0 right-0 flex-col-reverse",
}

const ToastViewport = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Viewport>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Viewport> & {
    position?: ToastPosition
  }
>(({ className, position = "bottom-right", ...props }, ref) => (
  <ToastPrimitives.Viewport
    ref={ref}
    className={cn(
      "fixed z-[100] flex max-h-screen w-full gap-3 p-4 md:max-w-[420px]",
      positionClasses[position],
      className
    )}
    {...props}
  />
))
ToastViewport.displayName = ToastPrimitives.Viewport.displayName

/**
 * Variant styles.
 * Each variant controls: the left accent bar color, the icon circle color,
 * and which icon is shown.
 */
const toastVariants = cva(
  "group pointer-events-auto relative flex w-full items-start gap-3 overflow-hidden rounded-lg border border-transparent bg-white p-4 pr-10 shadow-lg ring-1 ring-black/5 will-change-transform transition-[transform,opacity] duration-200 ease-out data-[swipe=cancel]:translate-x-0 data-[swipe=end]:translate-x-[var(--radix-toast-swipe-end-x)] data-[swipe=move]:translate-x-[var(--radix-toast-swipe-move-x)] data-[swipe=move]:transition-none data-[state=open]:animate-in data-[state=closed]:animate-out data-[swipe=end]:animate-out data-[state=closed]:fade-out-80 data-[state=closed]:duration-150 data-[state=closed]:slide-out-to-right-full data-[state=open]:slide-in-from-top-full data-[state=open]:sm:slide-in-from-bottom-full",
  {
    variants: {
      variant: {
        info: "before:bg-blue-500",
        warning: "before:bg-amber-500",
        error: "before:bg-red-500",
        success: "before:bg-emerald-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconCircleVariants = cva(
  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white",
  {
    variants: {
      variant: {
        info: "bg-blue-500",
        warning: "bg-amber-500",
        error: "bg-red-500",
        success: "bg-emerald-500",
      },
    },
    defaultVariants: {
      variant: "info",
    },
  }
)

const iconMap = {
  info: Info,
  warning: AlertTriangle,
  error: XCircle,
  success: CheckCircle2,
} as const

const Toast = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Root>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Root> &
    VariantProps<typeof toastVariants>
>(({ className, variant = "info", ...props }, ref) => {
  return (
    <ToastPrimitives.Root
      ref={ref}
      className={cn(
        toastVariants({ variant }),
        // left accent bar, rendered as a pseudo-element so it sits flush
        "before:absolute before:left-1 before:top-1/2 before:h-[calc(100%-16px)] before:w-1 before:-translate-y-1/2 before:rounded-full",
        className
      )}
      {...props}
    />
  )
})
Toast.displayName = ToastPrimitives.Root.displayName

/** Renders the correct icon inside a colored circle for the given variant */
function ToastIcon({ variant = "info" }: { variant?: "info" | "warning" | "error" | "success" }) {
  const Icon = iconMap[variant]
  return (
    <div className={cn(iconCircleVariants({ variant }))}>
      <Icon className="h-5 w-5" strokeWidth={2.5} />
    </div>
  )
}

const ToastAction = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Action>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Action>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Action
    ref={ref}
    className={cn(
      "inline-flex h-8 shrink-0 items-center justify-center rounded-md border border-neutral-200 bg-transparent px-3 text-sm font-medium transition-colors hover:bg-neutral-100",
      className
    )}
    {...props}
  />
))
ToastAction.displayName = ToastPrimitives.Action.displayName

const ToastClose = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Close>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Close>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Close
    ref={ref}
    className={cn(
      "absolute right-3 top-4 rounded-md p-1 text-neutral-400 transition-colors hover:text-neutral-600 focus:outline-none focus:ring-2 focus:ring-neutral-300",
      className
    )}
    toast-close=""
    {...props}
  >
    <X className="h-4 w-4" />
  </ToastPrimitives.Close>
))
ToastClose.displayName = ToastPrimitives.Close.displayName

const ToastTitle = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Title>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Title>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Title
    ref={ref}
    className={cn("text-[15px] font-semibold leading-tight text-neutral-900", className)}
    {...props}
  />
))
ToastTitle.displayName = ToastPrimitives.Title.displayName

const ToastDescription = React.forwardRef<
  React.ElementRef<typeof ToastPrimitives.Description>,
  React.ComponentPropsWithoutRef<typeof ToastPrimitives.Description>
>(({ className, ...props }, ref) => (
  <ToastPrimitives.Description
    ref={ref}
    className={cn("mt-1 text-sm leading-snug text-neutral-500", className)}
    {...props}
  />
))
ToastDescription.displayName = ToastPrimitives.Description.displayName

type ToastProps = React.ComponentPropsWithoutRef<typeof Toast>
type ToastActionElement = React.ReactElement<typeof ToastAction>

export {
  type ToastProps,
  type ToastActionElement,
  ToastProvider,
  ToastViewport,
  Toast,
  ToastIcon,
  ToastTitle,
  ToastDescription,
  ToastClose,
  ToastAction,
}
