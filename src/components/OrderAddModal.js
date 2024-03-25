// Modal.js

import React, { useEffect, useState, useRef } from "react";
import { Modal } from "react-bootstrap";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Row,
  Col,
  Collapse,
} from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import Form from "react-bootstrap/Form";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css";
import moment from "moment";

import { addOrder, fetchAddOrder } from "../reducers/orderSlice";
import { setLoading } from "../reducers/generalSlice";
import CdqAddressInput from "./CdqAdressInput";
import {
  addCustomer,
  fetchAddressAdd,
  fetchCustomerAdd,
} from "../reducers/customerSlice";

function formatPhoneNumber(phoneNumber) {
  if (!phoneNumber) return "";
  if (phoneNumber.charAt(0) === "+") return phoneNumber;
  else if (phoneNumber.charAt(0) === "0") return "+9" + phoneNumber;
  else if (phoneNumber.length === 10) return "+90" + phoneNumber;
  return phoneNumber;
}
const OrderAddModal = ({ parentDate, show, handleClose }) => {
  // const phoneNumberList = useSelector((state) => state.customer.customers).map(
  //   (customer) => customer.phoneNumber
  // );
  //const [show,setShow]=useState(propShow);
  //
  const dispatch = useDispatch();
  const customerDtoList = useSelector((state) => state.customer.customers);
  let isFillList = false;
  if (customerDtoList) {
    isFillList = customerDtoList.length !== 0;
  }
  //const isFillList=customerDtoList?true:(customerDtoList.length!==0)?true:false;
  let lastCustomerDto = {};
  if (isFillList) {
    lastCustomerDto = customerDtoList[customerDtoList.length - 1];
  }

  const inputCity = useSelector((state) => state.cdqReducer.inputCity);
  const inputDistrict = useSelector((state) => state.cdqReducer.inputDistrict);
  const inputQuarter = useSelector((state) => state.cdqReducer.inputQuarter);
  const inputAddress = useSelector((state) => state.cdqReducer.inputAddress);

  const [date, setDate] = useState(parentDate);
  const [time, setTime] = useState("10:00");
  const [searchTerm, setSearchTerm] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [showInputs, setShowInputs] = useState(false);
  const [selectedCustomerDto, setSelectedCustomerDto] = useState(null);

  const inputClockRef = useRef(null);
  const inputNameRef = useRef(null);
  const inputAddressRef = useRef(null);
  //const [inputTestRef, setInputRef] = useState(useRef(null));
  //const inputTestRef = useRef(null);
  let filteredCustomersDto = [];
  if (isFillList) {
    filteredCustomersDto = customerDtoList.filter((cust) =>
      cust.phoneNumber.includes(searchTerm)
    );
  }

  const [formData, setFormData] = useState({});
  //   orderId: 0,
  //   customerId: 0,
  //   status: 1,
  //   deliveryDate: moment(new Date(parentDate)).format("YYYY-MM-DDTHH:mm"),
  //   note: "",
  //   total: "",
  //   terminal: 1,
  //   takingDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
  //   phoneNumber: "",
  //   name: "",
  //   address: "",
  // });

  const resetModal = () => {
    setDate(parentDate);
    setTime("10:00");
    setSearchTerm("");
    setShowInputs(false);
    setShowSuggestions(false);
    setSelectedCustomerDto(null);
    setFormData((prevData) => ({
      ...prevData,
      orderId: 0,
      customerId: 0,
      status: 1,
      deliveryDate: moment(new Date(parentDate)).format("YYYY-MM-DDTHH:mm"),
      note: "",
      total: "",
      terminal: 1,
      takingDate: moment(new Date()).format("YYYY-MM-DDTHH:mm"),
      phoneNumber: "",
      name: "",
      address: "",
    }));
  };

  useEffect(() => {
    if (show) {
      resetModal();
    }
  }, [show]);

  useEffect(() => {
    const newDatetime = moment(`${date}T${time}`);
    const formattedDatetime = newDatetime.format("YYYY-MM-DDTHH:mm");
    setFormData((prevData) => ({
      ...prevData,
      deliveryDate: formattedDatetime,
    }));
  }, [date, time]);

  useEffect(() => {
    setDate(parentDate);
  }, [parentDate]);

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
    if (showInputs) {
      if (selectedCustomerDto) {
        console.log("burassdfa");
        if (inputNameRef.current && inputAddressRef.current) {
          inputNameRef.current.disabled = true;
          inputAddressRef.current.disabled = true;
          console.log("adr:" + inputAddressRef.current.disabled);
        }
        setFormData((prevData) => ({
          ...prevData,
          name: selectedCustomerDto.name,
          address: selectedCustomerDto.address,
          customerId: selectedCustomerDto.customerId,
        }));
        if (inputClockRef.current) {
          inputClockRef.current.focus();
        }
      } else {
        setFormData((prevData) => ({
          ...prevData,
          name: "",
          address: "",
          customerId: 0,
        }));
        if (inputNameRef.current && inputAddressRef.current) {
          inputNameRef.current.disabled = false;
          inputAddressRef.current.disabled = false;
          console.log("adr:" + inputAddressRef.current.disabled);
        }
        if (inputNameRef.current) {
          inputNameRef.current.focus();
        }
      }
    }
  }, [showInputs, selectedCustomerDto, inputAddressRef, inputNameRef]);

  const handlePhoneChange = (e) => {
    //setShowSuggestions(true);
    if (e) {
      if (e.length > 3) {
        setSearchTerm(e.slice(3));
      }
    }
    //console.log("a:" + filteredCustomersDto.length + "b:" + searchTerm.length+"c:");
    //setShowSuggestions(searchTerm < 10);
    setFormData((prevData) => ({
      ...prevData,
      phoneNumber: e,
    }));
  };

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.customerId) {
      const orderData = {
        orderId: 0,
        customerId: formData.customerId,
        status: 1,
        takingDate: formData.takingDate,
        deliveryDate: formData.deliveryDate,
        terminal: 1,
        note: formData.note,
        total: formData.total,
      };
      dispatch(setLoading(true));
      await dispatch(fetchAddOrder(orderData));
      dispatch(addOrder(orderData));
      dispatch(setLoading(false));
      //console.log(JSON.stringify(orderData));
      resetModal();
      handleClose();
    } else {
      const newCustomer = {
        id: 0,
        name: formData.name,
        phoneNumber: formData.phoneNumber,
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
      const newOrder = {
        orderId: 0,
        customerId: 0,
        status: 1,
        takingDate: formData.takingDate,
        deliveryDate: formData.deliveryDate,
        terminal: 1,
        total: formData.total,
        note: formData.note,
      };

      const newCustomerDto = {
        customerId: 0,
        phoneNumber: formData.phoneNumber,
        name: formData.name,
        cityId: inputCity,
        districtId: inputDistrict,
        quarterId: inputQuarter,
        address: inputAddress,
      };
      dispatch(setLoading(true));
      const newCustId = await dispatch(fetchCustomerAdd(newCustomer));
      newAddress.customerId = newCustId.payload;
      newOrder.customerId = newCustId.payload;
      newCustomerDto.customerId = newCustId.payload;
      await dispatch(fetchAddressAdd(newAddress));
      await dispatch(fetchAddOrder(newOrder));
      dispatch(addCustomer(newCustomerDto));
      dispatch(addOrder(newOrder));
      dispatch(setLoading(false));

      console.log("YENİ müşt:" + JSON.stringify(newCustomer));
      console.log(`YeniAdres:${JSON.stringify(newAddress)}`);
      console.log("yeniSip:" + JSON.stringify(newOrder));
      resetModal();
      handleClose();
    }
    console.log("Form verileri:", formData);
    console.log("selected:" + JSON.stringify(selectedCustomerDto));
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
      console.log("if li once:" + searchTerm);
      setSearchTerm(suggestion.phoneNumber);
      console.log("if li sonra:" + searchTerm);
    }
    setShowInputs(true);
    setFormData((prevData) => ({
      ...prevData,
      //phoneNumber: suggestion,
      phoneNumber: formatPhoneNumber(suggestion.phoneNumber),
    }));

    setSelectedCustomerDto(suggestion);
    setShowSuggestions(false);
  };
  // const filteredNumbers = phoneNumberList.filter((name) =>
  //   name.includes(searchTerm)
  // );

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>
          <span className="text-primary">
            {new Date(date).toLocaleDateString("tr-TR", {
              weekday: "long",
              //year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </span>{" "}
          Sipariş Oluştur
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label for="deliveryDate">Tarih</Label>
            <Input
              type="date"
              name="datetime"
              id="deliveryDate"
              value={date}
              onChange={handleDateChange}
              //innerRef={inputDateRef}
            />
          </FormGroup>
          <FormGroup>
            <Label>Telefon Numarası</Label>
            <PhoneInput
              className="phoneInput--focus"
              focus="true"
              id="phoneNumber"
              defaultCountry="TR"
              value={formData.phoneNumber}
              name="phoneNumber"
              onChange={handlePhoneChange}
              onBlur={handleOnBlur}
            />
          </FormGroup>

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
              Müşteri bulundu. Lütfen diğer bilgileri girin
            </div>
          ) : showInputs ? (
            <div className="alert alert-warning py-0" role="alert">
              Siparişi tamamlamak için lütfen aşağıdaki bilgileri girin
            </div>
          ) : (
            <div className="alert alert-danger py-0" role="alert">
              Diğer bilgileri girebilmek için lütfen önce telefon numarasını
              girin
            </div>
          )}

          {/* <AutocompleteDene suggestions={filteredNumbers}/> */}
          <Collapse isOpen={showInputs}>
            <FormGroup>
              <Label for="name">İsim</Label>
              <Input
                type="text"
                name="name"
                id="name"
                value={formData.name}
                onChange={handleChange}
                innerRef={inputNameRef}
              />
            </FormGroup>
          </Collapse>
          <Collapse isOpen={showInputs && formData.customerId}>
            <FormGroup>
              <Label for="address">Adres</Label>
              <Input
                type="textarea"
                name="address"
                id="address"
                value={formData.address}
                onChange={handleChange}
                innerRef={inputAddressRef}
              />
            </FormGroup>
          </Collapse>
          <Collapse isOpen={showInputs && !formData.customerId}>
            <CdqAddressInput address={lastCustomerDto} />
          </Collapse>
          <Collapse isOpen={showInputs}>
            <FormGroup>
              <Label for="time">Saat</Label>
              <Input
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                innerRef={inputClockRef}
              />
            </FormGroup>
            <FormGroup>
              <Label for="note">Not</Label>
              <Input
                type="textarea"
                name="note"
                id="note"
                value={formData.note}
                onChange={handleChange}
              />
            </FormGroup>
            <FormGroup>
              <Label for="total">Tutar</Label>
              <Input
                type="number"
                name="total"
                id="total"
                value={formData.total}
                onChange={handleChange}
              />
            </FormGroup>

            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <Button color="primary" type="submit">
                Kaydet
              </Button>
              <Button variant="secondary" onClick={handleClose}>
                Kapat
              </Button>
            </div>
          </Collapse>
        </Form>
      </Modal.Body>
      <Modal.Footer></Modal.Footer>
    </Modal>
  );
};

export default OrderAddModal;
