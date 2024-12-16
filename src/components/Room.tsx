import { SocketContext } from "@/context/SocketProviders"
import { useContext, useEffect } from "react"
import { useParams } from "react-router-dom"
import UserFeedPlayer from "./UserFeedPlayer"

const Room = () => {
    const { id } = useParams()
    const { socket, user ,stream} = useContext(SocketContext)
    useEffect(() => {
     if(user)   socket.emit("join-room", { roomId: id, peerId: user._id })
    }, [socket, user, id])
    return (
        <div>room : {id}
        <UserFeedPlayer stream={stream}/>
        </div>
    )
}
export default Room 