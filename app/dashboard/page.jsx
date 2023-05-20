"use client";

import React, { useEffect } from "react";
import Layout from "./layout";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Cards from "@/components/dashboard/Cards";
import { LineChart } from "@/components/Charts/LineChart";
import { PieChart } from "@/components/Charts/PieChart";
import Schedule from "@/components/Charts/Schedule";

const Dashboard = () => {
  const { data: session } = useSession();
  const router = useRouter();

  if (!session?.user) {
    router.push("/");
    return null;
  }

  return (
    <div>
      <Cards />
      <LineChart />
      <div className="flex w-full gap-[40px]">
        <div className="w-1/2">
          <PieChart />
        </div>
        <div className="w-1/2">
          <Schedule />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
