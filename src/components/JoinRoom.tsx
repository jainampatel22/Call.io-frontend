import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocketContext } from "@/context/SocketProviders";

import Header from "./Header";

export function JoinRoomPage() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const { socket, user } = useContext(SocketContext) || {};
  const navigate = useNavigate();

  // Manage error feedback for room errors
  const [error, setError] = useState<string | null>(null);
console.log(error)
  const handleJoinRoom = () => {
    if (!username || !roomId) {
      alert("Please enter both username and room ID");
      return;
    }

    if (!socket || !user) {
      alert("Socket or Peer connection not established");
      return;
    }

    // Emit the join room event
    socket.emit("join-room", {
      roomId,
      peerId: user.id,
      username,
    });
  };

  useEffect(() => {
    if (!socket) return;

    // Listener: Handle successful room join
    const handleRoomJoined = ({ roomId }: { roomId: string }) => {
      console.log(`Successfully joined room: ${roomId}`);
      navigate(`/room/${roomId}`);
    };

    // Listener: Handle errors from server
    const handleRoomError = (error: { message: string }) => {
      console.error("Room join error:", error);
      setError(error.message || "An unexpected error occurred.");
    };

    socket.on("room-joined", handleRoomJoined);
    socket.on("room-error", handleRoomError);

    // Cleanup listeners on component unmount
    return () => {
      socket.off("room-joined", handleRoomJoined);
      socket.off("room-error", handleRoomError);
    };
  }, [socket, navigate]);

  return (
    <>
    <Header/>
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
          Enter an existing room ID to <span className="text-xl font-bold text-indigo-600">Join.</span>
          </p>
          <div className='mt-6'>
            <Label htmlFor="username" className="text-lg font-semibold">Username</Label>
            <Input 
              id="username"
              className='mt-2 rounded-xl' 
              onChange={(e)=>setUsername(e.target.value)}
            />
              <Label htmlFor="username" className="text-lg font-semibold">Room id</Label>
            <Input 
              id="username"
              className='mt-2 rounded-xl' 
              onChange={(e)=>setRoomId(e.target.value)}
            />
            <Button 
              size="lg"
              className="w-full mt-4 rounded-full py-2 px-6 hover:text-white hover:bg-black text-base md:text-lg bg-indigo-600 text-white"
              onClick={handleJoinRoom}
            >
             Join
            </Button>                            
          </div>
        </div>
      </div>
    </div>
   </>
  );
}
