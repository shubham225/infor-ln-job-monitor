"use client";

import { useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import {
  fetchAppSettings,
  updateOrSaveAppSettings,
} from "@/service/settings-service";
import { AppSetting } from "@/types/api";
import { settingsSchema } from "@/types/zod-schemas";
import GeneralSettings from "@/components/general-settings";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import AlertSettings from "@/components/alert-settings";
import {
  IconDeviceFloppy,
  IconSettings,
} from "@tabler/icons-react";
import { useMounted } from "@/hooks/use-mounted";
import { toast } from "@/hooks/use-toast";
import { getErrorMessage } from "@/lib/api-error";
import MessageExclusionSettings from "@/components/exclusions/message-exclusion-settings";
import JobStatusExclusionSettings from "@/components/exclusions/job-status-exclusion-settings";
import JobExclusionSettings from "@/components/exclusions/job-exclusion-settings";
import { ClipboardClock, ClipboardType, Mail, MessageSquareWarning, Save, Settings } from "lucide-react";

export default function SettingsPage() {
  const mounted = useMounted();

  const form = useForm<AppSetting>({
    resolver: zodResolver(settingsSchema),
  });

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      const response = await fetchAppSettings();
      form.reset({
        ...response,
      });
    };

    fetchAppSettingsAsync();
  }, [form]);

  if (!mounted) {
    return null;
  }

  async function onSubmit(values: AppSetting) {
    try {
      await updateOrSaveAppSettings(values);
      toast.success({
        title: "Settings saved",
        description: "Your settings have been saved successfully.",
      });
    } catch (error) {
      const message = getErrorMessage(error);
      toast.error({
        title: "Uh oh, something went wrong",
        description: message,
      });
      console.error("Error: ", error);
    }
  }

  return (
    <div className="flex h-full flex-col bg-muted/20">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex flex-1 flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex flex-wrap items-start justify-between gap-4 bg-background px-6 py-5">
            <div>
              <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                Application Settings
              </h1>
              <p className="mt-1 text-sm text-muted-foreground">
                Configure alerts, notification recipients, and monitoring
                thresholds from one central location.
              </p>
            </div>
            <Button type="submit" className="gap-2 shrink-0 cursor-pointer">
              <Save className="size-4" />
              Save settings
            </Button>
          </div>

          <Tabs defaultValue="general" className="flex flex-1 flex-col gap-2">
            <div className="border-b bg-background px-6">
              <TabsList variant="line">
                <TabsTrigger value="general" className="cursor-pointer mx-4">
                  <div className="flex gap-2 items-center px-2">
                    <Settings className="size-4" />
                    General
                  </div>
                </TabsTrigger>
                <TabsTrigger value="alerts" className="cursor-pointer mx-4">
                  <div className="flex gap-2 items-center px-2">
                    <Mail className="size-4" />
                    Alert Configuration
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="messageExclusions"
                  className="cursor-pointer mx-4"
                >
                  <div className="flex gap-2 items-center px-2">
                    <MessageSquareWarning className="size-4" />
                    Message Exclusions
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="JobExclusions"
                  className="cursor-pointer mx-4"
                >
                  <div className="flex gap-2 items-center px-2">
                    <ClipboardClock className="size-4" />
                    Job Exclusions
                  </div>
                </TabsTrigger>
                <TabsTrigger
                  value="JobStatusExclusions"
                  className="cursor-pointer mx-4"
                >
                  <div className="flex gap-2 items-center px-2">
                    <ClipboardType className="size-4" />
                    Job Status Exclusions
                  </div>
                </TabsTrigger>
              </TabsList>
            </div>

            <div className="flex-1 overflow-y-auto">
              <TabsContent value="general" className="m-0 h-full">
                <div className="h-full">
                  <GeneralSettings form={form} />
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="m-0 h-full">
                <div className="h-full">
                  <AlertSettings form={form} />
                </div>
              </TabsContent>
              <TabsContent value="messageExclusions" className="m-0 h-full">
                <div className="h-full">
                  <MessageExclusionSettings />
                </div>
              </TabsContent>
              <TabsContent value="JobExclusions" className="m-0 h-full">
                <div className="h-full">
                  <JobExclusionSettings />
                </div>
              </TabsContent>
              <TabsContent value="JobStatusExclusions" className="m-0 h-full">
                <div className="h-full">
                  <JobStatusExclusionSettings />
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </form>
      </Form>
    </div>
  );
}
