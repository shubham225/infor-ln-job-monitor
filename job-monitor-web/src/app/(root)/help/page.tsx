import { IconBrandGithub } from "@tabler/icons-react";
import {
  ArrowRight,
  Terminal,
  Server,
  MonitorSmartphone,
  Mail,
  Search,
  Globe2,
  Plug,
  Clock,
} from "lucide-react";

type Status = "SUCCESS" | "RUNNING" | "FAILED";

const STATUS_STYLES: Record<Status, { dot: string; text: string }> = {
  SUCCESS: { dot: "bg-[#1F9D63]", text: "text-[#1F9D63]" },
  RUNNING: { dot: "bg-[#B5730B]", text: "text-[#B5730B]" },
  FAILED: { dot: "bg-[#D6393F]", text: "text-[#D6393F]" },
};

function StatusPill({ status }: { status: Status }) {
  const s = STATUS_STYLES[status];
  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-[11px] tracking-wide">
      <span
        className={`h-1.5 w-1.5 rounded-full ${s.dot} ${
          status === "RUNNING" ? "motion-safe:animate-pulse" : ""
        }`}
      />
      <span className={s.text}>{status}</span>
    </span>
  );
}

const TICKER_ROWS: {
  job: string;
  company: string;
  status: Status;
  host: string;
  when: string;
}[] = [
  {
    job: "JOB001",
    company: "COMP01",
    status: "SUCCESS",
    host: "ERP-SERVER-01",
    when: "2 min ago",
  },
  {
    job: "JOB014",
    company: "COMP02",
    status: "RUNNING",
    host: "ERP-SERVER-02",
    when: "started 4 min ago",
  },
  {
    job: "JOB007",
    company: "COMP01",
    status: "FAILED",
    host: "ERP-SERVER-01",
    when: "11 min ago",
  },
  {
    job: "JOB022",
    company: "COMP03",
    status: "SUCCESS",
    host: "ERP-SERVER-03",
    when: "18 min ago",
  },
  {
    job: "JOB003",
    company: "COMP01",
    status: "SUCCESS",
    host: "ERP-SERVER-01",
    when: "26 min ago",
  },
];

const MODULES: { name: string; lang: string; desc: string }[] = [
  {
    name: "job-monitor-client",
    lang: "Rust",
    desc: "Modern CLI for registering jobs and pushing results.",
  },
  {
    name: "job-monitor-common",
    lang: "Java",
    desc: "Shared models and utilities used across modules.",
  },
  {
    name: "job-monitor-core",
    lang: "Java",
    desc: "Core domain logic — job history, SLA rules, alert evaluation.",
  },
  {
    name: "job-monitor-server",
    lang: "Java",
    desc: "Spring Boot backend that stores history and sends notifications.",
  },
  {
    name: "job-monitor-web",
    lang: "TypeScript",
    desc: "Next.js UI for status, history, and configuration.",
  },
];

const CAPABILITIES: {
  icon: typeof Server;
  title: string;
  desc: string;
}[] = [
  {
    icon: Server,
    title: "Live job status",
    desc: "Every registered job reports RUNNING, SUCCESS, or FAILED as it happens, across every host and company you monitor.",
  },
  {
    icon: Mail,
    title: "Failure & SLA alerts",
    desc: "Set an alert rule once. Get an email the moment a job fails or runs past its expected duration — not the next morning.",
  },
  {
    icon: Clock,
    title: "Execution history",
    desc: "Start and end times for every run are kept, so average runtime and schedule drift are easy to spot at a glance.",
  },
  {
    icon: Search,
    title: "Error log search",
    desc: "Filter historical error messages by job code and company to go straight to the run that broke.",
  },
  {
    icon: Globe2,
    title: "Multi-company, multi-host",
    desc: "Follow the same job code across ERP companies and physical hosts from a single dashboard.",
  },
  {
    icon: Plug,
    title: "Bring your own scheduler",
    desc: "Push results from whatever launches your jobs today, using the CLI or the ERP integration contract directly.",
  },
];

