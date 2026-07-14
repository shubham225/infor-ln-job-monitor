"use client";

import { useEffect, useState } from "react";
import {
  IconCircleCheck,
  IconExclamationCircle,
  IconPlayerPlay,
  IconTreadmill,
} from "@tabler/icons-react";
import { ChartAreaLegend } from "./line-chart";
import { FailureData } from "@/types/dashboard";
import type { DashboardStats, MonthlyExecutionTrend } from "@/types/api";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import FailureDashboardTable from "@/components/failure-dash-table";
import {
  fetchDashboardStats,
  fetchMonthlyExecutionTrend,
} from "@/service/dashboard-service";
import {
  formatCompactNumber,
  formatDuration,
  formatEnumLabel,
  formatLastAlert,
} from "@/lib/utils";
import LoadingAnimation from "@/components/animations/loading-animation";

export default function Home() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [monthlyTrend, setMonthlyTrend] = useState<MonthlyExecutionTrend[]>([]);
  const [failureData, setFailureData] = useState<FailureData[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadDashboard = async () => {
      setLoading(true);
      try {
        const [dashboardStats, trendData] = await Promise.all([
          fetchDashboardStats(),
          fetchMonthlyExecutionTrend(),
        ]);

        setStats(dashboardStats);
        setMonthlyTrend(trendData);
        setFailureData(
          dashboardStats.failedJobsByReason?.map(({ reason, count }) => ({
            key: reason,
            label: formatEnumLabel(reason),
            count,
          })) ?? [],
        );
      } catch (err) {
        console.error("Failed to load dashboard data:", err);
        setError("Unable to load dashboard data. Please refresh.");
      } finally {
        setLoading(false);
      }
    };

    loadDashboard();
  }, []);

  const totalJobExecutions = stats?.summery?.totalJobExecutions ?? 0;
  const totalFailedJobs = stats?.summery?.totalFailedJobs ?? 0;
  const totalSuccessfulJobs = stats?.summery?.totalSuccessfulJobs ?? 0;
  const totalRunningTasks = stats?.summery?.totalRunningJobs ?? 0;

  const averageExecutionTimeMs = stats?.quickStats?.averageExecutionTimeMs ?? 0;
  const lastAlertText = formatLastAlert(stats?.quickStats?.lastAlertTime ?? "");
  const activeJobs = stats?.quickStats?.activeJobs ?? 0;
  const uptimeMs = stats?.quickStats?.uptimeMs ?? 0;
  const scheduledTasks = stats?.quickStats?.scheduledTasks ?? 0;

  const successRate = totalJobExecutions
    ? Math.round((totalSuccessfulJobs / totalJobExecutions) * 100)
    : 0;
  const failureRate = totalJobExecutions
    ? Math.round((totalFailedJobs / totalJobExecutions) * 100)
    : 0;

  if (loading) {
    return (
      <main className="p-4 space-y-4 bg-background">
        <div className="text-sm text-muted-foreground">
          <LoadingAnimation />
        </div>
      </main>
    );
  }

  if (error) {
    return (
      <main className="p-4 space-y-4 bg-background">
        <div className="text-sm text-destructive">{error}</div>
      </main>
    );
  }

  return (
    <main className="p-4 space-y-5 bg-background">
      {/* Key Stats - Full Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        <Card className="border-l-4 border-l-blue-500 p-4 rounded-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-sm text-muted-foreground font-medium">
                  Total Runs
                </p>
                <p className="text-3xl font-bold mt-2">
                  {formatCompactNumber(totalJobExecutions)}
                </p>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  {successRate}% success rate
                </p>
              </div>
              <div className="text-blue-500/20 ml-2">
                <IconPlayerPlay size={50} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 p-4 rounded-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Failures
                </p>
                <p className="text-3xl font-bold mt-2">
                  {formatCompactNumber(totalFailedJobs)}
                </p>
                <p className="text-xs text-red-600 font-semibold mt-2">
                  {failureRate}% of total runs
                </p>
              </div>
              <div className="text-red-500/20 ml-2">
                <IconExclamationCircle size={50} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 p-4 rounded-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Success
                </p>
                <p className="text-3xl font-bold mt-2">
                  {formatCompactNumber(totalSuccessfulJobs)}
                </p>
                <p className="text-xs text-green-600 font-semibold mt-2">
                  {successRate}% of total runs
                </p>
              </div>
              <div className="text-green-500/20 ml-2">
                <IconCircleCheck size={50} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 p-4 rounded-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Running Tasks
                </p>
                <p className="text-3xl font-bold mt-2">
                  {formatCompactNumber(totalRunningTasks)}
                </p>
                <p className="text-xs text-amber-600 font-semibold mt-2">
                  Currently active
                </p>
              </div>
              <div className="text-amber-500/20 ml-2">
                <IconTreadmill size={50} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        {/* Execution Trend Chart - Wider */}
        <Card className="lg:col-span-2 rounded-lg">
          <CardHeader>
            <CardTitle>Monthly Execution Trend</CardTitle>
            <CardDescription>
              Graph showing the trend of job executions over the past month.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="w-full h-96 mt-10">
              <ChartAreaLegend data={monthlyTrend} />
            </div>
          </CardContent>
        </Card>

        {/* Failure Summary - Compact List */}
        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Failures by Reason Code</CardTitle>
            <CardDescription>
              Job failures categorized by reason codes with counts.
            </CardDescription>
          </CardHeader>
          <CardContent className="h-full flex flex-col">
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full">
              <FailureDashboardTable
                data={failureData
                  .filter(
                    (f) =>
                      f.key !== "EXECUTED" &&
                      f.key !== "PENDING" &&
                      f.key !== "SKIPPED",
                  )
                  .sort((a, b) => (b.count || 0) - (a.count || 0))
                  .slice(0, 9)}
              />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Job Queue & Top Failures */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Top Failure Categories</CardTitle>
            <CardDescription>
              Top job failures categorized by reason codes with counts.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {failureData
                .filter(
                  (f) =>
                    f.count &&
                    f.count > 0 &&
                    f.key !== "EXECUTED" &&
                    f.key !== "PENDING" &&
                    f.key !== "SKIPPED",
                )
                .sort((a, b) => (b.count || 0) - (a.count || 0))
                .slice(0, 6)
                .map((item, idx) => (
                  <div key={item.key} className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-muted flex items-center justify-center text-xs font-semibold">
                      {idx + 1}
                    </div>
                    <div className="flex-1">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-sm font-medium">
                          {item.label}
                        </span>
                        <span className="text-sm font-semibold">
                          {formatCompactNumber(item.count)}
                        </span>
                      </div>
                      <div className="h-1.5 bg-muted rounded-full overflow-hidden">
                        <div
                          className="h-full bg-red-500"
                          style={{
                            width: `${Math.min(((item.count || 0) / 42) * 100, 100)}%`,
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </CardContent>
        </Card>

        <Card className="rounded-lg">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <CardDescription>
              A quick overview of your system&apos;s current performance and activity.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Avg Execution Time
                </span>
                <span className="text-sm font-semibold">
                  {formatDuration(averageExecutionTimeMs)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Last Alert
                </span>
                <span className="text-sm font-semibold">{lastAlertText}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Active Jobs
                </span>
                <span className="text-sm font-semibold">{activeJobs}</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-semibold text-green-600">
                  {formatDuration(uptimeMs)}
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Scheduled Today
                </span>
                <span className="text-sm font-semibold">{scheduledTasks}</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
