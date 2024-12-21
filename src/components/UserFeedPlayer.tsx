import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Mic, MicOff, VideoIcon, VideoOff } from 'lucide-react';

const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
  const [isMuted, setIsMuted] = useState(false);
  const [isVideoOff, setIsVideoOff] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (videoRef.current && stream) {
      videoRef.current.srcObject = stream;
    }
  }, [stream]);

  const toggleMute = () => {
    if (stream) {
      const audioTrack = stream.getAudioTracks()[0];
      if (audioTrack) {
        audioTrack.enabled = !audioTrack.enabled;
        setIsMuted(!audioTrack.enabled);
      }
    }
  };

  const toggleVideo = () => {
    if (stream) {
      const videoTrack = stream.getVideoTracks()[0];
      if (videoTrack) {
        videoTrack.enabled = !videoTrack.enabled;
        setIsVideoOff(!videoTrack.enabled);
      }
    }
  };

  return (
    <div className="relative w-full h-1/2">
      <video
        ref={videoRef}  style={{transform:"scaleX(-1)"}}
        className="w-full h-1/2 object-cover  min-h-[300px] md:min-h-[300px] lg:min-h-[300px] lg:min-w-[400px]"
        autoPlay
        playsInline
        muted
      />
      <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex gap-4 items-center justify-center z-10">
        <Button 
          variant="default"
          size="sm"
          className={`rounded-full w-10 h-10 flex items-center justify-center transition-all duration-150 ${
            isMuted ? "bg-red-600 hover:bg-red-700" : "text-black bg-white"
          }`}
          onClick={toggleMute}
        >
          {isMuted ? <MicOff  /> : <Mic  />}
        </Button>
        <Button
          variant="default"
          size="icon"
          className={`rounded-full w-10 h-10 flex items-center justify-center transition-all duration-150 ${
            isVideoOff ? "bg-red-600 hover:bg-red-700" : " text-black bg-white "
          }`}
          onClick={toggleVideo}
        >
          {isVideoOff ? (
            <VideoOff className="w-6 h-6" />
          ) : (
            <VideoIcon className="w-6 h-6" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default UserFeedPlayer;

