import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import Editor from "./codeEditor/Editor";
import Button from "./codeEditor/Button";
import { LiveEditor, LiveError, LiveProvider, LivePreview } from "react-live";
const Component = (props) => {
  const { components } = props;

  useEffect(() => {
    // console.log("c "+components[0
  }, [components]);

  // const { components } = props;
  const [indexComponent, setIndexComponent] = useState(-1);
  const [html, setHtml] = useState("");
  const [css, setCss] = useState("");
  const [js, setJs] = useState("");
  // const [code, setCode] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(true);
  const [openedEditor, setOpenedEditor] = useState("html");

  const onTabClick = (editorName) => {
    setOpenedEditor(editorName);
  };

  const setHtmlCode = (value) => {
    setHtml((prev) => {
      props.changeCodes(value, css, js, indexComponent);
      return value;
    });
  };

  const setCssCode = (value) => {
    setCss((prev) => {
      props.changeCodes(html, value, js, indexComponent);
      return value;
    });
  };

  const setJsCode = (value) => {
    setJs((prev) => {
      props.changeCodes(html, css, value, indexComponent);
      return value;
    });
  };

  return (
    <div>
      {components.map((code, index) => (
        <div
          key={index}
          className="my-5 bg-blue-500 p-5"
          onClick={() => {
            setHtml((prev) => {
              return code.html;
            });
            setCss((prev) => {
              return code.css;
            });
            setJs((prev) => {
              return code.js;
            });
            setIndexComponent((prev) => {
              return index;
            });
          }}
        >
          <iframe
            id="theiframe"
            srcDoc={`<!DOCTYPE html><html><head><meta name="viewport" content="width=device-width, initial-scale=1"><style>${code.css}</style></head><body>${code.html} </body><script>${code.js}</script></html>`}
          ></iframe>
        </div>
      ))}

      <div className="tab-button-container">
        <Button
          title="HTML"
          onClick={() => {
            onTabClick("html");
          }}
        />
        <Button
          title="CSS"
          onClick={() => {
            onTabClick("css");
          }}
        />
        <Button
          title="JavaScript"
          onClick={() => {
            onTabClick("js");
          }}
        />
      </div>

      <div className="editor-container">
        {openedEditor === "html" ? (
          <Editor value={html} setEditorState={setHtmlCode} />
        ) : openedEditor === "css" ? (
          <Editor value={css} setEditorState={setCssCode} />
        ) : (
          <Editor value={js} setEditorState={setJsCode} />
        )}
      </div>
    </div>
  );
};

export default Component;
