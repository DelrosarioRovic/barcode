import { Routes, Route } from "react-router-dom";
import ScanProduct from "./pages/Scan-products";
import ViewProducts from "./pages/View-products";
import DisburseProduct from "./pages/Disburse-products";
import Distributor from "./pages/Distributor";

const Router = () => {
  
  return (
    <Routes>
      <Route path="/" element={<ScanProduct />} />
      <Route path="/view-products" element={<ViewProducts />} />
      <Route path="/view-disburse-products" element={<DisburseProduct />} />
      <Route path="/distributor" element={<Distributor />} />
    </Routes>
  );
};

export default Router;