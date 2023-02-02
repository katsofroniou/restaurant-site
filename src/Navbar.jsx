import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import "./styling/Navbar.css";

function Navbar () {
    return (
        <nav class="navbar">
            <div class="navbar_container">
            </div>
            <ul class="navbar_menu">
                <li class="navbar_item">
                    <div class="navbar_links">
                        <Link to='/'>Home</Link> 
                    </div>
                </li>
                <li class="navbar_item">
                    <div class="navbar_links">
                        <Link to='/Menu'>Menu</Link>
                    </div>
                </li>
                <li class="navbar_btn">
                    <div class="navbar_button">
                        <Link to='/NotFound'>Sign in</Link>
                    </div>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;