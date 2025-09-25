import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Home from "../../../pages/home";
import { routePath as RP } from "./routepath";
import StudentProfileForm from "../../../pages/studentscholarship/Studentprofile";
import ScholarshipDiscoveryForm from "../../../pages/discoverscholarship/ScholarshipDiscovery";
import ScholarshipMatch from "../../../pages/AIScholarshipmatch/ScholarshipMatch";
import SponsorDashboard from "../../../pages/SponsorDashboard/Dashboard";
import Header from "../../components/header/header";
import LoginPage from "../../../pages/login/login";
import SignUpPage from "../../../pages/login/signup";
import SponsorDashboardReport from "../../../pages/SponsorDashboardReport/SponsorDashboardReport";
import MonetizationAds from "../../../pages/MonetizationAds/MonetizationAds";
// 🔹 Map routes to header variants
const routeToVariant = {
  [RP.home]: "public",
  [RP.studentdashboard]: "student-profile",
  [RP.scholarshipdiscovery]: "discovery",
  [RP.scholarshipmatch]: "student",
  [RP.sponsordashboard]: "dashboard",
  [RP.login]: "login",
  [RP.signup]: "signup",
  [RP.sponsordashboardreport]: "sponsordashboardreport",
  [RP.monetizationads]: "monetizationads",
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
          <Route path={RP.login} element={<LoginPage />} />
                    <Route path={RP.signup} element={<SignUpPage />} />
          <Route path={RP.sponsordashboardreport} element={<SponsorDashboardReport />} />
          <Route path={RP.monetizationads} element={<MonetizationAds />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
