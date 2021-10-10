import "./ModalContainer.scss";
import { Modal } from "@material-ui/core";

const ModalContainer = ({ isOpenModal, closeModal, children }) => {
  return (
    <Modal
      className="modal-container"
      open={isOpenModal}
      onClose={closeModal}
      closeAfterTransition
    >
      <div>{children}</div>
    </Modal>
  );
};

export default ModalContainer;
