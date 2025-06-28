import { message } from "antd";
import { NoticeType } from "antd/es/message/interface";
const popMessage = (type: NoticeType, content?: string) => {
  if (!content && type === "error") {
    content = "An unexpected error occurred.";
  }
  if (!content && type === "success") {
    content = "Operation completed successfully.";
  }

  message.open({
    type,
    content,
    duration: 3,
  });
};

export default popMessage;
