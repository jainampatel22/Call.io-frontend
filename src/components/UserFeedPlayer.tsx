// import { useEffect, useRef, useState } from "react";
// import { Button } from "./ui/button";
// import { Mic, MicOff, VideoIcon, VideoOff } from 'lucide-react';

// const UserFeedPlayer: React.FC<{ stream?: MediaStream }> = ({ stream }) => {
//   const [isMuted, setIsMuted] = useState(false);
//   const [isVideoOff, setIsVideoOff] = useState(false);
//   const videoRef = useRef<HTMLVideoElement>(null);

//   useEffect(() => {
//     if (videoRef.current && stream) {
//       videoRef.current.srcObject = stream;
//     }
//   }, [stream]);

//   const toggleMute = () => {
//     if (stream) {
//       const audioTrack = stream.getAudioTracks()[0];
//       if (audioTrack) {
//         audioTrack.enabled = !audioTrack.enabled;
//         setIsMuted(!audioTrack.enabled);
//       }
//     }
//   };

//   const toggleVideo = () => {
//     if (stream) {
//       const videoTrack = stream.getVideoTracks()[0];
//       if (videoTrack) {
//         videoTrack.enabled = !videoTrack.enabled;
//         setIsVideoOff(!videoTrack.enabled);
//       }
//     }
//   };

//   return (
//     <div className="relative w-full h-full">
//       <video
//         ref={videoRef}  style={{transform:"scaleX(-1)"}}
//         className="w-full h-1/2 object-cover  min-h-[300px] md:min-h-[300px] lg:min-h-[300px] lg:min-w-[200px]"
//         autoPlay
//         playsInline
        
//       />
    
//     </div>
//   );
// };

// export default UserFeedPlayer;

