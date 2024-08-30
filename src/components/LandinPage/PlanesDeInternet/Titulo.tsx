import React from "react";
import titleProps from "./TitleType";

export const TituloPlanesInternet: React.FC<titleProps> = ({ title }) => {
  return (
    <>
      <div className="flex justify-center ">
        <h1 className="text-4xl md:text-5xl sm:text-3xl text-textBlue text-center font-bold mb-10 mt-10 ml-1  ">
          {title}
        </h1>
      </div>
    </>
  );
};
