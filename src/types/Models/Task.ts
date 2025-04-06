import { Dayjs } from "dayjs";

export interface Task {
  id: number;
  title: string;
  description: string;
  status: string;
  effort: string;
  estimatedCompletionDate: Dayjs;
  personId: number | null;
}

export interface TaskEffort {
  value: string;
  label: string;
}
