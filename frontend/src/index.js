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
    orders: ['Waiter', 'Kitchen Staff', 'Admin'],
    addItem: ['Waiter', 'Kitchen Staff', 'Admin'],
    menu: ['Waiter', 'Kitchen Staff', 'Customer', 'Admin'],
    waiter: ['Waiter', 'Admin'],
    kitchenstaff: ['Kitchen Staff', 'Admin'],
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
          <Route path="menu" element={<Menu />} />
          {userHasPermission('orders') && (
            <Route path="orders" element={<Orders />} />
          )}
          <Route path="login" element={<Login />} />
          {userHasPermission('addItem') && (
            <Route path="additem" element={<AddItem />} />
          )}
          {userHasPermission('waiter') && (
            <Route path="waiter" element={<Waiter />} />
          )}
          {userHasPermission('kitchenstaff') && (
            <Route path="kitchenstaff" element={<KitchenStaff />} />
          )}
          {userHasPermission('manager') && (
            <Route path="manager" element={<Manager />} />
          )}
          {userHasPermission('adduser') && (
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