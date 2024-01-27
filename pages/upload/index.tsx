import React, { useState } from "react";
import axios from "axios";
import { useSession } from "next-auth/react";

// ... other imports and useState declarations ...

const UploadFiles = () => {
  const [htmlFile, setHtmlFile] = useState(null);
  const [cssFile, setCssFile] = useState(null);
  const [jsFile, setJsFile] = useState(null);
  const [category, setCategory] = useState(""); // New state for category
  const { data: session } = useSession();

  const handleFileChange = (event: any, setFile: any) => {
    const file = event.target.files[0];
    setFile(file);
  };

  const handleUpload = async () => {
    if (!htmlFile) {
      alert("Please select the HTML file.");
      return;
    }

    const readAsText = (file: any) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => resolve(event.target?.result);
        reader.onerror = (error) => reject(error);
        reader.readAsText(file);
      });
    };

    try {
      const htmlContent = await readAsText(htmlFile);

      if (typeof htmlContent !== "string") {
        throw new Error("HTML content is not a string.");
      }

      const parser = new DOMParser();
      const doc = parser.parseFromString(htmlContent, "text/html");
      const bodyContent = doc.body.innerHTML;

      const cssContent = cssFile ? await readAsText(cssFile) : "";

      if (typeof cssContent !== "string") {
        throw new Error("CSS content is not a string.");
      }

      const cleanedCssContent = cssContent.replace(
        /(body|html|\*)\s*{[^}]*}/g,
        ""
      );

      const jsContent = jsFile ? await readAsText(jsFile) : "";

      const data = {
        htmlContent: bodyContent,
        cssContent: cleanedCssContent,
        jsContent,
        user: session?.user.id,
        category, // Include the category field
      };
      console.log(data);

      try {
        axios
          .post("api/crud/create_component", data)
          .then(function (response) {
            console.log("Upload successful:", response.data);
          })
          .catch(function (error) {
            console.log(error);
          });
      } catch (error: any) {
        console.error("Error fetching test details:", error.message);
      }
    } catch (error) {
      console.error("Error uploading files:", error);
    }
  };

  return (
    <div>
      {session && (
        <div>
          <h1>Upload HTML, CSS, and JS Files</h1>
          <h3>Use external CSS and JS files</h3>
          <input
            type="file"
            accept=".html"
            onChange={(e) => handleFileChange(e, setHtmlFile)}
          />
          <input
            type="file"
            accept=".css"
            onChange={(e) => handleFileChange(e, setCssFile)}
          />
          <input
            type="file"
            accept=".js"
            onChange={(e) => handleFileChange(e, setJsFile)}
          />
          {/* New category input field */}
          <input
            type="text"
            placeholder="Enter category"
            value={category}
            className="text-black"
            onChange={(e) => setCategory(e.target.value)}
          />
          <button onClick={handleUpload}>Upload Files</button>
        </div>
      )}
      {!session && <h1>please login</h1>}
    </div>
  );
};

export default UploadFiles;
