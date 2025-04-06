import { TaskEffort } from "../../types/Models/Task";
import { ResponseData } from "../../types/Response/ResponseData";
import AxiosClient from "../AxiosClient";

export const getTasksEffort = async (): Promise<ResponseData<TaskEffort[]>> => {
  const { data } = await AxiosClient.get<ResponseData<TaskEffort[]>>(
    "/getTaskEffort"
  );

  return data;
};
