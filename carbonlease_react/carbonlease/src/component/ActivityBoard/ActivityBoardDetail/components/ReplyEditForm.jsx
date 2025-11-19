import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';

function ReplyEditForm() {
  return (
    <>
      <FloatingLabel controlId="ReplyEditForm" label="댓글">
        <Form.Control
          as="textarea"
          placeholder="댓글을 입력해주세요."
          style={{ height: '100px', width: "600px" }}
        />
      </FloatingLabel>
    </>
  );
}

export default ReplyEditForm;