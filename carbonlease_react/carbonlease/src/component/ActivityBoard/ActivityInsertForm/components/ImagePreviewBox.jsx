import { PreviewArea, PreviewImage, EmptyText } from "../ActivityInsertForm.styles";

export default function ImagePreviewBox({ file, origin }) {

  // 1) 파일 업로드 → 가장 우선
  if (file instanceof File) {
    const src = URL.createObjectURL(file);
    return (
      <PreviewArea>
        <PreviewImage src={src} alt="preview" />
      </PreviewArea>
    );
  }

  // 2) origin 이미지 존재 (업데이트)
  if (origin) {
    return (
      <PreviewArea>
        <PreviewImage src={origin} alt="origin" />
      </PreviewArea>
    );
  }

  // 3) 아무것도 없음 (인서트 초기에 보여주는 화면)
  return (
    <PreviewArea>
      <EmptyText>📁 업로드할 이미지를 선택해주세요.</EmptyText>
    </PreviewArea>
  );
}
