import { useEffect, useState, useRef } from "react";
import Scan from "../components/scan";
import DistributorBox from "../components/DistributorBox";
import ConfirmationBtn from "../components/ConfirmationBtn";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const ScanProduct = () => {
  const [serialNumber, setSerialNumber] = useState("");
  const [isScanSingle, setIsScanSingle] = useState("Single");
  const [manyProducts, setManyProducts] = useState([]);
  const [notif, setNofit] = useState(false);
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
    const handleScanProduct = async () => {
      let url = `http://localhost:3000/product/scan-product/${serialNumber}`;
      try {
        const { data } = await axios.post(url);
        if (isScanSingle === "Single" && data.foundProduct.status === "in") {
          setManyProducts([data.foundProduct]);
          setShopifyProduct([data.foundShopifyProduct]);
          setSuccessScanToast(true);
          setError(false);
          toast.success(data.message);
        } else if (
          isScanSingle === "Many" &&
          data.foundProduct.status === "in"
        ) {
          setManyProducts((prevProducts) => {
            let matchFound = false;
            for (let i = 0; i < prevProducts.length; i++) {
              if (prevProducts[i].serialNumber === serialNumber) {
                matchFound = true;
                setError(true);
                setErrorMessage("This product is already scanned");
                break;
              }
            }
            if (!matchFound) {
              setSuccessScanToast(true);
              setError(false);
              setSerialNumber("");
              return [...prevProducts, data.foundProduct];
            }

            return prevProducts;
          });
          setShopifyProduct((prevProducts) => {
            return [...prevProducts, data.foundShopifyProduct];
          });
        }
      } catch (error) {
        setError(true);
        setErrorMessage(error.response.data.error);
      }
    };

    // Only scan for the product when a serial number is entered
    if (serialNumber) {
      handleScanProduct();
    }
    if (serialNumber === "" && error === true) {
      setError(false);
    }
  }, [isScanSingle, serialNumber]);
  // useEffect for Auto Focus in the input
  useEffect(() => {
    focusInput();
  }, []);

  const handleIsSingleScan = (e) => {
    if (isScanSingle === "Single") {
      setManyProducts([]);
      setShopifyProduct([]);
      setSerialNumber("");
      setIsScanSingle(e.target.value);
    } else {
      if (manyProducts.length > 10) {
        setNofit(true);
      } else {
        setNofit(false);
        setManyProducts([]);
        setShopifyProduct([]);
        setSerialNumber("");
        setIsScanSingle(e.target.value);
      }
    }
  };

  return (
    <div>
      {notif && (
        <ConfirmationBtn
          setNotif={setNofit}
          setManyProducts={setManyProducts}
          setSerialNumber={setSerialNumber}
          setIsScanSingle={setIsScanSingle}
        />
      )}

      <div className="w-full flex flex-col justify-center items-center min-h-screen bg-gray-100">
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
            <div className="">
              <select
                value={isScanSingle}
                onChange={handleIsSingleScan}
                className="border rounded-lg text-gray-700 ml-2 outline-blue-500 px-1 h-full shadow-md"
              >
                <option value="Single">Scan Single</option>
                <option value="Many">Scan Many</option>
              </select>
            </div>
          </div>
        </div>
        <Scan
          setSerialNumber={setSerialNumber}
          isScanSingle={isScanSingle}
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
