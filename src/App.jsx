import Home from "./components/Home"
import {Route,Routes} from "react-router-dom";
import SideNav from "./components/Sidenav";
import Tasks from "./components/Tasks";
function App() {

  return (
    <>
    <Routes>
      <Route exact path="/" element={<Home/>} />
      <Route  path="/sidenav" element={<SideNav />} />
      <Route path="/tasks" element={<Tasks />} />
 </Routes> 
    </>
  )
}

export default App
