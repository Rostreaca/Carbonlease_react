import { Content } from '../NoticeDetail.styled';

const NoticeContent = ({ notice }) => (
    <Content dangerouslySetInnerHTML={{ __html: notice.content }} />
);

export default NoticeContent;
