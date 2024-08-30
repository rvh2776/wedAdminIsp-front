'use client'
import { useSidebarContext } from "@/context/SidebarContext";
import React from "react";
// import SpeedTest from "./TestDeVelocidadComponent";

const Testdevelocidad: React.FC = () => {
  const { btnFixed } = useSidebarContext();
  return (
    // mt-[-13%]
    <div
      className={`p-3  transition-all duration-1000 ${
        btnFixed ? "ml-[8%]" : "ml-[3%]"
      }`}
    >

      <iframe 
      src="https://www.nperf.com/es/" 
      width="100%" 
      height="1200px"
      scrolling="no" 
      style={{  overflow: "hidden", 
                margin: "0px", 
                padding: "0px", 
                maxWidth:" 1900px", 
                border: "none",
                width: "100%",
                height: "calc(100vh + 250px)", 
                transform: "translateY(-250px)",
                position: "fixed",
              }}
      >
      </iframe>
    
     </div>
     
  );
};

export default Testdevelocidad;
