import { FormInstance } from "antd";
import { Rule } from "antd/es/form";
import { Dayjs } from "dayjs";

export interface TaskFormRules {
  title: Rule[];
  estimatedCompletionDate: Rule[];
  effort: Rule[];
}

export interface TaskFormValues {
  estimatedCompletionDate: Dayjs;
  title: string;
  effort: string;
  description: string;
}

export interface TaskModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance<TaskFormValues>;
}

export interface AddTaskModalProps extends TaskModalProps {}

export interface EditTaskModalProps extends TaskModalProps {}

export interface OptionFormType {
  value: string;
  label: string;
}

export interface CreateTaskPayload extends TaskFormValues {
  status: string;
  personId: number;
}

export interface UpdateTaskPayload extends TaskFormValues {
  status: string,
  id: number,
  personId: number;
}
