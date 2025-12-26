import { API_BASE_URL } from "../../../../api/api.js";
import { ImageBox, ImageWrapper } from "../ActivityBoardDetail.styles";


const ImageSection = ({ images }) => {
  if (!images || images.length === 0) return null;

  return (
    <ImageWrapper>
      <ImageBox>
        {images.map((src, idx) => (
          <img key={idx} src={`${API_BASE_URL}/${src}`} alt="" />
        ))}
      </ImageBox>
    </ImageWrapper>
  );
};


export default ImageSection;