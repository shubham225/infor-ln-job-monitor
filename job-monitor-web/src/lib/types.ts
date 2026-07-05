export type CategoryTag = "B2B" | "B2C" | "Marketplace" | "Technology";

export interface Company {
  id: string;
  name: string;
  logoUrl?: string;
  logoFallback: string;
  logoColor: string; // tailwind bg color class for the fallback avatar
  categories: CategoryTag[];
  lastInteraction: string | null; // null => "No contact"
  domain: string;
  phone: string;
  assignee?: {
    name: string;
    color: string; // tailwind bg color class for the little pill
  };
}

export interface DataTableFilter {
  id: string;
  columnId: string;
  operator: "is" | "is_not" | "contains" | "is_empty";
  value: string;
}

export type SortDirection = "asc" | "desc" | null;
