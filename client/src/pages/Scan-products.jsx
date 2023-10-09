import { useEffect, useState, useRef } from "react";
import Scan from "../components/scan";
import DistributorBox from "../components/DistributorBox";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScanProduct = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [manyProducts, setManyProducts] = useState([]);
  const [selected, setSelected] = useState([]);
  const [shopifyProduct, setShopifyProduct] = useState([]);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  //will check the error of the sku that surpass the quantity of the specific products
  const [skuErrors, setSkuErrors] = useState([]);

  // Shopify Toast State
  const [successScanToast, setSuccessScanToast] = useState(false);
  const inputRef = useRef();

  // Function to auto focus in the input field
  const focusInput = () => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  useEffect(() => {
    // Check if the scan has already been performed
    if (serialNumber && !successScanToast) {
      const handleScanProduct = async () => {
        try {
          let url = `http://localhost:3000/product/scan-product/${serialNumber}`;
          const { data } = await axios.post(url);

          setManyProducts((prevProducts) => {
            const isProductAlreadyScanned = prevProducts.some(
              (product) => product.serialNumber === serialNumber
            );

            if (isProductAlreadyScanned) {
              setError(true);
              setErrorMessage("This product is already scanned");
              return prevProducts; // Return the unchanged state
            } else {
              toast.success(data.message);
              setSuccessScanToast(true);
              setError(false);
              setSerialNumber("");
              return [...prevProducts, data.foundProduct]; // Add new product to state
            }
          });

          setShopifyProduct((prevProducts) => [
            ...prevProducts,
            data.foundShopifyProduct,
          ]);
        } catch (error) {
          setError(true);
          setErrorMessage(error.response.data.error);
        }
      };

      // Call the handleScanProduct function only once
      handleScanProduct();
    }

    // Cleanup function to clear the successScanToast state after component unmounts
    return () => {
      setSuccessScanToast(false);
    };
  }, [serialNumber]);

  // useEffect for Auto Focus in the input
  useEffect(() => {
    focusInput();
  }, []);

  return (
    <div>
      <div className="max-w-7xl flex flex-col justify-center items-center h-[700px]">
        <div className="flex flex-col items-center gap-5 justify-between w-1/2">
          <div className="flex flex-col gap-5 items-center p-5 bg-white rounded-md shadow-lg">
            <div className="flex justify-between items-center gap-5">
              <div className="flex gap-5 items-center">
                <label htmlFor="serialNumber">Serial Number</label>
                <input
                  name="serialNumber"
                  className={`${
                    error ? "border-red-500 outline-red-500" : ""
                  } px-5 py-2 border rounded-md mt-1 text-center`}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  value={serialNumber}
                  ref={inputRef}
                />
              </div>
              <button
                onClick={() => setSerialNumber("")}
                className="px-3 py-1 bg-blue-500 rounded-md text-white"
              >
                Reset
              </button>
            </div>

            <div>{error && <p className="text-red-500">{errorMessage}</p>}</div>
          </div>
          <div className="flex gap-10">
            <DistributorBox selected={selected} setSelected={setSelected} />
            <div className=""></div>
          </div>
        </div>
        <Scan
          setSerialNumber={setSerialNumber}
          setError={setError}
          setErrorMessage={setErrorMessage}
          selected={selected}
          manyProducts={manyProducts}
          setManyProducts={setManyProducts}
          shopifyProduct={shopifyProduct}
          skuErrors={skuErrors}
          setSkuErrors={setSkuErrors}
        />
      </div>
    </div>
  );
};

export default ScanProduct;
