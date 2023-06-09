import { useState } from "react";
import routes from "@config/routes";
import { Link, useNavigate } from "react-router-dom";
import { Button, PopupMenu, LoginForm } from "@components";
import { useAuthContext } from "@hooks/useAuthContext";
import "./header.scss";

const Header = () => {
    const navigate = useNavigate();
    const { state, logout } = useAuthContext();

    const [userMenuOpen, setUserMenuOpen] = useState(false);
    const [loginPopupOpen, setLoginPopupOpen] = useState(false);

    return (
        <header className="header">
            <PopupMenu title="Login" open={loginPopupOpen} setOpen={setLoginPopupOpen}>
                <LoginForm setLoginPopupOpen={setLoginPopupOpen} />
            </PopupMenu>
            <section className="header__section">
                <Link to={routes.home}>
                    <img className="header__logo" src="/icons/westsite-logo.svg" alt="logo" />
                </Link>
                <nav className="header__nav">
                    <ul className="header__nav-links">
                        <li className="header__nav-link">
                            <Link to="#">Trainingsmomenten</Link>
                        </li>
                        <li className="header__nav-link">
                            <Link to="#">Nieuws</Link>
                        </li>
                        <li className="header__nav-link">
                            <Link to="#">Trick List</Link>
                        </li>
                        <li className="header__nav-link">
                            <Link to="#">About</Link>
                        </li>
                    </ul>
                </nav>
            </section>
            {state.user ? (
                <section className="header__section">
                    <div className="header__user-menu">
                        <Button type="secondary" onClick={() => setUserMenuOpen(!userMenuOpen)}>
                            Welcome Terug <span className="header__user">{state.user.firstname}!</span>
                        </Button>
                        <div className={`header__user-menu-dropdown ${userMenuOpen ? "header__user-menu-dropdown--active" : ""}`}>
                            <ul
                                className="header__user-menu-options"
                                onClick={() => {
                                    setUserMenuOpen(false);
                                    navigate(routes.profile);
                                }}
                            >
                                <li className="header__user-menu-option">
                                    <img src="/icons/profile.svg" alt="profile icon" />
                                    <span>Mijn Account</span>
                                </li>
                                <li
                                    className="header__user-menu-option"
                                    onClick={() => {
                                        setUserMenuOpen(false);
                                        logout();
                                    }}
                                >
                                    <img src="/icons/logout.svg" alt="profile icon" />
                                    <span>Uitloggen</span>
                                </li>
                            </ul>
                        </div>
                    </div>
                </section>
            ) : (
                <section className="header__section">
                    <Button type="primary" onClick={() => setLoginPopupOpen(true)}>
                        Inloggen
                    </Button>
                </section>
            )}
        </header>
    );
};

export default Header;
