import React from "react";

const Room = ({
  username,
  room,
  SetUsername,
  setRoom,
  socket,
  SetChatScreen,
}) => {
  const sendRoom = () => {
    socket.emit("room", room);
    SetChatScreen(true);
  };

  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-1/3 h-[350px] bg-indigo-400 flex flex-col space-y-4 p-3">
        <h1 className="text-center font-bold text-2xl my-4">WELCOME TO CHAT</h1>
        <input
          value={username}
          onChange={(e) => SetUsername(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="UserName"
        />
        <input
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          className="h-12 rounded-xl p-3 outline-none"
          type="text"
          placeholder="Room"
        />
        <div
          onClick={sendRoom}
          className="border h-12 pt-2 text-xl text-center rounded-xl cursor-pointer"
        >
          CHAT
        </div>
      </div>
    </div>
  );
};

export default Room;
