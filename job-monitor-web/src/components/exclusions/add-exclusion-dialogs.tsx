"use client";

import * as React from "react";
import { IconPlus } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ERPJobStatus } from "@/types/enums";
import { Tooltip, TooltipContent, TooltipTrigger } from "../ui/tooltip";

const availableStatuses = Object.values(ERPJobStatus) as ERPJobStatus[];

type DialogBaseProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSubmit: () => void;
  submitLabel?: string;
  title: string;
  description: string;
  triggerLabel: string;
  submitDisabled?: boolean;
};

function AddExclusionDialog({
  open,
  onOpenChange,
  onSubmit,
  submitLabel = "Add",
  title,
  description,
  triggerLabel,
  submitDisabled,
  children,
}: React.PropsWithChildren<DialogBaseProps>) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <Tooltip>
        <TooltipTrigger asChild>
          <DialogTrigger asChild>
            <Button variant="outline" size="icon">
              <IconPlus />
            </Button>
          </DialogTrigger>
        </TooltipTrigger>
        <TooltipContent>{triggerLabel}</TooltipContent>
      </Tooltip>
      <DialogContent className="sm:max-w-[425px] m-2">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <div className="grid gap-3 py-2">{children}</div>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="secondary">Cancel</Button>
          </DialogClose>
          <Button onClick={onSubmit} disabled={submitDisabled}>
            {submitLabel}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export function AddMessageDialog({
  open,
  onOpenChange,
  hostName,
  onHostNameChange,
  message,
  onMessageChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hostName: string;
  onHostNameChange: (value: string) => void;
  message: string;
  onMessageChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <AddExclusionDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      title="Add error message exclusion"
      description="Enter the host name and message text to exclude."
      triggerLabel="Add message"
      submitLabel="Add message"
      submitDisabled={!hostName.trim() || !message.trim()}
    >
      <Input
        value={hostName}
        onChange={(event) => onHostNameChange(event.target.value)}
        placeholder="Host name"
      />
      <Input
        value={message}
        onChange={(event) => onMessageChange(event.target.value)}
        placeholder="Error message fragment"
      />
    </AddExclusionDialog>
  );
}

export function AddJobDialog({
  open,
  onOpenChange,
  hostName,
  onHostNameChange,
  jobName,
  onJobNameChange,
  company,
  onCompanyChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hostName: string;
  onHostNameChange: (value: string) => void;
  jobName: string;
  onJobNameChange: (value: string) => void;
  company: string;
  onCompanyChange: (value: string) => void;
  onSubmit: () => void;
}) {
  return (
    <AddExclusionDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      title="Add job exclusion"
      description="Enter the host name, job name, and company to exclude."
      triggerLabel="Add job exclusion"
      submitLabel="Add job exclusion"
      submitDisabled={!hostName.trim() || !jobName.trim() || !company.trim()}
    >
      <Input
        value={hostName}
        onChange={(event) => onHostNameChange(event.target.value)}
        placeholder="Host name"
      />
      <Input
        value={jobName}
        onChange={(event) => onJobNameChange(event.target.value)}
        placeholder="Job name"
      />
      <Input
        value={company}
        onChange={(event) => onCompanyChange(event.target.value)}
        placeholder="Company name"
      />
    </AddExclusionDialog>
  );
}

export function AddStatusDialog({
  open,
  onOpenChange,
  hostName,
  onHostNameChange,
  status,
  onStatusChange,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  hostName: string;
  onHostNameChange: (value: string) => void;
  status: ERPJobStatus;
  onStatusChange: (value: ERPJobStatus) => void;
  onSubmit: () => void;
}) {
  return (
    <AddExclusionDialog
      open={open}
      onOpenChange={onOpenChange}
      onSubmit={onSubmit}
      title="Add job status exclusion"
      description="Enter the host name and status to exclude."
      triggerLabel="Add status"
      submitLabel="Add status"
      submitDisabled={!hostName.trim() || !status}
    >
      <Input
        value={hostName}
        onChange={(event) => onHostNameChange(event.target.value)}
        placeholder="Host name"
      />
      <Select
        value={status}
        onValueChange={(value) => onStatusChange(value as ERPJobStatus)}
      >
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select status" />
        </SelectTrigger>
        <SelectContent>
          {availableStatuses.map((item) => (
            <SelectItem key={item} value={item}>
              {item}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </AddExclusionDialog>
  );
}
