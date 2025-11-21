import { Modal } from 'react-bootstrap';
import {
    ButtonGroup,
    CancelButton,
    ConfirmBody,
    ConfirmButton,
    ConfirmFooter,
    ConfirmHeader,
    ConfirmIcon,
    StyledModal
} from './ConfirmDialog.styled';

const ConfirmDialog = ({
    show,
    onClose,
    onConfirm,
    title = '확인',
    message,
    content,
    confirmText = '삭제',
    cancelText = '취소',
    variant = 'danger',
    showIcon = false
}) => {
    const handleConfirm = () => {
        onConfirm();
        onClose();
    };

    const getIcon = () => {
        switch (variant) {
            case 'danger':
                return 'bi-trash-fill';
            case 'warning':
                return 'bi-exclamation-triangle-fill';
            case 'info':
                return 'bi-question-circle-fill';
            default:
                return 'bi-trash-fill';
        }
    };

    return (
        <StyledModal show={show} onHide={onClose} centered $variant={variant}>
            <ConfirmHeader $variant={variant}>
                {showIcon && <ConfirmIcon className={`bi ${getIcon()}`} $variant={variant} />}
                <Modal.Title>{title}</Modal.Title>
            </ConfirmHeader>
            <ConfirmBody>
                {message && <div>{message}</div>}
                {content}
            </ConfirmBody>
            <ConfirmFooter>
                <ButtonGroup>
                    <CancelButton onClick={onClose}>
                        {cancelText}
                    </CancelButton>
                    <ConfirmButton onClick={handleConfirm} $variant={variant}>
                        {confirmText}
                    </ConfirmButton>
                </ButtonGroup>
            </ConfirmFooter>
        </StyledModal>
    );
};

export default ConfirmDialog;
