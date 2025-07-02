import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { User } from "../context/AuthContext";

interface Message {
  id: number;
  sender: "me" | "other";
  text: string;
}

type HookParams = {
  selectedChatUser: User | null; // Add this line to include selectedChatUser
};

export const useSocket = ({ selectedChatUser }: HookParams) => {
  const socketRef = useRef<Socket | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);

  const token = localStorage.getItem("token");
  const url = import.meta.env.VITE_API_URL; // e.g., http://localhost:3000

  const handleIncomingMessage = useCallback(
    (data: { content: string; senderId: string }) => {
      const newMessage: Message = {
        id: Date.now(),
        sender: "other",
        text: data.content,
      };

      if (selectedChatUser && selectedChatUser.id === data.senderId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    },
    [selectedChatUser]
  );

  useEffect(() => {
    const socket = io(url, {
      transports: ["websocket"],
      auth: {
        token: token ? `Bearer ${token}` : "",
      },
    });

    socketRef.current = socket;

    socket.on("receiveMessage", handleIncomingMessage);

    socket.on("connect_error", (err) => {
      console.error("Socket connection error:", err.message);
    });

    return () => {
      if (socket.connected) {
        socket.disconnect();
      }
    };
  }, [url, handleIncomingMessage]);

  const sendMessage = (recipientId: string, content: string) => {
    if (socketRef.current) {
      socketRef.current.emit("sendMessage", { recipientId, content });

      const newMessage: Message = {
        id: Date.now(),
        sender: "me",
        text: content,
      };
      setMessages((prev) => [...prev, newMessage]);
    }
  };

  return { sendMessage, messages };
};
