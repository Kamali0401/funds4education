import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "../header/header";
import Home from "../../../pages/home";
import { routePath as RP } from "./routepath";
import StudentProfileForm from "../../../pages/headerscholarship/Studentprofile";
function App() {
  return (
    <Router>
    
      <Routes>
     <Route path={RP.home} element={<Home />} />
     <Route path ={RP.studentdashboard} element={<StudentProfileForm/>}/>
       {/*You can add more pages like below */}
        {/* <Route path="/scholarships" element={<Scholarships />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
