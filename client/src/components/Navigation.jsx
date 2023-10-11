import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <ul className="flex gap-5">
      <li>
        <Link to={"/"}>Scan</Link>
      </li>
      <li>
        <Link to={"/view-products"}>View Products</Link>
      </li>
      <li>
        <Link to={"/view-disburse-products"}>Disburse Products</Link>
      </li>
      <li>
        <Link to={"/distributor"}>Distributor</Link>
      </li>
    </ul>
  );
};

export default Navigation;
