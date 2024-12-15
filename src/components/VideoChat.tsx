import React, { useEffect, useRef } from "react";
import { useSearchParams } from "react-router-dom";

const VideoChat: React.FC = () => {
  const [searchParams] = useSearchParams();
  const roomId = searchParams.get("roomId");
  const role = searchParams.get("role");

  // Refs for video elements
  const remoteVideoRef = useRef<HTMLVideoElement | null>(null);
  const localVideoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8080");
    let localStream: MediaStream | null = null;
    let peerConnection: RTCPeerConnection | null = null;

    const initWebRTC = async () => {
      try {
        // Get local media stream
        localStream = await navigator.mediaDevices.getDisplayMedia({
          video: true,
          audio: true,
        });

        // Assign the stream to the local video element
        if (localVideoRef.current) {
          localVideoRef.current.srcObject = localStream;
        }

        // Create a new RTCPeerConnection
        peerConnection = new RTCPeerConnection();

        // Add tracks from local stream to peer connection
        localStream.getTracks().forEach((track) => {
          peerConnection?.addTrack(track, localStream as MediaStream);
        });

        // Handle remote tracks
        peerConnection.ontrack = (event) => {
          if (remoteVideoRef.current) {
            remoteVideoRef.current.srcObject = event.streams[0];
          }
        };

        // Handle ICE candidates
        peerConnection.onicecandidate = (event) => {
          if (event.candidate) {
            ws.send(
              JSON.stringify({
                type: "iceCandidate",
                roomId,
                candidate: event.candidate,
              })
            );
          }
        };

        // If this peer is the sender, create and send an offer
        if (role === "sender") {
          const offer = await peerConnection.createOffer();
          await peerConnection.setLocalDescription(offer);
          ws.send(
            JSON.stringify({ type: "createOffer", roomId, sdp: offer.sdp })
          );
        }
      } catch (error) {
        console.error("Error during WebRTC initialization:", error);
      }
    };

    // Handle incoming WebSocket messages
    ws.onmessage = async (message: MessageEvent) => {
      const data = JSON.parse(message.data);

      if (peerConnection) {
        if (data.type === "createOffer" && role === "receiver") {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription({
              type: "offer",
              sdp: data.sdp,
            })
          );
          const answer = await peerConnection.createAnswer();
          await peerConnection.setLocalDescription(answer);
          ws.send(
            JSON.stringify({ type: "createAnswer", roomId, sdp: answer.sdp })
          );
        } else if (data.type === "createAnswer" && role === "sender") {
          await peerConnection.setRemoteDescription(
            new RTCSessionDescription({
              type: "answer",
              sdp: data.sdp,
            })
          );
        } else if (data.type === "iceCandidate") {
          await peerConnection.addIceCandidate(
            new RTCIceCandidate(data.candidate)
          );
        }
      }
    };

    // Initialize WebRTC on component mount
    initWebRTC();

    // Cleanup on component unmount
    return () => {
      if (localStream) {
        localStream.getTracks().forEach((track) => track.stop());
      }
      ws.close();
    };
  }, [role, roomId]);

  return (
    <div className="video-chat">
      <h1>Room: {roomId}</h1>
      {/* Local video */}
      <video ref={localVideoRef} autoPlay muted></video>
      {/* Remote video */}
      <video ref={remoteVideoRef} autoPlay></video>
    </div>
  );
};

export default VideoChat;
