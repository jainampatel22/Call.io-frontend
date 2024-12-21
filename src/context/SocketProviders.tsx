import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useReducer, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";
import { peerReducer } from "@/Reducers/peerReducers";
import { addPeerAction } from "@/Actions/peerActions";
const WS_Server = "https://call-io-backend.onrender.com";
// const WS_Local = "http://localhost:8080"

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const SocketContext = createContext<any | null>(null);

const socket = SocketIoClient(WS_Server, {
    withCredentials: false,
    transports: ["polling", "websocket"]
});

interface Props {
    children: React.ReactNode
}

export const SocketProvider: React.FC<Props> = ({ children }) => {

    const navigate = useNavigate(); 
        const [user, setUser] = useState<Peer>(); 
    const [stream, setStream] = useState<MediaStream>();
const [username, setUsername] = useState("")
    const [peers, dispatch] = useReducer(peerReducer, {}); 

    const fetchParticipantList = ({roomId, participants}: {roomId: string, participants: {peerId:string,username:string}[]}) => {
        console.log("Fetched room participants");
        console.log(roomId, participants,username);
        
    }

    const fetchUserFeed = async () => {
        const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true});
        setStream(stream);
    } 

    useEffect(() => {

        const userId = UUIDv4();
        const newPeer = new Peer(userId, {
          host: "0.peerjs.com",
          port: 443,
          path: "/",
          secure: true,

        });

        setUser(newPeer);

        fetchUserFeed();

        const enterRoom = ({ roomId} : { roomId: string}) => {
            navigate(`/room/${roomId}`); 
        }

         socket.on("room-created", enterRoom);

        socket.on("get-users", fetchParticipantList);
    }, []);

    useEffect(() => {
        if(!user || !stream) return;

        socket.on("user-joined", ({peerId,username}) => {
            const call = user.call(peerId, stream);
            console.log("Calling the new peer", peerId);
            call.on("stream", () => {
              
                dispatch(addPeerAction(peerId, stream,username));
            })
        })

        user.on("call", (call) => {
          console.log("Receiving a call from Peer ID:", call.peer);
      
          call.answer(stream); 
      
          call.on("stream", (remoteStream) => {
                 const peerUsername  =username || `Participant ${call.peer.slice(0, 4)}`;
              dispatch(addPeerAction(call.peer, remoteStream, peerUsername));
          });
      });

        socket.emit("ready",{username});
    }, [user, stream,username])

    return (
        <SocketContext.Provider value={{ socket, user, stream, peers,username,setUsername }}>
            {children}
        </SocketContext.Provider>
    );
}