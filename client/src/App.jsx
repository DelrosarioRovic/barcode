import { useState } from "react";
import Router from "./Router";
import Header from "./components/Header";

function App() {
  return (
    <div className="m-auto flex flex-col justify-center max-w-7xl ">
      <Header />
      <Router />
    </div>
  );
}

export default App;
