import {
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader
} from '../../../Common/DataTable/DataTable.styled';
import FormCardBodyComponent from './components/FormCardBody';
import Toast from '../../../Common/Toast/Toast';
import { useState } from 'react';

// 캠페인 등록 폼 컴포넌트
const InsertForm = () => {

    // Toast 상태 관리
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');


    // 토스트 메시지 표시
    const handleShowToast = (message, variant = 'success') => {
        console.log('토스트 호출:', message, variant);
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    // 토스트 메시지 닫기
    const handleCloseToast = () => {
        setShowToast(false);
    };
    
    return (
        <>
            <FormContainer>
                <PageHeader>
                    <h1>캠페인 등록</h1>
                </PageHeader>
                <FormCard>
                    <FormCardHeader>
                        <h5>캠페인 정보</h5>
                    </FormCardHeader>
                    <FormCardBody>
                        <FormCardBodyComponent onShowToast={handleShowToast} />
                    </FormCardBody>
                </FormCard>
            </FormContainer>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={handleCloseToast}
                variant={toastVariant}
            />
        </>
    );
};

export default InsertForm;
