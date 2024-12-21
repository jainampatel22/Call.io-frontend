"use client";

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserFeedPlayer from "./UserFeedPlayer";
import { SocketContext } from "@/context/SocketProviders";
import CopyUrl from "./Copyurl";
import { Button } from "@/components/ui/button";
import { Users, Link } from 'lucide-react';

interface Peer {
  stream: MediaStream;
  username?: string;
}

const Room: React.FC = () => {
  const params = useParams();
  const id = params.id as string;
  const { socket, user, stream, peers, username } = useContext(SocketContext);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (user) {
      console.log("New user with id", user._id, "has joined room", id);
      socket.emit("joined-room", { roomId: id, peerId: user._id, username });
    }
  }, [id, user, socket, username]);

  const totalParticipants = Object.keys(peers).length + 1;

  return (
    <div className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold">Video Chat Room</h1>
          <div className="flex items-center space-x-2">
            <Button
              variant="default"
              size="sm"
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Users className="w-4 h-4" />
              <span>{totalParticipants}</span>
            </Button>
            <Button
              variant="default"
              size="sm"
              onClick={() => setIsModalOpen(true)}
              className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white"
            >
              <Link className="w-4 h-4" />
              <span className="hidden sm:inline">Invite</span>
            </Button>
          </div>
        </div>

        <div className="grid gap-4 auto-rows-fr grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {/* User's Video Feed */}
          <div className="relative aspect-video ">
            <UserFeedPlayer stream={stream} />
            <div className="absolute bottom-10 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              You ({username})
            </div>
          </div>

          {/* Peers Video Feeds */}
          {Object.entries(peers).map(([peerId, peer]) => (
            <div key={peerId} className="relative aspect-video ">
              <UserFeedPlayer stream={(peer as Peer).stream} />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {(peer as Peer).username || `Participant ${peerId.slice(0, 4)}`}
              </div>
            </div>
          ))}
        </div>
      </div>
      <CopyUrl isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default Room;

