import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Login from "@/components/Login";
import MyModal from "@/components/MyModal";
import Component from "@/components/Component.jsx";
import toast, { Toaster } from "react-hot-toast";

import Preview from "../components/preview";
import Link from "next/link";
import { useRouter } from "next/navigation";

const inter = Inter({ subsets: ["latin"] });

interface Code {
  _id: string;
  html: string;
  css: string;
  js: string;
}

export default function Home(req: any) {
  const [codes, setCodes] = useState<Code[]>([]);
  const [allComps, setAllComps] = useState<Code[]>([]);
  // const [showPreview, setShowPreview] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const changeCodes = (
    newHtml: string,
    newCss: string,
    newJs: string,
    index: number,
    _id: string
  ) => {
    setCodes((prev) => {
      console.log(index);

      prev[index].html = newHtml;
      prev[index].css = newCss;
      prev[index].js = newJs;
      prev[index]._id = _id;

      return prev;
    });
  };

  useEffect(() => {
    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      if (codes.length > 0) {
        const message = "Your data may be lost!";
        event.returnValue = message;
        return message;
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [codes]); // Include codes in the dependency array

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeComponents = (code: any) => {
    setCodes(code);
  };
  // console.log(codes);
  const router = useRouter();
  const handlePreview = () => {
    // setShowPreview(true);
    localStorage.setItem("codes", JSON.stringify(codes));
    if (codes.length <= 0) {
      return toast.error("Select atleast one component to preview", {
        position: "bottom-center",
        style: { maxWidth: "800px" },
      });
    }
    router.push("/preview");
  };

  return (
    <>
      <main className={`${inter.className}`}>
        <Toaster />
        <div className="w-full flex justify-center mt-5">
          <Login />
        </div>
        <div className="flex justify-center pt-5">
          <div onClick={handlePreview}>
            <button className="px-6 py-1 mr-2 border-2 border-green-500 text-green-500 rounded-md cursor-pointer hover:bg-green-500 hover:text-white">
              Preview
            </button>
          </div>
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-6 py-1 border-2 ml-2 border-blue-500 text-blue-500 rounded-md cursor-pointer hover:bg-blue-500 hover:text-white"
          >
            {isModalOpen ? "Close" : "Add"}
          </button>
        </div>
        <Component
          components={codes}
          changeComponents={changeComponents}
          changeCodes={changeCodes}
        />
        <MyModal
          isModalOpen={isModalOpen}
          closeModal={closeModal}
          setCodes={setCodes}
          allComps={allComps}
          setAllComps={setAllComps}
          setIsModalOpen={setIsModalOpen}
        />
      </main>
      {/* {showPreview && <Preview />} */}
    </>
  );
}
