import StatCard from "@/components/stat-card";
import { Button } from "@/components/ui/button";
import {
  IconArrowsDiagonal,
  IconCircleCheck,
  IconExclamationCircle,
  IconExternalLink,
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
import StatCardCompact from "@/components/stat-card-compact";
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
    <main className="p-2 space-y-1">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-semibold"></h1>
        <div className="flex gap-2">
          <Button variant="ghost" size="icon">
            <IconReload />
          </Button>
          <Button variant="ghost" size="icon">
            <IconArrowsDiagonal />
          </Button>
          <Button variant="ghost" size="icon">
            <IconMenu2 />
          </Button>
        </div>
      </div>
      <div className="flex flex-1 flex-col gap-4">
        <Card className="p-1">
          <CardContent className="p-1">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-0">
              <StatCardCompact
                bordered
                title="Total Runs"
                value="5.8K"
                icon={IconPlayerPlay}
              />
              <StatCardCompact
                bordered
                title="Total Failures"
                value="2.3K"
                icon={IconExclamationCircle}
              />
              <StatCardCompact
                bordered
                title="Total Success"
                value="3.5K"
                icon={IconCircleCheck}
              />
              <StatCardCompact
                title="Running Tasks"
                value="4"
                icon={IconTreadmill}
              />
            </div>
          </CardContent>
        </Card>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
          <Card className="p-0 h-[400px]">
            <CardContent className="p-0">
              <div className="py-2 px-3">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-medium text-muted-foreground">
                    Failure Summary
                  </h3>
                  <Button variant="ghost" className="flex text-xs font-normal text-muted-foreground gap-1 items-center">
                    View Details <IconExternalLink size={14} />{" "}
                  </Button>
                </div>
              </div>
              <div>
                <FailureDashboardTable data={failureData} />
              </div>
            </CardContent>
          </Card>
          <div className="rounded-lg">
            <ChartAreaLegend />
          </div>
        </div>
      </div>
    </main>
  );
}
