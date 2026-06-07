import { AppSetting } from "@/types/api";
import { UseFormReturn } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

type Props = {
  form: UseFormReturn<AppSetting>;
};

export default function AlertSettings({ form }: Props) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Email & Alerts Configuration</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Email Alerts Toggle */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="emailAlerts"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between p-4 rounded-lg bg-gray-50 border border-gray-200">
                <div className="space-y-1">
                  <FormLabel className="text-base font-semibold cursor-pointer">
                    Email Alerts
                  </FormLabel>
                  <p className="text-xs text-muted-foreground">
                    Enable or disable email notifications for job failures
                  </p>
                </div>
                <FormControl>
                  <Tabs
                    value={field.value ? "active" : "inactive"}
                    onValueChange={(val) => field.onChange(val === "active")}
                    className="p-4"
                  >
                    <TabsList className="bg-gray-200 p-1">
                      <TabsTrigger
                        value="active"
                        className="text-sm font-semibold px-10 py-2 data-[state=active]:bg-white data-[state=active]:text-green-600"
                      >
                        Active
                      </TabsTrigger>
                      <TabsTrigger
                        value="inactive"
                        className="text-sm font-semibold px-10 py-2 data-[state=active]:bg-white data-[state=active]:text-orange-600 "
                      >
                        Inactive
                      </TabsTrigger>
                    </TabsList>
                  </Tabs>
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        {/* Monthly Report Toggle */}
        <div className="space-y-3">
          <FormField
            control={form.control}
            name="sendMonthlyReports"
            render={({ field }) => (
              <FormItem className="flex items-center justify-between rounded-lg border border-slate-200 bg-slate-50 p-5">
                <div className="space-y-2">
                  <FormLabel className="text-base font-semibold cursor-pointer">
                    Send Monthly Reports
                  </FormLabel>
                  <FormDescription>
                    Automatically send an end-of-month summary report to the
                    configured recipients.
                  </FormDescription>
                </div>
                <FormControl>
                  <Switch
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
              </FormItem>
            )}
          />
        </div>

        <div className="space-y-4 rounded-lg border border-slate-200 bg-slate-50 p-5">
          {/* Mail To */}
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="mailTo"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    Recipient Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="recipient@example.com"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Primary email address for alerts
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          {/* Mail CC */}
          <div className="space-y-3">
            <FormField
              control={form.control}
              name="mailCc"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base font-semibold">
                    CC Email Address
                  </FormLabel>
                  <FormControl>
                    <Input
                      placeholder="cc-recipient@example.com"
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <p className="text-xs text-muted-foreground">
                    Optional CC email address for notifications (separate
                    multiple addresses with ;)
                  </p>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
