import {
    FormCard,
    FormCardBody,
    FormCardHeader,
    FormContainer,
    PageHeader
} from '../../../Common/DataTable/DataTable.styled';
import FormCardBodyComponent from './components/FormCardBody';

// 캠페인 등록 폼 컴포넌트
const InsertForm = ({ onShowToast, auth }) => {
    return (
        <FormContainer>
            <PageHeader>
                <h1>캠페인 등록</h1>
            </PageHeader>
            <FormCard>
                <FormCardHeader>
                    <h5>캠페인 정보</h5>
                </FormCardHeader>
                <FormCardBody>
                    <FormCardBodyComponent onShowToast={onShowToast} auth={auth} />
                </FormCardBody>
            </FormCard>
        </FormContainer>
    );
};

export default InsertForm;
