import { NoticeDetailHeader,  Title } from '../NoticeDetail.styled';

const NoticeHeader = ({ notice }) => (
    <NoticeDetailHeader>
        <Title>{notice.title}</Title>
    </NoticeDetailHeader>
);

export default NoticeHeader;
