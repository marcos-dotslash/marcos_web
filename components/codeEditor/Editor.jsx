import React, { useState } from 'react';
import CodeMirror  from '@uiw/react-codemirror';
import { abcdef, abcdefInit } from '@uiw/codemirror-theme-abcdef';

import { javascript } from '@codemirror/lang-javascript';
import { html } from '@codemirror/lang-html';
import { css } from '@codemirror/lang-css';



const themeArray = ["abcdef", "abcdefInit"]

const Editor = ({ language, value, setEditorState }) => {

    const [theme, setTheme] = useState("abcdef")

    const handleChange = (value) => {
        setEditorState(value);
    }

  return (
    <div className="editor-container">

    <div style={{marginBottom: "10px"}}>
        <label for="cars">Choose a theme: </label>
        
        <select name="theme" onChange={(el) => {
            setTheme(el.target.value)
            }}>
            {
                themeArray.map( theme => (
                <option value={theme}>{theme}</option>
                ))
            }
        </select>
    </div>

    
        <CodeMirror
        onChange={handleChange}
        value={value}
        height="200px"
        
        theme={abcdefInit({
            settings: {
              caret: '#c6c6c6',
              fontFamily: 'monospace',
            },
          })}
        />
    

   
    </div>
  )
}
export default Editor