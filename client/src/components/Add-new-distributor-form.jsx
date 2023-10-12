import { useState } from "react";
import barcodeImg from "../assets/barcode.svg";
import axios from "axios";

const AddNewDistributorContainer = ({ setIsShowForm }) => {
  const [distributorName, setDistributorName] = useState("");
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [contactPerson, setContactPerson] = useState("");
  const [contactNumber, setContactNumber] = useState("");

  const handleAddDistributor = async (event) => {
    event.preventDefault();
    try {
      const url = "http://localhost:3000/distributor/add-distributor";
      const { data } = await axios.post(url, {
        distributorName,
        address,
        email,
        contactPerson,
        contactNumber,
      });
      if (data.status === 200) {
        setIsShowForm(false);
      }
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full h-full absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-[2px]">
      <div className="flex flex-col bg-white p-10 rounded-lg w-[50rem] gap-14 shadow-components">
        <div className="flex items-center justify-start gap-3">
          <img src={barcodeImg} alt="" />
          <h1 className="font-black text-xl">BARCODE SCANNER</h1>
        </div>
        <div>
          <form
            className="flex flex-col gap-10"
            onSubmit={handleAddDistributor}
          >
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="distributor-name" className="font-bold text-lg">
                  DISTRIBUTOR NAME:
                </label>
                <input
                  onChange={(e) => setDistributorName(e.target.value)}
                  value={distributorName}
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="address" className="font-bold text-lg">
                  ADDRESS:
                </label>
                <textarea
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  name="address"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                  required
                ></textarea>
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="email" className="font-bold text-lg">
                  EMAIL:
                </label>
                <input
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="email"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                  required
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="contact-person" className="font-bold text-lg">
                  CONTACT PERSON:
                </label>
                <input
                  onChange={(e) => setContactPerson(e.target.value)}
                  value={contactPerson}
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="" className="font-bold text-lg">
                  CONTACT NUMBER:
                </label>
                <input
                  onChange={(e) => setContactNumber(e.target.value)}
                  value={contactNumber}
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                  required
                />
              </div>
              <div className="flex gap-5 justify-end">
                <span
                  className="gradientBtnPrev text-white px-10 py-3 rounded-md font-semibold cursor-pointer "
                  onClick={() => setIsShowForm(false)}
                >
                  CANCEL
                </span>
                <button className="gradientBtn text-white px-14 py-3 rounded-md font-semibold ">
                  ADD
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewDistributorContainer;
