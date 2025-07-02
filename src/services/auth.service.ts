import { AxiosError, AxiosResponse } from "axios";
import api from "../lib/axios";
import tryCatch from "../utils/try-catch";
import { ErrorResponseType, ResponseType } from "../types/response.type";
import { User } from "../context/AuthContext";
type FormValues = {
  email: string;
  password: string;
  remember: boolean;
};
type LoginResponse = { access_token: string; user: User };

export const signIn = async (values: FormValues) => {
  const response = await tryCatch<
    AxiosResponse<ResponseType<LoginResponse>>,
    AxiosError<ErrorResponseType>
  >(api.post("/auth/signin", values));
  return response;
};
