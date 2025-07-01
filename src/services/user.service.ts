import { AxiosResponse } from "axios";
import { User } from "../context/AuthContext";
import api from "../lib/axios";
import tryCatch from "../utils/try-catch";
import { ResponseType } from "../types/response-type";

export const getAllUsers = async () => {
  const { data: result, error } = await tryCatch<
    AxiosResponse<ResponseType<User[]>>
  >(api.get("/users"));
  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }
  return result.data.data;
};
