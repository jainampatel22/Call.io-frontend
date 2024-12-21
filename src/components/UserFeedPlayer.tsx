import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic ,MicOff,VideoIcon ,VideoOff } from "lucide-react";
const UserFeedPlayer : React.FC<{stream?: MediaStream}> = ({stream}) => {
const [isMuted, setIsMuted] = useState(false)
const [video, setVideo] = useState(false)
    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    const togglemute = ()=>{
        if(stream){
            const audioTrack  =stream.getAudioTracks()[0];
            if(audioTrack){
                audioTrack.enabled=!audioTrack.enabled
                setIsMuted(!audioTrack.enabled)
            }
        }
    }
    const togglevideo = ()=>{
        if(stream){
            const videotrack = stream.getVideoTracks()[0]
            videotrack.enabled=!videotrack.enabled
setVideo(!videotrack.enabled)
        }
    }
    return (
        <>
       <div className="">
        <video
            ref={videoRef}
            style={{ width: '500px', height: '400px',transform:'scaleX(-1)' } }
            
            autoPlay
        />
        
        <div className="flex gap-8 items-center justify-center relative -mt-12 z-10"> {/* Adding relative and z-index to ensure buttons stay on top */}
  <Button
    variant="default"
    size="icon" // Icon-sized button
    className={`bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-blue-600 focus:ring-offset-2 rounded-full px-8 py-4 flex items-center transition-all duration-150 ${
      isMuted ? "bg-red-700 hover:bg-red-600" : "bg-green-700 hover:bg-green-600"
    }`}
    onClick={togglemute}
  >
    {isMuted ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
  </Button>

  <Button
    variant="default"
    size="icon" // Icon-sized button
    className={`bg-gray-900 text-white hover:bg-gray-800 focus:ring-4 focus:ring-blue-600 focus:ring-offset-2 rounded-full px-8 py-4 flex items-center transition-all duration-150 ${
      video ? "bg-red-700 hover:bg-red-600" : "bg-green-700 hover:bg-green-600"
    }`}
    onClick={togglevideo}
  >
    {video ? (
      <VideoOff className="w-8 h-8" />
    ) : (
      <VideoIcon className="w-8 h-8" />
    )}
  </Button>
</div>

       </div>
          </>
        
    )
}

export default UserFeedPlayer;