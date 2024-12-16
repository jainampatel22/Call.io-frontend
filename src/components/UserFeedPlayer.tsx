import { useEffect, useRef } from "react"

const UserFeedPlayer =({stream}:{stream:MediaStream})=>{
const videoref = useRef<HTMLVideoElement>(null)
useEffect(()=>{
    if(videoref.current&& stream){
        videoref.current.srcObject=stream
    }
},[stream])
    return(
    <div>
<video ref={videoref} muted autoPlay style={{width:"300px",height:"300px"}}></video>
    </div>
)
}
export default UserFeedPlayer