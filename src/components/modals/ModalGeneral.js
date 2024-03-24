import { Modal, ModalBody, ModalHeader,ModalFooter,Button } from "reactstrap";

const ModalGeneral = ({ isOpen, toggle, headText, component,params }) => {
    //kullanılan bileşene bunlar tanımlanacak
    // const [isOpen,setIsOpen]=useState(true);
    // const toggleAction=()=>setIsOpen(!isOpen);
  return (
    <div>
      <Modal isOpen={isOpen} toggle={toggle}>
        <ModalHeader toggle={toggle}>{headText}</ModalHeader>
        <ModalBody>{component(params)}</ModalBody>
        <ModalFooter>
        <Button color="secondary" onClick={toggle}>
            Kapat
          </Button>
        </ModalFooter>
      </Modal>
    </div>
  );
};

export default ModalGeneral;
