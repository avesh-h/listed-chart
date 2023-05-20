import React from "react";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

const SideBoard = () => {
  return (
    <div>
      <p className={`text-white text-7xl font-bold ${montserrat.className}`}>
        Board.
      </p>
    </div>
  );
};

export default SideBoard;
