import React from "react";
import casaIcono from "../../../../pics/iconoCasa.svg";
import FlipBoxProps from "./Type";

export const FlipBox: React.FC<FlipBoxProps> = ({
  frontTitle,
  backTitle,
  imgSrc,
  imgAlt,
}) => {
  return (
    <div className="flip-box w-full h-30 ">
      <div className="flip-box-inner w-1/3">
        <div className="flip-box-front bg-white text-textBlue  flex items-center justify-center w-full h-full rounded-b-xl shadow-md">
          <h1 className="absolute top-0 left-0 right-0 mt-4 text-center text-4xl font-bold z-10 ">
            {frontTitle}
          </h1>
          <img src={imgSrc} alt={imgAlt} className="w-1/4 mt-10" />
        </div>

        <div className="flip-box-back bg-gradient-to-r from-[#0279F0] to-[#00478F] text-white flex items-center justify-center w-full h-full rounded-b-xl shadow-md">
          <h1 className="text-xl font-bold"> {backTitle}</h1>
        </div>
      </div>
    </div>
  );
};
