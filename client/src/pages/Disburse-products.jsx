import Thead from "../components/thead";
import axios from "axios";
import { useEffect, useState } from "react";
import moment from "moment";
import Pagination from "../components/Pagination";
import Calender from "../components/Calendar";
import LottieAnimation from "../components/Lottie-animation";
import loadingLottie from "../assets/loading.json";
import Disburse_product_form from "../components/Disburse-product-form";

const DisburseProduct = () => {
  const [disburse, setDisburse] = useState([]);
  const [disbursementId, setDisbursementId] = useState("");
  const [startDate, setStartDate] = useState(new Date());
  const [isDefaultDate, setIsDefaultDate] = useState(false);
  const [filterDisburse, setFilterDisburse] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState();
  const [currentProductsPg, setCurrentProductsPg] = useState(0);

  //loading
  const [loading, setLoading] = useState(false);

  //type of search date or input store name
  const [sortType, setSortType] = useState(true);
  const headers = [
    "STORE NAME",
    "DATE & TIME",
    "EMAIL",
    "ADDRESS",
    "NUMBER OF PRODUCTS",
  ];

  const handleLinkClick = (disburseId) => {
    setDisbursementId(disburseId);
  };

  const fetchAllDisburseProduct = async () => {
    setLoading(true);
    try {
      let url = `http://localhost:3000/product/get-all-disburse-product/`;
      const { data } = await axios.get(url);
      setDisburse(data.allProducts);

      const filteredProducts = data.allProducts.filter((product) => {
        if (sortType) {
          if (search === "") {
            return true;
          } else {
            let storeNameNoSpaces = product.distributor.storeName
              .replace(/\s/g, "")
              .toLowerCase();
            let searchQueryNoSpaces = search.replace(/\s/g, "").toLowerCase();
            return storeNameNoSpaces.includes(searchQueryNoSpaces);
          }
        } else {
          if (isDefaultDate) {
            return moment(product.date)
              .format("YYYY-MM-DD")
              .includes(moment(startDate).format("YYYY-MM-DD"));
          } else {
            return true;
          }
        }
      });

      const indexOfLastProduct = currentPage * 10;
      const indexOfFirstProduct = indexOfLastProduct - 10;
      const currentProducts = filteredProducts.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      setFilterDisburse(currentProducts);
      setTotalProducts(filteredProducts.length);
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
    fetchAllDisburseProduct();
  }, [search, startDate, sortType, currentPage]);

  return (
    <div className="flex flex-col justify-center items-center max-w-7xl">
      <div className="w-full text-left shadow-components rounded-lg bg-gray-100">
        <div className="flex justify-between items-center p-5">
          <h1 className="font-bold text-3xl">OUT PRODUCTS</h1>
          <div className="flex gap-10 items-center">
            <div>
              <Calender
                startDate={startDate}
                setStartDate={setStartDate}
                isDefaultDate={isDefaultDate}
                setIsDefaultDate={setIsDefaultDate}
                setSearch={setSearch}
                setSortType={setSortType}
              />
            </div>
            <input
              id="search"
              type="text"
              name="searchSerialNumber"
              placeholder="SERIAL NUMBER"
              className="w-96 px-5 py-[0.4rem] border-2 border-green-500 rounded-md text-center "
              value={search}
              onChange={(e) => (
                setSearch(e.target.value),
                setSortType(true),
                setIsDefaultDate(false)
              )}
            />
          </div>
        </div>
      </div>
      <div className="flex flex-col p-5 rounded-md shadow-components bg-gray-100 mt-3 w-full min-w-[700px] h-[500px] gap-5">
        <div className="flex flex-col h-full gap-5 mt-3">
          <table className="w-full">
            <Thead headers={headers} />
            <tbody className="text-sm text-center">
              {loading ? (
                <tr>
                  <LottieAnimation animationData={loadingLottie} id="loading" />
                </tr>
              ) : filterDisburse && filterDisburse.length > 0 ? (
                filterDisburse.map((disburse, index) => (
                  <tr
                    onClick={() => handleLinkClick(disburse._id)}
                    key={index}
                    className={`pt-5 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 transition ease-in-out duration-200 font-semibold`}
                  >
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {disburse.distributor.storeName}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1 px-5">
                      {moment(disburse.date).format("MMMM D, YYYY / h:mm A")}
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
                  >
                    No Result
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <div>
          <Pagination
            currentPage={currentPage}
            totalProducts={totalProducts}
            setCurrentPage={setCurrentPage}
            currentProductsPg={currentProductsPg}
            setCurrentProductsPg={setCurrentProductsPg}
          />
        </div>
      </div>
      {disbursementId && (
        <Disburse_product_form
          disbursementId={disbursementId}
          setDisbursementId={setDisbursementId}
        />
      )}
    </div>
  );
};

export default DisburseProduct;
