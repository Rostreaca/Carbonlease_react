import FormCardBodyComponent from "./FormCardBody";
import {
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader
} from '../../../Common/DataTable/DataTable.styled';
import { useLocation } from 'react-router-dom';

const UpdateForm = ({ onShowToast }) => {
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
                <FormCardBody onShowToast={onShowToast} $campaign={campaign}/>
            </FormCard>
        </FormContainer>
    );
};

export default UpdateForm;
