//import { Modal } from "react-bootstrap";
import {
  FormGroup,
  Label,
  Input,
  Button,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Row,
  Col,
} from "reactstrap";
import Form from "react-bootstrap/Form";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../reducers/generalSlice";
import { fetchAddOrder, fetchOrdersByCustomerId } from "../reducers/orderSlice";

const AddOrderWithCustCard = ({ isOpen, toggle }) => {
  const statusApi = useSelector((state) => state.orderx.status);
  const customer = useSelector((state) => state.customer.activeCustomer);

  const dispatch = useDispatch();
  const [date, setDate] = useState(moment(new Date()).format("YYYY-MM-DD"));
  const [time, setTime] = useState("10:00");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    deliveryDate: "",
    note: "",
    terminal: 1,
    total: "",
    takingDate: new Date(),
    customerId: 0,
    status: 1,
  });

  useEffect(() => {
    const newDatetime = moment(`${date}T${time}`);
    const formattedDatetime = newDatetime.format("YYYY-MM-DDTHH:mm");
    setFormData((prevData) => ({
      ...prevData,
      deliveryDate: formattedDatetime,
    }));
  }, [date, time]);
  
  useEffect(() => {
    setFormData((prevData) => ({
      ...prevData,
      customerId: customer.id,
    }));
  }, [customer]);

  // useEffect(() => {
  //   setFormData((prevData) => ({
  //     ...prevData,
  //     customerId: customer.id,
  //   }));

  // }, [customer]);

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
    setIsSubmitting(true);
    e.preventDefault();
    dispatch(setLoading(true));
    await dispatch(fetchAddOrder(formData));
    await dispatch(fetchOrdersByCustomerId(customer.id));
    dispatch(setLoading(false));
    console.log("sonuçccc:" + statusApi);
    toggle();
  };

  const modalBody = () => {
    return (
      <div>
        <Row className="g-2">
          <Col>
            <FormGroup>
              {/* <Label for="deliveryDate">Tarih</Label> */}
              <Input
                type="date"
                name="datetime"
                id="deliveryDate"
                value={date}
                onChange={handleDateChange}
                disabled={isSubmitting}
              />
            </FormGroup>
          </Col>
          <Col>
            <FormGroup>
              {/* <Label for="time">Saat</Label> */}
              <Input
                type="time"
                name="time"
                id="time"
                value={time}
                onChange={handleTimeChange}
                disabled={isSubmitting}
              />
            </FormGroup>
          </Col>
        </Row>

        <FormGroup floating>
         
          <Input
            type="textarea"
            name="note"
            id="note"
            placeholder="Not"
            value={formData.note}
            onChange={handleChange}
            disabled={isSubmitting}
          />
           <Label for="note">Not</Label>
        </FormGroup>
        <FormGroup floating>
          <Input
          placeholder="Tutar (TL)"
            type="number"
            name="total"
            id="total"
            value={formData.total}
            onChange={handleChange}
            disabled={isSubmitting}
          />
          <Label for="total">Tutar (TL)</Label>
        </FormGroup>
      </div>
    );
  };

  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <Form onSubmit={handleSubmit}>
          <ModalHeader toggle={toggle}>Sipariş Oluştur</ModalHeader>
          <ModalBody>{modalBody()}</ModalBody>
          <ModalFooter>
            <Button color="primary" type="submit">
              Kaydet
            </Button>
            <Button color="secondary" onClick={toggle}>
              Kapat
            </Button>
          </ModalFooter>
        </Form>
      </Modal>
    </div>
  );
};

export default AddOrderWithCustCard;
