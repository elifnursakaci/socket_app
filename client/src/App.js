import { useState } from "react";
import "./App.css";
import Chat from "./components/Chat";
import Room from "./components/Room";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");

function App() {
  const [username, SetUsername] = useState("");
  const [room, setRoom] = useState("");
  const [chatScreen, SetChatScreen] = useState("");
  return (
    <div className="App">
      {!chatScreen ? (
        <Room
          username={username}
          room={room}
          SetUsername={SetUsername}
          setRoom={setRoom}
          SetChatScreen={SetChatScreen}
          socket={socket}
        />
      ) : (
        <Chat username={username} room={room} socket={socket} />
      )}
    </div>
  );
}

export default App;
