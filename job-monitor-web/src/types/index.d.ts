export type BackendResponse<T> = {
  code: number;
  message: string;
  payload: T;
};

export interface DataTableFilter {
  id: string;
  columnId: string;
  operator: "is" | "is_not" | "contains" | "is_empty";
  value: string;
}

export type SortDirection = "asc" | "desc" | null;