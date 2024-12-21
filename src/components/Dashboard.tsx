"use client";

import { Boxes } from "./ui/background-boxes";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Header } from "./Header";

import { Video, Phone } from 'lucide-react';
import { useNavigate } from "react-router-dom";

export function Dashboard() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white overflow-hidden flex flex-col">
  <Header />

  <main className="relative flex-grow">
    <Boxes />

    <div className="container mx-auto px-4 sm:px-6 py-8 sm:py-16 relative z-10 flex flex-col items-center">
      <div className="text-center max-w-3xl mb-8 sm:mb-16">
        <h1 className="font-mono text-3xl sm:text-4xl lg:text-5xl font-bold mb-4 sm:mb-6">
          Video Calls And Meetings For Everyone
        </h1>
        <p className="text-lg sm:text-xl text-gray-400">
          Connect with anyone, anywhere, anytime. Experience high-quality video calls with Call.io.
        </p>
      </div>
      <Card className="bg-slate-900/50 border-slate-800 backdrop-blur-sm w-full max-w-sm sm:max-w-xl">
        <CardHeader>
          <CardTitle className="font-mono text-xl sm:text-2xl">Start a Meeting</CardTitle>
          <CardDescription>Create or join a video call in seconds</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <img
            src="https://explore.zoom.us/media/absmbsectionimage.png"
            alt="Video call preview"
            width={200}
            height={100}
            className="rounded-lg object-cover w-full"
          />
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              size="lg"
              className="flex-1 font-mono w-full"
              onClick={() => navigate("/createroom")}
            >
              <Video className="mr-2 h-4 w-4" /> Create Call
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="flex-1 font-mono w-full"
              onClick={() => navigate("/joinroom")}
            >
              <Phone className="mr-2 h-4 w-4" /> Join Call
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  </main>

  {/* Footer remains unchanged */}
</div>

  );
}
