import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Thead from "../components/thead";
import LottieAnimation from "../components/Lottie-animation";
import loadingLottie from "../assets/loading.json";

export default function ViewProducts() {
  const [search, setSearch] = useState("");
  const [sortValue, setSortValue] = useState("all");

  //two types of array
  const [allProducts, setAllProducts] = useState([]);
  const [filterProducts, setFilterProducts] = useState([]);
  //pagenation
  const [currentPage, setCurrentPage] = useState(1);
  const [totalProducts, setTotalProducts] = useState();
  const [currentProductsPg, setCurrentProductsPg] = useState(0);

  //loading
  const [loading, setLoading] = useState(false);

  const headers = [
    "Serial Number",
    "SKU",
    "IMEI 1",
    "IMEI 2",
    "Store Name",
    "Status",
  ];

  const handleGetAllProducts = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(
        `http://localhost:3000/product/get-all-product`
      );
      setAllProducts(data.allProducts);
      const filterProduct = data.allProducts.filter((product) => {
        if (sortValue === "in") {
          return product.status === "in";
        } else if (sortValue === "out") {
          return product.status === "out";
        } else {
          return true;
        }
      });
      const filterSearchCond = filterProduct.filter((product) => {
        if (search === "") {
          return true;
        } else {
          return product.serialNumber
            .toLowerCase()
            .includes(search.toLowerCase());
        }
      });

      const indexOfLastProduct = currentPage * 10;
      const indexOfFirstProduct = indexOfLastProduct - 10;

      const currentProducts = filterSearchCond.slice(
        indexOfFirstProduct,
        indexOfLastProduct
      );
      setTotalProducts(filterSearchCond.length);
      setFilterProducts(currentProducts);
      if (currentPage === 1) {
        setCurrentProductsPg(currentProducts.length);
      }
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, [currentPage, sortValue, search]);

  const handleSortValueChange = (e) => {
    if (allProducts.length < 11) {
      setCurrentPage(1);
    }
    setCurrentPage(1);
    setSortValue(e.target.value);
  };

  return (
    <div className="">
      <div className="flex items-center justify-between shadow-components rounded-lg p-5 bg-gray-100">
        <h1 className="font-bold uppercase text-3xl">List of Products</h1>
        <div className="flex justify-between items-center w-[60%]">
          <input
            placeholder="SERIAL NUMBER"
            type="text"
            name="searchSerialNumber"
            className="px-5 py-[0.4rem] border-2 border-green-500 rounded-md text-center w-3/4"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <div className="flex justify-end items-center">
            <div className="flex items-center gap-3">
              <p className="capitalize font-bold text-xl">sort:</p>
              <select
                value={sortValue}
                onChange={handleSortValueChange}
                className="px-5 py-[0.4rem] border-2 border-green-500 rounded-md text-center"
              >
                <option
                  className={`${
                    sortValue === "all" && "bg-green-500 text-white"
                  }`}
                  value="all"
                >
                  All
                </option>
                <option
                  className={`${
                    sortValue === "in" && "bg-green-500 text-white"
                  }`}
                  value="in"
                >
                  In
                </option>
                <option
                  className={`${
                    sortValue === "out" && "bg-green-500 text-white"
                  }`}
                  value="out"
                >
                  Out
                </option>
              </select>
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
                  <LottieAnimation
                    animationData={loadingLottie}
                    id="loading"
                    height="h-[200px]"
                  />
                </tr>
              ) : filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={`pt-5 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 transition ease-in-out duration-200 font-semibold`}
                  >
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {product.serialNumber}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {product.product_sku}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {product.imeiOne}
                    </td>
                    <td className="border-b border-l border-r border-gray-300 py-1">
                      {product.imeiTwo}
                    </td>
                    <td
                      className={`border-b border-l border-r border-gray-300 py-1 uppercase`}
                    >
                      {product.distributor
                        ? product.distributor?.storeName
                        : "N/A"}
                    </td>
                    <td
                      className={`border-b border-l border-r border-gray-300 py-1 uppercase ${
                        product.status === "in" ? "bg-green-500" : "bg-red-400"
                      }`}
                    >
                      {product.status}
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
}
