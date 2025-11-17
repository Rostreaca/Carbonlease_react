import { useState } from "react";
import { Modal } from "react-bootstrap";
import { ImgGrid, ImgThumb, ImgLarge } from "../ActivityBoardDetail.styles.js";

export default function ImageSection({ images = [] }) {
  const [preview, setPreview] = useState(null);

  const isSingle = images.length === 1;

  return (
    <>
      {isSingle ? (
        <ImgLarge src={images[0]} onClick={() => setPreview(images[0])} />
      ) : (
        <ImgGrid>
          {images.map((src, i) => (
            <ImgThumb key={i} src={src} onClick={() => setPreview(src)} />
          ))}
        </ImgGrid>
      )}

      <Modal show={!!preview} onHide={() => setPreview(null)} centered>
        <img src={preview} style={{ width: "100%" }} />
      </Modal>
    </>
  );
}
