import { useEffect, useState, useRef } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import { w3cwebsocket as W3CWebSocket } from "websocket";


//Page Imports:
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Basket from "./pages/Basket";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Waiter from "./pages/Waiter";
import KitchenStaff from "./pages/KitchenStaff";
import AddItem from "./pages/AddItem";
import Manager from "./pages/Manager";
import AddUser from "./pages/AddUser";
import NotFound from "./pages/NotFound";
import KitchenOrders from "./pages/KitchenOrders";


function OaxacaApp() {


 
    const [groups, setGroups] = useState([]);
 
    const accessToken = localStorage.getItem('access_token');

    

    useEffect(() => {
        axios.get('http://localhost:8000/@me/', {
            headers: {
                Authorization: `Bearer ${accessToken}`
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
        adduser: ['Admin'],
        kitchenorders: ['Kitchen Staff']
    };

    const userHasPermission = (permission) => {
        // Check if the user has any of the required permissions for the page
        return pagePermissions[permission].some(p => groups.includes(p));
    };

    const [notification, setNotification] = useState([]);


    //To add a page to the WebApp please route it as follows: <Route path="name" element={<Name />} />
    //Please note: Add the newly added page before the NotFound Page route as this is the 404 page not found route and should be the last one
    //Also make sure you make it visible to the right permissions and add it to navbar as necessary
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Layout notification={notification} setNotification={setNotification}/>}>
                    <Route index element={<Home />} />
                    <Route path="menu" element={<Menu />} />
                    {userHasPermission('orders') && (
                        <Route path="orders" element={<Orders />} />
                    )}
                    {userHasPermission('basket') && (
                        <Route path="Basket" element={<Basket />} />
                    )}
                    <Route path="login" element={<Login />} />
                    {userHasPermission('addItem') && (
                        <Route path="additem" element={<AddItem />} />
                    )}
                    {userHasPermission('waiter') && (
                        <Route path="waiter" element={<Waiter />} />
                    )}
                    {userHasPermission('kitchenstaff') && (
                        <Route path="kitchenstaff" element={<KitchenStaff notification={notification} setNotification={setNotification}/>} />
                    )}
                    {userHasPermission('manager') && (
                        <Route path="manager" element={<Manager />} />
                    )}
                    {userHasPermission('adduser') && (
                        <Route path="adduser" element={<AddUser />} />
                    )}
                    {userHasPermission('kitchenorders') && (
                        <Route path="kitchenorders" element={<KitchenOrders />} />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
}

export default OaxacaApp;