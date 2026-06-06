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
    <div className="space-y-6">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="h-full flex flex-col"
        >
          <Tabs defaultValue="general" className="flex flex-col flex-1">
            <TabsList variant="line" className="w-full px-2 py-2">
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
            <div className="flex-1 min-h-[44.5rem]">
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

          <div className="p-4 flex justify-end">
            <Button type="submit">Save Settings</Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
