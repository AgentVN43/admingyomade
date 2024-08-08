/* eslint-disable jsx-a11y/alt-text */
import { Link } from "react-router-dom";
import logo from "../assets/images/logos/android-chrome-512x512.png";

const Logo = () => {
  return (
    <Link to="/" className="text-decoration-none d-flex align-items-center">
      <img src={logo} style={{ width: "31px", height: "31px" }} />
      <span className="mx-2" style={{ fontSize: "22px", fontWeight: "700" }}>
        GYOMADE TECH TEAM
      </span>
    </Link>
  );
};

export default Logo;
