import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, FormGroup, Label, Input, Button, ModalFooter } from "reactstrap";
import { useNavigate } from "react-router";
import { fetchCities } from "../reducers/cdqSlice";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";
import {
  addCustomer,
  fetchAddressAdd,
  fetchCustomerAdd,
  fetchCustomers,
} from "../reducers/customerSlice";
import { setLoading } from "../reducers/generalSlice";
import CdqAddressInput from "./CdqAdressInput";
import PhoneInput from "react-phone-number-input";
import { Link } from "react-router-dom";

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";
  if (phoneNumber.charAt(0) === "+") return phoneNumber;
  else if (phoneNumber.charAt(0) === "0") return "+9" + phoneNumber;
  else if (phoneNumber.length === 10) return "+90" + phoneNumber;
  return phoneNumber;
}

const CustomerAdd = ({ isOpen, toggle }) => {
  const dispatch = useDispatch();
  const customerDtoList = useSelector((state) => state.customer.customers);
  let isFillList = false;
  if (customerDtoList) {
    isFillList = customerDtoList.length !== 0;
  }
  let lastCustomerDto = {};
  if (isFillList) {
    lastCustomerDto = customerDtoList[customerDtoList.length - 1];
  }
  const inputCity = useSelector((state) => state.cdqReducer.inputCity);
  const inputDistrict = useSelector((state) => state.cdqReducer.inputDistrict);
  const inputQuarter = useSelector((state) => state.cdqReducer.inputQuarter);
  const inputAddress = useSelector((state) => state.cdqReducer.inputAddress);

  const inputPhoneRef = useRef(null);

  //   const customer = useSelector((state) => state.customer.activeCustomer);
  //   const address = useSelector((state) => state.customer.activeAddress);

  const [customerData, setCustomerData] = useState({});
  //const [addressData, setAddressData] = useState({});
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCustomerDto, setSelectedCustomerDto] = useState([]);
  const [showInputs, setShowInputs] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);

  let filteredCustomersDto = [];
  if (isFillList) {
    filteredCustomersDto = customerDtoList.filter((cust) =>
      cust.phoneNumber.includes(searchTerm)
    );
  }

  useEffect(() => {
    if (searchTerm.length > 9) {
      if (filteredCustomersDto.length === 1) {
        setSelectedCustomerDto(filteredCustomersDto[0]);
      }
      setShowInputs(true);
      setShowSuggestions(false);
    } else {
      setShowInputs(false);
      setSelectedCustomerDto(null);
      if (filteredCustomersDto.length > 0) {
        setShowSuggestions(filteredCustomersDto.length < 11);
      }
    }
  }, [searchTerm, filteredCustomersDto]);

  useEffect(() => {
    dispatch(fetchCities());
    if (customerDtoList) {
      if (customerDtoList.length === 0) {
        dispatch(fetchCustomers());
      }
    }
  }, [dispatch, customerDtoList]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCustomerData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handlePhoneChange = (e) => {
    //setShowSuggestions(true);
    if (e) {
      if (e.length > 3) {
        setSearchTerm(e.slice(3));
      }
    }
    //console.log("a:" + filteredCustomersDto.length + "b:" + searchTerm.length+"c:");
    //setShowSuggestions(searchTerm < 10);
    setCustomerData((prevData) => ({
      ...prevData,
      phoneNumber: e,
    }));
  };

  const handleOnBlur = () => {
    if (filteredCustomersDto.length === 1) {
      setSelectedCustomerDto(filteredCustomersDto[0]);
      setShowInputs(true);
    }
    if (searchTerm.length > 9) {
      setShowSuggestions(false);
      setShowInputs(true);
    }
  };

  const handleSuggestionClick = (suggestion) => {
    console.log("tıklandı:" + suggestion.phoneNumber);
    if (searchTerm.length < 10) {
      setSearchTerm(suggestion.phoneNumber);
    }
    setShowInputs(true);
    setCustomerData((prevData) => ({
      ...prevData,
      //phoneNumber: suggestion,
      phoneNumber: formatPhoneNumber(suggestion.phoneNumber),
    }));

    setSelectedCustomerDto(suggestion);
    setShowSuggestions(false);
  };

  const resetModal = () => {
    console.log("reset modal");

    setSubmittedData(null);
    setSearchTerm("");
    setCustomerData((prevData) => ({
      ...prevData,
      phoneNumber: "",
    }));
    toggle();
    console.log("reset modal");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      id: 0,
      name: customerData.name,
      phoneNumber: customerData.phoneNumber,
      supplierId: localStorage.getItem("supplierid"),
    };
    const newAddress = {
      id: 0,
      customerId: 0,
      cityId: inputCity,
      districtId: inputDistrict,
      quarterId: inputQuarter,
      address: inputAddress,
    };

    const newCustomerDto = {
      customerId: 0,
      phoneNumber: customerData.phoneNumber,
      name: customerData.name,
      cityId: inputCity,
      districtId: inputDistrict,
      quarterId: inputQuarter,
      address: inputAddress,
    };

    dispatch(setLoading(true));
    const newCustId = await dispatch(fetchCustomerAdd(newCustomer));
    newAddress.customerId = newCustId.payload;
    newCustomerDto.customerId = newCustId.payload;
    await dispatch(fetchAddressAdd(newAddress));
    dispatch(addCustomer(newCustomerDto));
    dispatch(setLoading(false));
    setSubmittedData(newCustomerDto);
  };

  const modalBody = () => {
    return (
      <div>
        {submittedData === null && (
          <FormGroup>
            <Label for="phoneNumber">Telefon Numarası</Label>
            <PhoneInput
              className="phoneInput--focus"
              focus="true"
              id="phoneNumber"
              defaultCountry="TR"
              value={customerData.phoneNumber}
              name="phoneNumber"
              onChange={handlePhoneChange}
              onBlur={handleOnBlur}
              innerRef={inputPhoneRef}
            />
          </FormGroup>
        )}

        {showSuggestions && (
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
                zIndex: 1, // Üstte görünmesi için z-index ayarı
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
        )}
        {selectedCustomerDto ? (
          <div className="alert alert-info py-0" role="alert">
            <Link
              onClick={resetModal}
              to={`customer/${selectedCustomerDto.customerId}`}
            >
              Bu numara kayıtlı. Müşteri kartına gitmek için tıklayın
            </Link>
          </div>
        ) : showInputs ? (
          <>
            <div className="alert alert-warning py-0" role="alert">
              Siparişi tamamlamak için lütfen aşağıdaki bilgileri girin
            </div>
            <FormGroup>
              <Label for="name">İsim</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={customerData.name}
                onChange={handleChange}
              />
            </FormGroup>
            <CdqAddressInput address={lastCustomerDto} />
          </>
        ) : (
          <div className="alert alert-danger py-0" role="alert">
            Diğer bilgileri girebilmek için lütfen önce telefon numarasını girin
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>
            Müşteri Bul/Ekle {JSON.stringify(submittedData)}
          </ModalHeader>
          <ModalBody>
            {submittedData ? (
              <div
                onClick={toggle}
                className="alert alert-info py-0"
                role="alert"
              >
                <Link
                  onClick={resetModal}
                  to={`customer/${submittedData.customerId}`}
                >
                  Kayıt tamamlandı. Müşteri kartına gitmek için tıklayın
                </Link>
              </div>
            ) : (
              modalBody()
            )}
          </ModalBody>
          {submittedData === null && (
            <ModalFooter>
              {selectedCustomerDto ? (
                <></>
              ) : (
                <Button color="primary" type="submit">
                  Kaydet
                </Button>
              )}

              <Button color="secondary" onClick={toggle}>
                Kapat
              </Button>
            </ModalFooter>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default CustomerAdd;
