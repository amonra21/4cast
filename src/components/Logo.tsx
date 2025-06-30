import logo from "../assets/logo.png";
import "./Logo.css";

export const Logo = () => {
    return (
        <h1 className="Logo">
            <span className="LogoStart">4C</span>
            <img src={logo} alt="A" className="LogoImage" />
            <span className="LogoEnd">ST</span>
        </h1>
    );
};