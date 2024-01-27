import React, { useEffect, useState } from "react";

const Component = (props: any) => {
  const { components } = props;
  const [code, setCode] = useState("");
  useEffect(() => {
    console.log(components[0]);

    setCode(
      `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${components
        .map((element: any) => element.css)
        .join("\n")}</style></head><body>${components
        .map((element: any) => element.html)
        .join("\n")}</body><script>${components
        .map((element: any) => element.js)
        .join("\n")}</script></html>`
    );
  }, [components]);
  console.log(code);
  return (
    <div>
      <iframe className="w-full h-screen" srcDoc={code}></iframe>
      {/* <div
        className="homeDiv"
        dangerouslySetInnerHTML={{
          __html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.cssCode}</style></head><body>${code.htmlCode}</body></html>`,
        }}
      ></div> */}
    </div>
  );
};

export default Component;
