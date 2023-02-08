import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "../styling/Layout.css";

const Layout = () => {
    return (
        <>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;