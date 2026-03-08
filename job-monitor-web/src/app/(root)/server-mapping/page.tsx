"use client";

import { DataTable } from "@/components/data-table-custom";
import { useEffect, useState } from "react";
import { columns } from "./columns";
import type { ServerMapping } from "@/types/api";
import { initServerMapping, initServerMappings } from "@/constants/init-data";
import {
  addServerMappings,
  deleteServerMappings,
  fetchServerMappings,
} from "@/service/server-mapping-service";
import { Button } from "@/components/ui/button";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
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
import {
  IconArrowsDiagonal,
  IconDeviceDesktopPlus,
  IconMenu2,
  IconReload,
} from "@tabler/icons-react";

type Props = {};

export default function ServerMapping({}: Props) {
  const [open, setOpen] = useState(false);
  const [serverMappings, setServerMappings] = useState<ServerMapping[] | []>(
    []
  );
  const [serverMapping, setServerMapping] =
    useState<ServerMapping>(initServerMapping);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      const response = await fetchServerMappings();
      setServerMappings(response);
      console.log("response mapping", response);
    };

    fetchAppSettingsAsync();
  }, []);

  if (!isMounted) {
    return null;
  }

  const handleAddMapping = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    e.preventDefault();
    try {
      const addServerMappingsAsync = async () => {
        const response = await addServerMappings(serverMapping);
        setServerMappings((prev) => [...prev, response]);
        setServerMapping(initServerMapping);
        console.log("response mapping added", response);
        setOpen(false);
      };

      addServerMappingsAsync();
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const handleDeleteMapping = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    id: string
  ) => {
    e.preventDefault();
    try {
      const deleteServerMappingsAsync = async (id: string) => {
        const response = await deleteServerMappings(id);
        setServerMappings((prev) => prev.filter((item) => item.id !== id));
        console.log("response mapping deleted", response);
        setOpen(false);
      };

      deleteServerMappingsAsync(id);
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  return (
    <div className="space-y-1 p-2">
      <Dialog open={open} onOpenChange={setOpen}>
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-semibold"></h1>
          <div className="flex gap-2">
            <DialogTrigger asChild>
              <Button variant="ghost" size="icon">
                <IconDeviceDesktopPlus />
              </Button>
            </DialogTrigger>
            <Button variant="ghost" size="icon">
              <IconMenu2 />
            </Button>
          </div>
        </div>
        <DialogContent className="sm:max-w-[425px] m-2">
          <DialogHeader>
            <DialogTitle>Add Server Mapping</DialogTitle>
            <DialogDescription>
              Add BW Host to API Url mapping. Click save when you&apos;re done.
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
                  setServerMapping((data: any) => ({
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
                  setServerMapping((data: any) => ({
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
      <DataTable columns={columns(handleDeleteMapping)} data={serverMappings} />
    </div>
  );
}
