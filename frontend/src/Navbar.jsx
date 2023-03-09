import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link, redirect} from "react-router-dom";
import axios from 'axios';
import "./styling/Navbar.css";
import Logo from '../src/Images/OaxacaLogo.png'
import Bell from './Images/NotifBell.png'

function Navbar({notification, setNotification}) {
    const token = localStorage.getItem('access_token');
    const [groups, setGroups] = useState([]);
    const [open, setOpen] = useState(false);



    const handleLogOut = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');

        return window.location = "/Login";
    }

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

    // Define permissions for each page
    const pagePermissions = {
        orders: ['Waiter', 'Kitchen Staff'],
        addItem: ['Waiter', 'Kitchen Staff', 'Admin'],
        menu: ['Waiter', 'Kitchen Staff', 'Customer', 'Admin'],
        basket: ['Customer'],
        waiter: ['Waiter'],
        kitchenstaff: ['Kitchen Staff'],
        manager: ['Admin'],
        adduser: ['Admin']
      };

    const userHasPermission = (permission) => {
        // Check if the user has any of the required permissions for the page
        const allowedGroups = pagePermissions[permission];
        if (!allowedGroups) {
            // If the page doesn't have any specific permissions defined, allow access
            return true;
        }
        return allowedGroups.some(p => groups.includes(p));
    };
    const displayNotifications = ({type, name, msg}) => {
        let action;
        if (type === 'notify') {
            action="yes";
        }
        return(
            <span className="navbar_notification"> {`${name} says ${msg}`}</span>
        )
    }

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
                    {(userHasPermission('orders') || userHasPermission('kitchenstaff')) && (
                        <li class="navbar_item">
                            <Link to='/Orders' class="navbar_links">Orders</Link>
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
                    {userHasPermission('waiter') && (
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
                    )}
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