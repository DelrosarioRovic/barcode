import Pagination from "../components/Pagination";
import Thead from "../components/thead";
import LottieAnimation from "../components/Lottie-animation";
import loadingLottie from "../assets/loading.json";
import { useEffect, useState } from "react";
import axios from "axios";

const Distributor = () => {
  const [distributor, setDistributor] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState(0);
  const [currentProductsPg, setCurrentProductsPg] = useState(0);

  const headers = [
    "STORE NAME",
    "CONTACT PERSON",
    "CONTACT NUMBER",
    "ADDRESS",
    "EMAIL",
  ];

  const getAllDistributor = async () => {
    setLoading(true);
    try {
      const url = "http://localhost:3000/distributor/get-distributor";
      const { data } = await axios.get(url);
      setDistributor(data.allDistributor);
      const indexOfLastProduct = currentPage * 10;
      const indexOfFirstProduct = indexOfLastProduct - 10;

      const currentProducts = data.allDistributor.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      setTotalProducts(data.allDistributor.length);
      if (currentPage === 1) {
        setCurrentProductsPg(currentProducts.length);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getAllDistributor();
  }, []);

  return (
    <div className="">
      <div className="flex items-center justify-between shadow-components rounded-lg p-5 bg-gray-100">
        <h1 className="font-bold uppercase text-3xl">DISTRIBUTORS</h1>
        <div className="flex justify-between items-center w-[60%]">
          <input
            placeholder="DISTRIBUTOR"
            type="text"
            name="searchDISTRIBUTOR"
            className="px-5 py-[0.4rem] border-2 border-green-500 rounded-md text-center w-3/4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <button className="gradientBtn px-8 py-3 rounded-lg text-white font-bold">
                ADD NEW
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="flex flex-col p-5 rounded-md shadow-components mt-3 min-w-[700px] h-[500px] justify-between bg-gray-100">
        <div className="flex flex-col gap-5">
          {/* End of "status" sort combo box */}

          <table className="w-full h-full mt-5">
            <Thead headers={headers} />

            <tbody className="text-sm text-center">
              {loading ? (
                <tr className="">
                  <LottieAnimation animationData={loadingLottie} id="loading" />
                </tr>
              ) : distributor && distributor.length > 0 ? (
                distributor.map((distributor, index) => (
                  <tr
                    key={index}
                    className={`pt-5 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 transition ease-in-out duration-200 font-semibold`}
                  >
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {distributor.storeName}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      N / A
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {distributor.contactNumber}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {distributor.address}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {distributor.email}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="6"
                    className="border-b border-l border-r border-gray-300 py-4 text-center"
                  >
                    {search
                      ? "No matching products found."
                      : "No products found."}
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        {/* "status" sort combo box */}

        {/* Pagination */}
        <Pagination
          currentPage={currentPage}
          totalProducts={totalProducts}
          setCurrentPage={setCurrentPage}
          currentProductsPg={currentProductsPg}
          setCurrentProductsPg={setCurrentProductsPg}
        />
        {/* End of pagination */}
      </div>
    </div>
  );
};

export default Distributor;
