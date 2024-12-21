import { useEffect, useRef } from "react";

const UserFeedPlayer : React.FC<{stream?: MediaStream}> = ({stream}) => {

    const videoRef = useRef<HTMLVideoElement>(null);
    useEffect(() => {
        if(videoRef.current && stream) {
            videoRef.current.srcObject = stream;
        }
    }, [stream]);
    return (
        <video
            ref={videoRef}
            style={{ width: '400px', height: '300px',transform:'scaleX(-1)' } }
            
            autoPlay
        />
    )
}

export default UserFeedPlayer;