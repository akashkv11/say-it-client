import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("ws://localhost:3000"); // Connect to the NestJS backend
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState("Disconnected");

  // Listen for incoming messages from the server
  useEffect(() => {
    const userId = "user1"; // Replace with actual userId
    socket.emit("register", userId);
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });
    // Log connection events
    socket.on("connect", () => {
      console.log("Connected to the server");
      setConnectionStatus("Connected");
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from the server");
      setConnectionStatus("Disconnected");
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setConnectionStatus("Connection Error");
    });

    socket.on("reconnect", (attemptNumber) => {
      console.log("Reconnected to the server:", attemptNumber);
      setConnectionStatus("Reconnected");
    });
    socket.on("receiveDirectMessage", (data) => {
      console.log(`Message from ${data.senderId}: ${data.message}`);
      // Update the chat UI with the direct message
    });

    // Cleanup the event listeners on unmount
    return () => {
      socket.off("receiveDirectMessage");
      socket.off("connect");
      socket.off("disconnect");
      socket.off("connect_error");
      socket.off("reconnect");
      socket.off("receiveMessage");
    };
  }, []);

  const handleSendMessage = () => {
    if (message.trim()) {
      socket.emit("sendMessage", message); // Send message to server
      setMessage(""); // Clear the input field
    }
  };

  return (
    <div>
      <div>
        <h1>SayIt Chat</h1>
        <h2>Status: {connectionStatus}</h2>
        {/* Rest of your chat UI */}
      </div>
      <h1>SayIt Chat</h1>
      <div>
        <input
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
        />
        <button onClick={handleSendMessage}>Send</button>
      </div>
      <div>
        <h2>Messages:</h2>
        <div>
          {messages.map((msg, index) => (
            <p key={index}>{msg}</p>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Chat;
