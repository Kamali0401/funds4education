import React from 'react'
import { useNavigate } from "react-router-dom";
import Header from '../app/components/header/header';
import "../pages/styles.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { FaGraduationCap, FaHandHoldingUsd, FaUniversity } from 'react-icons/fa';
import studentImg from "../app/assests/studentlogo.png";
import { routePath as RP } from "../app/components/router/routepath";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Home=() =>{

  const navigate = useNavigate();

  const handleClick = () => {
    navigate(RP.studentdashboard); 
  };
  const handleSponsorClick = () => {
  navigate(RP.sponsordashboard); 
};
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

    <div className="homepage">
      <Header/>
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-left">
        <img src={studentImg} alt="Student illustration" />
        </div>
        <div className="hero-right">
          <h1>
          <span>  Bridging Students with <br />
            Scholarship Opportunities</span>
          </h1>
          <p>
            Discover and apply for scholarships or support aspiring scholars.
          </p>
          <button className="btn-primary">Find Your Path</button>
        </div>
      </section>

      {/* Role Cards */}
      <section className="roles">
        <div className="role-card role-student cursor-pointer" onClick={handleClick}>
             <FaGraduationCap size={35} color='#396D70' />
          <h3>For Students</h3>
          <p>Find scholarships that match your background interests.</p>
        </div>
        <div className="role-card role-sponsor" onClick={handleSponsorClick}>
          <FaHandHoldingUsd size={35} color='#396D70'  />
          <h3>For Sponsors</h3>
          <p>Support talented students and track their progress.</p>
        </div>
        <div className="role-card role-institution">
            <FaUniversity size={35} color='#396D70' />
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