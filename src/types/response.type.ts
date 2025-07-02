export type ResponseType<T> = {
  success: boolean;
  message: string;
  timestamp: string;
  data: T;
};

export type ErrorResponseType = {
  statusCode: number;
  timestamp: string;
  path: string;
  message: string | string[];
  success: false;
  errorResponse: {
    code: number;
    message: string | string[];
  };
};
