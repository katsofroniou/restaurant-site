import React from "react";
import { useEffect, useState } from "react";
import { BrowserRouter, Route, Link } from "react-router-dom";
import axios from 'axios';
import "./styling/Navbar.css";
import Logo from '../src/Images/OaxacaLogo.png'

function Navbar () {
    const [user, setUser] = useState([]);

    const getUser = async () => {
        const response = await axios.get('http://127.0.0.1:8000/user/api')
        setUser(response.data)
    }

    useEffect(() =>{
        getUser();
    }, [])
    
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
                    {user.permissions === "customer_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/Menu' class="navbar_links">Menu</Link>
                        </li>
                    )}
                    <li class="navbar_item">
                        <Link to='/Orders' class="navbar_links">Orders</Link>
                    </li>
                    {user.permissions === "waiter_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/waiter' class="navbar_links">Waiter</Link>
                        </li>
                    )}
                    {user.permissions === "waiter_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/additem' class="navbar_links">Add Items</Link>
                        </li>
                    )}
                    {user.permissions === "kitchen_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/kitchenstaff' class="navbar_links">Kitchen Staff</Link>
                        </li>
                    )}
                    {user.permissions === "manager_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/manager' class="navbar_links">Manage Users</Link>
                        </li>
                    )}
                    {user.permissions === "manager_permissions" && user.login === true && (
                        <li class="navbar_item">
                            <Link to='/adduser' class="navbar_links">Add User</Link>
                        </li>
                    )}
                    <li class="navbar_btn">
                        <Link to='/Login' class="navbar_button">Sign in</Link>
                    </li>
                </ul>
            </nav>
        </>
    );
}

export default Navbar;