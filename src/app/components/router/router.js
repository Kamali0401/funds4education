import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
//import Header from "../header/header";
import Home from "../../../pages/home";
import { routePath as RP } from "./routepath";
import StudentProfileForm from "../../../pages/headerscholarship/Studentprofile";
import ScholarshipDiscoveryForm from "../../../pages/discoverscholarship/ScholarshipDiscovery";
import ScholarshipMatch from "../../../pages/AIScholarshipmatch/ScholarshipMatch";
<<<<<<< HEAD
import Header from "../../components/header/header";
=======
import SponsorDashboard from "../../../pages/SponsorDashboard/Dashboard";
>>>>>>> d0a8325b1c8e364bf1534830c63eab90b62ae212

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
     <Route path={RP.Dashboard} element={<SponsorDashboard />} />

       {/*You can add more pages like below */}
        {/* <Route path="/scholarships" element={<Scholarships />} /> */}
      </Routes>
    </Router>
  );
}

export default App;
