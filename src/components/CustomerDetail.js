// import { useEffect, useState } from "react";
// import {
//   Button,
//   Card,
//   CardBody,
//   CardFooter,
//   CardHeader,
//   CardText,
//   CardTitle,
//   Col,
//   Row,
// } from "react-bootstrap";
// import { useDispatch, useSelector } from "react-redux";
// import { fetchOrdersByCustomerId } from "../reducers/orderSlice";
// import { fetchCustomerById, fetchFullAddress, fetchGetCustomerById } from "../reducers/customerSlice";
// import parsePhoneNumber from "libphonenumber-js";
// import { useParams } from "react-router";
// import CustomerEdit from "./CustomerEdit";
// import {
//   Modal,
//   ModalHeader,
//   ModalBody,
//   ModalFooter,
//   Spinner,
// } from "reactstrap";
// import AddOrderWithCustCard from "./AddOrderWithCustModal";

// function formatPhoneNumber(number) {
//   const phoneNumber = parsePhoneNumber(number, "TR");
//   return phoneNumber.formatNational();
// }

// function CustomerDetail() {
// const currentCustomer=useSelector((state)=>state.customer.activeCustomer);
// const currentAddress=useSelector((state)=>state.customer.activeAddress);

//   const [customer, setCustomer] = useState({});

//   const { id } = useParams();

//   const [orders, setOrders] = useState([]);
//   const [fullAddress, setFullAddress] = useState("");
//   const [formatedPhoneNumber, setFormatedPhoneNumber] = useState("");

//   const [snipperModal, setSnipperModal] = useState(false);

//   const [modalEdit, setModalEdit] = useState(false);
//   const [modalOrder, setModalOrder] = useState(false);

//   const toggleEdit = () => setModalEdit(!modalEdit);
//   const toggleOrder = () => setModalOrder(!modalOrder);
//   const handleEditButtonClick = () => {
//     toggleEdit();
//   };

//   const handleAddOrderButtonClick = () => {
//     toggleOrder();
//   };


//   const dispatch = useDispatch();
//   useEffect(() => {
//     //console.log("mmfd:" + modalOrder);
//     const fetchInitialize = async () => {
//       try {
//         setSnipperModal(true);
//         let cust = await dispatch(fetchGetCustomerById(id || 0));
//         console.log(JSON.stringify(cust.payload));
//         setCustomer(cust.payload);
//         let ords = await dispatch(fetchOrdersByCustomerId(id || 0));
//         let fullAdr = await dispatch(fetchFullAddress(cust.payload));
//         setOrders(ords.payload);
//         setFullAddress(fullAdr.payload);
//         //const oneCust = resp.payload;
//         console.log("kş:" + fullAdr.payload);
//         setFormatedPhoneNumber(formatPhoneNumber(cust.payload.phoneNumber));
//       } catch (error) {
//         console.error("Hata oluştu:", error);
//       } finally {
//         setSnipperModal(false);
//       }
//     };

//     // fetchCustomerData fonksiyonu, custId değiştiğinde tekrar çağrılacak
//     fetchInitialize();
//   }, [dispatch, id]);
//   return (
//     <div>
//       <Row>
//         <Col md="6">
//           <Card className="my-1">
//             <CardHeader>{formatedPhoneNumber}</CardHeader>
//             <CardBody>
//               <CardTitle tag="h5">{customer.name}</CardTitle>
//               <CardText>{fullAddress} 
//               cust:{JSON.stringify(currentCustomer)} 
//               addr:{JSON.stringify(currentAddress)}
//               </CardText>
//             </CardBody>
//             <CardFooter
//               style={{ display: "flex", justifyContent: "space-between" }}
//             >
//               <button
//                 className="btn btn-outline-success btn-sm"
//                 onClick={handleAddOrderButtonClick}
//               >
//                 Sipariş Oluştur
//               </button>
//               <button
//                 className="btn btn-outline-primary btn-sm"
//                 onClick={handleEditButtonClick}
//               >
//                 Düzenle
//               </button>
//             </CardFooter>
//           </Card>
//         </Col>
//         <Col md="6">
//           <Card body>
//             <CardTitle tag="h5">Special Title Treatment</CardTitle>
//             <CardText>
//               With supporting text below as a natural lead-in to additional
//               content.
//             </CardText>
//             <Button>Go somewhere</Button>
//           </Card>
//         </Col>
//       </Row>
//       <Row>
//         {orders.map((order) => (
//           <Col key={order.orderId} md="6">
//             <Card body>
//               <CardTitle tag="h5">{order.deliveryDate}</CardTitle>
//               <CardText>{order.note}</CardText>
//               {order.total}
//             </Card>
//           </Col>
//         ))}
//       </Row>
//       <Modal isOpen={modalEdit} toggle={toggleEdit}>
//         <ModalHeader toggle={toggleEdit}>Müşteri Düzenle</ModalHeader>
//         <ModalBody>
//           <CustomerEdit initialData={customer} toggle={toggleEdit} />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggleEdit}>
//             Kapat
//           </Button>
//         </ModalFooter>
//       </Modal>

//       <Modal isOpen={modalOrder} toggle={toggleOrder}>
//         <ModalHeader toggle={toggleOrder}>Müşteri Düzenle</ModalHeader>
//         <ModalBody>
//           <AddOrderWithCustCard
//             customer={customer}
//           />
//         </ModalBody>
//         <ModalFooter>
//           <Button color="secondary" onClick={toggleOrder}>
//             Kapat
//           </Button>
//         </ModalFooter>
//       </Modal>

//       <Modal isOpen={snipperModal}>
//         <ModalHeader>Loading</ModalHeader>
//         <ModalBody>
//           <Spinner color="primary" />
//         </ModalBody>
//       </Modal>
//     </div>
//   );
// }

// export default CustomerDetail;
