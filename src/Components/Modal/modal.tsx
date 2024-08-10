/* eslint-disable @typescript-eslint/no-explicit-any */
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface modelCompoenentProps {
  show: boolean;
  closeModal: any;
  handleaccept: any;
  modelBody: string;
}

export default function ModalComponent({
  show,
  closeModal,
  modelBody,
  handleaccept,
}: modelCompoenentProps) {
  function handleClose() {
    closeModal();
  }

  return (
    <>
      <Modal show={show} onHide={handleClose}>
        <Modal.Body>{modelBody}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            No
          </Button>
          <Button variant="primary" onClick={handleaccept}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
