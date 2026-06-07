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
import ExclusionSettings from "@/components/exclusion-settings";
import {
  IconAlertCircle,
  IconMessage2,
  IconSettings,
} from "@tabler/icons-react";
import { useMounted } from "@/hooks/use-mounted";

const defaultSettings: AppSetting = {
  mailTo: "",
  mailCc: "",
  emailAlerts: true,
  sendMonthlyReports: false,
  allowedJobStartDelay: 15,
  taskReleaseDelay: 120,
  errorKeywords: "",
};

export default function SettingsPage() {
  const mounted = useMounted();

  const form = useForm<AppSetting>({
    resolver: zodResolver(settingsSchema),
    defaultValues: defaultSettings,
  });

  useEffect(() => {
    const fetchAppSettingsAsync = async () => {
      const response = await fetchAppSettings();
      form.reset({
        ...defaultSettings,
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
      const response = await updateOrSaveAppSettings(values);
      console.log("Response: ", response);
    } catch (error) {
      console.error("Error: ", error);
    }
    console.log("Saved settings:", values);
  }

  return (
    <div className="p-4 space-y-4 bg-background">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Application Settings</h1>
          <p className="text-sm text-muted-foreground mt-1">Configure alerts, notification recipients, and monitoring thresholds from one central location.Save your changes when you are ready to apply them.</p>
        </div>
      </div>

      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex min-h-[72vh] flex-col overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm"
        >
          <Tabs defaultValue="general" className="flex flex-col flex-1 p-2">
            <TabsList variant="line" className="w-full px-2 py-2 border-b border-slate-200">
              <TabsTrigger value="general">
                <IconSettings /> General
              </TabsTrigger>
              <TabsTrigger value="alerts">
                <IconMessage2 /> Alert Configuration
              </TabsTrigger>
              <TabsTrigger value="exclusions">
                <IconAlertCircle /> Exclusions
              </TabsTrigger>
            </TabsList>
            <div className="flex-1 overflow-hidden">
              <TabsContent value="general" className="h-full">
                <div className="h-full p-6 text-sm text-muted-foreground">
                  <GeneralSettings form={form} />
                </div>
              </TabsContent>
              <TabsContent value="alerts" className="h-full">
                <div className="h-full p-6 text-sm text-muted-foreground">
                  <AlertSettings form={form} />
                </div>
              </TabsContent>
              <TabsContent value="exclusions" className="h-full">
                <div className="h-full p-6 text-sm text-muted-foreground">
                  <ExclusionSettings />
                </div>
              </TabsContent>
            </div>
          </Tabs>

          <div className="flex flex-col gap-3 border-t border-slate-200 bg-slate-50 px-4 py-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-muted-foreground">
              Settings are applied when you click save. Review each section before submitting.
            </p>
            <Button type="submit" className="w-full sm:w-auto">
              Save Settings
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
