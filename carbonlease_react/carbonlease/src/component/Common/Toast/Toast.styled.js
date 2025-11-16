import { Toast } from 'react-bootstrap';
import styled from 'styled-components';

export const StyledToastContainer = styled.div`
    position: fixed;
    top: 100px;
    left: 50%;
    transform: translateX(-50%);
    z-index: 9999;
`;

const variantColors = {
    success: {
        bg: '#d4edda',
        border: '#c3e6cb',
        text: '#155724',
        icon: '#28a745'
    },
    error: {
        bg: '#f8d7da',
        border: '#f5c6cb',
        text: '#721c24',
        icon: '#dc3545'
    },
    warning: {
        bg: '#fff3cd',
        border: '#ffeaa7',
        text: '#856404',
        icon: '#ffc107'
    },
    info: {
        bg: '#d1ecf1',
        border: '#bee5eb',
        text: '#0c5460',
        icon: '#17a2b8'
    }
};

export const StyledToast = styled(Toast)`
    width:auto;
    border-radius: 12px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
    border: 2px solid ${props => variantColors[props.$variant]?.border || variantColors.success.border};
    background-color: ${props => variantColors[props.$variant]?.bg || variantColors.success.bg};
    backdrop-filter: blur(10px);
    animation: slideDown 0.3s ease-out;

    @keyframes slideDown {
        from {
            transform: translateY(-20px);
            opacity: 0;
        }
        to {
            transform: translateY(0);
            opacity: 1;
        }
    }

    .toast-body {
        padding: 16px;
        display: flex;
        align-items: center;
        gap: 12px;
        color: ${props => variantColors[props.$variant]?.text || variantColors.success.text};
        font-size: 15px;
        font-weight: 500;

        span {
            flex: 1;
        }
    }
`;

export const ToastIcon = styled.i`
    font-size: 20px;
    color: ${props => variantColors[props.$variant]?.icon || variantColors.success.icon};
    flex-shrink: 0;
`;
