import { Col, Container, Row } from "react-bootstrap";
import CalendarModul from "./components/CalendarModul";
import Customers from "./components/Customers";
import TopMenu from "./layout/TopMenu";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { checkLogin } from "./reducers/loginSlice";

import Customer from "./components/views/Customer";
import LoadingModal from "./tools/LoadingModal";
import CdqAddressInput from "./components/CdqAdressInput";
import Login from "./components/Login";

function App() {
  const loginStatus = useSelector((state) => state.loginReducer.isLogged);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkLogin());
  }, [dispatch]);
  return (
    <Router>
      {/* <Container> */}
      <TopMenu />
      {loginStatus ? (
        <div>
          {" "}
          <Routes>
            <Route path="/" element={<CalendarModul />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/customers/:search" element={<Customers />} />
            <Route path="/customer/:id" element={<Customer />} />
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      ) : (
        <div>
          Giriş yapılması gerekir.
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      )}
      <LoadingModal />
    </Router>
  );
}

export default App;
