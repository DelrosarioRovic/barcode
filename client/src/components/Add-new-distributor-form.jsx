import barcodeImg from "../assets/barcode.svg";

const AddNewDistributorContainer = ({ setIsShowForm }) => {
  return (
    <div className="w-full h-full absolute inset-0 flex justify-center items-center bg-black bg-opacity-40 backdrop-blur-[2px]">
      <div className="flex flex-col bg-white p-10 rounded-lg w-[50rem] gap-14">
        <div className="flex items-center justify-start gap-3">
          <img src={barcodeImg} alt="" />
          <h1 className="font-black text-xl">BARCODE SCANNER</h1>
        </div>
        <div>
          <form className="flex flex-col gap-10">
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 justify-between items-center">
                <label
                  htmlFor="distributor-name"
                  className="font-bold text-lg"
                >
                  DISTRIBUTOR NAME:
                </label>
                <input
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                />
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="address" className="font-bold text-lg">
                  ADDRESS:
                </label>
                <textarea
                  name="address"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                ></textarea>
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="email" className="font-bold text-lg">
                  EMAIL:
                </label>
                <input
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                />
              </div>
            </div>
            <div className="flex flex-col gap-5">
              <div className="flex gap-3 justify-between items-center">
                <label
                  htmlFor="contact-person"
                  className="font-bold text-lg"
                >
                  CONTACT PERSON:
                </label>
                <input
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
                />
              </div>
              <div className="flex gap-3 justify-between items-center">
                <label htmlFor="" className="font-bold text-lg">
                  CONTACT NUMBER:
                </label>
                <input
                  type="text"
                  className="w-[70%] outline-1 outline outline-green-400 rounded-md p-2"
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
