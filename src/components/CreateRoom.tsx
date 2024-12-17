
import  { useContext, useState } from 'react';

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { SocketContext } from "@/context/SocketProviders";
import { Boxes } from "./ui/background-boxes"
import { Header } from "./Header"
export function CreateRoom () {
const [email, setEmail] = useState("")
const [roomid, setRoomid] = useState("")
const { socket } = useContext(SocketContext) || {};
console.log(roomid,email)
const createRoom = () => {
  console.log("creating new Room", socket); // Logs socket instance for debugging
  if (socket) {
    socket.emit("create-room");
  }
};


  return (
<>
<div className="z-10 bg-black text-white">
<Header/>
</div>

<div className="bg-black text-white flex justify-center items-center min-h-screen w-full">

  <Boxes/>
<Card className="w-[350px] z-10 bg-black">
      <CardHeader>
        <CardTitle>Create Room</CardTitle>
        <CardDescription>Connect with your friends or family in 1 click</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="name">Name</Label>
              <Input id="name" placeholder="Enter Your Name" className="rounded-xl" onChange={(e)=>setEmail(e.target.value)} />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="Roomid">Room Id</Label>
             <Input type="text" name="text" placeholder="Enter RoomId" className="rounded-xl"  onChange={(e)=>setRoomid(e.target.value)} />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button >Cancel</Button>
        <Button variant="outline">Create</Button>
        <button onClick={createRoom}>Join</button>
      </CardFooter>
    </Card>
</div>
</>

  )
}
