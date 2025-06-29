import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
import { createContext, useContext } from "react";

type MessageContextType = {
  popMessage: (type: NoticeType, content?: string | string[]) => void;
};

const MessageContext = createContext<MessageContextType | undefined>(undefined);

export const MessageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [messageApi, contextHolder] = message.useMessage();

  const popMessage = (
    type: NoticeType,
    content?: string | string[] | undefined,
    duration: number = 2
  ) => {
    if (!content && type === "error") {
      content = "An unexpected error occurred.";
    }
    if (!content && type === "success") {
      content = "Operation completed successfully.";
    }

    messageApi.open({
      type,
      content,
      duration,
    });
  };
  return (
    <MessageContext.Provider value={{ popMessage }}>
      {contextHolder}
      {children}
    </MessageContext.Provider>
  );
};

export const usePopMessage = (): MessageContextType => {
  const context = useContext(MessageContext);
  if (!context) {
    throw new Error("useMessage must be used within a MessageProvider");
  }
  return context;
};
