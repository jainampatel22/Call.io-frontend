'use client'

import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SocketContext } from "@/context/SocketProviders";

import { Label } from './ui/label';

import { Input } from './ui/input';
import { Button } from './ui/button';

export function CreateRoomPage() {
  const [username, updateUsername] = useState(""); // Local state for username

  const { socket, setUsername } = useContext(SocketContext) || {};
  const navigate = useNavigate();

  const handleUsername = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    updateUsername(value);
    setUsername(value);
  }

  const handleCreateRoom = () => {
    if (!socket) {
      alert("Socket connection not established");
      return;
    }

    socket.emit("create-room", { username });

    const handleRoomCreated = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
      socket.off("room-created", handleRoomCreated);
    };

    socket.on("room-created", handleRoomCreated);

    socket.on("room-error", (error: { message: any; }) => {
      console.error("Room creation error:", error);
      alert(error.message || "Failed to create room");
    });
  };

  return (
    <div className='flex flex-col-reverse md:flex-row w-full min-h-screen'>
      <div className='w-full md:w-1/2 flex justify-center items-center p-4 md:p-8'>
        <img 
          className='w-full max-w-md md:max-w-lg object-cover'
          src="https://images.ctfassets.net/r6vlh4dr9f5y/5CJ47GE7R005AT9Axa3hrp/ce5d3f6b17c2ba40697a42b0c6c59307/9.jpg?fm=webp&fit=fill&f=bottom&w=1248&h=1280" 
          alt="Dialpad illustration" 
        />
      </div>
      <div className="w-full md:w-1/2 flex justify-center items-center p-4 md:p-8">
        <div className="w-full max-w-md mx-auto rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
          <h2 className="font-bold text-3xl md:text-4xl text-neutral-800 dark:text-neutral-200">
            Welcome to Dialpad
          </h2>
          <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
            You can <span className="text-xl font-bold text-indigo-600">Create</span> a fresh Room in one click by just entering a username.
          </p>
          <div className='mt-6'>
            <Label htmlFor="username" className="text-lg font-semibold">Username</Label>
            <Input 
              id="username"
              className='mt-2 rounded-xl' 
              onChange={handleUsername}
            />
            <Button 
              size="lg"
              className="w-full mt-4 rounded-full py-2 px-6 hover:text-white hover:bg-black text-base md:text-lg bg-indigo-600 text-white"
              onClick={handleCreateRoom}
            >
              Create Room
            </Button>                            
          </div>
        </div>
      </div>
    </div>
  );
}

