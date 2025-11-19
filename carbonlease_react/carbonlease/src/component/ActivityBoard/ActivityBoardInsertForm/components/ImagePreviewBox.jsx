import { PreviewArea, PreviewImage, EmptyText } from "../ActivityBoardInsertForm.styles";

export default function ImagePreviewBox({ file }) {
  const isFileObject = file instanceof File;

  if (!isFileObject) {
    return (
      <PreviewArea>
        <EmptyText>📁 업로드할 이미지를 선택해주세요.</EmptyText>
      </PreviewArea>
    );
  }

  const src = URL.createObjectURL(file);

  return (
    <PreviewArea>
      <PreviewImage src={src} alt="preview" />
    </PreviewArea>
  );
}
