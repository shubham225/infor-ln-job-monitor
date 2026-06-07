"use client"

import { useMemo, useState } from "react"
import { IconPlus, IconTrash } from "@tabler/icons-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card"
import { Input } from "./ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table"

type ErrorServer = {
  server: string
  exclusions: string[]
}

type JobExclusion = {
  job: string
  company: string
}

type JobServer = {
  server: string
  exclusions: JobExclusion[]
}

type StatusServer = {
  server: string
  statuses: string[]
}

const defaultErrorServers: ErrorServer[] = [
  {
    server: "Server A",
    exclusions: ["Timeout exceeded", "Invalid response format"],
  },
  {
    server: "Server B",
    exclusions: ["Disk full", "Null pointer error"],
  },
]

const defaultJobServers: JobServer[] = [
  {
    server: "Server A",
    exclusions: [
      { job: "InvoiceSync", company: "Northwind" },
      { job: "PayrollUpdate", company: "Contoso" },
    ],
  },
  {
    server: "Server B",
    exclusions: [{ job: "InventoryRefresh", company: "Fabrikam" }],
  },
]

const defaultStatusServers: StatusServer[] = [
  {
    server: "Server A",
    statuses: ["FAILED", "CANCELED"],
  },
  {
    server: "Server B",
    statuses: ["PENDING", "SKIPPED"],
  },
]

const availableStatuses = [
  "PENDING",
  "RUNNING",
  "FAILED",
  "CANCELED",
  "SUCCESS",
  "SKIPPED",
]

