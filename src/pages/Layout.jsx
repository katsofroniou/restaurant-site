import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";

const Layout = () => {
    return (
        <>
            <h1>OAXACA</h1>
            <Navbar />
            <Outlet />
        </>
    );
}

export default Layout;