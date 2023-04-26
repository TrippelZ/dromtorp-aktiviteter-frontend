import { NavLink, useLocation } from 'react-router-dom';
import './menu.css';
import { useState } from 'react';
import { ReactComponent as Burger } from '../../assets/burger.svg';

function Menu() {
    const [menuClass, SetMenuClass] = useState("menu menu-initial");

    const currentRoute = useLocation().pathname;
    const homeLocation = currentRoute === "/" || currentRoute === "/home" || false;

    function OpenMenu() {
        if (menuClass === "menu menu-active") return;

        SetMenuClass("menu menu-active");
        document.getElementById("menu-pagecover").animate({
          opacity: "0.5"
        }, {
          duration: 500,
          fill: "forwards"
        });
      }
    
      function CloseMenu() {
        if (menuClass !== "menu menu-active") return;

        SetMenuClass("menu menu-inactive");
        document.getElementById("menu-pagecover").animate({
          opacity: "0"
        }, {
          duration: 500,
          fill: "forwards"
        });
      }

    return (
        <>
        <button className="menu-button menu-button-open"
            onClick={
                OpenMenu
            }>
            <Burger title="Menu" className="menu-image menu-button-image" />
        </button>

        <nav className={menuClass}>
            <button className="menu-button"
                onClick={
                    CloseMenu
                }>
                <Burger title="Menu" className="menu-image menu-button-image" />
            </button>

            <NavLink to="/home" end className={() =>
              homeLocation ? "menu-link menu-link-active" : "menu-link"
            }>
            <h3>Hjemmeside</h3>
            </NavLink>

            <NavLink to={"/user/"} end className={({ isActive }) =>
                isActive ? "menu-link menu-link-active" : "menu-link"
            }>
            <h3>Min Profil</h3>
            </NavLink>

            <NavLink to="/activities" end className={({ isActive }) =>
                isActive ? "menu-link menu-link-active" : "menu-link"
            }>
            <h3>Aktiviteter</h3>
            </NavLink>

            <footer className="footer">
                ©{new Date().getFullYear()} Zander Øyjordet Christensen
            </footer>
        </nav>

        <div id="menu-pagecover" onClick={CloseMenu}></div>
        </>
    )
}

export default Menu;
