import { DialogWindow } from "@/components/dialog-window";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { ServerMapping } from "@/types/api";
import React from "react";

type props = {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  serverMapping: ServerMapping;
  setServerMapping: React.Dispatch<React.SetStateAction<ServerMapping>>;
  handleAddMapping: () => void;
};

export default function ServerMappingDialog({
  open,
  setOpen,
  serverMapping,
  setServerMapping,
  handleAddMapping,
}: props) {
  return (
    <DialogWindow
      open={open}
      onOpenChange={setOpen}
      processLabel="Save"
      cancelLabel="Cancel"
      onProcess={handleAddMapping}
    >
      <div className="flex flex-col gap-4 w-96">
        <DialogHeader>
          <DialogTitle>Add Server Mapping</DialogTitle>
        </DialogHeader>
        <FieldGroup className="flex flex-col gap-6">
          <Field className="flex flex-col gap-1">
            <FieldLabel htmlFor="hostname" className="text-muted-foreground">BW Hostname</FieldLabel>
            <Input
              id="hostname"
              type="text"
              value={serverMapping?.hostname}
              onChange={(e) => {
                e.preventDefault();
                setServerMapping((data: ServerMapping) => ({
                  ...data,
                  hostname: e.target.value,
                }));
              }}
              placeholder="127.0.0.1"
            />
          </Field>
          <Field className="flex flex-col gap-1">
            <FieldLabel htmlFor="apiUrl" className="text-muted-foreground">API URL</FieldLabel>
            <Input
              id="apiUrl"
              type="text"
              value={serverMapping?.apiUrl}
              onChange={(e) => {
                e.preventDefault();
                setServerMapping((data: ServerMapping) => ({
                  ...data,
                  apiUrl: e.target.value,
                }));
              }}
              placeholder="http://localhost:3000"
            />
          </Field>
        </FieldGroup>
      </div>
    </DialogWindow>
  );
}
