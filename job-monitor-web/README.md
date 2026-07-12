# Job Monitor Web ![Frontend](https://img.shields.io/badge/{_}-Frontend-38BDF8?style=flat-square)

![Next.js](https://img.shields.io/badge/Framework-Next.js-000?logo=nextdotjs&logoColor=white&style=flat)
![Tailwind CSS](https://img.shields.io/badge/Styling-Tailwind_CSS-38bdf8?logo=tailwindcss&logoColor=white&style=flat)
![shadcn/ui](https://img.shields.io/badge/UI-shadcn/ui-9f7aea?logo=shadcnui&style=flat)
![Yarn](https://img.shields.io/badge/Package_Manager-Yarn-2C8EBB?logo=yarn&style=flat)
![License](https://img.shields.io/github/license/shubham225/online-coding-platform-frontend?style=flat)

`job-monitor-web` is a modern web UI for the Job Monitor platform, built with Next.js, React, and TypeScript.  
It provides dashboards, job status views, and configuration screens backed by `job-monitor-server`.

---

## Features

- Real-time overview of monitored Infor LN ERP jobs
- Job detail pages with execution history and failure reasons
- Filtering and search across jobs and executions
- Form-driven configuration for alerts and job registration

---

## Getting Started

### Prerequisites

- **Node.js** (LTS recommended)
- **npm**, **pnpm**, **yarn**, or **bun**
- A running instance of `job-monitor-server`

### Install Dependencies

From the repository root:

```bash
cd job-monitor-web
yarn install
```

### Run the Development Server

```bash
yarn dev
```

Open `http://localhost:3000` in your browser.

---

## Environment Configuration

The UI typically needs to know where `job-monitor-server` is running.  
Configure this via environment variables (for example, `.env.local`):

```env
NEXT_PUBLIC_JOB_MONITOR_SERVER_URL=http://localhost:8080
```

Refer to your actual configuration in the codebase and deployment manifests for the authoritative list of supported variables.

---

## Production Build

Create an optimized production build:

```bash
yarn build
```

Then start the production server:

```bash
yarn start
```

You can also deploy this app to platforms like Vercel, Netlify, or any Node-capable hosting provider.

---

## Tech Stack

- **Next.js 16** (App Router)
- **React 19**
- **TypeScript**
- **Tailwind CSS 4**
- **Radix UI** primitives
- **React Hook Form** + **Zod** for forms and validation
- **TanStack Table** and **Recharts** for tables and charts

---

## Related Modules

- `job-monitor-server` – REST backend for monitoring and alerts
- `job-monitor-core` / `job-monitor-common` – domain and shared logic
- `job-monitor-client` – Client for automation and integration

