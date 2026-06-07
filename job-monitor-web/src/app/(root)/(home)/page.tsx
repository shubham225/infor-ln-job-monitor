import { Button } from "@/components/ui/button";
import {
  IconArrowsDiagonal,
  IconCircleCheck,
  IconExclamationCircle,
  IconMenu2,
  IconPlayerPlay,
  IconReload,
  IconTreadmill,
} from "@tabler/icons-react";
import {
  AlertCircle,
  Bell,
  CheckCircle,
  CircleX,
  Globe,
  Hourglass,
  List,
  MemoryStick,
  MonitorCloud,
  Play,
} from "lucide-react";
import { ChartAreaLegend } from "./temp-chart";
import {
  FailureData,
  Metrix,
  StatItem,
  StatItemCompact,
} from "@/types/dashboard";
import { Card, CardContent } from "@/components/ui/card";
import FailureDashboardTable from "@/components/failure-dash-table";

const data: Metrix[] = [
  {
    title: "Overall",
    data: [
      {
        label: "Total",
        value: 1100,
        icon: List,
      },
      {
        label: "Success",
        value: 700,
        icon: CheckCircle,
      },
      {
        label: "Failed",
        value: 400,
        icon: AlertCircle,
        textColor: "text-red-700",
      },
    ],
  },
  {
    title: "This Month",
    data: [
      {
        label: "Total",
        value: 110,
        icon: List,
      },
      {
        label: "Success",
        value: 70,
        icon: CheckCircle,
      },
      {
        label: "Failed",
        value: 40,
        icon: AlertCircle,
        textColor: "text-red-700",
      },
    ],
  },
  {
    title: "Top Failure Status",
    data: [
      { label: "Time Limit Exceeded", value: "20", icon: Hourglass },
      { label: "Executed With Runtime", value: "10", icon: CircleX },
      { label: "Erp Api Down", value: "10", icon: Globe },
    ],
  },
  {
    title: "Other Stats",
    data: [
      {
        label: "Running",
        value: "12",
        icon: Play,
      },
      {
        label: "Last Alert",
        value: "12m 40s",
        icon: Bell,
      },
      {
        label: "Memory Usage",
        value: "300 MB",
        icon: MemoryStick,
      },
    ],
  },
];

const otherStats: StatItem[] = [
  {
    label: "Running",
    value: "12",
    icon: Play,
  },
  {
    label: "Last Alert",
    value: "12m 40s",
    icon: Bell,
  },
  {
    label: "Memory Usage",
    value: "300 MB",
    icon: MemoryStick,
  },
];

const totalMonitor: StatItemCompact = {
  value: "5.8K",
  icon: MonitorCloud,
};

const failureData: FailureData[] = [
  { key: "PENDING", label: "Pending", count: 8 },
  { key: "JOB_DETAILS_MISSING", label: "Job Details Missing", count: 2 },
  { key: "NOT_FOUND", label: "Job Not Found", count: 1 },
  { key: "NOT_EXECUTED", label: "Not Executed", count: 4 },
  { key: "RUNTIME_ERROR", label: "Runtime Error", count: 6 },
  {
    key: "EXECUTED_WITH_RUNTIME_ERROR",
    label: "Executed with Runtime Error",
    count: 3,
  },
  { key: "TIME_LIMIT_EXCEEDED", label: "Time Limit Exceeded", count: 5 },
  { key: "CANCELED", label: "Canceled", count: 1 },
  { key: "ERP_API_DOWN", label: "ERP API Down", count: 2 },
  { key: "EXECUTED", label: "Executed Successfully", count: 42 },
  {
    key: "WIN_SCHEDULER_RUNNING",
    label: "Scheduler Still Running",
    count: 3,
  },
  {
    key: "EXEC_WITH_ERROR_MESSAGE",
    label: "Executed with Error Message",
    count: 2,
  },
];

