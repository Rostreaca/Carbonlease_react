import { Modal, Button} from "react-bootstrap";


export default function AlertModal({ show, onHide, message, confirmText = "확인" }) {
  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>알림</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>{message}</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="primary" onClick={onHide}>
          {confirmText}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

