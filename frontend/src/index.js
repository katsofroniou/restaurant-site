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
  const [user, setUser] = useState([])

  const getUser = async () => {
    const response = await axios.get('http://127.0.0.1:8000/user/api')
    setUser(response.data)
  }

  useEffect(() =>{
    getUser();
  }, [])
  
  return(
    //To add a page to the WebApp please route it as follows: <Route path="name" element={<Name />} />
    //Please note: Add the newly added page before the NotFound Page route as this is the 404 page not found route and should be the last one
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          {user.permissions === "customer_permissions" && user.login === true && (
            <Route path="menu" element={<Menu />} />
          )}
          //Temporary routes during login processess work: 
          <Route path="orders" element={<Orders />} />
          <Route path="login" element={<Login />} />
          <Route path="additem" element={<AddItem />} />
          <Route path="menu" element={<Menu />} />
          <Route path="waiter" element={<Waiter />} />
          <Route path="kitchenstaff" element={<KitchenStaff />} />
          {user.permissions === "customer_permissions" && user.login === true && (
            <Route path="menu" element={<Menu />} />
          )}
          {user.permissions === "waiter_permissions" && user.login === true && (
            <Route path="waiter" element={<Waiter />} />
          )}
          {user.permissions === "waiter_permissions" && user.login === true && (
            <Route path="additem" element={<AddItem />} />
          )}
          {user.permissions === "kitchen_permissions" && user.login === true && (
            <Route path="kitchenstaff" element={<KitchenStaff />} />
          )}
          {user.permissions === "manager_permissions" && user.login === true && (
            <Route path="manager" element={<Manager />} />
          )}
          {user.permissions === "manager_permissions" && user.login === true && (
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