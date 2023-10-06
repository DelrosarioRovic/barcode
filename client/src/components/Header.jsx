import Navigation from "./Navigation";

const Header = () => {
  return (
    <div className="flex justify-between items-center m-auto w-full p-10">
      <p>Barcode Scanner</p>
      <Navigation />
    </div>
  );
};

export default Header;
