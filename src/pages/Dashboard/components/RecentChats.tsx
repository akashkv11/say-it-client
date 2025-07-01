import { UserOutlined } from "@ant-design/icons";
import { Avatar, Button, Layout, List } from "antd";
import { Content, Header } from "antd/es/layout/layout";
import Title from "antd/es/typography/Title";
import { User } from "../../../context/AuthContext";

type Props = {
  setSelectedUser: React.Dispatch<React.SetStateAction<User | null>>;
  setIsChatPageVisible: React.Dispatch<React.SetStateAction<boolean>>;
  isVisible: boolean;
  usersList: User[];
};

const RecentChats: React.FC<Props> = ({
  setIsChatPageVisible,
  isVisible,
  usersList,
  setSelectedUser,
}) => {
  if (isVisible) {
    return null; // If the recent chats are not visible, return null
  }

  const handleChatOpen = (user: User) => {
    setIsChatPageVisible(true);
    setSelectedUser(user); // Set the selected user for the chat
  };

  return (
    <>
      <Layout>
        {/* Header */}
        <Header
          style={{ background: "#fff", padding: 20, textAlign: "center" }}
        >
          <Title level={3}>Welcome to SayIt</Title>
        </Header>

        {/* Chat Area */}
        <Content
          style={{
            margin: 20,
            background: "#fff",
            padding: 20,
            borderRadius: 8,
          }}
        >
          <Title level={4}>Recent Chats</Title>
          <List
            itemLayout="horizontal"
            dataSource={usersList}
            renderItem={(item) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar icon={<UserOutlined />} />}
                  title={item.username}
                  // description={item.message}
                />
                <Button onClick={() => handleChatOpen(item)} type="link">
                  Open
                </Button>
              </List.Item>
            )}
          />
        </Content>
      </Layout>
    </>
  );
};

export default RecentChats;
