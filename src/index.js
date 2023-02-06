import ReactDOM from "react-dom";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Layout from "./pages/Layout";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Login from "./pages/Login";
import Waiter from "./pages/Waiter";
import NotFound from "./pages/NotFound";
import reportWebVitals from './reportWebVitals';

export default function App() {
  return(
    //To add a page to the WebApp please route it as follows: <Route path="name" element={<Name />} />
    //Please note: Add the newly added page before the NotFound Page route as this is the 404 page not found route and should be the last one
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="menu" element={<Menu />} />
          <Route path="login" element={<Login/>} />
          <Route path="waiter" element={<Waiter />} />
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