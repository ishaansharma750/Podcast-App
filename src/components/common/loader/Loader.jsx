import React from "react";
import "./loader.css";
const Loader = () => {
  return (
    <div>
      <div className="loader-wrapper">
        <div class="lds-ripple">
          <div></div>
          <div></div>
        </div>
      </div>
    </div>
  );
};

export default Loader;
