import { Typography } from "@material-tailwind/react";
import React from "react";
import { Lato } from "next/font/google";

const lato = Lato({ subsets: ["latin"], weight: ["400", "700"] });

const Schedule = () => {
  return (
    <div className="bg-[#fff] w-full mt-[40px] p-[30px] rounded-3xl h-[280px]">
      <div className="flex justify-between">
        <h2 className="text-lg font-bold">Today’s schedule</h2>
        <button className="text-[#858585] text-sm">See All</button>
      </div>
      <div className="flex flex-col gap-3">
        <div className={`pt-5`}>
          <div className="border-l-4 pl-4 border-[#9BDD7C] ">
            <Typography
              variant="h5"
              className={`text-[16px] text-[#666666] ${lato.className}`}
            >
              Meeting with suppliers from Kuta Bali
            </Typography>
            <Typography
              variant="p"
              className={`text-[#999999] text-sm ${lato.className}`}
            >
              14.00-15.00
            </Typography>
            <Typography
              variant="p"
              className={`text-[#999999] text-sm ${lato.className}`}
            >
              at Sunset Road, Kuta, Bali{" "}
            </Typography>
          </div>
        </div>
        <div className="pt-5">
          <div className="border-l-4 pl-4 border-[#6972C3] ">
            <Typography
              variant="h5"
              className={`text-[16px] text-[#666666] ${lato.className}`}
            >
              Check operation at Giga Factory 1
            </Typography>
            <Typography
              variant="p"
              className={`text-[#999999] text-sm ${lato.className}`}
            >
              18.00-20.00
            </Typography>
            <Typography
              variant="p"
              className={`text-[#999999] text-sm ${lato.className}`}
            >
              at Central Jakarta
            </Typography>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;
