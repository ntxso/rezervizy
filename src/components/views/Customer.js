import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import {
  fetchAddOrUpdateCustomerNote,
  fetchFullAddressByAddress,
  fetchGetAddress,
  fetchGetCustomerById,
  fetchGetCustomerNote,
} from "../../reducers/customerSlice";
import { fetchOrdersByCustomerId } from "../../reducers/orderSlice";
import { setLoading } from "../../reducers/generalSlice";

import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  CardText,
  CardTitle,
  Col,
  Input,
  Row,
  Accordion,
  AccordionBody,
  AccordionHeader,
  AccordionItem,
  ButtonGroup,
} from "reactstrap";
import { parsePhoneNumber } from "libphonenumber-js";
import AddOrderWithCustCard from "../AddOrderWithCustModal";
import CustomerEdit from "../CustomerEdit";
import OrdersOfCustomer from "./OrdersOfCustomer";

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

const Customer = () => {
  const [open, setOpen] = useState("");
  const toggle = (id) => {
    if (open === id) {
      setOpen();
    } else {
      setOpen(id);
    }
  };

  const customer = useSelector((state) => state.customer.activeCustomer);
  const customerNote = useSelector(
    (state) => state.customer.activeCustomerNote
  );
  //const address = useSelector((state) => state.customer.activeAddress);
  //const ordersCustomer = useSelector((state) => state.orderx.ordersCustomer);
  const fullAddress = useSelector((state) => state.customer.activeFullAddress);

  const { id } = useParams();
  const [modalEdit, setModalEdit] = useState(false);
  const [modalOrder, setModalOrder] = useState(false);
  const [customerNoteData, setCustomerNoteData] = useState(customerNote);
  const [isOnlyViewNote, setIsOnlyViewNote] = useState(true);
  const [showSpecArea, setShowSpecArea] = useState(false);

  const toggleEdit = () => setModalEdit(!modalEdit);
  const toggleOrder = () => setModalOrder(!modalOrder);

  const dispatch = useDispatch();

  useEffect(() => {
    const initialize = async () => {
      try {
        dispatch(setLoading(true));
        await dispatch(fetchGetCustomerById(id));
        await dispatch(fetchOrdersByCustomerId(id));
        let resp = await dispatch(fetchGetAddress(id));
        await dispatch(fetchFullAddressByAddress(resp.payload));
        await dispatch(fetchGetCustomerNote(id));
        //setFormatedPhoneNumber(formatPhoneNumber(cust.payload.phoneNumber));
      } catch (error) {
        console.error("Hata oluştu:", error);
      } finally {
        dispatch(setLoading(false));
      }
    };

    initialize();
  }, [dispatch, id]);
  useEffect(() => {
    setCustomerNoteData(customerNote);
    if (!customerNote.noteId) {
      setCustomerNoteData((prevData) => ({
        ...prevData,
        noteId: 0,
        customerId: customer.id,
      }));
    }
  }, [customerNote, customer]);

  const handleEditButtonClick = () => {
    toggleEdit();
  };

  const handleAddOrderButtonClick = () => {
    toggleOrder();
  };

  const handleNoteAddOrUpdate = (e) => {
    setCustomerNoteData((prevData) => ({
      ...prevData,
      note: e.target.value,
    }));
  };

  const handleSumbmitNote = async (e) => {
    dispatch(setLoading(true));
    await dispatch(fetchAddOrUpdateCustomerNote(customerNoteData));
    dispatch(setLoading(false));
    setIsOnlyViewNote(true);
  };

  return (
    <div className="container">
      <Row>
        <Col md="6">
          <Card className="my-1">
            <CardHeader>
              <a
                style={{ textDecoration: "none" }}
                href={`tel:${customer.phoneNumber}`}
              >
                {formatPhoneNumber(customer.phoneNumber)}
              </a>
            </CardHeader>
            <CardBody>
              <CardTitle tag="h5">{customer.name}</CardTitle>
              <CardText>{fullAddress}</CardText>
            </CardBody>
            <CardFooter
              style={{ display: "flex", justifyContent: "space-between" }}
            >
              <button
                className="btn btn-outline-success btn-sm"
                onClick={handleAddOrderButtonClick}
              >
                Sipariş Oluştur
              </button>
              <button
                className="btn btn-outline-primary btn-sm"
                onClick={handleEditButtonClick}
              >
                Düzenle
              </button>
            </CardFooter>
          </Card>
        </Col>
        <Col md="6" >
        <Accordion className="my-1" open={open} toggle={toggle}>
        <AccordionItem>
          <AccordionHeader targetId="1">
            İlave Bilgiler
            {customerNoteData.note ? (
              <span class="alert alert-info py-0 my-0 ms-2" role="alert">
                Not Var
              </span>
            ) : (
              <span class="alert alert-secondary py-0 my-0 ms-2" role="alert">
                Not Yok
              </span>
            )}
          </AccordionHeader>
          <AccordionBody accordionId="1">
            <Input
              type="textarea"
              name="note"
              id="note"
              value={customerNoteData.note}
              disabled={isOnlyViewNote}
              onChange={handleNoteAddOrUpdate}
              className="mb-2"
            />
            <ButtonGroup>
              <Button
                color={isOnlyViewNote ? "primary" : "warning"}
                // className="mt-2"
                onClick={() => {
                  setIsOnlyViewNote(!isOnlyViewNote);
                }}
              >
                {isOnlyViewNote ? <span>Düzenle</span> : <span>Vazgeç</span>}
              </Button>
              {!isOnlyViewNote && (
                <Button
                  color="success"
                  // className="mt-2 ms-2"
                  onClick={handleSumbmitNote}
                >
                  Kaydet
                </Button>
              )}
            </ButtonGroup>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="2">İstatistik</AccordionHeader>
          <AccordionBody accordionId="2">
            <code>Yapım aşamasında</code>
          </AccordionBody>
        </AccordionItem>
        <AccordionItem>
          <AccordionHeader targetId="3">Bağlı Kişiler</AccordionHeader>
          <AccordionBody accordionId="3">
            <code>Yapım aşamasında</code>
          </AccordionBody>
        </AccordionItem>
      </Accordion>
          {/* <Card className="my-1">
            <CardHeader>İlave Bilgiler</CardHeader>
            <CardBody className="py-1">
              {showSpecArea ? (
                <>
                  <CardTitle>Müşteri Notu</CardTitle>
                  <Input
                    type="textarea"
                    name="note"
                    id="note"
                    value={customerNoteData.note}
                    disabled={isOnlyViewNote}
                    onChange={handleNoteAddOrUpdate}
                  />
                  <Button
                    color="primary"
                    className="mt-2"
                    onClick={() => {
                      setIsOnlyViewNote(!isOnlyViewNote);
                    }}
                  >
                    {isOnlyViewNote ? <>Düzenle</> : <>Vazgeç</>}
                  </Button>
                  {!isOnlyViewNote && (
                    <Button
                      color="success"
                      className="mt-2 ms-2"
                      onClick={handleSumbmitNote}
                    >
                      Kaydet
                    </Button>
                  )}
                </>
              ) : customerNoteData.note ? (
                <div class="alert alert-info py-0 my-0" role="alert">
                  Not Var
                </div>
              ) : (
                <>Not Yok</>
              )}
            </CardBody>
            <Button
              onClick={() => {
                setShowSpecArea(!showSpecArea);
              }}
              className="mx-3 mb-1"
            >
              {showSpecArea ? <>Gizle</> : <>Göster</>}
            </Button>
          </Card> */}
        </Col>
      </Row>
      <Row>
        <OrdersOfCustomer />
      </Row>
      <AddOrderWithCustCard isOpen={modalOrder} toggle={toggleOrder} />
      <CustomerEdit isOpen={modalEdit} toggle={toggleEdit} />

      
    </div>
  );
};

export default Customer;
