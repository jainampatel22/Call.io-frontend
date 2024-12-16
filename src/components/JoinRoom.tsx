// import * as React from "react"
// import { useEffect, useState, useCallback } from 'react';

// import { Button } from "@/components/ui/button"
// import { useNavigate  } from "react-router-dom";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"

// import { Boxes } from "./ui/background-boxes"
// import { Header } from "./Header"

// export function JoinRoom() {
//   const [email, setEmail] = useState("")
//   const [roomId, setRoomId] = useState("")
//   const socket = useSocket()
//   const navigate = useNavigate()
  
//   return (
//     <>
//       <div className="z-10 bg-black text-white">
//         <Header />
//       </div>

//       <div className="bg-black text-white flex justify-center items-center min-h-screen w-full">

//         <Boxes />

//         <Card className="w-[350px] z-10 bg-black">
//           <form >
//             <CardHeader>
//               <CardTitle>Join Room</CardTitle>
//               <CardDescription>Connect with your friends or family in 1 click</CardDescription>
//             </CardHeader>
//             <CardContent>

//               <div className="grid w-full items-center gap-4">
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="name">Name</Label>
//                   <Input
//                     id="name"
//                     placeholder="Enter Your Name"
//                     className="rounded-xl"
//                     onChange={(e) => setEmail(e.target.value)}
//                   />
//                 </div>
//                 <div className="flex flex-col space-y-1.5">
//                   <Label htmlFor="Roomid">Room Id</Label>
//                   <Input
//                     type="text"
//                     name="text"
//                     placeholder="Enter RoomId"
//                     className="rounded-xl"
//                     onChange={(e) => setRoomId(e.target.value)}
//                   />
//                 </div>
//               </div>


//             </CardContent>

//             <CardFooter className="flex justify-between">
//               <Button >Cancel</Button>
//               <Button variant="outline" type="submit" >Join</Button>
//             </CardFooter>
//           </form>
//         </Card>

//       </div>
//     </>

//   )
// }
