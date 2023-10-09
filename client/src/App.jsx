import { useState } from "react";
import Router from "./Router";
import Header from "./components/Header";
import { ToastContainer } from "react-toastify";

function App() {
  return (
    <div className="m-auto flex flex-col justify-center max-w-7xl ">
      <Header />
      <Router />
      <ToastContainer position="bottom-right"/>
    </div>
  );
}

export default App;
