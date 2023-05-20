"use client";

import {
  Card,
  Typography,
  List,
  ListItem,
  ListItemPrefix,
  ListItemSuffix,
  Chip,
} from "@material-tailwind/react";
import {
  PresentationChartBarIcon,
  ShoppingBagIcon,
  UserCircleIcon,
  Cog6ToothIcon,
  InboxIcon,
  PowerIcon,
} from "@heroicons/react/24/solid";
import DashboardSVG from "@/public/assets/icons/sidebar/dashboard";
import TransactionSVG from "@/public/assets/icons/sidebar/transaction";
import ScheduleSVG from "@/public/assets/icons/sidebar/schedule";
import SettingSVG from "@/public/assets/icons/sidebar/setting";
import UserSVG from "@/public/assets/icons/sidebar/user";
import { Montserrat } from "next/font/google";
import Image from "next/image";

const montserrat = Montserrat({ subsets: ["latin"], weight: ["400", "700"] });

export default function SideBar() {
  return (
    <Card
      className={`fixed top-4 left-4 h-[calc(100vh-2rem)] w-full max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5 bg-black w-[275px]`}
    >
      <div className="mb-2 p-4">
        <Typography
          variant="h5"
          color="white"
          className={`${montserrat.className}`}
        >
          Board.
        </Typography>
      </div>
      <List className={`text-white font-extralight ${montserrat.className}`}>
        <ListItem>
          <ListItemPrefix>
            <DashboardSVG />
          </ListItemPrefix>
          Dashboard
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <TransactionSVG />
          </ListItemPrefix>
          Transaction
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <ScheduleSVG />
          </ListItemPrefix>
          Schedules
          <ListItemSuffix></ListItemSuffix>
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <UserSVG />
          </ListItemPrefix>
          Users
        </ListItem>
        <ListItem>
          <ListItemPrefix>
            <SettingSVG />
          </ListItemPrefix>
          Settings
        </ListItem>
      </List>
    </Card>
  );
}
