import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "@/Reducers/peerReducers";
import { addPeerAction } from "@/Actions/peerActions";

const WS_SERVER = import.meta.env.VITE_WS_SERVER || "https://call-io-backend.onrender.com";

export const SocketContext = createContext<any | null>(null);

interface Props {
  children: React.ReactNode;
}

export const SocketProvider: React.FC<Props> = ({ children }) => {
  const navigate = useNavigate();
  const [socket, setSocket] = useState<Socket | null>(null);
  const [user, setUser] = useState<Peer>();
  const [stream, setStream] = useState<MediaStream>();
  const [peers, dispatch] = useReducer(peerReducer, {});
  const [roomId, setRoomId] = useState<string | null>(null);

  // Socket Connection
  useEffect(() => {
    const newSocket = io(WS_SERVER, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
      reconnection: true,
      timeout: 60000,
      reconnectionDelay: 1000,
    });

    newSocket.on("connect", () => {
      console.log("Socket connected successfully");
      setSocket(newSocket);
    });

    newSocket.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
    });

    return () => {
      newSocket.close();
    };
  }, []);

  // Media Stream Acquisition
  const fetchUserFeed = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  // Peer Connection Setup
  useEffect(() => {
    if (!socket) return;

    const userId = UUIDv4();
    const newPeer = new Peer(userId, {
      host: "0.peerjs.com",
      port: 443,
      path: "/",
      secure: true,
    });

    newPeer.on('open', () => {
      console.log('PeerJS connection established');
      setUser(newPeer);
    });

    newPeer.on('error', (err) => {
      console.error('PeerJS error:', err);
    });

    fetchUserFeed();

    // Room Creation and Joining Handlers
    const handleRoomCreated = ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      navigate(`/room/${roomId}`);
    };

    const handleRoomJoined = ({ roomId }: { roomId: string }) => {
      setRoomId(roomId);
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", handleRoomCreated);
    socket.on("room-joined", handleRoomJoined);

    // Participant Tracking
    const handleGetUsers = ({
      roomId,
      participants,
    }: {
      roomId: string;
      participants: string[];
    }) => {
      console.log("Fetched room participants", roomId, participants);
    };

    socket.on("get-users", handleGetUsers);

    return () => {
      socket.off("room-created", handleRoomCreated);
      socket.off("room-joined", handleRoomJoined);
      socket.off("get-users", handleGetUsers);
      newPeer.destroy();
    };
  }, [socket, navigate]);

  // WebRTC Peer Connection Handling
  useEffect(() => {
    if (!socket || !user || !stream) return;

    const handleUserJoined = ({ peerId }: { peerId: string }) => {
      const call = user.call(peerId, stream);
      console.log("Calling the new peer", peerId);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    };

    const handleIncomingCall = (call: any) => {
      console.log("receiving a call from", call.peer);
      call.answer(stream);
      call.on("stream", (peerStream: MediaStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    };

    socket.on("user-joined", handleUserJoined);
    user.on("call", handleIncomingCall);

    socket.emit("ready");

    return () => {
      socket.off("user-joined", handleUserJoined);
      user.off("call", handleIncomingCall);
    };
  }, [socket, user, stream]);

  return (
    <SocketContext.Provider value={{ 
      socket, 
      user, 
      stream, 
      peers, 
      roomId 
    }}>
      {children}
    </SocketContext.Provider>
  );
};