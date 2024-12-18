import { useEffect, useRef } from "react";

const UserFeedPlayer : React.FC<{stream?: MediaStream}> = ({stream}) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
        <div>
            <video
                ref={videoRef}
                style={{ width: '300px', height: '200px', transform: "scaleX(-1)",WebkitTransform: "scaleX(-1)" }}
                muted={true}
                autoPlay
                         />
        </div>
        
    )
}

export default UserFeedPlayer;