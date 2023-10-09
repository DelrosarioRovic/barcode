import Thead from "../components/thead";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";
import Pagination from "../components/Pagination";
import Calender from "../components/Calendar";

const DisburseProduct = () => {
  const [disburse, setDisburse] = useState([]);
  const [startDate, setStartDate] = useState(new Date());
  const [isDefaultDate, setIsDefaultDate] = useState(false);
  const [filterDisburse, setFilterDisburse] = useState([]);
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState();
  const [currentProductsPg, setCurrentProductsPg] = useState(0);

  //type of search date or input store name
  const [sortType, setSortType] = useState(true);
  const navigate = useNavigate();

  const headers = [
    "STORE NAME",
    "DATE",
    "EMAIL",
    "ADDRESS",
    "NUMBER OF PRODUCTS",
  ];

  const handleLinkClick = (disburseId) => {
    navigate(`/view-disburse-products/${disburseId}`);
  };

  const fetchAllDisburseProduct = async () => {
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
    }
  };

  useEffect(() => {
    fetchAllDisburseProduct();
  }, [search, startDate, sortType, currentPage]);

  return (
    <div className="flex flex-col gap-10 justify-center items-center max-w-7xl p-5">
      <div className="w-full text-left">
        <h1 className="font-bold">OUT PRODUCTS</h1>
      </div>
      <div className="flex flex-col p-5 bg-white rounded-md shadow-lg mt-3 w-full min-w-[700px] h-[520px] gap-5">
        <div className="flex justify-between items-center mt-3">
          <Calender
            startDate={startDate}
            setStartDate={setStartDate}
            isDefaultDate={isDefaultDate}
            setIsDefaultDate={setIsDefaultDate}
            setSearch={setSearch}
            setSortType={setSortType}
          />
          <div>
            <label htmlFor="search">Search</label>
            <input
              id="search"
              type="text"
              name="searchSerialNumber"
              className="border rounded-sm ml-2 outline-blue-500 px-1"
              value={search}
              onChange={(e) => (
                setSearch(e.target.value),
                setSortType(true),
                setIsDefaultDate(false)
              )}
            />
          </div>
        </div>
        <div className="flex flex-col justify-between h-full gap-5">
          <table className="w-full">
            <Thead headers={headers} />
            <tbody className="text-sm">
              {filterDisburse && filterDisburse.length > 0 ? (
                filterDisburse.map((disburse, index) => (
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
                  >
                    No Result
                  </td>
                </tr>
              )}
            </tbody>
          </table>
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
      </div>
    </div>
  );
};

export default DisburseProduct;
