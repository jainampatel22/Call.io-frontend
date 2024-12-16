import {Routes,Route} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import {CreateRoom} from "./components/CreateRoom";
// import { JoinRoom } from "./components/JoinRoom";

import Room from "./components/Room";
export default function App(){
   return (
<>
<Routes>
  <Route path="/" element={<Dashboard/>}/>
  <Route path="/createroom" element={<CreateRoom/>}/>
  {/* <Route path="/joinroom" element={<JoinRoom/>}/> */}
  <Route path="/room/:id" element={<Room/>}/>
</Routes>
</>
  )
}
