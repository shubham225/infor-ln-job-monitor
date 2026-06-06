import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { IconMenu2, IconPlus, IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function ExclusionSettings() {
  const errorExclusionList: string[][] = [];
  const jobExclusionList: string[][] = [
    ["Job_123", "100"],
    ["Job_456", "500"],
    ["Job_789", "200"],
  ];
  const statusExclusionList: string[][] = [
    ["PENDING"],
    ["CANCELED"],
    ["FAILED"],
  ];
  const errorExclusionHeaders: string[] = ["Message"];
  const jobExclusionHeaders: string[] = ["Job", "Company"];
  const statusExclusionHeaders: string[] = ["Status"];

  return (
    <div className="space-y-6">
      <section className="rounded-3xl border border-slate-200 bg-slate-50/80 p-6 shadow-sm">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h1 className="text-2xl font-semibold tracking-tight">Alert Exclusion Rules</h1>
            <p className="mt-2 max-w-2xl text-sm text-muted-foreground">
              Configure which error messages, jobs, or job statuses should be excluded from alert emails.
            </p>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
            <Button variant="secondary" className="h-10 px-4">
              Import exclusions
            </Button>
            <Button className="h-10 px-4">
              Export current list
            </Button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-3">
        <ExclusionCard
          title="Error Message Exclusion"
          description="Ignore alert triggers for specific error message content."
          headerLabels={errorExclusionHeaders}
          data={errorExclusionList}
          emptyStateLabel="Add messages to ignore from alerts"
        />
        <ExclusionCard
          title="Job Exclusion"
          description="Skip alerts for specific jobs or job groups."
          headerLabels={jobExclusionHeaders}
          data={jobExclusionList}
          emptyStateLabel="Add job names to ignore from alerts"
        />
        <ExclusionCard
          title="Job Status Exclusion"
          description="Ignore alerts when a job completes with a particular status."
          headerLabels={statusExclusionHeaders}
          data={statusExclusionList}
          emptyStateLabel="Add statuses to ignore from alerts"
        />
      </div>
    </div>
  );
}

function ExclusionCard({
  title,
  description,
  headerLabels,
  data,
  emptyStateLabel,
}: {
  title: string;
  description: string;
  headerLabels: string[];
  data: string[][];
  emptyStateLabel: string;
}) {
  return (
    <Card className="flex h-full flex-col overflow-hidden rounded-3xl border border-slate-200 shadow-sm">
      <CardHeader className="pb-3">
        <div className="flex flex-col gap-3">
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle className="text-base font-semibold">{title}</CardTitle>
              <p className="mt-1 text-sm text-muted-foreground">{description}</p>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="border border-slate-200">
                <IconPlus />
              </Button>
              <Button variant="ghost" size="icon" className="border border-slate-200">
                <IconMenu2 />
              </Button>
            </div>
          </div>
          <div className="rounded-2xl bg-slate-100 px-3 py-2 text-xs text-muted-foreground">
            {data.length} exclusion{data.length === 1 ? '' : 's'} configured
          </div>
        </div>
      </CardHeader>

      <CardContent className="flex-1 p-0">
        <div className="h-80 overflow-hidden border-t border-slate-200">
          <ExclusionTable
            headerLabels={headerLabels}
            data={data}
            emptyStateLabel={emptyStateLabel}
          />
        </div>
      </CardContent>
    </Card>
  );
}

function ExclusionTable({
  headerLabels,
  data,
  emptyStateLabel,
}: {
  headerLabels: string[];
  data: string[][];
  emptyStateLabel: string;
}) {
  return (
    <div className="h-full overflow-auto bg-white">
      <Table>
        <TableHeader>
          <TableRow className="sticky top-0 z-10 bg-slate-50">
            {headerLabels.map((item, index) => (
              <TableHead key={index} className="h-11 rounded-none text-xs font-semibold uppercase tracking-wide text-slate-500">
                {item}
              </TableHead>
            ))}
            <TableHead className="h-11 rounded-none text-right text-xs font-semibold uppercase tracking-wide text-slate-500">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data.map((row, rowIndex) => (
            <TableRow key={rowIndex} className="border-b last:border-b-0 hover:bg-slate-50">
              {row.map((cell, cellIndex) => (
                <TableCell
                  key={cellIndex}
                  className="py-4 text-sm font-medium text-slate-700"
                >
                  {cell}
                </TableCell>
              ))}
              <TableCell className="py-4 text-right">
                <Button
                  size="icon"
                  variant="ghost"
                  className="text-slate-500 hover:text-destructive"
                >
                  <IconTrash />
                </Button>
              </TableCell>
            </TableRow>
          ))}

          {data.length === 0 && (
            <TableRow>
              <TableCell
                colSpan={headerLabels.length + 1}
                className="py-12 text-center text-sm text-slate-500"
              >
                {emptyStateLabel}
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
