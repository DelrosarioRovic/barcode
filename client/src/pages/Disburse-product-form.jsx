import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import Thead from "../components/thead";
import LottieAnimation from "../components/Lottie-animation";
import loadingLottie from "../assets/loading.json";

const Disburse_product_form = () => {
  const { refference } = useParams();
  const [disburseProducts, setDisburseProducts] = useState({});
  //loading
  const [loading, setLoading] = useState(false);

  const headers = ["Serial Number", "SKU", "IMEI 1", "IMEI 2", "Status"];

  const fetchDisburseProduct = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3000/product/get-single-disburse-product/${refference}`;
      const { data } = await axios.get(url);

      setDisburseProducts(data.singleDisburse[0]);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDisburseProduct();
  }, []);

  return (
    <div>
      {disburseProducts ? (
        <div className="shadow-xl max-w-7xl rounded-xl p-5 flex flex-col gap-10 min-w-[700px] ">
          <div className="flex">
            <p className="border-b-2 border-black">
              Date proccess:{" "}
              {moment(disburseProducts.date).format('MMMM D, YYYY / h:mm A')}
            </p>
          </div>

          <div>
            <h1 className="font-bold">Distributor details</h1>
            <p>
              STORE NAME:{" "}
              <span className="font-semibold">
                {disburseProducts.distributor?.storeName}
              </span>
            </p>
            <p>
              CONTACT NUMBER:{" "}
              <span className="font-semibold">
                {disburseProducts.distributor?.contactNumber}
              </span>
            </p>
            <p>
              ADDRESS:{" "}
              <span className="font-semibold">
                {disburseProducts.distributor?.address}
              </span>{" "}
            </p>
          </div>
          <table>
            <Thead headers={headers} />
            <tbody className="text-center">
              {loading ? (
                <tr>
                  <LottieAnimation animationData={loadingLottie} id="loading" />
                </tr>
              ) : Array.isArray(disburseProducts.products) &&
                disburseProducts.products.length > 0 ? (
                disburseProducts.products.map((product, key) => (
                  <tr key={key}>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {product?.serialNumber}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {product.product_sku}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {product.imeiOne}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {product.imeiTwo}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5 bg-red-300">
                      {product.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5">No products found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      ) : (
        <h1>No Data exist</h1>
      )}
    </div>
  );
};

export default Disburse_product_form;
