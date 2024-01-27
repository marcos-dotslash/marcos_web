import React, { useEffect, useState } from "react";

const Component = (props: any) => {
  const { components } = props;

  const [code, setCode] = useState(components);

  useEffect(() => {
    setCode(components);
  }, [components]);

  const moveElementUp = (index: number) => {
    if (index > 0) {
      const updatedComponents = [...code];
      [updatedComponents[index - 1], updatedComponents[index]] = [
        updatedComponents[index],
        updatedComponents[index - 1],
      ];
      setCode(updatedComponents);
    }
  };

  const moveElementDown = (index: number) => {
    if (index < code.length - 1) {
      const updatedComponents = [...code];
      [updatedComponents[index], updatedComponents[index + 1]] = [
        updatedComponents[index + 1],
        updatedComponents[index],
      ];
      setCode(updatedComponents);
    }
  };

  const deleteElement = (index: number) => {
    const updatedComponents = [...code];
    updatedComponents.splice(index, 1);
    setCode(updatedComponents);
  };

  return (
    <div className="space-y-8">
      {code.map((element: any, index: any) => (
        <div key={index} className="p-4 rounded-md">
          <div
            dangerouslySetInnerHTML={{
              __html: `<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${element.css}</style></head><body>${element.html}</body><script>${element.js}</script></html>`,
            }}
          ></div>
          <div className="flex justify-between items-center mt-4">
            <div className="flex space-x-2">
              <button
                onClick={() => moveElementUp(index)}
                className="bg-blue-500 text-white px-4 py-2 rounded"
              >
                Move Up
              </button>
              <button
                onClick={() => moveElementDown(index)}
                className="bg-green-500 text-white px-4 py-2 rounded"
              >
                Move Down
              </button>
            </div>
            <button
              onClick={() => deleteElement(index)}
              className="bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Component;
