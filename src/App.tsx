import {Routes,Route} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { CreateRoomPage } from "./components/CreateRoom";
import { JoinRoomPage } from "./components/JoinRoom";

import Room from "./components/Room";
export default function App(){
   return (
<>
<Routes>
  <Route path="/" element={<Dashboard/>}/>
  <Route path="/createroom" element={<CreateRoomPage/>}/>
  <Route path="/joinroom" element={<JoinRoomPage/>}/>
  <Route path="/room/:id" element={<Room/>}/>
</Routes>
</>
  )
}
