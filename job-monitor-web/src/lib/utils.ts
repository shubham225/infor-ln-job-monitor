import { navData } from "@/config/nav-data";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getNavNameByPath(pathname: string) {
  // search in main navigation
  const main = navData.navMain.find(item => item.url === pathname);
  if (main) return main.title;

  // search in secondary navigation
  const secondary = navData.navSecondary.find(item => item.url === pathname);
  if (secondary) return secondary.title;

  // search in documents
  const doc = navData.documents.find(item => item.url === pathname);
  if (doc) return doc.name;

  // if index.html then its Dashboard
  if (pathname === "/index.html") return "Dashboard";

  return null; // not found
}

export function formatEnumLabel(value: string) {
  return value
    .split("_")
    .map((segment) =>
      segment.length > 0
        ? `${segment[0].toUpperCase()}${segment.slice(1).toLowerCase()}`
        : ""
    )
    .join(" ");
}

export const formatCompactNumber = (value: number) =>
  new Intl.NumberFormat("en", {
    notation: "compact",
    compactDisplay: "short",
    maximumFractionDigits: 1,
  }).format(value);

export function formatDuration(ms: number) {
  if (ms == null || Number.isNaN(ms)) {
    return "--";
  }

  const seconds = Math.floor(ms / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  if (days) {
    return `${days}d ${hours % 24}h`;
  }

  if (hours) {
    return `${hours}h ${minutes % 60}m`;
  }

  if (minutes) {
    return `${minutes}m ${seconds % 60}s`;
  }

  return `${seconds}s`;
}

export function formatLastAlert(dateTime: string): string {
  if (!dateTime) return "Never";

  const date = new Date(dateTime);
  const diffMs = Date.now() - date.getTime();

  const seconds = Math.floor(diffMs / 1000);

  if (seconds < 60) {
    return `${seconds}s ago`;
  }

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) {
    return `${minutes}m ${seconds % 60}s ago`;
  }

  const hours = Math.floor(minutes / 60);
  if (hours < 24) {
    return `${hours}h ${minutes % 60}m ago`;
  }

  const days = Math.floor(hours / 24);
  return `${days}d ${hours % 24}h ago`;
}