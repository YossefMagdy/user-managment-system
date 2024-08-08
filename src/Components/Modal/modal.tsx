import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

interface modelCompoenentProps {
  show: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  closeModal: any;
  modelBody: string;
}

export default function ModalComponent({
  show,
  closeModal,
  modelBody,
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
          <Button variant="primary" onClick={handleClose}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
