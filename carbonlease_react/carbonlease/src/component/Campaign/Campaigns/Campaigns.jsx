import { useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import Toast from '../../Common/Toast/Toast';
import CampaignList from './components/CampaignList';


const Campaigns = () => {
    
    // Toast 상태 관리
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');


    // 토스트 메시지 표시
    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

    // 토스트 메시지 닫기
    const handleCloseToast = () => {
        setShowToast(false);
    };

    return(
        <>
            <PageTitle
                title="캠페인"
                breadcrumbs={[
                    { label: 'Home', path: '/' },
                    { label: '캠페인', current: true }
                ]} 
            />
            <PageContent>
                <CampaignList onShowToast={handleShowToast} />
            </PageContent>
            <Toast
                message={toastMessage}
                isVisible={showToast}
                onClose={handleCloseToast}
                variant={toastVariant}
            />
        </>
    )
}

export default Campaigns;