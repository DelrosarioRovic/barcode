import axios from "axios";
import Thead from "./thead";
import { BsFillTrashFill } from "react-icons/bs";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import LottieAnimation from "../components/Lottie-animation";
import loadingLottie from "../assets/loading.json";
import { useState } from "react";

const Scan = ({
  manyProducts,
  setManyProducts,
  selected,
  shopifyProduct,
  setError,
  setErrorMessage,
  skuErrors,
  setSkuErrors,
  setSerialNumber,
  loading,
}) => {
  const headers = ["Serial Number", "SKU", "IMEI 1", "IMEI 2", "Status"];
  const [disburseLoading, setDisburseSetLoading] = useState(false);

  const renderTableRows = () => {
    if (manyProducts.length > 0) {
      return manyProducts.map((product, index) => (
        <tr className="text-center h-[20px]" key={index}>
          <td className="border border-black-500 border-collapse text-sm sm:text-base">
            {product.serialNumber}
          </td>
          <td
            className={`border border-black-500 border-collapse text-sm sm:text-base ${
              skuErrors.includes(product.product_sku) && "text-red-500"
            }`}
          >
            {product.product_sku}
          </td>
          <td className="border border-black-500 border-collapse text-sm sm:text-base">
            {product.imeiOne}
          </td>
          <td className="border border-black-500 border-collapse text-sm sm:text-base">
            {product.imeiTwo}
          </td>
          <td className="border border-black-500 border-collapse text-sm sm:text-base">
            {product.status}
          </td>
          <td
            onClick={() => handleSubmitRemoveItem(product.serialNumber)}
            className="cursor-pointer border border-black-500 border-collapse text-sm sm:text-base flex justify-center p-[5.1px]"
          >
            <BsFillTrashFill />
          </td>
        </tr>
      ));
    } else {
      return (
        <tr>
          <td
            colSpan="11"
            className="border-b border-l border-r border-gray-300 py-4 text-center"
          >
            Scan your barcode first.
          </td>
        </tr>
      );
    }
  };

  //function to fetch data from the backend to disburse product
  const handleSubmitSingleData = async () => {
    setDisburseSetLoading(true);
    const manyProd = manyProducts.map((product) => ({
      serialNumber: product.serialNumber,
    }));
    try {
      let url = "http://localhost:3000/product/disburse-product";
      const { data } = await axios.post(url, {
        products: manyProd,
        distributorId: selected._id,
        shopifyProduct: shopifyProduct,
      });
      toast.success(data.message);
      setSerialNumber("");
      setManyProducts([]);
    } catch (error) {
      console.log(error);
      setError(true);
      setErrorMessage(error.response.data.error);
      const errors = error.response.data.error_sku;
      if (errors && errors.length > 0) {
        setSkuErrors(error.response.data.error_sku);
      }
    } finally {
      setDisburseSetLoading(false);
    }
  };

  const handleSubmitRemoveItem = (serialNumber) => {
    const newManyProducts = manyProducts.filter((product) => {
      if (product.serialNumber !== serialNumber) {
        return product;
      }
    });
    setManyProducts(newManyProducts);
  };

  return (
    <div className="flex flex-col w-full p-5 rounded-md shadow-components mt-3 bg-gray-100">
      <table className="w-full">
        <Thead headers={headers} />
        <tbody className="text-sm h-[350px] min-h-[350px]">
          {loading ? (
            <tr>
              <LottieAnimation animationData={loadingLottie} id="loading" />
            </tr>
          ) : (
            renderTableRows()
          )}
        </tbody>
      </table>
      <div className="flex w-full justify-end mt-5">
        <button
          onClick={handleSubmitSingleData}
          className={`gradientBtn font-bold px-10 py-3 rounded-md hover:bg-blue-400 text-white ${
            disburseLoading && "opacity-50"
          }`}
        >
          DISBURSE PRODUCT
        </button>
      </div>
    </div>
  );
};

export default Scan;
//
