'use client'

import { useParams } from "react-router-dom"
import { useContext, useEffect } from "react"
import UserFeedPlayer from "./UserFeedPlayer"
import { SocketContext } from "@/context/SocketProviders"
interface Peer {
    stream: MediaStream
    name?: string
  }
  const Room: React.FC = () => {
    const params = useParams()
    const id = params.id as string
    const { socket, user, stream, peers } = useContext(SocketContext)
  
    useEffect(() => {
      if (user) {
        console.log("New user with id", user._id, "has joined room", id)
        socket.emit("joined-room", { roomId: id, peerId: user._id })
      }
    }, [id, user, socket])
  
    const totalParticipants = Object.keys(peers).length + 1 // +1 for the current user
    const gridClass = getGridClass(totalParticipants)
  
    return (
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Video Chat Room</h1>
        <div className={`grid gap-4 ${gridClass}`}>
          <div className="relative">
            <UserFeedPlayer stream={stream} />
            <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
              You
            </div>
          </div>
          {Object.entries(peers).map(([peerId, peer]) => (
            <div key={peerId} className="relative">
              <UserFeedPlayer stream={(peer as Peer).stream} />
              <div className="absolute bottom-2 left-2 bg-black bg-opacity-50 text-white px-2 py-1 rounded">
                {(peer as Peer).name || `Participant ${peerId.slice(0, 4)}`}
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }
  
  function getGridClass(participantCount: number): string {
    switch (participantCount) {
      case 1:
        return "grid-cols-1"
      case 2:
        return "grid-cols-1 sm:grid-cols-2"
      case 3:
        return "grid-cols-1 sm:grid-cols-2 md:grid-cols-3"
      case 4:
        return "grid-cols-2 md:grid-cols-2"
      case 5:
      case 6:
        return "grid-cols-2 md:grid-cols-3"
      case 7:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-3 xl:grid-cols-4"
      default:
        return "grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4"
    }
  }
  
  export default Room
  
  