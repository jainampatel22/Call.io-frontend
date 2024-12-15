// import { useSocket } from "@/context/SocketProviders";
// import { useState, useEffect, useCallback } from "react";
// import { Input } from "./ui/input";
// import { Button } from "./ui/button";
// import ReactPlayer from "react-player";
// import PeerService from "@/services/Peer";

// type CallAcceptedData = {
//   from: string;
//   ans: RTCSessionDescriptionInit;
// };

// export default function Sender() {
//   const [remoteId, setRemoteId] = useState<string>(""); // Remote user ID
//   const [stream, setStream] = useState<MediaStream | null>(null); // Media stream
//   const [name, setName] = useState<string>(""); // User's name
//   const socket = useSocket(); // Socket for communication

//   const peerService = new PeerService(socket); // Create an instance of PeerService

//   // Handle the user joining the room
//   const handleUserJoined = useCallback((data: { email: string; id: string }) => {
//     const { email, id } = data;
//     setRemoteId(id);
//     setName(email);
//     console.log(`User joined: ${email} (${id})`);
//   }, []);

//   // Handle incoming call
//   const handleIncomingCall = useCallback(async (data: { from: string; offer: RTCSessionDescriptionInit }) => {
//     const { from, offer } = data;
//     setRemoteId(from);
//     const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });

//     // Attach stream to local video element (for preview)
//     const localVideoElement = document.getElementById("localVideo") as HTMLVideoElement;
//     if (localVideoElement) {
//       localVideoElement.srcObject = userStream;
//     }

//     // Add local stream to peer connection
//     peerService.addLocalStream(userStream);

//     // Generate WebRTC answer
//     const answer = await peerService.getAnswer(offer);
//     socket.emit("call:accepted", { to: from, answer });
//   }, [socket]);

//   // Handle call accepted
//   const handleCallAccepted = useCallback(async ({ from, ans }: CallAcceptedData) => {
//     await peerService.setLocalDescription(ans);
//   }, [socket]);

//   // Make a call
//   const handleCall = useCallback(async () => {
//     const userStream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
//     setStream(userStream); // Set stream for the call
//     const offer = await peerService.getOffer();
//     socket.emit("user:call", { to: remoteId, offer });

//     // Add stream to peer connection
//     peerService.addLocalStream(userStream);
//   }, [remoteId, socket]);

//   useEffect(() => {
//     // Set up socket event listeners
//     socket.on('user:joined', handleUserJoined);
//     socket.on('incoming:call', handleIncomingCall);
//     socket.on('call:accepted', handleCallAccepted);

//     // Clean up socket event listeners
//     return () => {
//       socket.off('user:joined', handleUserJoined);
//       socket.off('incoming:call', handleIncomingCall);
//       socket.off('call:accepted', handleCallAccepted);
//     };
//   }, [socket, handleUserJoined, handleIncomingCall, handleCallAccepted]);

//   useEffect(() => {
//     return () => {
//       // Clean up user media stream when component unmounts or a call ends
//       if (stream) {
//         stream.getTracks().forEach(track => track.stop());
//       }
//     };
//   }, [stream]);

//   return (
//     <div className="flex w-full min-h-screen">
//       {/* Left section for video */}
//       <div className="min-h-screen w-[70%] justify-start border-r-2 border-black">
//         <h1>Sender Video's</h1>
//         <h2>{remoteId ? `${name} has joined the room` : "No One has Joined"}</h2>
//         {remoteId && <Button onClick={handleCall}>Call</Button>}

//         {/* Display local stream */}
//         {stream && (
//           <video
//             id="localVideo"
//             playsInline
//             muted
//             autoPlay
//             style={{ width: '200px', height: '200px' }}
//             ref={el => {
//               if (el && stream) el.srcObject = stream;
//             }}
//           />
//         )}
//       </div>

//       {/* Right section for chat */}
//       <div className="min-h-screen w-[30%] justify-end">
//         <div className="text-blue-600 text-3xl font-mono font-semibold flex justify-center items-center mt-20">
//           Chat
//         </div>
//         <div className="flex justify-center mt-4">
//           <div className="rounded-lg">
//             <Input type="text" placeholder="Send a message" />
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }
