"use client";

import { useEffect, useMemo, useState } from "react";
import { IconTrash } from "@tabler/icons-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import {
  AddJobDialog,
  AddMessageDialog,
  AddStatusDialog,
} from "@/components/exclusions/add-exclusion-dialogs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  addExclusionJob,
  addExclusionJobStatus,
  addExclusionMessage,
  deleteExclusionJob,
  deleteExclusionJobStatus,
  deleteExclusionMessage,
  fetchExclusionJobStatuses,
  fetchExclusionJobs,
  fetchExclusionMessages,
} from "@/service/exclusion-service";
import {
  ExclusionJob,
  ExclusionJobStatus,
  ExclusionMessage,
} from "@/types/api";
import { ERPJobStatus } from "@/types/enums";

const availableStatuses = Object.values(ERPJobStatus) as ERPJobStatus[];

export default function ExclusionSettings() {
  const [messageExclusions, setMessageExclusions] = useState<ExclusionMessage[]>([]);
  const [jobExclusions, setJobExclusions] = useState<ExclusionJob[]>([]);
  const [statusExclusions, setStatusExclusions] = useState<ExclusionJobStatus[]>([]);
  const [selectedErrorHostName, setSelectedErrorHostName] = useState("");
  const [selectedJobHostName, setSelectedJobHostName] = useState("");
  const [selectedStatusHostName, setSelectedStatusHostName] = useState("");
  const [newErrorMessage, setNewErrorMessage] = useState("");
  const [newMessageHostName, setNewMessageHostName] = useState("");
  const [isMessageDialogOpen, setIsMessageDialogOpen] = useState(false);
  const [newJobHostName, setNewJobHostName] = useState("");
  const [newJobName, setNewJobName] = useState("");
  const [newJobCompany, setNewJobCompany] = useState("");
  const [isJobDialogOpen, setIsJobDialogOpen] = useState(false);
  const [newStatusHostName, setNewStatusHostName] = useState("");
  const [isStatusDialogOpen, setIsStatusDialogOpen] = useState(false);
  const [newStatus, setNewStatus] = useState<ERPJobStatus>(availableStatuses[0] ?? ERPJobStatus.UNKNOWN,);

  const errorServers = useMemo(
    () => Array.from(new Set(messageExclusions.map((item) => item.hostName))),
    [messageExclusions],
  );

  const jobServers = useMemo(
    () => Array.from(new Set(jobExclusions.map((item) => item.hostName))),
    [jobExclusions],
  );

  const statusServers = useMemo(
    () => Array.from(new Set(statusExclusions.map((item) => item.hostName))),
    [statusExclusions],
  );

  const selectedErrorMessages = useMemo(
    () =>
      messageExclusions.filter((item) => item.hostName === selectedErrorHostName),
    [messageExclusions, selectedErrorHostName],
  );

  const selectedJobItems = useMemo(
    () => jobExclusions.filter((item) => item.hostName === selectedJobHostName),
    [jobExclusions, selectedJobHostName],
  );

  const selectedStatusItems = useMemo(
    () =>
      statusExclusions.filter((item) => item.hostName === selectedStatusHostName),
    [statusExclusions, selectedStatusHostName],
  );

  useEffect(() => {
    if (!selectedErrorHostName && errorServers.length) {
      setSelectedErrorHostName(errorServers[0]);
    }
  }, [errorServers, selectedErrorHostName]);

  useEffect(() => {
    if (!selectedJobHostName && jobServers.length) {
      setSelectedJobHostName(jobServers[0]);
    }
  }, [jobServers, selectedJobHostName]);

  useEffect(() => {
    if (!selectedStatusHostName && statusServers.length) {
      setSelectedStatusHostName(statusServers[0]);
    }
  }, [statusServers, selectedStatusHostName]);

  useEffect(() => {
    const loadExclusions = async () => {
      try {
        const [messages, jobs, statuses] = await Promise.all([
          fetchExclusionMessages(),
          fetchExclusionJobs(),
          fetchExclusionJobStatuses(),
        ]);

        setMessageExclusions(messages);
        setJobExclusions(jobs);
        setStatusExclusions(statuses);

        setSelectedErrorHostName(
          (current) => current || messages[0]?.hostName || "",
        );
        setSelectedJobHostName((current) => current || jobs[0]?.hostName || "");
        setSelectedStatusHostName(
          (current) => current || statuses[0]?.hostName || "",
        );
      } catch (error) {
        console.error("Failed to load exclusion data:", error);
      }
    };

    loadExclusions();
  }, []);

  const handleMessageDialogOpenChange = (open: boolean) => {
    setIsMessageDialogOpen(open);
    if (open && selectedErrorHostName) {
      setNewMessageHostName(selectedErrorHostName);
    }
  };

  const handleJobDialogOpenChange = (open: boolean) => {
    setIsJobDialogOpen(open);
    if (open && selectedJobHostName) {
      setNewJobHostName(selectedJobHostName);
    }
  };

  const handleStatusDialogOpenChange = (open: boolean) => {
    setIsStatusDialogOpen(open);
    if (open && selectedStatusHostName) {
      setNewStatusHostName(selectedStatusHostName);
    }
  };

  async function addErrorMessage() {
    const value = newErrorMessage.trim();
    const hostName = newMessageHostName.trim();
    if (!value || !hostName) return;

    try {
      const newExclusionMessage: ExclusionMessage = {
        id: 0,
        hostName,
        message: value,
      };

      const createdMessage = await addExclusionMessage(newExclusionMessage);
      setMessageExclusions((current) => [...current, createdMessage]);
      setSelectedErrorHostName(createdMessage.hostName);
      setNewErrorMessage("");
      setNewMessageHostName("");
      setIsMessageDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion message:", error);
    }
  }

  async function deleteErrorMessage(id: number) {
    try {
      await deleteExclusionMessage(id);
      setMessageExclusions((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete exclusion message:", error);
    }
  }

  async function addJobExclusion() {
    const hostName = newJobHostName.trim();
    const job = newJobName.trim();
    const company = newJobCompany.trim();
    if (!hostName || !job || !company) return;

    try {
      const newJobExclusion: ExclusionJob = {
        id: 0,
        hostName,
        jobName: job,
        company,
      };

      const createdJob = await addExclusionJob(newJobExclusion);
      setJobExclusions((current) => [...current, createdJob]);
      setSelectedJobHostName(createdJob.hostName);
      setNewJobHostName("");
      setNewJobName("");
      setNewJobCompany("");
      setIsJobDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion job:", error);
    }
  }

  async function deleteJobExclusion(id: number) {
    try {
      await deleteExclusionJob(id);
      setJobExclusions((current) => current.filter((item) => item.id !== id));
    } catch (error) {
      console.error("Failed to delete exclusion job:", error);
    }
  }

  async function addStatusExclusion() {
    const hostName = newStatusHostName.trim();
    if (!newStatus || !hostName) return;

    try {
      const newStatusExclusion: ExclusionJobStatus = {
        id: 0,
        hostName,
        status: newStatus,
      };

      const createdStatus = await addExclusionJobStatus(newStatusExclusion);
      setStatusExclusions((current) => [...current, createdStatus]);
      setSelectedStatusHostName(createdStatus.hostName);
      setNewStatusHostName("");
      setIsStatusDialogOpen(false);
    } catch (error) {
      console.error("Failed to add exclusion status:", error);
    }
  }

  async function deleteStatusExclusion(id: number) {
    try {
      await deleteExclusionJobStatus(id);
      setStatusExclusions((current) =>
        current.filter((item) => item.id !== id),
      );
    } catch (error) {
      console.error("Failed to delete exclusion status:", error);
    }
  }

  return (
    <div className="space-y-6">
      <div className="grid gap-6 xl:grid-cols-3">
        <ExclusionTablePanel
          title="Error Message Exclusions"
          description="Exclude error phrases produced by a selected server."
          servers={errorServers}
          selectedServer={selectedErrorHostName}
          onSelectServer={setSelectedErrorHostName}
          columns={["Message", "Action"]}
          addRow={
            <AddMessageDialog
              open={isMessageDialogOpen}
              onOpenChange={handleMessageDialogOpenChange}
              hostName={newMessageHostName}
              onHostNameChange={setNewMessageHostName}
              message={newErrorMessage}
              onMessageChange={setNewErrorMessage}
              onSubmit={addErrorMessage}
            />
          }
          rows={selectedErrorMessages.map((message) => ({
            id: `error-${message.id}`,
            cells: [message.message],
            action: () => deleteErrorMessage(message.id),
          }))}
        />

        <ExclusionTablePanel
          title="Job Exclusions"
          description="Skip specific jobs or companies on a chosen server."
          servers={jobServers}
          selectedServer={selectedJobHostName}
          onSelectServer={setSelectedJobHostName}
          columns={["Job", "Company", "Action"]}
          addRow={
            <AddJobDialog
              open={isJobDialogOpen}
              onOpenChange={handleJobDialogOpenChange}
              hostName={newJobHostName}
              onHostNameChange={setNewJobHostName}
              jobName={newJobName}
              onJobNameChange={setNewJobName}
              company={newJobCompany}
              onCompanyChange={setNewJobCompany}
              onSubmit={addJobExclusion}
            />
          }
          rows={selectedJobItems.map((item) => ({
            id: `job-${item.id}`,
            cells: [item.jobName, item.company],
            action: () => deleteJobExclusion(item.id),
          }))}
        />

        <ExclusionTablePanel
          title="Job Status Exclusions"
          description="Ignore alerts for specific status values on the selected server."
          servers={statusServers}
          selectedServer={selectedStatusHostName}
          onSelectServer={setSelectedStatusHostName}
          columns={["Status", "Action"]}
          addRow={
            <AddStatusDialog
              open={isStatusDialogOpen}
              onOpenChange={handleStatusDialogOpenChange}
              hostName={newStatusHostName}
              onHostNameChange={setNewStatusHostName}
              status={newStatus}
              onStatusChange={setNewStatus}
              onSubmit={addStatusExclusion}
            />
          }
          rows={selectedStatusItems.map((item) => ({
            id: `status-${item.id}`,
            cells: [item.status],
            action: () => deleteStatusExclusion(item.id),
          }))}
        />
      </div>
    </div>
  );
}

function ExclusionTablePanel({
  title,
  description,
  servers,
  selectedServer,
  onSelectServer,
  columns,
  addRow,
  rows,
}: {
  title: string;
  description: string;
  servers: string[];
  selectedServer: string;
  onSelectServer: (value: string) => void;
  columns: string[];
  addRow: React.ReactNode;
  rows: {
    id: string;
    cells: string[];
    action: () => void;
  }[];
}) {
  return (
    <Card className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
      <CardHeader className="space-y-4 border-b border-slate-200 px-6 py-2">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold text-slate-900 flex justify-between">
            <div className="">{title}</div>
            <div className="">{addRow}</div>
          </CardTitle>
          <p className="text-sm leading-6 text-slate-600">{description}</p>
        </div>
        <div className="grid gap-3 sm:grid-cols-[1fr_auto] sm:items-center">
          <Select value={selectedServer} onValueChange={onSelectServer}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Choose server" />
            </SelectTrigger>
            <SelectContent>
              {servers.map((server) => (
                <SelectItem key={server} value={server}>
                  {server}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="rounded-lg bg-slate-50 px-4 py-2 text-sm text-slate-600">
            {rows.length} exclusion{rows.length === 1 ? "" : "s"}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-5 px-6">
        <div className="overflow-y-auto max-h-80 rounded-lg border border-slate-200 bg-white shadow-sm">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-slate-100">
                {columns.map((column, index) => (
                  <TableHead
                    key={index}
                    className="sticky top-0 z-10 bg-slate-100 px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500"
                  >
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow
                    key={row.id}
                    className="border-b last:border-b-0 hover:bg-slate-50"
                  >
                    {row.cells.map((cell, index) => (
                      <TableCell
                        key={index}
                        className="px-2 py-1 text-sm text-slate-700"
                      >
                        {cell}
                      </TableCell>
                    ))}
                    <TableCell className="px-2 py-1 text-right">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="text-slate-500 hover:text-destructive"
                        onClick={row.action}
                      >
                        <IconTrash />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="px-4 py-10 text-center text-sm text-slate-500"
                  >
                    No exclusions defined for this server.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
