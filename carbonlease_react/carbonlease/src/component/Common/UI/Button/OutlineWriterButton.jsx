import Button from 'react-bootstrap/Button';

function OutlineSuccessButton({ children}) {
  return (
    <Button variant="outline-success">{children}</Button>
  );
}

export default OutlineSuccessButton;