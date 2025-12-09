import { useEffect } from 'react';
import { FileWrapper, FileHeader, FileItem, FileIcon } from '../NoticeDetail.styled';

const NoticeFiles = ({ notice }) => {

     const handleDownload = async() => {
        const response = await fetch(`${notice.files[0].filePath}`); // API 엔드포인트
        const blob = await response.blob(); // 응답을 Blob으로 변환
        const url = window.URL.createObjectURL(blob); // Blob URL 생성
        const downloadUrl = url;
        const a = document.createElement("a");  
        a.href = downloadUrl;
        a.download = `${notice.files[0].originName}`;
        a.click();
     };

    // if (!notice.files || notice.files.length === 0) {
    //     return null;
    // }

    useEffect(() => {
    }, []);

    return (
        <FileWrapper>
            <FileHeader>첨부파일</FileHeader>

            {notice.files.map((file, idx) => (
                <FileItem 
                    key={idx}
                    onClick={handleDownload}
                >
                    <FileIcon>📎</FileIcon>
                    {file.originName}
                    <br/>
                    
                </FileItem>
            ))}
        </FileWrapper>
    );
};

export default NoticeFiles;
