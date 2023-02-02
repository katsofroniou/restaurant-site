import React from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";

function Navbar () {
    return (
        <nav>
            <ul>
                <li>
                    <Link to='/'>Home</Link> 
                </li>
                <li>
                    <Link to='/Menu'>Menu</Link>
                </li>
                <li>
                    <Link to='/NotFound'>Login</Link>
                </li>
            </ul>
        </nav>
    );
}

export default Navbar;