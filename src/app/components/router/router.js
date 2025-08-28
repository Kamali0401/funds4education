import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "../header/header";
import Home from "../../../pages/home";
import { routePath as RP } from "./routepath";
import StudentProfileForm from "../../../pages/headerscholarship/Studentprofile";
import ScholarshipDiscoveryForm from "../../../pages/discoverscholarship/ScholarshipDiscovery";
import ScholarshipMatch from "../../../pages/AIScholarshipmatch/ScholarshipMatch";
import Header from "../../components/header/header";

function App() {
  return (
    <Router>
    
      <Routes>
     <Route path={RP.home} element={<Home />} />
     <Route path ={RP.studentdashboard} element={<StudentProfileForm/>}/>
<Route
  path={RP.scholarshipdiscovery}
  element={
    <>
      <Header variant="discovery" />   {/* 👈 This will show screenshot header */}
      <ScholarshipDiscoveryForm />
    </>
  }
/>
     <Route path ={RP.scholarshipmatch } element={<ScholarshipMatch/>}/>

       {/*You can add more pages like below */}
        {/* <Route path="/scholarships" element={<Scholarships />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
