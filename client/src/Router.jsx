import { Routes, Route } from "react-router-dom";
import ScanProduct from "./pages/Scan-products";
import ViewProducts from "./pages/View-products";
import DisburseProduct from "./pages/Disburse-products";
import Disburse_product_form from "./pages/Disburse-product-form";

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<ScanProduct />} />
      <Route path="/view-products" element={<ViewProducts />} />
      <Route path="/view-disburse-products" element={<DisburseProduct />} />
      <Route path="/view-disburse-products/:refference" element={<Disburse_product_form />} />
    </Routes>
  );
};

export default Router;