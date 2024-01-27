import Image from "next/image";
import { Inter } from "next/font/google";
import axios from "axios";
import { useEffect, useState } from "react";
import Login from "@/components/Login";
import Modal from "react-modal";
const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [codes, setCodes] = useState<any[]>([]);
  const [selectedCodeIndex, setSelectedCodeIndex] = useState<number | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);

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
    axios
      .post("api/hello")
      .then(function (response: any) {
        const { components } = response.data;

        setCodes(components);
      })
      .catch(function (error: any) {
        console.log(error);
      });
  }, []);

  const openModal = (index: number) => {
    setSelectedCodeIndex(index);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <main className={`${inter.className}`}>
      <div className="w-full flex justify-center mt-5">
        <Login />
      </div>

      <button onClick={() => setIsModalOpen(true)} className="text-4xl">
        {isModalOpen ? "✘" : "+"}
      </button>

      <Modal
        isOpen={isModalOpen}
        onRequestClose={closeModal}
        style={customModalStyles}
      >
        {codes.map((code, index) => (
          <div key={index} className="my-5">
            <div
              className="homeDiv"
              dangerouslySetInnerHTML={{
                __html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.cssCode}</style></head><body>${code.htmlCode}</body></html>`,
              }}
            ></div>
          </div>
        ))}
      </Modal>
    </main>
  );
}
