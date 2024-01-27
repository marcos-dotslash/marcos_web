import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import Login from "@/components/Login";
import Modal from "react-modal";
import Component from "@/components/Component.jsx";
import toast, { Toaster } from "react-hot-toast";

const inter = Inter({ subsets: ["latin"] });

interface Code {
  id: string;
  html: string;
  css: string;
  js: string;
}

export default function Home(req:any) {

  
  const [codes, setCodes] = useState<Code[]>([]);
  const [allComps, setAllComps] = useState<Code[]>([]);
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [categories, setCategories] = useState<string[]>([
    "navbar",
    "footer",
    "card",
    "slider",
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const changeCodes = (
    newHtml: string,
    newCss: string,
    newJs: string,
    index: number
  ) => {
    setCodes((prev) => {
      console.log(index);

      prev[index].html = newHtml;
      prev[index].css = newCss;
      prev[index].js = newJs;

      return prev;
    });
  };

  const customModalStyles = {
    content: {
      backgroundColor: "black",
      color: "white",
      padding: "20px",
      maxWidth: "80%", // Adjust the maximum width as needed
      margin: "auto",
    },
    overlay: {
      backgroundColor: "rgba(0, 0, 0, 0.5)", // Adjust the transparency if needed
    },
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

  const fetchComponentsByCategory = (index: number) => {
    // Fetch components based on the selected category
    console.log(categories[index]);
    const data = { catagory: categories[index] };
    axios
      .post("api/crud/read_component", data)
      .then(function (response: any) {
        const { components } = response.data;
        setAllComps(components);
        setSelectedCategory(categories[index]);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  };

  const openModal = (index: number) => {
    setSelectedCodeIndex(index);
    fetchComponentsByCategory(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const changeComponents = (code: any) => {
    setCodes(code);
  };
  // console.log(codes);

  return (
    <main className={`${inter.className}`}>
      <Toaster />
      <div className="w-full flex justify-center mt-5">
        <Login />
      </div>
      <div className="flex justify-center pt-5">
        <button
          onClick={() => setIsModalOpen(true)}
          className="my-5 px-4 font-semibold text-lg bg-green-500 p-2 rounded-md text-center mx-2 cursor-pointer"
        >
          {isModalOpen ? "Close" : "Add"}
        </button>
      </div>
      <Component
        components={codes}
        changeComponents={changeComponents}
        changeCodes={changeCodes}
      />

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        <div className="flex flex-wrap justify-center">
          {categories.map((category, index) => (
            <div
              key={index}
              className="my-5 bg-blue-500 p-2 rounded-md text-center mx-2 cursor-pointer"
              onClick={() => openModal(index)}
            >
              {category}
            </div>
          ))}
        </div>
        <div className="absolute left-[90%] top-5 flex justify-center mt-5">
          <button onClick={closeModal} className="p-2 rounded-md bg-red-500">
            Close
          </button>
        </div>
        {selectedCategory && (
          <>
            <div className="text-white mb-3">
              Components under selected category:
            </div>
            {allComps.map((code, index) => (
              <div key={index} className="px-5">
                <div>
                  <iframe
                    className="w-[70vw] h-[70vh]"
                    srcDoc={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.css}</style></head><body>${code.html}</body><script>${code.js}</script></html>`}
                  ></iframe>
                </div>
                <div className="mb-5 flex justify-center">
                  <button
                    onClick={() => {
                      toast.success("Component added successfully");
                      setCodes((prevCode) => {
                        const newCode: Code = {
                          id: code.id,
                          html: code.html,
                          css: code.css,
                          js: code.js,
                        };
                        return [...prevCode, newCode];
                      });
                    }}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Choose
                  </button>
                </div>
                <hr className="bg-white" />
              </div>
            ))}
          </>
        )}
      </Modal>
      <a href="/codeEditor">Next</a>
    </main>
  );
}
