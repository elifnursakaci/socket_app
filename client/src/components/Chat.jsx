import React, { useEffect, useState } from "react";

const Chat = ({ socket, username, room }) => {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  useEffect(() => {
    if (!socket) return;

    socket.on("messageReturn", (data) => {
      setMessageList((prev) => [...prev, data]);
    });

    // Cleanup function to remove the listener when the component unmounts
    return () => {
      socket.off("messageReturn");
    };
  }, [socket]);

  const sendMessage = async (e) => {
    const messageContent = {
      username: username,
      message: message,
      room: room,
      date:
        new Date(Date.now()).getHours() +
        ":" +
        new Date(Date.now()).getMinutes(),
    };
    await socket.emit("message", messageContent);
    setMessageList((prev) => [...prev, messageContent]);

    setMessage("");
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[500px] bg-indigo-200 relative ">
        <div className="w-full h-16 bg-gray-300 flex items-center p-2">
          <div className="w-12 h-12 bg-white rounded-full"></div>
        </div>
        <div className="w-full h-[400px] overflow-y-auto">
          {messageList &&
            messageList.map((msg, i) => (
              <div
                key={i}
                className={`${
                  username === msg.username ? "flex justify-end" : ""
                }`}
              >
                <div className="w-2/3 h-12 bg-gray-600 text-white text-sm m-2 p-2 rounded-xl">
                  <div>{msg.message}</div>
                  <div className="w-full flex justify-end text-xs">
                    {msg.username}
                  </div>
                </div>
              </div>
            ))}
        </div>
        <div className="absolute bottom-0 left-0 w-full">
          <input
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            className="w-3/4 border p-3 outline-none"
            type="text"
            placeholder="Message send"
          />
          <button
            onClick={sendMessage}
            className="w-1/4 text-white h-12 bg-indigo-500"
          >
            SEND
          </button>
        </div>
      </div>
    </div>
  );
};

export default Chat;
