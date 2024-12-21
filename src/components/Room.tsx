"use client";

import { useParams } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import UserFeedPlayer from "./UserFeedPlayer";
import { SocketContext } from "@/context/SocketProviders";
import CopyUrl from "./Copyurl";

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
  const gridClass = getGridClass(totalParticipants);

  return (
    <>
      <div className="flex justify-end p-5">
        <button
          className="bg-black text-white px-4 py-2 rounded-xl"
          onClick={() => setIsModalOpen(true)}
        >
          Invite Others!
        </button>
        <CopyUrl isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
      </div>
      <div className="container mx-auto px-4 sm:px-8 md:px-16">
        <h1 className="text-2xl font-bold mb-4 text-center">Video Chat Room</h1>
        <div className={`grid gap-4 ${gridClass}`}>
          {/* User's Video Feed */}
          <div className="relative">
            <UserFeedPlayer stream={stream} />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
              You ({username})
            </div>
          </div>

          {/* Peers Video Feeds */}
          {Object.entries(peers).map(([peerId, peer]) => (
            <div key={peerId} className="relative">
              <UserFeedPlayer stream={(peer as Peer).stream} />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded text-sm">
                {(peer as Peer).username || `Participant ${peerId.slice(0, 4)}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

function getGridClass(participantCount: number): string {
  switch (participantCount) {
    case 1:
      return "grid-cols-1";
    case 2:
      return "grid-cols-1 sm:grid-cols-2";
    case 3:
      return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3";
    case 4:
      return "grid-cols-2 md:grid-cols-2";
    case 5:
    case 6:
      return "grid-cols-2 md:grid-cols-3";
    case 7:
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4";
    default:
      return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4";
  }
}

export default Room;
