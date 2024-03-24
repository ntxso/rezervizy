import {
    FormGroup,
    Label,
    Input,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Form,
  } from "reactstrap";
  import { useEffect, useState } from "react";
  import { useDispatch, useSelector } from "react-redux";
  import { setLoading } from "../reducers/generalSlice";
  import {fetchUpdateOrder} from "../reducers/orderSlice";
  import { updateOrder } from "../reducers/orderSlice";
  
  const CancelOrder = ({ order, isOpen, toggle}) => {
    const dispatch = useDispatch();
   
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [formData, setFormData] = useState({});


  useEffect(() => {
    if (order) {
      const updatedFormData = { ...order, status: 3, total: 0 };
      setFormData({...order});
      setFormData(updatedFormData);
    }
    //console.log("kaç kere bak");
  }, [order, isOpen]);

    const handleChange = (e) => {
       
      const value  = e.target.value;
      setFormData((prevData) => ({
        ...prevData,
        note: value,
      }));
    };
  
    const handleSubmit = async (e) => {
        console.log("X:"+JSON.stringify(formData));
      setIsSubmitting(true);
      e.preventDefault();
      dispatch(setLoading(true));
      try {
        await dispatch(fetchUpdateOrder(formData));
        dispatch(updateOrder(formData));
      } catch (error) {}
     
      dispatch(setLoading(false));
      setIsSubmitting(false);
      toggle();
    };
  
    const modalBody = () => {
      return (
        <div>
         
  
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
         
        </div>
      );
    };
  
    return (
      <div>
        <Modal isOpen={isOpen} toggle={toggle}>
          <Form onSubmit={handleSubmit}>
            <ModalHeader toggle={toggle}>Sipariş İptali</ModalHeader>
            <ModalBody>{modalBody()}</ModalBody>
            <ModalFooter>
              <Button color="danger" type="submit">
                İptal İşlemini Tamamla
              </Button>
              <Button color="secondary" onClick={toggle}>
                Vazgeç
              </Button>
            </ModalFooter>
          </Form>
        </Modal>
      </div>
    );
  };
  
  export default CancelOrder;
  