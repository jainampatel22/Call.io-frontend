import SocketIoClient from "socket.io-client";
import { createContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Peer from "peerjs";
import { v4 as UUIDv4 } from "uuid";

const WS_Server = "http://localhost:8080";

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

    const navigate = useNavigate(); // will help to programatically handle navigation
    
    // state variable to store the userId 
    const [user, setUser] = useState<Peer>(); // new peer user
 const [stream, setStream] = useState<MediaStream>() 
const fetchMedia=async()=>{
    const stream = await navigator.mediaDevices.getUserMedia({video:true,audio:true})
    setStream(stream)
}
    useEffect(() => {

        const userId = UUIDv4();
        const newPeer = new Peer(userId,{
            host:"localhost",
            path:'/myapp',
            port:9000,
        });

        setUser(newPeer);
fetchMedia()
    
        const enterRoom = ({ roomId} : { roomId: string}) => {
            navigate(`/room/${roomId}`); 
        }
        const getusers = ({roomId,participants}:{roomId:string,participants:string[]})=>{
            console.log('all users are ')
console.log(roomId,participants)
        }

        // we will transfer the user to the room page when we collect an event of room-created from server
        socket.on("room-created", enterRoom);
socket.on('get-users',getusers)
       
    }, []);



    return (
        <SocketContext.Provider value={{ socket, user,stream }}>
            {children}
        </SocketContext.Provider>
    );
}