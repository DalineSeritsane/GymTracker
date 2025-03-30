import React from "react";
import { Link, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import "../styles/hero.css";



const Hero = () => {
  const navigate = useNavigate();
  const handleNavigation = () => {
    navigate('/workout');
  };
    return (
        <div className="landing-page">
        <section className="hero-section d-flex align-items-center justify-content-center">
          <div className="overlay"></div>
          <div className="container text-center text-light">
            <h1 className="display-3 fw-bold" style={{marginTop:"250px"}}>Welcome to The Empowershe Fitness</h1>
            <p className="lead mb-4">
            Every Drop of Sweat is an Investment in You! Stronger bodies, Stronger minds!
            </p>
            <Link to={"/workout"}></Link><button className="home-button btn btn-primary btn-lg" onClick={handleNavigation}>Get Started Here</button>
          </div>
        </section>
      </div>
    );
  };

export default Hero;