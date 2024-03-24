// import { useEffect, useState } from "react";
// import { useDispatch } from "react-redux";
// import { fetchFullAddress } from "../reducers/customerSlice";

// function CustomerCard({ customerDto }) {
//   // const [customerData, setCustomerData] = useState({});
//   const [fullAddress, setFullAddress] = useState("");

//   // bu tek tek api den getirmekten vazgeç hepsini idListten getir tek seferde
//   const dispatch = useDispatch();
//   useEffect(() => {
//     const fetchCustomerData = async () => {
//       try {
//         //let resp = await dispatch(fetchCustomerById(custId));
//         let resp = await dispatch(fetchFullAddress(customerDto));
//         //setCustomerData(resp.payload);
//         setFullAddress(resp.payload);
//         //const oneCust = resp.payload;
//         //console.log("kş:"+oneCust["name"]);
//       } catch (error) {
//         console.error("Hata oluştu:", error);
//       }
//     };

//     // fetchCustomerData fonksiyonu, custId değiştiğinde tekrar çağrılacak
//     fetchCustomerData();
//     console.log("useeffect test");
//   }, [customerDto]);

//   return (
//     <div>
//       {customerDto && (
//         <div>
//           <span>{customerDto.name}</span>
//           <br />
//           <span>{customerDto.address}</span>
//           <br />
//         </div>
//       )}
//     </div>
//   );
// }
// export default CustomerCard;
