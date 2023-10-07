import { useEffect, useState } from "react";
import axios from "axios";
import Pagination from "../components/Pagination";
import Thead from "../components/thead";

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

  const headers = ["Serial Number", "SKU", "IMEI 1", "IMEI 2", "Status"];

  const handleGetAllProducts = async () => {
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
    }
  };

  useEffect(() => {
    handleGetAllProducts();
  }, [currentPage, sortValue, search]);

  const handleSortValueChange = (e) => {
    if (allProducts.length < 11) {
      setCurrentPage(1);
    }
    setSortValue(e.target.value);
  };

  return (
    <div className="p-5">
      <h1 className="font-bold uppercase">List of Products</h1>

      <div className="flex justify-end items-center mt-3">
        <label htmlFor="searchSerialNumber">Search</label>
        <input
          type="text"
          name="searchSerialNumber"
          className="border rounded-sm ml-2 outline-blue-500 px-1"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      <div className="flex flex-col p-5 bg-white rounded-md shadow-lg mt-3 min-w-[700px] h-[500px] justify-between">
        <div>
          <div className="flex justify-end items-center">
            <div className="flex items-center">
              <p className="capitalize">sort</p>
              <select
                value={sortValue}
                onChange={handleSortValueChange}
                className="border rounded-sm ml-2 outline-blue-500 px-1"
              >
                <option value="all">All</option>
                <option value="in">In</option>
                <option value="out">Out</option>
              </select>
            </div>
          </div>
          {/* End of "status" sort combo box */}
          <table className="w-full h-full mt-5">
            <Thead headers={headers} />
            <tbody className="text-sm text-center">
              {filterProducts && filterProducts.length > 0 ? (
                filterProducts.map((product, index) => (
                  <tr
                    key={index}
                    className={`pt-5 cursor-pointer ${
                      index % 2 === 0 ? "bg-white" : "bg-gray-100"
                    } hover:bg-gray-200 transition ease-in-out duration-200`}
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
                      className={`border-b border-l border-r border-gray-300 py-1 uppercase ${
                        product.status === "in"
                          ? "bg-green-500"
                          : product.status === "out"
                          ? "bg-red-300"
                          : product.status === "pending"
                          ? "bg-yellow-500"
                          : product.status === "denied"
                          ? "bg-red-500"
                          : ""
                      }`}
                    >
                      {product.status}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan="5"
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
