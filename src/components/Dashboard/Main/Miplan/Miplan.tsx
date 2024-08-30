import React from "react";
import { PlanActual } from "./PlanActual";

const Miplan: React.FC = () => {
  return (
    <>
      <div
        className={`p-3 mt-20 transition-all duration-1000  
        }`}
      >
        <div className="flex justify-center">
          <div className="flex flex-col items-center justify-center animate__animated animate__fadeInUp p-4 w-1/3">
            <PlanActual />
          </div>
        </div>
      </div>
    </>
  );
};

export default Miplan;
