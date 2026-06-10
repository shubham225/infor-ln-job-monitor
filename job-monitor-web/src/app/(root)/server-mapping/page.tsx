"use client";

import { DataTable } from "@/components/data-table-custom";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import type { ServerMapping } from "@/types/api";
import { initServerMapping } from "@/constants/init-data";
import {
  addServerMappings,
  deleteServerMappings,
  fetchServerMappings,
} from "@/service/server-mapping-service";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/api-error";
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
import { IconDeviceDesktopPlus, IconReload } from "@tabler/icons-react";
import { useMounted } from "@/hooks/use-mounted";
import {toast} from "sonner"

export default function ServerMapping() {
  const [open, setOpen] = useState(false);
  const [serverMappings, setServerMappings] = useState<ServerMapping[] | []>(
    [],
  );
  const [serverMapping, setServerMapping] =
    useState<ServerMapping>(initServerMapping);
  const isMounted = useMounted();

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      try {
        const response = await fetchServerMappings();
        setServerMappings(response);
        console.log("response mapping", response);
      } catch (error) {
        const message = getErrorMessage(error);
        toast.error(message);
        console.error("Failed to fetch server mappings:", error);
      }
    };

    fetchAppSettingsAsync();
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddMapping = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();

    try {
      const response = await addServerMappings(serverMapping);
      setServerMappings((prev) => [...prev, response]);
      setServerMapping(initServerMapping);
      setOpen(false);
      console.log("response mapping added", response);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      console.error("Error adding server mapping:", error);
    }
  };

  const handleDeleteMapping = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string,
  ) => {
    e.preventDefault();

    try {
      const response = await deleteServerMappings(id);
      setServerMappings((prev) => prev.filter((item) => item.id !== id));
      console.log("response mapping deleted", response);
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error(message);
      console.error("Error deleting server mapping:", error);
    }
  };

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Server Mapping</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Configure BW host to API URL mappings for job monitoring.
          </p>
        </div>

        <div className="flex gap-2">
          <Dialog open={open} onOpenChange={setOpen}>
            <DialogTrigger asChild>
              <Button variant="default" size="sm" className="gap-2">
                <IconDeviceDesktopPlus size={18} />
                Add Mapping
              </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px] m-2">
              <DialogHeader>
                <DialogTitle>Add Server Mapping</DialogTitle>
                <DialogDescription>
                  Add BW Host to API Url mapping. Click save when you&apos;re
                  done.
                </DialogDescription>
              </DialogHeader>

              <FieldGroup>
                <Field>
                  <FieldLabel htmlFor="hostname">BW Hostname</FieldLabel>
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
                <Field>
                  <FieldLabel htmlFor="apiUrl">ApiUrl</FieldLabel>
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
                    placeholder="http://localhost:3000/getJobDetails"
                  />
                </Field>
              </FieldGroup>
              <DialogFooter className="pt-2">
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <DialogClose asChild>
                  <Button onClick={handleAddMapping}>Save changes</Button>
                </DialogClose>
              </DialogFooter>
            </DialogContent>
          </Dialog>
          <Button variant="outline" size="icon" aria-label="Refresh">
            <IconReload size={18} />
          </Button>
        </div>
      </div>

      {/* Table Card */}
      <DataTable columns={columns(handleDeleteMapping)} data={serverMappings} />
    </div>
  );
}
