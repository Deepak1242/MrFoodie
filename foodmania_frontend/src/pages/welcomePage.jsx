import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar.jsx";
import Hero from "../components/hero.jsx"
gsap.registerPlugin(ScrollTrigger);

const Welcome = () => {
  return (
    <div className="bg-primary1 min-h-[100vh] min-w-[100vw] hide-scrollbar ">
      <Navbar />

      <Hero />
     
    </div>
  );
};

export default Welcome;