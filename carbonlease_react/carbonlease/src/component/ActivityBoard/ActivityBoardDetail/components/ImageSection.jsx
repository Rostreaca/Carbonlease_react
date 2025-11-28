import { ImageBox, ImageWrapper } from "../ActivityBoardDetail.styles";

const ImageSection = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <ImageWrapper>
      <ImageBox>
        {images.map((src, idx) => (
          <img key={idx} src={`http://localhost:80${src}`} alt="" />
        ))}
      </ImageBox>
    </ImageWrapper>
  );
};


export default ImageSection;