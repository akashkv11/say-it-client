import "./App.css";
import { AuthProvider } from "./context/AuthContext";
import { MessageProvider } from "./context/messageContext";
import Routers from "./routes/Routers";

function App() {
  return (
    <>
      {/* <Chat /> */}
      <MessageProvider>
        <AuthProvider>
          <Routers />
        </AuthProvider>
      </MessageProvider>
    </>
  );
}

export default App;
