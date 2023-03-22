import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "../Navbar";
import "../styling/Layout.css";
/**
 * @author Natalia Widmann
 * @author Davit Gevorgyan
 * @file Layout.jsx renders the outlet and the navbar.
 */

/**
 * A layout component that renders a Navbar and an Outlet.
 * @param {Object} props - The props object that contains the notification and setNotification props.
 * @param {string} props.notification - The notification message to display in the Navbar.
 * @param {function} props.setNotification - A callback function to set the notification message in the parent component.
 * @returns {JSX.Element} - The JSX representation of the component.
 */
const Layout = (props) => {

    return (
        <>
            <Navbar  notification={props.notification} setNotification={props.setNotification}/>
            <Outlet />
        </>
    );
}

export default Layout;