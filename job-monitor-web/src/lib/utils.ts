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

  return null; // not found
}