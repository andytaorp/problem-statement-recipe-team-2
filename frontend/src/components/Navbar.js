import { Link } from "react-router-dom";
import { useLogout } from "../hooks/useLogout";
import { useAuthContext } from "../hooks/useAuthContext";
import { useState, useEffect, useRef } from "react";

const Navbar = () => {
    const { logout } = useLogout();
    const { user } = useAuthContext();
    const [showDropdown, setShowDropdown] = useState(false);
    const dropdownRef = useRef(null);

    const handleProfileClick = () => {
        setShowDropdown((prevState) => !prevState);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (
                dropdownRef.current &&
                !dropdownRef.current.contains(event.target)
            ) {
                setShowDropdown(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);

    return (
        <header>
            <div className="container">
                <div className="navbar-left">
                    <Link to="/">
                        <h1>Recipe Book</h1>
                    </Link>
                </div>

                <div className="navbar-right">
                    <nav className="nav-links">
                        <Link to="/nutritionalanalysis">
                            Nutritional Analysis
                        </Link>
                        <Link to="/">My Recipes</Link>
                    </nav>
                    <div className="auth-section">
                        {user ? (
                            <div className="profile-container">
                                <img
                                    src="/pfp.png"
                                    alt="Profile"
                                    className="profile-icon"
                                    onClick={handleProfileClick}
                                />
                                {showDropdown && (
                                    <div
                                        ref={dropdownRef}
                                        className="profile-dropdown"
                                    >
                                        <div className="profile-email">
                                            {user.email}
                                        </div>
                                        <button
                                            className="logout-button"
                                            onClick={logout}
                                        >
                                            Log out
                                        </button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <div className="auth-links">
                                <Link to="/login">Login</Link>
                                <Link to="/signup">Signup</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Navbar;
