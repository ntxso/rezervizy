import Button from "react-bootstrap/Button";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import OrderAddModal from "../components/OrderAddModal";
import CustomerAdd from "../components/CustomerAdd";
import { useNavigate } from "react-router";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import { clearCustomers } from "../reducers/customerSlice";
import { clearOrders } from "../reducers/orderSlice";
import { logOut } from "../reducers/loginSlice";

function TopMenu() {
  const dispatch=useDispatch();
  const loginStatus = useSelector((state) => state.loginReducer.isLogged);
  //const customerDtoList = useSelector((state) => state.customer.customers);
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const date = useSelector((state) => state.dateReducer.activeDay);
  const [showCustAdd,setShowCustAdd]=useState(false);
  const toggleCustAdd=()=>{setShowCustAdd(!showCustAdd);}
  // const [showSuggestions, setShowSuggestions] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  // useEffect(() => {
  //   console.log("AA:"+filteredCustomersDto.length)
  //   if (filteredCustomersDto.length > 0) {
  //     console.log("BB");
  //     setShowSuggestions(filteredCustomersDto.length < 50);
  //   }
  // }, [searchTerm, filteredCustomersDto]);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const logOutx=()=>{
    dispatch(logOut());
    navigate("/");
  }

  const loginAdmin = () => {
    const login = { email: "niyazi", password: "138181" };
    axios
      .post("https://api.tekrem.com/api/auth/login", login)
      .then((response) => {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        axios
          .get(
            "https://api.tekrem.com/api/user/getuserbyidentityname?identityname=niyazi"
          )
          .then((resp) => {
            console.log("TTT:" + JSON.stringify(resp.data));
            localStorage.setItem("supplierid", resp.data.data.supplierId);
          });
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearchSubmit = () => {
    navigate(`/customers/${searchTerm}`);
  };

  // const handleSuggestionClick = (suggestion) => {
  //   alert(JSON.stringify(suggestion));
  // };
  return (
    <Navbar expand="lg" className="bg-body-tertiary">
      <Container fluid>
        <OrderAddModal
          parentDate={date}
          show={showModal}
          handleClose={closeModal}
        />
        <CustomerAdd isOpen={showCustAdd} toggle={toggleCustAdd}/>
        <Navbar.Brand href="#">Rezervizy</Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            //style={{ maxHeight: '100px' }}
            navbarScroll
          >
            <Nav.Link href="/">Takvim</Nav.Link>
            <Nav.Link href="/customers">Kayıtlar</Nav.Link>
            <NavDropdown title="Üye" id="navbarScrollingDropdown">
              <NavDropdown.Item href="#action3">Bilgiler</NavDropdown.Item>
              <NavDropdown.Item href="#action4">
                Ayarlar
              </NavDropdown.Item>
              <NavDropdown.Divider />
              <NavDropdown.Item href="/login">
                Giriş Yap
              </NavDropdown.Item>
            </NavDropdown>
            <Nav.Link href="#" onClick={openModal}>
              Sipariş Oluştur
            </Nav.Link>
            <Nav.Link href="#" onClick={toggleCustAdd}>
              Yeni Müşteri Ekle
            </Nav.Link>
            {loginStatus&&(
              <Nav.Link href="#" onClick={logOutx}>
              Çıkış Yap
            </Nav.Link>
            )}
          </Nav>
          <Form className="d-flex" onSubmit={handleSearchSubmit}>
            <Form.Control
              type="search"
              placeholder="Telefon veya isimle ara"
              className="me-2"
              aria-label="Search"
              onChange={handleSearchChange}
            />
            <Button type="submit" variant="outline-success">
              Ara
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
      {/* {showSuggestions && (
              <div style={{ position: "relative" }}>
                <div
                  style={{
                    position: "absolute",
                    top: "100%",
                    left: 0,
                    width: "100%",
                    background: "white",
                    border: "1px solid #ccc",
                    boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
                    zIndex: 10, // Üstte görünmesi için z-index ayarı
                  }}
                >
                  <ul>
                    {filteredCustomersDto.map((suggestion) => (
                      <li
                        key={suggestion.customerId}
                        onClick={() => handleSuggestionClick(suggestion)}
                      >
                        {suggestion.phoneNumber}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )} */}
    </Navbar>
  );
}

export default TopMenu;
