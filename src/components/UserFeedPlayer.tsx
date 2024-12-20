import { useEffect, useRef } from "react";

const UserFeedPlayer : React.FC<{stream?: MediaStream}> = ({stream}) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
        <div className="relative w-[350px] h-[350px] overflow-hidden rounded-lg shadow-lg">
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover transform scaleX(-1)"
          muted={true}
          autoPlay
          
          playsInline
        />
      </div>
        
    )
}

export default UserFeedPlayer;