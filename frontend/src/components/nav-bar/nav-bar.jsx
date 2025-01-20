import "./nav-bar.sass";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navigation-bar-container">
            <ul className="left-nav">
                <li>
                    <Link to="/">Home</Link>
                </li>
            </ul>
            <ul className="right-nav">
                <li>
                    <Link to="/about">About</Link>
                </li>
                <li>
                    <Link to="/pattern-matching">Pattern Matching</Link>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;