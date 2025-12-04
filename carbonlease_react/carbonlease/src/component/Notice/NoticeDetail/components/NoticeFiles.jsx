import { FileWrapper, FileHeader, FileItem, FileIcon } from '../NoticeDetail.styled';

const NoticeFiles = ({ notice }) => {

    const handleDownload = (file) => {
        const downloadUrl = `${file.filePath}`;
        const a = document.createElement("a");  
        a.href = downloadUrl;
        a.download = file.changeName;
        a.click();
    };

    if (!notice.files || notice.files.length === 0) {
        return null;
    }

    return (
        <FileWrapper>
            <FileHeader>첨부파일</FileHeader>

            {notice.files.map((file, idx) => (
                <FileItem key={idx} onClick={() => handleDownload(file)}>
                    <FileIcon>📎</FileIcon>
                    {file.originName}
                </FileItem>
            ))}
        </FileWrapper>
    );
};

export default NoticeFiles;
