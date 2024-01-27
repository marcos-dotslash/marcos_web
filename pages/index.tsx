import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect } from "react";
import Login from "@/components/Login";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  useEffect(() => {
    axios
      .post("api/hello")
      .then(function (response: any) {})
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);
  return (
    <main className={`${inter.className}`}>
      <div className="w-full flex justify-center mt-5">
        <Login />
      </div>
      <div className="homeDiv">
        <div>Jay Shree Ram 🚩</div>
        <div>Team Marcos 🚀</div>
        <div>
          <Image
            className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70]"
            src="/hacker.png"
            alt="Next.js Logo"
            width={180}
            height={37}
            priority
          />
        </div>
      </div>
    </main>
  );
}
