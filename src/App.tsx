import {BrowserRouter,Routes,Route} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import {CreateRoom} from "./components/CreateRoom";
import { JoinRoom } from "./components/JoinRoom";
// import Sender from "./components/Sender";
import Reciver from "./components/Reciver";
import { SocketProvider } from "./context/SocketProviders";
import VideoChat from "./components/VideoChat";
export default function App(){
   return (
<>
<BrowserRouter>
<SocketProvider>
<Routes>
  <Route path="/" element={<Dashboard/>}/>
  <Route path="/createroom" element={<CreateRoom/>}/>
  <Route path="/joinroom" element={<JoinRoom/>}/>
  {/* <Route path="/room/:roomid" element={<Sender/>}/> */}
  <Route path="/reciver" element={<Reciver/>}/>
  <Route path="/video" element={<VideoChat/>}/>
</Routes></SocketProvider>
</BrowserRouter>
</>
  )
}
