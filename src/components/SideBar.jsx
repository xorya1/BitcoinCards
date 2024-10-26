import { Link } from "react-router-dom";
import "./../App.css";
import logo from "./../assets/metamask_logo.png";
import { RiAccountCircleFill } from "react-icons/ri";
import { MdLocalGroceryStore } from "react-icons/md";
import { TbCardsFilled } from "react-icons/tb";

/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
const SideBar = ({ show, account }) => {
  return (
    <>
      <div className={show ? "sidebar active" : "sidebar"}>
        <div className="sideBar--separator">
          <picture>
            <img src={logo} className="logo" alt="MetaMask logo" />
          </picture>
          <ul>
            <li>
              <Link to="/Account" className="tab">
                <RiAccountCircleFill />
                <span>Account</span>
              </Link>
            </li>
            <li>
              <Link to="/Store" className="tab">
                <MdLocalGroceryStore /> <span>Store</span>
              </Link>
            </li>
            <li>
              <Link to="/Boosters" className="tab">
                <TbCardsFilled /> <span>Boosters</span>
              </Link>
            </li>
          </ul>
        </div>
        <div className="margin-left--helper margin-bottom--helper   sideBar-address">
          <strong>{account}</strong>
        </div>
      </div>
    </>
  );
};

export default SideBar;
/******************************************************************************************************/
/******************************************************************************************************/
/******************************************************************************************************/
