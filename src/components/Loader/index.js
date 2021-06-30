import React from "react";
import ReactDOM from "react-dom";
import styles from "./index.module.css";

const Loader = () => {
  return ReactDOM.createPortal(
    <div
      style={{
        position: 'fixed',
        display: 'flex',
        flexDirection: 'column',
        background: 'white',
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: 9999999,
        justifyContent: "center",
        alignItems: "center",
        display: "flex",
        background: "white",
      }}
    >
      <div class={styles.ldsSpinner}>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <h3 style={{fontSize: '22px', color: '#abafaf'}}>Loading..</h3>  
    </div>,
    document.getElementById("loader")
  );
};
// Main.displayName = "Loading";
export default Loader;
