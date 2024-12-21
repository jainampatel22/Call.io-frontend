import { useContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { SocketContext } from "@/context/SocketProviders";
import { Boxes } from "@/components/ui/background-boxes";

export function JoinRoomPage() {
  const [username, setUsername] = useState("");
  const [roomId, setRoomId] = useState("");
  const { socket, user } = useContext(SocketContext) || {};
  const navigate = useNavigate();

  // Manage error feedback for room errors
  const [error, setError] = useState<string | null>(null);

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
    <div>
      <div className="z-10 bg-black text-white">
  
      </div>

      <div className="bg-black text-white flex justify-center items-center min-h-screen w-full">
        <Boxes />
        <Card className="w-[350px] z-10 bg-black border-white/20">
          <CardHeader>
            <CardTitle className="text-white">Join Room</CardTitle>
            <CardDescription className="text-white/70">
              Enter an existing room ID to join
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid w-full items-center gap-4">
              {error && <p className="text-red-600 text-sm">{error}</p>}
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="username" className="text-white">Username</Label>
                <Input 
                  id="username" 
                  placeholder="Enter your name" 
                  className="rounded-xl bg-black/50 border-white/20 text-white"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              
              <div className="flex flex-col space-y-1.5">
                <Label htmlFor="roomId" className="text-white">Room ID</Label>
                <Input 
                  id="roomId" 
                  placeholder="Enter Room ID" 
                  className="rounded-xl bg-black/50 border-white/20 text-white"
                  value={roomId}
                  onChange={(e) => setRoomId(e.target.value)}
                />
              </div>
              
              <Button 
                onClick={handleJoinRoom} 
                className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white"
              >
                Join Room
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
