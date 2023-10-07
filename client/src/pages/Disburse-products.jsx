import Thead from "../components/thead";
import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import moment from "moment";

const DisburseProduct = () => {
  const [disburse, setDisburse] = useState([]);
  const navigate = useNavigate();

  const headers = [
    "STORE NAME",
    "DATE",
    "EMAIL",
    "ADDRESS",
    "NUMBER OF PRODUCTS",
  ];

  const handleLinkClick = (disburseId) => {
    navigate(`/view-disburse-products/${disburseId}`)
  } 

  const fetchAllDisburseProduct = async () => {
    try {
      let url = `http://localhost:3000/product/get-all-disburse-product/`;
      const { data } = await axios.get(url);
      setDisburse(data.allProducts);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchAllDisburseProduct();
  }, []);

  return (
    <div className="flex flex-col gap-10 justify-center items-center max-w-7xl p-5">
      <div className="w-full text-left">
        <h1 className="font-bold">OUT PRODUCTS</h1>
      </div>
      <div className="flex flex-col p-5 bg-white rounded-md shadow-lg mt-3 w-full min-w-[700px] h-[500px] justify-between">
        <table className="w-full">
          <Thead headers={headers} />
          <tbody className="text-sm">
            {disburse && disburse.length > 0 ? (
              disburse.map((disburse, index) => (
                <tr
                  onClick={() => handleLinkClick(disburse._id)}
                  key={index}
                  className={`pt-5 cursor-pointer ${
                    index % 2 === 0 ? "bg-white" : "bg-gray-100"
                  } hover:bg-gray-200 transition ease-in-out duration-200`}
                >
                  <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                    {disburse.distributor.storeName}
                  </td>
                  <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                    {moment(disburse.date).format("YYYY-MM-DD")}
                  </td>
                  <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                    {disburse.distributor.email}
                  </td>
                  <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                    {disburse.distributor.address}
                  </td>
                  <td
                    className={`border-b border-l border-r border-gray-300 py-1 uppercase px-5 text-center`}
                  >
                    {disburse.products.length}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="border-b border-l border-r border-gray-300 py-4 text-center"
                ></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DisburseProduct;
