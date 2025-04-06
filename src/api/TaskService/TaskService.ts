import { Task } from "../../types/Models/Task";
import { ResponseData } from "../../types/Response/ResponseData";
import { CreateTaskPayload, UpdateTaskPayload } from "../../types/types";
import AxiosClient from "../AxiosClient";

export const createTask = async (formValue: CreateTaskPayload) => {
  const { data } = await AxiosClient.post<ResponseData<Task>>(
    `/createTask`,
    formValue
  );

  return data;
};

export const updateTask = async (formValue: UpdateTaskPayload) => {
  const { data } = await AxiosClient.put<ResponseData<Task>>(
    `/updateTask`,
    formValue
  );

  return data;
};

export const getTasks = async (id: number): Promise<ResponseData<Task[]>> => {
  const { data } = await AxiosClient.get<ResponseData<Task[]>>(
    `/getTasksByPersonId/${id}`
  );

  return data;
};