export default function AboutJobMonitor() {
  return (
    <div
      className="text-[#14181F]"
      style={
        {
          "--font-display": "var(--font-display, inherit)",
          "--font-mono": "var(--font-mono, ui-monospace, monospace)",
        } as React.CSSProperties
      }
    >
      <div className="mx-auto max-w-7xl px-6 py-10 md:px-5">
        {/* ---------------- Hero ---------------- */}
        <section className="mb-24">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.2em] text-[#4C63D2]">
            Open source · built for Infor&nbsp;LN
          </p>
          <h1
            className="max-w-3xl text-4xl font-semibold leading-[1.1] tracking-tight md:text-5xl"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Know the moment a batch job fails, not the moment it&apos;s too
            late.
          </h1>
          <p className="mt-5 max-w-xl text-[15px] leading-relaxed text-[#5B6472]">
            Job Monitor watches your Infor LN ERP jobs and reports every run the
            instant it finishes — success, failure, or a breached SLA — so
            nobody has to comb through logs after the fact.
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a
              href="https://github.com/shubham225/infor-ln-job-monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-md bg-[#14181F] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#262c37]"
            >
              <IconBrandGithub className="h-4 w-4" />
              View on GitHub
            </a>
            <a
              href="#modules"
              className="inline-flex items-center gap-2 rounded-md border border-[#D8DCE3] px-4 py-2 text-sm font-medium text-[#14181F] transition-colors hover:border-[#b9c0cb] hover:bg-white"
            >
              See how it&apos;s built
              <ArrowRight className="h-3.5 w-3.5" />
            </a>
          </div>

          {/* Live-look status ticker — the signature element */}
          <div className="mt-12 overflow-hidden rounded-lg border border-[#E2E5EA] bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-[#E2E5EA] bg-[#FAFBFC] px-4 py-2.5">
              <div className="flex items-center gap-2 font-mono text-[11px] text-[#6B7280]">
                <Terminal className="h-3.5 w-3.5" />
                job-monitor · live status
              </div>
              <div className="flex gap-1.5">
                <span className="h-2 w-2 rounded-full bg-[#D6393F]/30" />
                <span className="h-2 w-2 rounded-full bg-[#B5730B]/30" />
                <span className="h-2 w-2 rounded-full bg-[#1F9D63]/30" />
              </div>
            </div>

            <div className="min-w-full overflow-x-auto">
              <table className="w-full min-w-[560px] border-collapse font-mono text-[12px]">
                <thead>
                  <tr className="text-left text-[#9AA2AF]">
                    <th className="px-4 py-2 font-normal">Job</th>
                    <th className="px-4 py-2 font-normal">Company</th>
                    <th className="px-4 py-2 font-normal">Status</th>
                    <th className="px-4 py-2 font-normal">Host</th>
                    <th className="px-4 py-2 font-normal">Last run</th>
                  </tr>
                </thead>
                <tbody>
                  {TICKER_ROWS.map((row, i) => (
                    <tr
                      key={row.job}
                      className={
                        i !== TICKER_ROWS.length - 1
                          ? "border-b border-[#EEF0F3]"
                          : ""
                      }
                    >
                      <td className="px-4 py-2.5 text-[#14181F]">{row.job}</td>
                      <td className="px-4 py-2.5 text-[#6B7280]">
                        {row.company}
                      </td>
                      <td className="px-4 py-2.5">
                        <StatusPill status={row.status} />
                      </td>
                      <td className="px-4 py-2.5 text-[#6B7280]">{row.host}</td>
                      <td className="px-4 py-2.5 text-[#9AA2AF]">{row.when}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>

        {/* ---------------- Architecture ---------------- */}
        <section className="mb-24">
          <h2
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            How it fits together
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B7280]">
            Three pieces, each doing one job well.
          </p>

          <div className="mt-8 grid grid-cols-1 gap-0 md:grid-cols-3">
            {[
              {
                icon: Terminal,
                title: "Client",
                sub: "job-monitor-client",
                desc: "Register jobs and report each run's outcome back to the server.",
              },
              {
                icon: Server,
                title: "Server",
                sub: "job-monitor-server · core · common",
                desc: "Stores job history, evaluates alert rules, and sends the notification.",
              },
              {
                icon: MonitorSmartphone,
                title: "Web UI",
                sub: "job-monitor-web",
                desc: "Visualizes status and history, and manages configuration.",
              },
            ].map((node, i, arr) => (
              <div key={node.title} className="flex items-stretch">
                <div className="flex-1 rounded-lg border border-[#E2E5EA] bg-white p-5 shadow-sm">
                  <node.icon className="h-4 w-4 text-[#4C63D2]" />
                  <h3 className="mt-3 text-sm font-semibold text-[#14181F]">
                    {node.title}
                  </h3>
                  <p className="mt-1 font-mono text-[10px] text-[#9AA2AF]">
                    {node.sub}
                  </p>
                  <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">
                    {node.desc}
                  </p>
                </div>
                {i !== arr.length - 1 && (
                  <div className="hidden w-10 flex-none items-center justify-center md:flex">
                    <ArrowRight className="h-4 w-4 text-[#C7CDD6]" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Modules directory ---------------- */}
        <section id="modules" className="mb-24">
          <h2
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Modules
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B7280]">
            A multi-module repo — pull in only what you need.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-[#E2E5EA] shadow-sm">
            {MODULES.map((mod, i) => (
              <div
                key={mod.name}
                className={`flex flex-col gap-1 px-4 py-3 sm:flex-row sm:items-center sm:gap-4 ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FAFBFC]"
                } ${i !== MODULES.length - 1 ? "border-b border-[#EEF0F3]" : ""}`}
              >
                <span className="font-mono text-[13px] text-[#14181F] sm:w-56 sm:flex-none">
                  {mod.name}
                </span>
                <span className="font-mono text-[10px] uppercase tracking-wide text-[#4C63D2] sm:w-24 sm:flex-none">
                  {mod.lang}
                </span>
                <span className="text-[13px] text-[#6B7280]">{mod.desc}</span>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Capabilities ---------------- */}
        <section className="mb-24">
          <h2
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            What it watches for you
          </h2>

          <div className="mt-8 grid grid-cols-1 gap-px overflow-hidden rounded-lg border border-[#E2E5EA] bg-[#E2E5EA] shadow-sm sm:grid-cols-2 lg:grid-cols-3">
            {CAPABILITIES.map((f) => (
              <div key={f.title} className="bg-white p-6">
                <f.icon className="h-4 w-4 text-[#4C63D2]" strokeWidth={1.75} />
                <h3 className="mt-4 text-[14px] font-semibold text-[#14181F]">
                  {f.title}
                </h3>
                <p className="mt-2 text-[13px] leading-relaxed text-[#6B7280]">
                  {f.desc}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* ---------------- Integration contract ---------------- */}
        <section className="mb-24">
          <h2
            className="text-xl font-semibold tracking-tight"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Talks to your ERP through one small contract
          </h2>
          <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#6B7280]">
            Put a thin middleware in front of Infor LN and shape its responses
            to this format — the rest of Job Monitor doesn&apos;t need to
            change.
          </p>

          <div className="mt-6 overflow-hidden rounded-lg border border-[#E2E5EA] bg-white shadow-sm">
            <div className="flex items-center gap-2 border-b border-[#E2E5EA] bg-[#FAFBFC] px-4 py-2.5 font-mono text-[11px] text-[#6B7280]">
              <Terminal className="h-3.5 w-3.5" />
              fetch-job-details.response.json
            </div>
            <pre className="overflow-x-auto px-4 py-4 font-mono text-[12px] leading-relaxed text-[#3A4150]">
              {`{
  "jobCode": "JOB001",
  "company": "COMP01",
  "hostDisplayName": "ERP-SERVER-01",
  "status": "RUNNING",
  "historyStatus": "SUCCESS",
  "jobStartedAt": "2026-07-02T10:15:00",
  "jobAverageRuntimeInSec": 210
}`}
            </pre>
          </div>
        </section>

        {/* ---------------- Footer / stack ---------------- */}
        <section className="border-t border-[#E2E5EA] pt-8">
          <div className="flex flex-col items-start justify-between gap-4 sm:flex-row sm:items-center">
            <p className="font-mono text-[11px] uppercase tracking-wide text-[#9AA2AF]">
              Java 17 · Spring Boot · Next.js · Tailwind · Rust CLI · MIT
              licensed
            </p>
            <a
              href="https://github.com/shubham225/infor-ln-job-monitor"
              className="inline-flex items-center gap-1.5 text-[13px] text-[#4C63D2] hover:underline"
            >
              <IconBrandGithub className="h-3.5 w-3.5" />
              shubham225/infor-ln-job-monitor
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
