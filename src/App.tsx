import {Routes,Route} from "react-router-dom";
import { Dashboard } from "./components/Dashboard";
import { CreateRoomPage } from "./components/CreateRoom";
import { JoinRoomPage } from "./components/JoinRoom";


import Demo from "./components/Demo";
import Landing from "./components/Landing";
import LandingTest from "./components/LandingTest";
export default function App(){
   return (
<>
<Routes>
  <Route path="/" element={<Dashboard/>}/>
  <Route path="/createroom" element={<CreateRoomPage/>}/>
  <Route path="/joinroom" element={<JoinRoomPage/>}/>
  <Route path="/room/:id" element={<LandingTest/>}/>
  <Route path="/getDemo" element={<Demo/>}/>
<Route path="/videopage" element={<LandingTest/>}/>
  <Route path="/dashboard" element={<Landing/>}/>
</Routes>
</>
  )
}
