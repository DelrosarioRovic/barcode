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

  //loading
  const [loading, setLoading] = useState(false);

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
    const handleScanProduct = async () => {
      if (serialNumber && !successScanToast) {
        setLoading(true);
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
        } finally {
          setSuccessScanToast(false);
          setLoading(false);
        }
      }
    };

    if (serialNumber === "") {
      setError(false);
    }

    // Call the handleScanProduct function only once
    handleScanProduct();

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
      <div className="max-w-7xl flex flex-col items-center h-[700px]">
        <div className="flex py-3 gap-5 justify-between w-full items-center shadow-components rounded-lg bg-gray-100">
          <div className="flex items-center gap-5 p-5 w-[40%]">
            <h1 className="font-bold">STORE NAME: </h1>
            <DistributorBox selected={selected} setSelected={setSelected} />
          </div>
          <div className="flex flex-col gap-5 items-center p-5 rounded-md w-[60%] relative">
            <div className="flex flex-col justify-between items-center gap-2 w-full">
              <div className="flex gap-5 items-center w-full justify-between">
                <input
                  placeholder="SCAN HERE"
                  name="serialNumber"
                  className={`w-[80%] ${
                    error ? "border-red-500 outline-red-500" : ""
                  } px-5 py-[0.4rem] border-2 border-green-500 rounded-md text-center`}
                  onChange={(e) => setSerialNumber(e.target.value)}
                  value={serialNumber}
                  ref={inputRef}
                />
                <button
                  onClick={() => (setSerialNumber(""), focusInput())}
                  className="px-9 py-2 rounded-md text-white font-bold gradientBtn"
                >
                  RESET
                </button>
              </div>
              <div className="h-[16px] text-left absolute bottom-0 left-10">
                {error && (
                  <p className="text-red-500">{`* ${errorMessage} *`}</p>
                )}
              </div>
            </div>
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
          loading={loading}
        />
      </div>
    </div>
  );
};

export default ScanProduct;
