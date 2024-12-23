import { useState } from "react";

/**
 * A simple chat component.
 *
 * @param {{ currentUser: string, recipient: string, messages: { sender: string, text: string }[], onSendMessage: (message: string) => void }}
 * @return {JSX.Element}
 */
function Chat({
  currentUser,
  recipient,
  messages,
  onSendMessage,
}: {
  currentUser: string;
  recipient: string;
  messages: { sender: string; text: string }[];
  onSendMessage: (message: string) => void;
}): JSX.Element {
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = () => {
    onSendMessage(newMessage);
    setNewMessage("");
  };

  return (
    <div>
      <h2>
        {currentUser} Chat with {recipient}
      </h2>
      <div
        style={{
          border: "1px solid #ccc",
          padding: "10px",
          marginBottom: "10px",
          height: "200px",
          overflowY: "auto",
        }}
      >
        {messages.map((msg, index) => {
          console.log("msg", msg);
          return (
            <div
              key={index}
              style={{
                textAlign: msg.sender === currentUser ? "right" : "left",
              }}
            >
              <strong>{msg.sender === currentUser ? "You" : recipient}:</strong>{" "}
              {msg.text}
            </div>
          );
        })}
      </div>
      <input
        type="text"
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        placeholder="Type your message..."
        style={{ width: "80%", marginRight: "10px" }}
      />
      <button onClick={handleSendMessage}>Send</button>
    </div>
  );
}

export default Chat;
