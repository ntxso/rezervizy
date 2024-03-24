import moment from "moment";
import React, { useEffect, useRef, useState } from "react";
import { Card, Row, Col, Button, Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faCirclePlus,
  faTurkishLiraSign,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import CustomerLeftCard from "./CustomerLeftCard";
import OrderAddModal from "./OrderAddModal";
import TestTwoModal from "../tools/TestTwoModal";
import CustomerAndOrder from "./CustomerAndOrder";

const OrderDay = ({ date }) => {
  const spanStyle = {
    cursor: "pointer",
  };

  const [showModal, setShowModal] = useState(false);
  //const date = useSelector((state) => state.dateReducer.activeDay);
  const [parentDate, setParentDate] = useState(date);
  const activeCust = useSelector((state) => state.customer.activeCustomerDto);

  useEffect(() => {
    setParentDate(date);
  }, [date]);

  //const [date,setDate]=useState[useSelector((state) => state.dateReducer.activeDay)]
  const orders = useSelector((state) => state.orderx.orders);

  const formattedDate = moment(date).format("YYYY-MM-DD");
  const matchingOrders = orders.filter(
    (order) => order.deliveryDate.slice(0, 10) === formattedDate
  );
  matchingOrders.sort((a, b) => {
    return new Date(a.deliveryDate) - new Date(b.deliveryDate);
  });

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  //const date=new Date();
  //localStorage.setItem("anahtar","degerli");

  return (
    <div className="me-2">
      <OrderAddModal
        parentDate={parentDate}
        show={showModal}
        handleClose={closeModal}
      />
      <Container>
        <Row className="border-bottom mb-2 pb-2">
          <Col
            xs={9}
            className="d-flex flex-column align-items-center justify-content-center"
          >
            <div className="d-flex flex-column align-items-center justify-content-center">
              <span className="text-success">
                {new Date(date).toLocaleDateString("tr-TR", {
                  weekday: "long",
                  //year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
              {matchingOrders.length !== 0 ? (
                <>
                  <div className="w-100 d-flex justify-content-center">
                    <span className="alert alert-info py-0">
                      {matchingOrders.length} adet sipariş listelendi
                    </span>
                  </div>
                </>
              ) : (
                <div className="d-flex align-items-center justify-content-center">
                  <span className="alert alert-danger py-0 mt-1">
                    Bu tarihe ait sipariş bulunmuyor
                  </span>
                </div>
              )}
              
            </div>
            {/* <span className="text-success">
              {new Date(date).toLocaleDateString("tr-TR", {
                weekday: "long",
                //year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
         
          <span className="alert alert-danger py-0 mt-1">
            Bu tarihe ait sipariş bulunmuyor
          </span> */}
          </Col>
          <Col
            xs={3}
            className="d-flex align-items-center justify-content-center"
          >
            <span
              style={spanStyle}
              onClick={openModal}
              className="text-success"
            >
              <FontAwesomeIcon icon={faCirclePlus} size="2x" />
            </span>
          </Col>
        </Row>
      </Container>
      {matchingOrders.length !== 0 ? (
        <>
          
          {matchingOrders.map((order) => (
            <div className="container">
              <CustomerAndOrder custId={order.customerId} order={order} />
            </div>
          ))}
        </>
      ) : (
       <></>
      )}
    </div>
  );
};

export default OrderDay;
