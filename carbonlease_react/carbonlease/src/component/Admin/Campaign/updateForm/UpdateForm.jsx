import {
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader
} from '../../../Common/DataTable/DataTable.styled';
import { useLocation } from 'react-router-dom';
import FormCardBodyComponent from './components/FormCardBody';

// 캠페인 수정 폼 컴포넌트
const UpdateForm = ({ onShowToast, auth }) => {
    const location = useLocation();
    const campaign = location.state;

    return (
        <FormContainer>
            <PageHeader>
                <h1>캠페인 수정</h1>
            </PageHeader>

            <FormCard>
                <FormCardHeader>
                    <h5>캠페인 정보</h5>
                </FormCardHeader>
                <FormCardBody>
                    <FormCardBodyComponent onShowToast={onShowToast} $campaign={campaign} auth={auth}/>
                </FormCardBody>
            </FormCard>
        </FormContainer>
    );
};

export default UpdateForm;
