import React from 'react';
import { ImageWrapper } from '../NoticeDetail.styled';

const NoticeImage = ({ notice }) => (
    <ImageWrapper>
        <img src={`${notice.filePath}/${notice.changeName}`} alt={notice.campaignTitle} />
    </ImageWrapper>
);

export default NoticeImage;
