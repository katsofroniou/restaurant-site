import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, redirect} from "react-router-dom";
import axios from 'axios';
import "./styling/Navbar.css";
import Logo from '../src/Images/OaxacaLogo.png'
import Bell from './Images/NotifBell.png'
/**
 * @author Natalia Widmann
 * @author Davit Gevorgyan
 * @author Kayleigh Reid
 * @author Jonathan Lloyd
 * @file Navbar.jsx contains the Navbar so Layout file can render it.
 */

/**
 * @function Navbar
 * @param {*} notification
 * @param {*} setNotification
 * @returns {JSX.Element} Returns the Navigation bar.
 */
function Navbar({notification, setNotification}) {
    /**
     * Retrieves an access token from the browser's local storage and initializes two state variables.
     * @constant
     * @name useTokenAndState
     * @type {Array} An array containing two state variables: groups and open, managed by useState.
     * @throws {TypeError} If no access token is found in the local storage.
     */
    const token = localStorage.getItem('access_token');
    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(false);

    /**
     * Handles logging out the user by removing access and refresh tokens from the browser's local storage and redirecting the user to the login page.
     * @function
     * @name handleLogOut
     * @returns {void}
     */
    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        return window.location = "/Login";
    }

    /**
     * Fetches data from the server about the currently logged-in user's groups using an axios GET request, and updates the state variable "groups" with the retrieved data.
     * @function
     * @name useFetchGroups
     * @param {string} token - The access token retrieved from the local storage.
     * @returns {void}
     * @throws {Error} If the GET request fails.
     */
    useEffect(() => {
        axios.get('http://localhost:8000/@me/', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                const groupNames = response.data.groups.map(group => group.name);
                setGroups(groupNames);
            })
            .catch(error => {
                console.log(error);
            });
    }, []);

    /**
     * An object containing the permissions required to access different pages of the application.
     * @type {Object.<string, string[]>}
     */
    const pagePermissions = {
        orders: ['Waiter', 'Kitchen Staff'],
        updateorders: ['Waiter', 'Kitchen Staff'],
        addItem: ['Waiter', 'Kitchen Staff', 'Admin'],
        menu: ['Waiter', 'Kitchen Staff', 'Customer', 'Admin'],
        basket: ['Customer'],
        waiter: ['Waiter'],
        kitchenstaff: ['Kitchen Staff'],
        manager: ['Admin'],
        adduser: ['Admin'],
        kitchenorders: ['Kitchen Staff']
      };
    
    /**
     * Checks if the user has permission to access a page based on their group.
     * @param {string} permission - The permission required to access the page.
     * @returns {boolean} - A boolean indicating whether the user has permission to access the page or not.
     */
    const userHasPermission = (permission) => {
        // Check if the user has any of the required permissions for the page
        const allowedGroups = pagePermissions[permission];
        if (!allowedGroups) {
            // If the page doesn't have any specific permissions defined, allow access
            return true;
        }
        return allowedGroups.some(p => groups.includes(p));
    };


    /**
     * A function that returns a React component for displaying notifications.
     * @param {Object} props - The properties of the notification to be displayed.
     * @param {string} props.type - The type of the notification.
     * @param {string} props.name - The name of the person who sent the notification.
     * @param {string} props.msg - The message in the notification.
     * @returns {JSX.Element} - A React component for displaying the notification.
     */
    const displayNotifications = ({type, name, msg}) => {
        let action;
        if (type === 'notify') {
            action="yes";
        }
        return(
            <span className="navbar_notification"> {`${name} says ${msg}`}</span>
        )
    }

    /**
     * A function that marks all notifications as read and closes the notifications panel.
     */
    const markRead = () => {
        setNotification([]);
        setOpen(false);
    }

    return (
        <>
            <nav class="navbar">
                <div class="navbar_container">
                    <p> <img style={{ width: 200, height: 110 }} src={Logo}></img> </p>
                </div>
                <ul class="navbar_menu">
                    <li class="navbar_item">
                        <Link to='/' class="navbar_links">Home</Link>
                    </li>
                    <li class="navbar_item">
                        <Link to='/Menu' class="navbar_links">Menu</Link>
                    </li>
                    {userHasPermission('basket') && (
                        <li class="navbar_item">
                            <Link to='/Basket' class="navbar_links">Basket</Link>
                        </li>
                    )}
                    {(userHasPermission('orders')) && (
                        <li class="navbar_item">
                            <Link to='/Orders' class="navbar_links">Orders</Link>
                        </li>
                    )}
                    {(userHasPermission('updateorders') || userHasPermission('kitchenstaff')) && (
                        <li class="navbar_item">
                            <Link to='/UpdateOrders' class="navbar_links">Update Orders</Link>
                        </li>
                    )}
                    {userHasPermission('waiter') && (
                        <li class="navbar_item">
                            <Link to='/waiter' class="navbar_links">Waiter</Link>
                        </li>
                    )}
                    {userHasPermission('addItem') && (
                        <li class="navbar_item">
                            <Link to='/additem' class="navbar_links">Add Items</Link>
                        </li>
                    )}
                    {userHasPermission('kitchenstaff') && (
                        <li class="navbar_item">
                            <Link to='/kitchenstaff' class="navbar_links">Kitchen Staff</Link>
                        </li>
                    )}
                    {userHasPermission('manager') && (
                        <li class="navbar_item">
                            <Link to='/manager' class="navbar_links">Manage Users</Link>
                        </li>
                    )}
                    {userHasPermission('adduser') && (
                        <li class="navbar_item">
                            <Link to='/adduser' class="navbar_links">Add User</Link>
                        </li>
                    )}
                    
                        <div class="navbar_item">
                            <div className="navbar_notifications">
                                <img className="navbar_notifbell" src={Bell} onClick={()=> setOpen(!open)}></img>
                                {notification.length > 0 &&
                                <div className="navbar_notifcounter">{notification.length}</div>
                                }
                                {open && (
                                <div className="navbar_notifContainer">
                                    {notification.map((n) => (displayNotifications(n)))}
                                    <button className="navbar_read" onClick={markRead}> X </button>
                                </div>
                                )}
                            </div>
                            
                        </div>
                    
                    {!token && (
                        <li class="navbar_btn">
                            <Link to='/Login' class="navbar_button">Log in</Link>
                        </li>
                    )}
                    {token && (
                        <li class="navbar_btn">
                            <Link to='/Login' onClick={handleLogOut} class="navbar_button">Log Out</Link>
                        </li>
                    )}
                    
                </ul>
            </nav>
        </>
    );
}

export default Navbar;