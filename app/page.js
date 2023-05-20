"use client";
import { useEffect } from "react";
import LoginForm from "@/components/Form/LoginForm";
import SideBoard from "@/components/SideBoard";
import styles from "./Home.module.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
// import "./globals.css";

export default function Home() {
  const { data: session } = useSession();
  const router = useRouter();
  // useEffect(() => {
  //   if (session?.user) {
  //     router.push("/dashboard");
  //   } else {
  //     router.push("/");
  //   }
  // }, [session]);

  if (session?.user) {
    router.push("/dashboard");
    return null;
  }
  return (
    <div className={`w-full flex ${styles.full_box}`}>
      <div className={`bg-black ${styles.left_box}`}>
        <SideBoard />
      </div>
      <div className={`${styles.right_box}`}>
        <LoginForm />
      </div>
    </div>
  );
}
