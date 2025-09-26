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
import StudentWalletRedemption from "../../../pages/student/studentwaletredemption";
import StudentWallet from "../../../pages/student/studentwalet";
import StudentRedemptionCatalog from "../../../pages/student/studentredemptioncalog";
import StudentRewards from "../../../pages/student/studentrewards";
import SponsorDashboardReport from "../../../pages/SponsorDashboardReport/SponsorDashboardReport";
import MonetizationAds from "../../../pages/MonetizationAds/MonetizationAds";
import SponsorAdDashboard from "../../../pages/SponsorAdDashboard/SponsorAdDashboard";
import ApplicationsPage from "../../../pages/student/studentApplication";
import AddApplicationPage from "../../../pages/student/addApplication";

// 🔹 Map routes to header variants
const routeToVariant = {
  [RP.home]: "public",
  [RP.studentdashboard]: "student-profile",
  [RP.scholarshipdiscovery]: "discovery",
  [RP.scholarshipmatch]: "student",
  [RP.sponsordashboard]: "dashboard",
  [RP.login]: "login",
  [RP.signup]: "signup",
  [RP.studentwalletredemption]: "studentwalletredemption",
  [RP.studentwallet]: "studentwallet",
  [RP.studentredemptioncalog]: "studentredemptioncalog",
  [RP.studentrewards]: "studentrewards",

  [RP.sponsordashboardreport]: "sponsordashboardreport",
  [RP.monetizationads]: "monetizationads",
  [RP.sponsoraddashboard]: "sponsoraddashboard",
  [RP.applications]: "student-profile",
  [RP.addapplication]: "application",
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
          <Route path={RP.studentwallet} element={<StudentWallet />} />
          <Route path={RP.studentwalletredemption} element={<StudentWalletRedemption />} />
          <Route path={RP.studentredemptioncalog} element={<StudentRedemptionCatalog />} />
          <Route path={RP.studentrewards} element={<StudentRewards />} />
          <Route path={RP.sponsordashboardreport} element={<SponsorDashboardReport />} />
          <Route path={RP.monetizationads} element={<MonetizationAds />} />
          <Route path={RP.sponsoraddashboard} element={<SponsorAdDashboard />} />
          <Route path={RP.applications} element={<ApplicationsPage />} />
          <Route path={RP.addapplication} element={<AddApplicationPage />} />

        </Routes>
      </Layout>
    </Router>
  );
}

export default App;
