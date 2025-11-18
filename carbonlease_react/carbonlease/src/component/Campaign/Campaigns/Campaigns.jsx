import { useState } from 'react';
import PageTitle from '../../Common/Layout/PageTitle/PageTitle';
import PageContent from '../../Common/PageContent/PageContent';
import Toast from '../../Common/Toast/Toast';
import CampaignList from './component/CampaignList';


const Campaigns = () => {
    const [toastMessage, setToastMessage] = useState('');
    const [showToast, setShowToast] = useState(false);
    const [toastVariant, setToastVariant] = useState('success');

    const handleShowToast = (message, variant = 'success') => {
        setToastMessage(message);
        setToastVariant(variant);
        setShowToast(true);
    };

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