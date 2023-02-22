import { useEffect, useState } from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from 'axios';
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Orders from "./pages/Orders";
import Login from "./pages/Login";
import Waiter from "./pages/Waiter";
import KitchenStaff from "./pages/KitchenStaff";
import AddItem from "./pages/AddItem";
import Manager from "./pages/Manager";
import AddUser from "./pages/AddUser";
import NotFound from "./pages/NotFound";
import reportWebVitals from './reportWebVitals';

export default function App() {
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
    addItem: ['Waiter', 'Kitchen Staff'],
    menu: ['Waiter', 'Kitchen Staff', 'Customer'],
    waiter: ['Waiter'],
    kitchenstaff: ['Kitchen Staff'],
    manager: ['Admin'],
    adduser: ['Admin']
  };

  const userHasPermission = (permission) => {
    // Check if the user has any of the required permissions for the page
    return pagePermissions[permission].some(p => groups.includes(p));
  };

  //To add a page to the WebApp please route it as follows: <Route path="name" element={<Name />} />
  //Please note: Add the newly added page before the NotFound Page route as this is the 404 page not found route and should be the last one
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {accessToken && userHasPermission('menu') && (
            <Route path="menu" element={<Menu />} />
          )}
          {accessToken && userHasPermission('orders') && (
            <Route path="orders" element={<Orders />} />
          )}
          <Route path="login" element={<Login />} />
          {accessToken && userHasPermission('addItem') && (
            <Route path="additem" element={<AddItem />} />
          )}
          {accessToken && userHasPermission('waiter') && (
            <Route path="waiter" element={<Waiter />} />
          )}
          {accessToken && userHasPermission('kitchenstaff') && (
            <Route path="kitchenstaff" element={<KitchenStaff />} />
          )}
          {accessToken && userHasPermission('manager') && (
            <Route path="manager" element={<Manager />} />
          )}
          {accessToken && userHasPermission('adduser') && (
            <Route path="adduser" element={<AddUser />} />
          )}
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.render(<App />, document.getElementById("root"));
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();