export type StatItem = {
  label: string;
  value: string | number;
  icon?: LucideIcon;
  textColor?: string;
};

export type StatItemCompact = {
  value: string | number;
  icon?: LucideIcon;
};

export type FailureData = {
  key: string;
  label: string;
  count: number;
};

export type Metrix = {
  title: string;
  data: StatItem[];
};