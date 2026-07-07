
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";
import { UseFormReturn } from "react-hook-form";
import { AppSetting } from "@/types/api";

type Props = {
  form: UseFormReturn<AppSetting>;
};

export default function GeneralSettings({ form }: Props) {
  return (
    <div className="space-y-6 p-4">
          <div className="grid gap-6 xl:grid-cols-2">
            <div className="space-y-3">
              <FormField
                control={form.control}
                name="allowedJobStartDelay"
                render={({ field }) => (
                  <FormItem className="space-y-4 rounded-lg border bg-muted/40 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Job Start Delay
                        </FormLabel>
                        <p className="text-sm text-muted-foreground mt-1">
                          Time the system waits for a job to start before it marks it delayed.
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-slate-600">
                        {field.value ?? 0}s
                      </span>
                    </div>

                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={1440}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="space-y-3">
              <FormField
                control={form.control}
                name="taskReleaseDelay"
                render={({ field }) => (
                  <FormItem className="space-y-4 rounded-lg border bg-muted/40 p-5">
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <FormLabel className="text-base font-semibold">
                          Task Release Delay
                        </FormLabel>
                        <p className="text-sm text-muted-foreground mt-1">
                          Maximum tolerated scheduler delay before a running job is marked as stuck.
                        </p>
                      </div>
                      <span className="text-sm font-semibold text-slate-600">
                        {field.value ?? 0}s
                      </span>
                    </div>

                    <FormControl>
                      <Input
                        type="number"
                        min={0}
                        max={3600}
                        step={1}
                        {...field}
                        onChange={(e) => field.onChange(Number(e.target.value))}
                        className="text-base"
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          <div className="space-y-3">
            <FormField
              control={form.control}
              name="errorKeywords"
              render={({ field }) => (
                <FormItem className="rounded-lg border bg-muted/40 p-5">
                  <div className="space-y-2">
                    <FormLabel className="text-base font-semibold">
                      Error Message Keywords
                    </FormLabel>
                    <p className="text-sm text-muted-foreground">
                      Add keywords used to detect errors in task logs. Separate keywords with <span className="font-medium">|</span>.
                    </p>
                  </div>

                  <FormControl>
                    <Input
                      placeholder="Error | Failed | Exception ..."
                      {...field}
                      className="text-base"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
  );
}
