import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerById, fetchFullAddress } from "../reducers/customerSlice";
import { parsePhoneNumber } from "libphonenumber-js";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faIdCard,
  faSquarePhone,
  faClock,
  faCirclePlus,
  faTurkishLiraSign,
  faNoteSticky,
} from "@fortawesome/free-solid-svg-icons";
import { Link } from "react-router-dom";
import UpdateOrder from "./UpdateOrder";
import CancelOrder from "./CancelOrder";

function formatPhoneNumber(number) {
  if (number) {
    try {
      const phoneNumber = parsePhoneNumber(number, "TR");
      return phoneNumber.formatNational();
    } catch {
      return number;
    }
  } else {
    return "noneNumber";
  }
}

const setClassNameOrder = (order) => {
  if (order.status === 3) {
    //alert("iptal")
    return "list-group-item list-group-item-secondary py-1";
  } else {
    return "list-group-item list-group-item-warning py-1";
  }
};

function CustomerAndOrder({ custId, order }) {
  const [customerData, setCustomerData] = useState({});
  const [fullAddress, setFullAddress] = useState("");

  const [modalOrder, setModalOrder] = useState(false);
  const toggleOrder = () => setModalOrder(!modalOrder);

  const [cancelOrder, setCancelOrder] = useState(false);
  const toggleCancelOrder = () => setCancelOrder(!cancelOrder);

  // bu tek tek api den getirmekten vazgeç hepsini idListten getir tek seferde
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchCustomerData = async () => {
      try {
        let resp = await dispatch(fetchCustomerById(custId));
        let resp2 = await dispatch(fetchFullAddress(resp.payload));
        setCustomerData(resp.payload);
        setFullAddress(resp2.payload);
        //const oneCust = resp.payload;
        //console.log("kş:"+oneCust["name"]);
      } catch (error) {
        console.error("Hata oluştu:", error);
      }
    };

    // fetchCustomerData fonksiyonu, custId değiştiğinde tekrar çağrılacak
    fetchCustomerData();
    //console.log("useefect test");
  }, [dispatch, custId]);

  return (
    customerData && (
      <div className="shadow mb-2">
        {/* <span>{oneAddress}</span><br/> */}
        <ul className="list-group">
          <li className="list-group-item py-1">
            <Link
              target="_blank"
              style={{ textDecoration: "none" }}
              to={`https://google.com/maps?q=${customerData.address}`}
            >
              <span>
                <FontAwesomeIcon
                  className="text-info me-1"
                  icon={faLocationDot}
                />CC
              </span>
              <span className="fs-6">{fullAddress}</span>
            </Link>
          </li>
          <li className="list-group-item py-1">
            <Link
              style={{ textDecoration: "none" }}
              to={`customer/${customerData.customerId}`}
            >
              <span>
                <FontAwesomeIcon className="text-info me-1" icon={faIdCard} />
              </span>
              <span>{customerData.name}</span>
            </Link>
          </li>
          <li className="list-group-item py-1">
            <span>
              <FontAwesomeIcon
                className="text-info me-1"
                icon={faSquarePhone}
              />
            </span>
            <span>
              <a
                style={{ textDecoration: "none" }}
                href={`tel:${customerData.phoneNumber}`}
              >
                {formatPhoneNumber(customerData.phoneNumber)}
              </a>
            </span>
          </li>

          <li className={setClassNameOrder(order)}>
            <span className="shadow-sm me-2">
              {" "}
              <FontAwesomeIcon className="me-1" icon={faClock} />
              {order.deliveryDate.split("T")[1].slice(0, 5)}
            </span>
            <span className="shadow-sm ms-2">
              {order.total} <FontAwesomeIcon icon={faTurkishLiraSign} />{" "}
            </span>
          </li>
          <li className={setClassNameOrder(order)}>
            <span>
              <FontAwesomeIcon className="me-1" icon={faNoteSticky} />{" "}
              {order.note}
            </span>
          </li>
          <li
            className={`d-flex justify-content-between ${setClassNameOrder(
              order
            )}`}
          >
            <button
              className="btn btn-warning btn-sm"
              onClick={() => toggleOrder()}
            >
              Düzenle
            </button>
            {order.status === 3 ? (
              <span className="alert alert-danger py-0 my-0 px-2">
                İPTAL EDİLDİ
              </span>
            ) : (
              <button
                className="btn btn-danger btn-sm"
                onClick={() => toggleCancelOrder()}
              >
                İptal Et
              </button>
            )}
          </li>
        </ul>
        <UpdateOrder order={order} isOpen={modalOrder} toggle={toggleOrder} />
        <CancelOrder
          order={order}
          isOpen={cancelOrder}
          toggle={toggleCancelOrder}
        />
      </div>
    )
  );
}
export default CustomerAndOrder;
