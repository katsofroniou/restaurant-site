import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./styling/Navbar.css";
import Logo from '../src/Images/OaxacaLogo.png'

function Navbar () {
    return (
        <>
            <nav class="navbar">
                <div class="navbar_container">
                    <p> <img style = {{ width: 200, height: 110 }} src={Logo}></img> </p>
                </div>
                <ul class="navbar_menu">
                    <li class="navbar_item">
                        <Link to='/' class="navbar_links">Home</Link>
                    </li>
                    <li class="navbar_item">
                        <Link to='/Menu' class="navbar_links">Menu</Link>
                    </li>
                    <li class="navbar_btn">
                        <Link to='/Login' class="navbar_button">Sign in</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;