import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import Chat from "./DirectChat";

const socket = io("http://localhost:3000", {
  extraHeaders: {
    authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiI5OTA1Yjg2NC1iYjQ3LTQxMWItYjkyMi03M2EzZmQ0NzI1MWYiLCJlbWFpbCI6ImFrYXNoIiwiaWF0IjoxNzM2MjY1NjIzLCJleHAiOjE3MzYyNjkyMjN9.2rN71ZpvMXwc9wm0Zfv8yEDvaQsbnz6XgKJ2Fzih4fE`,
  },
}); // Backend URL

function MultiChat(): JSX.Element {
  const users = ["user1", "user2"]; // Example user list
  const [currentUser, setCurrentUser] = useState<string | null>(null); // Simulate dynamic login
  const [selectedUser, setSelectedUser] = useState<string | null>(null); // Recipient
  const [messages, setMessages] = useState<{ sender: string; text: string }[]>(
    []
  );

  useEffect(() => {
    // Determine current user based on localStorage or prompt
    let user = localStorage.getItem("currentUser");
    if (!user) {
      user = prompt("Enter your username (user1 or user2):") || "user1";
      localStorage.setItem("currentUser", user);
    }
    setCurrentUser(user);
  }, []);

  // Register the user when the app loads
  useEffect(() => {
    if (currentUser) {
      socket.emit("register", currentUser);
      console.log(`Registered as: ${currentUser}`);
    }
  }, [currentUser]);

  // Listen for direct messages
  useEffect(() => {
    socket.on(
      "receiveDirectMessage",
      (data: { senderId: string; message: string }) => {
        console.log(`Message from ${data.senderId}: ${data.message}`);
        setMessages((prevMessages) => [
          ...prevMessages,
          { sender: data.senderId, text: data.message },
        ]);
      }
    );

    return () => {
      socket.off("receiveDirectMessage");
    };
  }, []);

  // Send a direct message
  const sendDirectMessage = (recipientId: string, message: string): void => {
    console.log("Sending message to", recipientId, "with message", message);
    if (!recipientId || !message.trim()) return;
    socket.emit("sendDirectMessage", { recipientId, message });
    setMessages((prevMessages) => [
      ...prevMessages,
      { sender: currentUser!, text: message },
    ]);
  };

  return (
    <div>
      <button onClick={() => setCurrentUser("user1")}>Login as user1</button>

      <button onClick={() => setCurrentUser("user2")}>Login as user2</button>

      <h1>SayIt Direct Messaging</h1>

      <div>
        <h2>Users</h2>
        <ul>
          {users
            .filter((user) => user !== currentUser) // Exclude current user
            .map((user) => (
              <li
                key={user}
                onClick={() => setSelectedUser(user)}
                style={{ cursor: "pointer" }}
              >
                {user}
              </li>
            ))}
        </ul>
      </div>

      {selectedUser ? (
        <Chat
          currentUser={currentUser!}
          recipient={selectedUser}
          messages={messages.filter(
            (msg) => msg.sender === selectedUser || msg.sender === currentUser
          )}
          onSendMessage={(message) => sendDirectMessage(selectedUser, message)}
        />
      ) : (
        <p>Select a user to start chatting</p>
      )}
    </div>
  );
}

export default MultiChat;
