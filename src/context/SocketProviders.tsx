import { io, Socket } from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "@/Reducers/peerReducers";
import { addPeerAction } from "@/Actions/peerActions";

const WS_SERVER = import.meta.env.VITE_WS_SERVER || "https://call-io-backend.onrender.com/";

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

  useEffect(() => {
    const newSocket = io(WS_SERVER, {
      transports: ['websocket', 'polling'],
      reconnectionAttempts: 5,
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

  const fetchParticipantList = ({
    roomId,
    participants,
  }: {
    roomId: string;
    participants: string[];
  }) => {
    console.log("Fetched room participants", roomId, participants);
  };

  const fetchUserFeed = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(stream);
    } catch (error) {
      console.error("Error accessing media devices:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const userId = UUIDv4();
    const newPeer = new Peer(userId, {
    //   host: "0.peerjs.com",
    //   port: 443,
    //   path: "/",
    //   secure: true,
    port:9000,
    path:"/myapp"
    });

    newPeer.on('open', () => {
      console.log('PeerJS connection established');
      setUser(newPeer);
    });

    newPeer.on('error', (err) => {
      console.error('PeerJS error:', err);
    });

    fetchUserFeed();

    const enterRoom = ({ roomId }: { roomId: string }) => {
      navigate(`/room/${roomId}`);
    };

    socket.on("room-created", enterRoom);
    socket.on("get-users", fetchParticipantList);

    return () => {
      socket.off("room-created");
      socket.off("get-users");
      newPeer.destroy();
    };
  }, [socket]);

  useEffect(() => {
    if (!socket || !user || !stream) return;

    socket.on("user-joined", ({ peerId }) => {
      const call = user.call(peerId, stream);
      console.log("Calling the new peer", peerId);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(peerId, peerStream));
      });
    });

    user.on("call", (call) => {
      console.log("receiving a call from", call.peer);
      call.answer(stream);
      call.on("stream", (peerStream) => {
        dispatch(addPeerAction(call.peer, peerStream));
      });
    });

    socket.emit("ready");

    return () => {
      socket.off("user-joined");
    };
  }, [socket, user, stream]);

  return (
    <SocketContext.Provider value={{ socket, user, stream, peers }}>
      {children}
    </SocketContext.Provider>
  );
};

