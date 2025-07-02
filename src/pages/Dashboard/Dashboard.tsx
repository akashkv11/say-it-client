import { Layout } from "antd";
import React, { useEffect, useState } from "react";
import SideBar from "../../components/SideBar";
import RecentChats from "./components/RecentChats";
import ChatPage from "./components/ChatPage";
import { getAllUsers } from "../../services/user.service";
import { User } from "../../context/AuthContext";

const Dashboard: React.FC = () => {
  const [isChatPageVisible, setIsChatPageVisible] = useState(false);
  const [usersList, setUsersList] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);

  useEffect(() => {
    // Fetch users when the component mounts
    handleGetUsers();
  }, []);

  const handleGetUsers = async () => {
    const users = await getAllUsers();
    setUsersList(users);
  };
  return (
    <Layout style={{ minHeight: "100vh" }}>
      {/* Sidebar */}
      <SideBar />
      {/* Main Content */}

      <RecentChats
        setSelectedUser={setSelectedUser}
        setIsChatPageVisible={setIsChatPageVisible}
        isVisible={isChatPageVisible}
        usersList={usersList}
      />
      <ChatPage
        setIsChatPageVisible={setIsChatPageVisible}
        isVisible={isChatPageVisible}
        recipient={selectedUser} // Replace with actual user data
      />
      {/* Footer */}
    </Layout>
  );
};

export default Dashboard;
