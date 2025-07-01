import {
  ArrowLeftOutlined,
  SendOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { Avatar, Button, Input, Layout, List, Space, Typography } from "antd";
import React, { useState } from "react";
import { User } from "../../context/AuthContext";

const { Header, Content, Footer } = Layout;
const { Text } = Typography;

interface Message {
  id: number;
  sender: "me" | "other";
  text: string;
}

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
  const [messages, setMessages] = useState<Message[]>([
    { id: 1, sender: "other", text: "Hey! How are you?" },
    { id: 2, sender: "me", text: "I'm good, thanks! How about you?" },
  ]);
  const [inputValue, setInputValue] = useState("");

  const handleSend = () => {
    if (!inputValue.trim()) return;
    const newMessage: Message = {
      id: messages.length + 1,
      sender: "me",
      text: inputValue,
    };
    setMessages([...messages, newMessage]);
    setInputValue("");
  };

  if (!isVisible) {
    return null; // If the chat page is not visible, return null
  }

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
      </Content>

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
