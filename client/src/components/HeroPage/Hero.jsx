import React from "react";
import hero from "../../assets/hero.svg";
import { useNavigate } from "react-router-dom";
const Hero = () => {

    const navigate=useNavigate();
  return (
    <div className="flex flex-col h-[100vh] justify-center items-center overflow-y-hidden">
      <img src={hero} alt="hero" width={200} className="" />

      <div className="flex flex-col items-center justify-center w-[90%]">
        <h1 className="text-[2rem]   font-mono  ">
          Refine Your Life Management
        </h1>
        <p className="text-[0.9rem] font-mono mt-2">
          A minimalist Notes app which helps you manage your time and be
          productive, the monochrome design avoids it from being destracting
        </p>
      </div>

      <button
        className='relative group px-8 h-14 bg-black mt-10 rounded-md
                      before:absolute 
                      before:inset-0 
                      before:bg-slate-700 
                      before:scale-x-0 
                      before:origin-right
                      before:transition
                      before:duration-300
                      before:rounded-md
                      hover:before:scale-x-100
                      hover:before:origin-left
                      ">'

                      onClick={()=>navigate("/loginUserRoute")}
      >
        <span className="relative uppercase text-base text-white px-4 py-2 text-[1rem]">Let's Start</span>
      </button>
    </div>
  );
};

export default Hero;
