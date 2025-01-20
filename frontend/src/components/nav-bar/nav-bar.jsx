import "./nav-bar.sass";
import { Link } from "react-router-dom";

const Navbar = () => {
    return (
        <nav className="navigation-bar-container">
            <ul>
                <li>
                    <Link to="/">Home</Link>
                </li>
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