import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "../styling/Layout.css";

//It is not necessary to touch this file. If you are in this file, you are looking in the wrong place.
const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;