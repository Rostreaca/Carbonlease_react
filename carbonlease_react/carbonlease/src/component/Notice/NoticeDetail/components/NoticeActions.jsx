import { ActionButtons, BackButton } from '../NoticeDetail.styled';

const NoticeActions = ({handleBack}) => {

    return(
    <ActionButtons>
            <BackButton onClick={handleBack}>
                <i className="bi bi-list-ul"></i>
                목록보기
            </BackButton>
    </ActionButtons>
    )
}

export default NoticeActions;