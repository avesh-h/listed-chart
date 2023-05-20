import React from "react";
// import "../../public/assets/icons";
import Card from "../../components/dashboard/Card";
import { Content } from "next/font/google";
import CardOneSVG from "../../public/assets/icons/cardone";
import CardTwoSVG from "../../public/assets/icons/cardtwo";
import CardThreeSVG from "../../public/assets/icons/cardthree";
import CardFourSVG from "../../public/assets/icons/cardfour";

const CONTENT = [
  {
    heading: "Total Revenue",
    amount: "$2,129,430",
    svg: <CardOneSVG />,
    bg: "bg-[#DDEFE0]",
  },
  {
    heading: "Total transaction",
    amount: "1,520",
    svg: <CardTwoSVG />,
    bg: "bg-[#F4ECDD]",
  },
  {
    heading: "Total Likes",
    amount: "9,721",
    svg: <CardThreeSVG />,
    bg: "bg-[#EFDADA]",
  },
  {
    heading: "Total Users",
    amount: "892",
    svg: <CardFourSVG />,
    bg: "bg-[#DEE0EF]",
  },
];

const Cards = () => {
  return (
    <div className="flex justify-between">
      {CONTENT.map((data) => {
        return <Card data={data} key={`${data.amount}-${data.bg}`} />;
      })}
    </div>
  );
};

export default Cards;
