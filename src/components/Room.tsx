import { useContext, useEffect } from "react";
import { useParams } from "react-router-dom";
import UserFeedPlayer from "./UserFeedPlayer";
import { SocketContext } from "@/context/SocketProviders";
const Room: React.FC = () => {

    const { id } = useParams();
    const { socket, user, stream, peers } = useContext(SocketContext);

    useEffect(() => {
        // emitting this event so that either creator of room or joinee in the room 
        // anyone is added the server knows that new people have been added\
        // to this room
        if(user) {
            console.log("New user with id", user._id, "has joined room", id);
            socket.emit("joined-room", {roomId: id, peerId: user._id})
        }

    }, [id, user, socket]); 

    return(
        <div>
                <h1>You</h1>
            <UserFeedPlayer stream={stream} />

            <div>
           <h3>Other's</h3>
                {Object.keys(peers).map((peerId) => (
                    <>
                    <h1>{peers.peerId}</h1>
                        <UserFeedPlayer key={peerId} stream={peers[peerId].stream } />
                    </>
                ))}
            </div>
        </div>
    )
}

export default Room;