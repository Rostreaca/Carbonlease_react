import Button from 'react-bootstrap/Button';

function OutlineDangerButton({children}) {
  return (
    <Button variant='outline-danger'>{children}</Button>
  );
}

export default OutlineDangerButton;