import { FormInstance } from "antd";
import { Rule } from "antd/es/form";
import { Dayjs } from "dayjs";

export interface TaskFormRules {
  titleTask: Rule[];
  dateEndTask: Rule[];
  Effort: Rule[];
}

export interface TaskFormValues {
  dateEndTask: Dayjs;
  titleTask: string;
  effort: string;
  descripTask: string;
}

export interface AddTaskModalProps {
  visible: boolean;
  onOk: () => void;
  onCancel: () => void;
  form: FormInstance<TaskFormValues>;
}
