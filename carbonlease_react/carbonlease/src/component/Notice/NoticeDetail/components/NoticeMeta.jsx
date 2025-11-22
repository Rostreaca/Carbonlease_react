import { MetaInfo, MetaItem } from '../NoticeDetail.styled';

const formatDate = (dateString) => {
    const date = new Date(dateString);
    return `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;
};

const NoticeMeta = ({ notice }) => (
    <MetaInfo>
        <MetaItem>
            <i className="bi bi-calendar-check"></i>
            <span>
                {formatDate(notice.createDate)}
            </span>
        </MetaItem>
        <MetaItem>
            <i className="bi bi-people-fill"></i>
            <strong>{(notice.viewCount || 0).toLocaleString()}명</strong> 조회
        </MetaItem>
    </MetaInfo>
);

export default NoticeMeta;
