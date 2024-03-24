import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCustomerById, fetchFullAddress } from "../reducers/customerSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLocationDot, faIdCard,faSquarePhone } from "@fortawesome/free-solid-svg-icons";

function CustomerLeftCard({ custId }) {
  const [customerData, setCustomerData] = useState({});
  const [fullAddress, setFullAddress] = useState("");

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
    console.log("useefect test");
  }, [dispatch,custId]);

  return (
    <div>
      {/* <span>{oneAddress}</span><br/> */}
      <span>
        <FontAwesomeIcon className="text-success me-1" icon={faLocationDot} />
      </span>
      <span className="fs-6">{fullAddress}</span>
      <br />
      <span>
        <FontAwesomeIcon className="text-success me-1" icon={faIdCard} />
      </span>
      <span>{customerData["name"]}</span>
      <br />
      <span>
        <FontAwesomeIcon className="text-success me-1" icon={faSquarePhone} />
      </span>
      <span>{customerData["phoneNumber"]}</span>
      <br />
    </div>
  );
}
export default CustomerLeftCard;
