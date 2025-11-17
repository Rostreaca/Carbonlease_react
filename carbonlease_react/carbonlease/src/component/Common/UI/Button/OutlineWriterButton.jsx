import Button from 'react-bootstrap/Button';

function OutlineWriterButton({ children, onClick }) {
  return (
    <Button variant="outline-success" onClick={onClick}>
      {children}
    </Button>
  );
}

export default OutlineWriterButton;
