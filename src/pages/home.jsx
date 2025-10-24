import React,{useEffect}from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../app/components/header/header';
import "../pages/styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaGraduationCap, FaHandHoldingUsd, FaUniversity } from 'react-icons/fa';
//import studentImg from "../app/assests/studentlogo.png";
//import studentImg from "../app/assests/Homepage.png"
import Image1 from "../app/assests/Image1.png";
import Image2 from "../app/assests/Image2.png";
import Image3 from "../app/assests/Image3.png";
import Image4 from "../app/assests/Image4.png";
import Image5 from "../app/assests/Image5.png";
import { routePath as RP } from "../app/components/router/routepath";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
const Home=() =>{

  const navigate = useNavigate();
 const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");
    const roleId = localStorage.getItem("roleId");
  /*useEffect(() => {
    

    if (token && token !== "" && expiresAt && roleId && roleId !== "0") {
      const expiryTime = new Date(expiresAt).getTime();
      const now = new Date().getTime();

      if (now < expiryTime) {
        // Token valid → redirect to role dashboard
        redirectToDashboard(roleId);
      } else {
        // Token expired → clear it
       // localStorage.clear();
      }
    }
  }, [navigate]);*/

  // ✅ Helper function for redirection
  const redirectToDashboard = (roleId) => {
    debugger
    switch (roleId) {
      case "1":
        navigate(RP.studentdashboard);
        break;
      case "2":
        navigate(RP.sponsordashboard);
        break;
      case "4":
        navigate(RP.institutiondashboard);
        break;
      default:
        break;
    }
  };

  // ✅ Click Handlers
  /*const handleClickStudent = () => {
    debugger;
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");
    const roleId = localStorage.getItem("roleId");

    // if no valid token → go to login page
    if (!token || token === "" || !expiresAt || !roleId || roleId === "0") {
      navigate(RP.login, { state: { userType: "student" } });
    } else {
      const expiryTime = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      if (now < expiryTime) {
        redirectToDashboard(roleId);
      } else {
      //  localStorage.clear();
        navigate(RP.login, { state: { userType: "student" } });
      }
    }
  };

  const handleClickSponsor = () => {
    debugger;
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");
    const roleId = localStorage.getItem("roleId");

    if (!token || token === "" || !expiresAt || !roleId || roleId === "0") {
      navigate(RP.login, { state: { userType: "sponsor" } });
    } else {
      const expiryTime = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      if (now < expiryTime) {
        redirectToDashboard(roleId);
      } else {
       // localStorage.clear();
        navigate(RP.login, { state: { userType: "sponsor" } });
      }
    }
  };

  const handleClickInstitution = () => {
    debugger;
    const token = localStorage.getItem("token");
    const expiresAt = localStorage.getItem("expiresAt");
    const roleId = localStorage.getItem("roleId");

    if (!token || token === "" || !expiresAt || !roleId || roleId === "0") {
      navigate(RP.login, { state: { userType: "institution" } });
    } else {
      const expiryTime = new Date(expiresAt).getTime();
      const now = new Date().getTime();
      if (now < expiryTime) {
        redirectToDashboard(roleId);
      } else {
       // localStorage.clear();
        navigate(RP.login, { state: { userType: "institution" } });
      }
    }
  };*/
  const checkAndNavigate = (expectedRole, userType) => {
  const token = localStorage.getItem("token");
  const expiresAt = localStorage.getItem("expiresAt");
  const roleId = localStorage.getItem("roleId");
// 🔹 Special case: student → direct dashboard access
  if (expectedRole === "1") {
    navigate(RP.studentdashboard);
    return;
  }
  // 🔹 Case 1: No valid token → go to login
  if (!token || token === "" || !expiresAt || !roleId || roleId === "0") {
    navigate(RP.login, { state: { userType } });
    return;
  }

  // 🔹 Case 2: Token expired → go to login
  const expiryTime = new Date(expiresAt).getTime();
  const now = new Date().getTime();
  if (now >= expiryTime) {
    // localStorage.clear();
    navigate(RP.login, { state: { userType } });
    return;
  }

  // 🔹 Case 3: Role mismatch → force login
  if (roleId !== expectedRole) {
    navigate(RP.login, { state: { userType } });
    return;
  }

  // 🔹 Case 4: Valid token + correct role → redirect to dashboard
  redirectToDashboard(roleId);
};

// ✅ Click Handlers
const handleClickStudent = () => checkAndNavigate("1", "student");
/*const handleClickStudent=()=>{
  debugger;
  navigate(RP.studentdashboard);
}*/
const handleClickSponsor = () => checkAndNavigate("2", "sponsor");
const handleClickInstitution = () => checkAndNavigate("4", "institution");
 const testimonials = [
    {
      text: "VidyāSetu helped me secure a scholarship that made my education possible.",
      author: "– Ananya S. Student",
    },
    {
      text: "Thanks to VidyāSetu, I could focus on my studies without worrying about finances.",
      author: "– Rohan K. Scholar",
    },
    {
      text: "A smooth process and great support team. Highly recommended!",
      author: "– Meera P. Graduate",
    },
  ];
  const sliderSettings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 3000,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };
  return (

    <div className="homepage" style={{marginTop:"5%"}}>
      <Header/>
      {/* Hero Section */}
    <section className="hero">
  <div className="hero-left">
    <Carousel
      autoPlay
      infiniteLoop
      showThumbs={false}
      showStatus={false}
      interval={3000}
    >
      <div>
        <img src={Image1} alt="Student illustration" />
      </div>
      <div>
        <img src={Image2} alt="Image 1" />
      </div>
      <div>
        <img src={Image3} alt="Image 2" />
      </div>
      <div>
        <img src={Image4} alt="Image 3" />
      </div>
      <div>
        <img src={Image5} alt="Image 4" />
      </div>
    </Carousel>
  </div>

  <div className="hero-right">
    <h1>
      <span>
        Bridging Students with <br /> Scholarship Opportunities
      </span>
    </h1>
    <p>Discover and apply for scholarships or support aspiring scholars.</p>
    <button className="btn-primary">Find Your Path</button>
  </div>
</section>

      {/* Role Cards */}
      <section className="roles">
        <div className="role-card role-student cursor-pointer" onClick={handleClickStudent}>
  <FaGraduationCap size={70} color='#396D70' />
  <h3>For Students</h3>
  <p>Find scholarships that match your background interests.</p>
</div>

<div className="role-card role-sponsor cursor-pointer" onClick={handleClickSponsor}>
  <FaHandHoldingUsd size={70} color='#396D70' />
  <h3>For Sponsors</h3>
  <p>Support talented students and track their progress.</p>
</div>

<div className="role-card role-institution cursor-pointer" onClick={handleClickInstitution}>
  <FaUniversity size={70} color='#396D70' />
  <h3>For Institutions</h3>
  <p>Connect your students to a wide range of scholarships.</p>
</div>

      </section>

      {/* Testimonials */}
      {/*<section className="testimonials">
        <h2>Testimonials</h2>
        <blockquote>
          “VidyāSetu helped me secure a scholarship that made my education
          possible.”
        </blockquote>
        <p className="author">– Ananya S. Student</p>
      </section>*/}
      <section className="testimonials max-w-2xl mx-auto py-10 text-center">
        <h2 className="text-2xl font-bold mb-6">Testimonials</h2>
        <Slider {...sliderSettings}>
          {testimonials.map((t, i) => (
            <div key={i} className="p-6">
              <blockquote className="text-xl italic mb-4">“{t.text}”</blockquote>
              <p className="author text-gray-600">{t.author}</p>
            </div>
          ))}
        </Slider>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-left">
          <a href="#">Contact</a>
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
        </div>
        <div className="footer-right">
         <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-twitter"></i>
  </a>
  <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-facebook"></i>
  </a>
  <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
    <i className="fab fa-instagram"></i>
  </a>
        </div>
      </footer>
    </div>
  )
}

export default Home