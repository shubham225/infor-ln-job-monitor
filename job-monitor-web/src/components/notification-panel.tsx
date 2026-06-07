"use client";

import { IconAlertTriangle, IconCheck, IconMail } from "@tabler/icons-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const notifications = [
  {
    title: "Backup completed",
    description: "Server backup completed successfully.",
    time: "2 min ago",
    tag: "Success",
    variant: "secondary",
    icon: IconCheck,
  },
  {
    title: "Delayed job detected",
    description: "Job InventorySync has exceeded its expected runtime.",
    time: "15 min ago",
    tag: "Warning",
    variant: "outline",
    icon: IconAlertTriangle,
  },
  {
    title: "Email alert queued",
    description: "Notification email will be sent to your recipients shortly.",
    time: "1 hour ago",
    tag: "Info",
    variant: "default",
    icon: IconMail,
  },
];

export function NotificationPanel({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (nextOpen: boolean) => void;
}) {
  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent
        side="right"
        className="max-w-md border border-slate-200 bg-white shadow-xl"
      >
        <SheetHeader className="border-b border-slate-200 px-6 py-5">
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <div className="flex gap-4 pr-6">
                <SheetTitle className="text-lg font-semibold">
                  Notifications
                </SheetTitle>
                <Badge variant="secondary" className="ml-auto ">
                  {notifications.length} new
                </Badge>
              </div>
              <SheetDescription className="text-sm text-muted-foreground">
                Latest alerts and system updates for your account.
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <div className="space-y-4 overflow-y-auto p-6 max-h-[60vh]">
          {notifications.map((notification, index) => {
            const Icon = notification.icon;
            return (
              <Card
                key={index}
                className="rounded-lg border border-slate-200 bg-slate-50 shadow-sm gap-2 p-4"
              >
                <CardHeader className="px-4">
                  <div className="flex items-start gap-3">
                    <span className="grid h-10 w-10 place-items-center rounded-2xl bg-slate-200 text-slate-700">
                      <Icon className="size-5" />
                    </span>
                    <div className="space-y-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <CardTitle className="text-sm font-semibold text-slate-900">
                          {notification.title}
                        </CardTitle>
                        <Badge
                          variant={
                            notification.variant as
                              | "default"
                              | "secondary"
                              | "outline"
                          }
                        >
                          {notification.tag}
                        </Badge>
                      </div>
                      <p className="text-sm text-slate-600">
                        {notification.description}
                      </p>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="pt-0 px-4">
                  <div className="text-xs text-muted-foreground">
                    {notification.time}
                  </div>
                </CardContent>
              </Card>
            );
          })}

          <div className="rounded-3xl border border-dashed border-slate-200 bg-slate-50 p-4 text-center text-sm text-slate-500">
            That’s all for now. Check back later for new alerts.
          </div>

          <Button variant="outline" className="w-full">
            View all notifications
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
}
