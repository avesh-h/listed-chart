"use client";

import SideBar from "@/components/Sidebar/SideBar";
import Navbar from "../../components/Navbar/Navbar";

const layout = ({ children }) => {
  // const { data: session } = useSession();
  // const router = useRouter();
  // // console.log("layout", session);
  // if (!session?.user) router.push("/");
  return (
    <div className={`w-full float-left flex`}>
      <div className="w-[22%]">
        <SideBar />
      </div>
      <div className="w-[76%]">
        <Navbar />
        <div className="p-5">{children}</div>
      </div>
    </div>
  );
};

export default layout;
