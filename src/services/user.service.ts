import { AxiosResponse } from "axios";
import { User } from "../context/AuthContext";
import api from "../lib/axios";
import { ResponseType } from "../types/response.type";
import tryCatch from "../utils/try-catch";
import { ChatMessageType } from "../types/message.types";

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

export const getChatWithSelectedUser = async (
  recipientId: string
): Promise<ChatMessageType[]> => {
  const { data: result, error } = await tryCatch<
    AxiosResponse<ResponseType<ChatMessageType[]>>
  >(api.get(`/users/messages/${recipientId}`));
  if (error) {
    console.error("Error fetching chat messages:", error);
    return [];
  }
  return result.data.data;
};
