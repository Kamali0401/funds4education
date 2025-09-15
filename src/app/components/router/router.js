import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../../../pages/home";
import { routePath as RP } from "./routepath";
import StudentProfileForm from "../../../pages/studentscholarship/Studentprofile";
import ScholarshipDiscoveryForm from "../../../pages/discoverscholarship/ScholarshipDiscovery";
import ScholarshipMatch from "../../../pages/AIScholarshipmatch/ScholarshipMatch";
import SponsorDashboard from "../../../pages/SponsorDashboard/Dashboard";
import Header from "../../components/header/header";

// 🔹 Map routes to header variants
const routeToVariant = {
  [RP.home]: "public",
  [RP.studentdashboard]: "student-profile",
  [RP.scholarshipdiscovery]: "discovery",
  [RP.scholarshipmatch]: "student",
  [RP.sponsordashboard]: "dashboard",
};

// 🔹 Layout wrapper
function Layout({ children }) {
  const location = useLocation();
  const variant = routeToVariant[location.pathname] || "public"; // fallback
  return (
    <>
      <Header variant={variant} />
      <main>{children}</main>
    </>
  );
}

function App() {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path={RP.home} element={<Home />} />
          <Route path={RP.studentdashboard} element={<StudentProfileForm />} />
          <Route path={RP.scholarshipdiscovery} element={<ScholarshipDiscoveryForm />} />
          <Route path={RP.scholarshipmatch} element={<ScholarshipMatch />} />
          <Route path={RP.sponsordashboard} element={<SponsorDashboard />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
