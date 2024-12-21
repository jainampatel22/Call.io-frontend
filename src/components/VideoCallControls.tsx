import React from 'react';
import { Button } from "@/components/ui/button"
import { Mic, MicOff, Video, VideoOff } from 'lucide-react'

interface VideoCallControlsProps {
  isMuted: boolean;
  video: boolean;
  toggleMute: () => void;
  toggleVideo: () => void;
}

export function VideoCallControls({ isMuted, video, toggleMute, toggleVideo }: VideoCallControlsProps) {
  return (
    <div className="flex gap-4 items-center justify-center">
      {/* Mute/Unmute Button */}
      <Button
        variant={isMuted ? "destructive" : "secondary"}
        size="lg"
        className="rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleMute}
      >
        {isMuted ? (
          <>
            <MicOff className="w-5 h-5 mr-2" />
            Unmute
          </>
        ) : (
          <>
            <Mic className="w-5 h-5 mr-2" />
            Mute
          </>
        )}
      </Button>

      {/* Video Toggle Button */}
      <Button
        variant={video ? "secondary" : "destructive"}
        size="lg"
        className="rounded-full transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        onClick={toggleVideo}
      >
        {video ? (
          <>
            <Video className="w-5 h-5 mr-2" />
            Video On
          </>
        ) : (
          <>
            <VideoOff className="w-5 h-5 mr-2" />
            Video Off
          </>
        )}
      </Button>
    </div>
  );
}

