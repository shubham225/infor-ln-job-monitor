"use client";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  fetchAppSettings,
  updateOrSaveAppSettings,
} from "@/service/settings-service";
import { AppSetting } from "@/types/api";
import { settingsSchema } from "@/types/zod-schemas";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import {
  IconMenu2,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import { DeleteIcon, Trash } from "lucide-react";

export default function SettingsPage() {
  const [isMounted, setIsMounted] = useState(false);

  const [errorExclusionList] = useState<string[][]>([]);
  const [jobExclusionList] = useState<string[][]>([
    ["Job_123", "100"],
    ["Job_456", "500"],
    ["Job_456", "500"],
    ["Job_456", "500"],
    ["Job_456", "500"],
    ["Job_456", "500"],
    ["Job_456", "500"],
    ["Job_456", "500"],
  ]);
  const [statusExclusionList] = useState<string[][]>([
    ["PENDING"],
    ["CANCELED"],
    ["PENDING"],
    ["CANCELED"],
    ["PENDING"],
    ["CANCELED"],
    ["PENDING"],
    ["CANCELED"],
    ["PENDING"],
    ["CANCELED"],
  ]);
  const [errorExclusionHeaders] = useState<string[]>(["Message"]);
  const [jobExclusionHeaders] = useState<string[]>(["Job", "Company"]);
  const [statusExclusionHeaders] = useState<string[]>(["Status"]);

  const form = useForm<AppSetting>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
      mailTo: "",
      mailCc: "",
      emailAlerts: true,
      allowedJobStartDelay: 15,
      errorKeywords: "",
    },
  });

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      const response = await fetchAppSettings();
      form.reset(response);
      console.log("response received", response);
    };

    fetchAppSettingsAsync();
  }, []);

  if (!isMounted) {
    return null;
  }

  function onSubmit(values: AppSetting) {
    try {
      const updateOrSaveAppSettingsAsync = async () => {
        const response = await updateOrSaveAppSettings(values);
        console.log("Response: ",response)
      };

      console.log("onSubmit clicked")
      updateOrSaveAppSettingsAsync();
    } catch (error) {
      console.error("Error: ", error);
    }
    console.log("Saved settings:", values);
  }

  return (
    <div className="space-y-1 p-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Email & Alerts */}
            <Card>
              <CardHeader>
                <CardTitle>Email & Alerts</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="mailTo"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mail To</FormLabel>
                      <FormControl>
                        <Input placeholder="recipient@example.com" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="mailCc"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Mail CC</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="cc-receipent@example.com"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="emailAlerts"
                  render={({ field }) => (
                    <FormItem className="flex items-center">
                      <FormLabel>Email Alerts</FormLabel>
                      <Select
                        value={field.value ? "active" : "inactive"}
                        onValueChange={(val) =>
                          field.onChange(val === "active")
                        }
                      >
                        <FormControl>
                          <SelectTrigger
                            className={cn(
                              !field.value &&
                                "border-red-500 text-red-600 focus:ring-red-500 bg-red-50",
                              field.value &&
                                "border-green-500 text-green-600 focus:ring-green-500 bg-green-50"
                            )}
                          >
                            <SelectValue placeholder="Select status" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="active">Active</SelectItem>
                          <SelectItem value="inactive">Inactive</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>

            {/* Utility Settings */}
            <Card>
              <CardHeader>
                <CardTitle>Utility Settings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <FormField
                  control={form.control}
                  name="allowedJobStartDelay"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Job Start Delay (Seconds)</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          min={0}
                          {...field}
                          onChange={(e) =>
                            field.onChange(Number(e.target.value))
                          }
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="errorKeywords"
                  render={({ field }) => (
                    <FormItem className="md:col-span-2">
                      <FormLabel>Error Message Keywords</FormLabel>
                      <FormControl>
                        <Input placeholder="Error | Failed ..." {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </CardContent>
            </Card>
          </div>

          {/* Exclusion Tables */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card className="p-0 h-[275px]">
              <CardContent className="p-0">
                <div className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Error Message Exclusion
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <IconPlus />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconMenu2 />
                      </Button>
                    </div>
                  </div>
                </div>
                <ExclusionTable
                  title="Error Message Exclusion"
                  headerLabels={errorExclusionHeaders}
                  data={errorExclusionList}
                />
              </CardContent>
            </Card>
            <Card className="p-0 h-[275px]">
              <CardContent className="p-0">
                <div className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">Job Exclusion</h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <IconPlus />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconMenu2 />
                      </Button>
                    </div>
                  </div>
                </div>
                <ExclusionTable
                  title="Job Exclusion"
                  headerLabels={jobExclusionHeaders}
                  data={jobExclusionList}
                />
              </CardContent>
            </Card>
            <Card className="p-0 h-[275px]">
              <CardContent className="p-0">
                <div className="py-2 px-3">
                  <div className="flex items-center justify-between">
                    <h3 className="text-sm font-medium">
                      Job Status Exclusion
                    </h3>
                    <div className="flex gap-2">
                      <Button variant="ghost" size="icon">
                        <IconPlus />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <IconMenu2 />
                      </Button>
                    </div>
                  </div>
                </div>
                <ExclusionTable
                  title="Job Status Exclusion"
                  headerLabels={statusExclusionHeaders}
                  data={statusExclusionList}
                />
              </CardContent>
            </Card>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}

/* -----------------------------------
   Reusable Table Component
------------------------------------ */
function ExclusionTable({
  title,
  headerLabels,
  data,
}: {
  title: string;
  headerLabels: string[];
  data: string[][];
}) {
  return (
    <div className="h-[180px] overflow-auto border-t">
      <Table>
        {/* Header */}
        <TableHeader >
          <TableRow className="sticky top-0 z-10 bg-muted/40">
            {headerLabels.map((item, index) => (
              <TableHead
                key={index}
                className="h-9 text-xs text-gray-500"
              >
                {item}
              </TableHead>
            ))}
            <TableHead className="h-9 text-xs text-gray-500 text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        {/* Body */}
        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="hover:bg-muted/30">
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="py-2 text-sm font-medium text-gray-700"
                >
                  {cell}
                </TableCell>
              ))}

              <TableCell className="py-2 text-right">
                <Button size="icon" variant="ghost" className="hover:text-destructive">
                  <IconTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={headerLabels.length + 1}
                className="py-6 text-center text-xs text-muted-foreground"
              >
                No Exclusions
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
