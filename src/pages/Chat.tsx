import { useEffect, useState } from "react";
import { io } from "socket.io-client";
const socket = io("http://localhost:3000"); // Connect to the NestJS backend
const Chat = () => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState<string[]>([]);

  // Listen for incoming messages from the server
  useEffect(() => {
    socket.on("receiveMessage", (newMessage) => {
      setMessages((prevMessages) => [...prevMessages, newMessage]);
    });

    // Clean up the socket connection when the component unmounts
    return () => {
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
