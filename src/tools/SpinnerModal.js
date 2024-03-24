import { useSelector } from "react-redux";
import { Modal, ModalBody, ModalHeader, Spinner } from "reactstrap";

const SpinnerModal=()=>{
    const isLoading=useSelector((state)=>state.generalReducer.loading);
    return(
        <Modal isOpen={isLoading}>
        <ModalHeader>İşlem sürüyor</ModalHeader>
        <ModalBody>
          <Spinner color="primary" />
        </ModalBody>
      </Modal>
    )
}

export default SpinnerModal;