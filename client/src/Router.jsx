import { Routes, Route } from "react-router-dom";
import ScanProduct from "./pages/Scan-products";
import ViewProducts from "./pages/View-products";

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<ScanProduct />} />
      <Route path="/view-products" element={<ViewProducts />} />
    </Routes>
  );
};

export default Router;