export default async function Home() {

  return (
    <main className="p-4 space-y-4 bg-background">
      {/* Header */}
      {/* <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold">Job Monitor Dashboard</h1>
        </div>

        <div className="flex items-center gap-2">
          <div className="hidden sm:flex items-center gap-1 rounded-lg bg-muted p-1">
            <Button variant="ghost" size="sm" className="text-xs">
              1D
            </Button>
            <Button variant="default" size="sm" className="text-xs">
              7D
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              30D
            </Button>
            <Button variant="ghost" size="sm" className="text-xs">
              Custom
            </Button>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" size="icon" aria-label="Refresh">
              <IconReload size={18} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Export">
              <IconArrowsDiagonal size={18} />
            </Button>
            <Button variant="outline" size="icon" aria-label="Menu">
              <IconMenu2 size={18} />
            </Button>
          </div>
        </div>
      </div> */}

      {/* Key Stats - Full Width */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        <Card className="border-l-4 border-l-blue-500 p-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Runs
                </p>
                <p className="text-2xl font-bold mt-2">5.8K</p>
                <p className="text-xs text-blue-600 font-semibold mt-2">
                  ↑ 12% from last week
                </p>
              </div>
              <div className="text-blue-500/20 ml-2">
                <IconPlayerPlay size={40} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-red-500 p-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Failures
                </p>
                <p className="text-2xl font-bold mt-2">2.3K</p>
                <p className="text-xs text-red-600 font-semibold mt-2">
                  ↑ 8% from last week
                </p>
              </div>
              <div className="text-red-500/20 ml-2">
                <IconExclamationCircle size={40} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-green-500 p-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Total Success
                </p>
                <p className="text-2xl font-bold mt-2">3.5K</p>
                <p className="text-xs text-green-600 font-semibold mt-2">
                  ↑ 15% from last week
                </p>
              </div>
              <div className="text-green-500/20 ml-2">
                <IconCircleCheck size={40} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-l-4 border-l-amber-500 p-4">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <p className="text-xs text-muted-foreground font-medium">
                  Running Tasks
                </p>
                <p className="text-2xl font-bold mt-2">4</p>
                <p className="text-xs text-amber-600 font-semibold mt-2">
                  Currently active
                </p>
              </div>
              <div className="text-amber-500/20 ml-2">
                <IconTreadmill size={40} />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts and Tables - Full Width */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Execution Trend Chart - Wider */}
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-xl font-semibold">Monthly Execution Trend</h3>
            <p className="text-xs text-muted-foreground mt-1">
              Graph showing the trend of job executions over the past month.
            </p>
            <div className="w-full h-96 mt-10">
              <ChartAreaLegend />
            </div>
          </CardContent>
        </Card>

        {/* Failure Summary - Compact List */}
        <Card>
          <CardContent className="p-4 h-full flex flex-col">
            <div className="flex flex-col mb-3">
              <h3 className="text-xl font-semibold">Failures by Reason Code</h3>
              <p className="text-xs text-muted-foreground mt-1">
                Job failures categorized by reason codes with counts.
              </p>
            </div>
            <div className="flex-1 overflow-y-auto pr-2 [&::-webkit-scrollbar]:w-1 [&::-webkit-scrollbar-track]:bg-transparent [&::-webkit-scrollbar-thumb]:bg-muted [&::-webkit-scrollbar-thumb]:rounded-full">
              <FailureDashboardTable data={failureData.slice(0, 10)} />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom Section - Job Queue & Top Failures */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <Card className="lg:col-span-2">
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-4">
              Top Failure Categories
            </h3>
            <div className="space-y-3">
              {failureData
                .filter((f) => f.count && f.count > 0)
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
                          {item.count}
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

        <Card>
          <CardContent className="p-4">
            <h3 className="text-sm font-semibold mb-4">Quick Stats</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Avg Execution Time
                </span>
                <span className="text-sm font-semibold">2m 34s</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Last Alert
                </span>
                <span className="text-sm font-semibold">12m ago</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Active Jobs
                </span>
                <span className="text-sm font-semibold">4 / 25</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">Uptime</span>
                <span className="text-sm font-semibold text-green-600">
                  99.8%
                </span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-muted/50">
                <span className="text-sm text-muted-foreground">
                  Scheduled Today
                </span>
                <span className="text-sm font-semibold">156</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}
