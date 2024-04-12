import React, { useCallback, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectOrders, fetchOrdersTwoDate } from "../reducers/orderSlice";
import { setLoading } from "../reducers/generalSlice";

import { changeDay } from "../reducers/dateSlice";

import Calendar from "react-calendar";
import "./calendar.css";
import moment from "moment";
import OrderDay from "./OrderDay";
import { fetchCustomers } from "../reducers/customerSlice";
import { Col, Row } from "react-bootstrap";
import DistrictName from "./DistrictName";

function CalendarModul() {
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));

  const [startDate, setStartDate] = useState(""); // YYYY-MM-DD formatında
  const [endDate, setEndDate] = useState(""); // YYYY-MM-DD formatında

  const customers = useSelector((state) => state.customer.customers);
  const orders = useSelector(selectOrders);
  const dispatch = useDispatch();

  useEffect(() => {
    const tempNewDate = new Date();
    const newStartDate = new Date(
      tempNewDate.getFullYear(),
      tempNewDate.getMonth(),
      1
    );
    const newEndDate = new Date(
      tempNewDate.getFullYear(),
      tempNewDate.getMonth() + 1,
      0
    );
    newStartDate.setDate(newStartDate.getDate() - 7);
    newEndDate.setDate(newEndDate.getDate() + 7);

    const tempStrDate1 = newStartDate.toISOString().split("T")[0];
    const tempStrDate2 = newEndDate.toISOString().split("T")[0];

    const fetchData = async () => {
      try {
        dispatch(setLoading(true));

        //await dispatch(fetchCustomers());
        await dispatch(
          fetchOrdersTwoDate({ one: tempStrDate1, two: tempStrDate2 })
        );
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  const getTileContent = ({ date, view }) => {
    if (view === "month") {
      const formattedDate = moment(date).format("YYYY-MM-DD");
      const matchingOrders = orders.filter(
        (order) => order.deliveryDate.slice(0, 10) === formattedDate
      );
      matchingOrders.sort((a, b) => {
        return new Date(a.deliveryDate) - new Date(b.deliveryDate);
      });

      if (matchingOrders.length > 0) {
        let className = "nt-level1-back bg-gradient nt-box-shadow"; // Varsayılan sınıf

        if (matchingOrders.length === 2) {
          className = "nt-level2-back bg-gradient nt-box-shadow"; // 2 eleman varsa bu sınıfı kullan
        } else if (matchingOrders.length >= 3) {
          className = "nt-level3-back bg-gradient nt-box-shadow"; // 3 veya daha fazla eleman varsa bu sınıfı kullan
        }
        return (
          <div
            className={className}
            style={{ height: "65px" }}
          >
            {matchingOrders.map((item) => (
              <div key={item.orderId} className="nt-text-box">
                <span className="me-1">{item.deliveryDate.split("T")[1].slice(0, 5)}</span>
                <span> <DistrictName customerId={item.customerId}></DistrictName> </span>
              </div>
            ))}
          </div>
        );
      } else {
        return (
          <div
            style={{ height: "55px",width:"60px", textAlign: "center", marginTop: "5px" }}
          >
            {" "}
          </div>
        );
      }
    }
    return null;
  };

  useEffect(() => {
    // startDate veya endDate değiştiğinde çalışacak useEffect

    if (startDate && endDate) {
      const fetchData = async () => {
        try {
          //setLoading(true);
          dispatch(setLoading(true));
          //await dispatch(fetchCustomers());
          await dispatch(fetchOrdersTwoDate({ one: startDate, two: endDate }));
          //setLoading(false); // dispatch işlemleri tamamlandığında loading'i false yap
        } catch (error) {
          console.error("Error fetching data:", error);
          //setLoading(false); // Hata durumunda da loading'i false yap
        } finally {
          dispatch(setLoading(false));
        }
      };

      fetchData();
    }
  }, [dispatch, startDate, endDate]);

  const handleDateChange = useCallback((newDate) => {
    setDate(moment(newDate).format("YYYY-MM-DD"));

    const newStartDate = new Date(newDate.getFullYear(), newDate.getMonth(), 1);
    const newEndDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth() + 1,
      0
    );
    newStartDate.setDate(newStartDate.getDate() - 7);
    newEndDate.setDate(newEndDate.getDate() + 7);

    setStartDate(newStartDate.toISOString().split("T")[0]);
    setEndDate(newEndDate.toISOString().split("T")[0]);
  }, []);

  //  const [isOpen,setIsOpen]=useState(true);
  //   const toggleAction=()=>setIsOpen(!isOpen);
  return (
    <div>
      {/* <ModalGeneral isOpen={isOpen} toggle={toggleAction} headText="Başlık" component={TestTemp}></ModalGeneral> */}
      <h1 className="text-center">Rezervasyon Takvimi</h1>
      <Row>
        <Col md="7">
          <div className="calendar-container ms-2 mb-3">
            <Calendar
              value={date}
              onChange={handleDateChange}
              // onClickDay={(val, env) => {
              //   dispatch(changeDay(moment(val).format("YYYY-MM-DD")));
              // }}
              locale="tr-TR"
              tileContent={getTileContent}
            />
          </div>
        </Col>
        <Col md="5">
          <OrderDay date={date} />
        </Col>
      </Row>
    </div>
  );
}

export default CalendarModul;
