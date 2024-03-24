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
  Form,
} from "reactstrap";
import { useEffect, useState } from "react";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../reducers/generalSlice";
import { fetchUpdateOrder } from "../reducers/orderSlice";
import { updateOrder } from "../reducers/orderSlice";

const UpdateOrder = ({ order, isOpen, toggle }) => {
  const dispatch = useDispatch();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({});

  useEffect(() => {
    const newDatetime = moment(`${date}T${time}`);
    const formattedDatetime = newDatetime.format("YYYY-MM-DDTHH:mm");
    setFormData((prevData) => ({
      ...prevData,
      deliveryDate: formattedDatetime,
    }));
  }, [date, time]);

  useEffect(() => {
    if (order) {
      setDate(moment(order.deliveryDate).format("YYYY-MM-DD"));
      setTime(moment(order.deliveryDate).format("HH:mm"));
      setFormData({...order});
    }
    //console.log("kaç kere bak");
  }, [order, isOpen]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };
  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };
  const handleMakeActiveOrder = () => {
    console.log("data:"+JSON.stringify(formData))
    setFormData((prevData) => ({
      ...prevData,
      status: 1,
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    setIsSubmitting(true);
    e.preventDefault();
    dispatch(setLoading(true));
    try {
      await dispatch(fetchUpdateOrder(formData));
      dispatch(updateOrder(formData));
    } catch (error) {}
    //await dispatch(fetchOrdersByCustomerId(customer.id));
    dispatch(setLoading(false));
    setIsSubmitting(false);
    toggle();
  };

  const modalBody = () => {
    return (
      <div>
        <Row className="g-2">
          {formData.status === 3 && (
            <Col xs="12">
              <Button color="success" onClick={handleMakeActiveOrder}>
                Siparişi Aktif Yap
              </Button>
            </Col>
          )}
          <Col xs="6">
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
          <Col xs="6">
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
          <ModalHeader toggle={toggle}>
            Siparişi Güncelle {order.orderId}
          </ModalHeader>
          <ModalBody>{modalBody()}</ModalBody>
          <ModalFooter className="d-flex justify-content-between">
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

export default UpdateOrder;
