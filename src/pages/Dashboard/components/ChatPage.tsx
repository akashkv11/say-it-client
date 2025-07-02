import {
  ArrowLeftOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Layout, List, Space, Typography } from "antd";
import React, { useRef, useEffect, useState } from "react";
import { User } from "../../../context/AuthContext";
import { useSocket } from "../../../hooks/useSocket";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

type Props = {
  isVisible: boolean;
  setIsChatPageVisible: React.Dispatch<React.SetStateAction<boolean>>;
  recipient: User | null;
};

const ChatPage: React.FC<Props> = ({
  isVisible,
  setIsChatPageVisible,
  recipient,
}) => {
  const { messages, sendMessage } = useSocket({ selectedChatUser: recipient });
  const [inputValue, setInputValue] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  if (!isVisible) {
    return null; // If the chat page is not visible, return null
  }

  const handleSend = () => {
    if (!inputValue.trim() || !recipient?.id) return;

    sendMessage(recipient.id, inputValue);
    setInputValue("");
  };

  return (
    <Layout style={{ height: "100vh" }}>
      {/* Header */}
      <Header
        style={{
          background: "#fff",
          padding: "0 20px",
          display: "flex",
          alignItems: "center",
          gap: "10px",
        }}
      >
        <Button
          type="text"
          shape="circle"
          icon={<ArrowLeftOutlined />}
          onClick={() => setIsChatPageVisible(false)}
        />

        <Avatar icon={<UserOutlined />} style={{ marginRight: 10 }} />
        <Text strong>{recipient?.username}</Text>
      </Header>

      {/* Chat Area */}
      <Content style={{ padding: "20px", overflowY: "auto", flex: "1" }}>
        <List
          dataSource={messages}
          renderItem={(item) => (
            <List.Item
              style={{
                justifyContent:
                  item.sender === "me" ? "flex-end" : "flex-start",
                padding: "5px 0",
              }}
            >
              <div
                style={{
                  background: item.sender === "me" ? "#1890ff" : "#f0f0f0",
                  color: item.sender === "me" ? "#fff" : "#000",
                  padding: "8px 16px",
                  borderRadius: "20px",
                  maxWidth: "60%",
                  wordBreak: "break-word",
                }}
              >
                {item.text}
              </div>
            </List.Item>
          )}
        />
        <div ref={messagesEndRef} />
      </Content>

      {/* Input Area */}
      <Footer style={{ padding: "10px 20px" }}>
        <Space.Compact style={{ width: "100%" }}>
          <Input
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onPressEnter={handleSend}
            placeholder="Type a message..."
            style={{ flex: 1 }}
          />
          <Button type="primary" icon={<SendOutlined />} onClick={handleSend} />
        </Space.Compact>
      </Footer>
    </Layout>
  );
};

export default ChatPage;
