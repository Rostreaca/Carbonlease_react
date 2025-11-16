import { StyledIconButton } from "./IconButton.styles.js";

const IconButton = ({ children, onClick }) => {
  return (
    <StyledIconButton onClick={onClick}>
      {children}
    </StyledIconButton>
  );
};

export default IconButton;