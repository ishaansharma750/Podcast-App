import React, { useState } from "react";
import "../input/input.css";

const FileInput = ({fileHandle, accept, id, text}) => {
    let [file, setFile] = useState("")
    const onChange = (e)=>{
        console.log(e.target.files)
        setFile(e.target.files[0].name);
        fileHandle(e.target.files[0]);

    }

  return (
    <div>
      <label htmlFor={id} className={`custom-input ${!file ? "label-input" : "active"} `}>
        { file ? `File "${file}" Selected` : text}
      </label>
      <input
        type="file"
        accept={accept}
        id={id}
        style={{ display: "none" }}
        onChange={onChange}
      />
    </div>
  );
};

export default FileInput;