export default function ExclusionSettings() {
  const [errorServers, setErrorServers] = useState(defaultErrorServers)
  const [jobServers, setJobServers] = useState(defaultJobServers)
  const [statusServers, setStatusServers] = useState(defaultStatusServers)
  const [selectedErrorServer, setSelectedErrorServer] = useState(defaultErrorServers[0].server)
  const [selectedJobServer, setSelectedJobServer] = useState(defaultJobServers[0].server)
  const [selectedStatusServer, setSelectedStatusServer] = useState(defaultStatusServers[0].server)
  const [newErrorMessage, setNewErrorMessage] = useState("")
  const [newJobName, setNewJobName] = useState("")
  const [newJobCompany, setNewJobCompany] = useState("")
  const [newStatus, setNewStatus] = useState(availableStatuses[0])

  const selectedError = useMemo(
    () => errorServers.find((item) => item.server === selectedErrorServer),
    [errorServers, selectedErrorServer]
  )

  const selectedJob = useMemo(
    () => jobServers.find((item) => item.server === selectedJobServer),
    [jobServers, selectedJobServer]
  )

  const selectedStatus = useMemo(
    () => statusServers.find((item) => item.server === selectedStatusServer),
    [statusServers, selectedStatusServer]
  )

  function addErrorMessage() {
    const value = newErrorMessage.trim()
    if (!value) return

    setErrorServers((current) =>
      current.map((item) =>
        item.server === selectedErrorServer
          ? { ...item, exclusions: [...item.exclusions, value] }
          : item
      )
    )
    setNewErrorMessage("")
  }

  function deleteErrorMessage(index: number) {
    setErrorServers((current) =>
      current.map((item) =>
        item.server === selectedErrorServer
          ? { ...item, exclusions: item.exclusions.filter((_, idx) => idx !== index) }
          : item
      )
    )
  }

  function addJobExclusion() {
    const job = newJobName.trim()
    const company = newJobCompany.trim()
    if (!job || !company) return

    setJobServers((current) =>
      current.map((item) =>
        item.server === selectedJobServer
          ? { ...item, exclusions: [...item.exclusions, { job, company }] }
          : item
      )
    )
    setNewJobName("")
    setNewJobCompany("")
  }

  function deleteJobExclusion(index: number) {
    setJobServers((current) =>
      current.map((item) =>
        item.server === selectedJobServer
          ? { ...item, exclusions: item.exclusions.filter((_, idx) => idx !== index) }
          : item
      )
    )
  }

  function addStatusExclusion() {
    if (!newStatus) return

    setStatusServers((current) =>
      current.map((item) =>
        item.server === selectedStatusServer
          ? { ...item, statuses: [...item.statuses, newStatus] }
          : item
      )
    )
  }

  function deleteStatusExclusion(index: number) {
    setStatusServers((current) =>
      current.map((item) =>
        item.server === selectedStatusServer
          ? { ...item, statuses: item.statuses.filter((_, idx) => idx !== index) }
          : item
      )
    )
  }

  return (
    <div className="space-y-6">

      <div className="grid gap-6 xl:grid-cols-3">
        <ExclusionTablePanel
          title="Error Message Exclusions"
          description="Exclude error phrases produced by a selected server."
          servers={errorServers.map((item) => item.server)}
          selectedServer={selectedErrorServer}
          onSelectServer={setSelectedErrorServer}
          columns={["Message", "Action"]}
          addRow={
            <div className="flex flex-col gap-3 sm:flex-col">
              <Input
                value={newErrorMessage}
                onChange={(event) => setNewErrorMessage(event.target.value)}
                placeholder="Enter error message fragment"
              />
              <Button className="min-w-[11rem]" onClick={addErrorMessage}>
                <IconPlus /> Add message
              </Button>
            </div>
          }
          rows={
            selectedError?.exclusions.map((message, index) => ({
              id: `${selectedErrorServer}-error-${index}`,
              cells: [message],
              action: () => deleteErrorMessage(index),
            })) ?? []
          }
        />

        <ExclusionTablePanel
          title="Job Exclusions"
          description="Skip specific jobs or companies on a chosen server."
          servers={jobServers.map((item) => item.server)}
          selectedServer={selectedJobServer}
          onSelectServer={setSelectedJobServer}
          columns={["Job", "Company", "Action"]}
          addRow={
            <div className="grid gap-3 sm:grid-cols-2">
              <Input
                value={newJobName}
                onChange={(event) => setNewJobName(event.target.value)}
                placeholder="Job name"
              />
              <Input
                value={newJobCompany}
                onChange={(event) => setNewJobCompany(event.target.value)}
                placeholder="Company name"
              />
              <Button className="sm:col-span-2" onClick={addJobExclusion}>
                <IconPlus /> Add job exclusion
              </Button>
            </div>
          }
          rows={
            selectedJob?.exclusions.map((item, index) => ({
              id: `${selectedJobServer}-job-${index}`,
              cells: [item.job, item.company],
              action: () => deleteJobExclusion(index),
            })) ?? []
          }
        />

        <ExclusionTablePanel
          title="Job Status Exclusions"
          description="Ignore alerts for specific status values on the selected server."
          servers={statusServers.map((item) => item.server)}
          selectedServer={selectedStatusServer}
          onSelectServer={setSelectedStatusServer}
          columns={["Status", "Action"]}
          addRow={
            <div className="grid gap-3">
              <Select value={newStatus} onValueChange={setNewStatus}>
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  {availableStatuses.map((status) => (
                    <SelectItem key={status} value={status}>
                      {status}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button onClick={addStatusExclusion}>
                <IconPlus /> Add status
              </Button>
            </div>
          }
          rows={
            selectedStatus?.statuses.map((status, index) => ({
              id: `${selectedStatusServer}-status-${index}`,
              cells: [status],
              action: () => deleteStatusExclusion(index),
            })) ?? []
          }
        />
      </div>
    </div>
  )
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
  title: string
  description: string
  servers: string[]
  selectedServer: string
  onSelectServer: (value: string) => void
  columns: string[]
  addRow: React.ReactNode
  rows: {
    id: string
    cells: string[]
    action: () => void
  }[]
}) {
  return (
    <Card className="overflow-hidden rounded-lg border border-slate-200 bg-white shadow-lg">
      <CardHeader className="space-y-4 border-b border-slate-200 px-6 py-2">
        <div className="space-y-2">
          <CardTitle className="text-xl font-semibold text-slate-900">{title}</CardTitle>
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
        <div className="rounded-lg border border-slate-200 bg-slate-50 p-4">{addRow}</div>
      </CardHeader>
      <CardContent className="space-y-5 px-6">
        <div className="overflow-x-auto rounded-lg border border-slate-200 bg-white shadow-sm">
          <Table className="min-w-full">
            <TableHeader>
              <TableRow className="bg-slate-100">
                {columns.map((column, index) => (
                  <TableHead key={index} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-slate-500">
                    {column}
                  </TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {rows.length > 0 ? (
                rows.map((row) => (
                  <TableRow key={row.id} className="border-b last:border-b-0 hover:bg-slate-50">
                    {row.cells.map((cell, index) => (
                      <TableCell key={index} className="px-4 py-4 text-sm text-slate-700">
                        {cell}
                      </TableCell>
                    ))}
                    <TableCell className="px-4 py-4 text-right">
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
                  <TableCell colSpan={columns.length} className="px-4 py-10 text-center text-sm text-slate-500">
                    No exclusions defined for this server.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}
