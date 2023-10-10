import Navigation from "./Navigation";
import headerImg from "../assets/barcode.svg";

const Header = () => {
  return (
    <div className="flex justify-between items-center m-auto w-full py-10">
      <div className="flex items-center">
        <img src={headerImg} alt="" />
        <h1 className="font-black text-3xl">Barcode Scanner</h1>
      </div>

      <Navigation />
    </div>
  );
};

export default Header;
