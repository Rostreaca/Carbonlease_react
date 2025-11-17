import { useState } from "react";
import { Modal } from "react-bootstrap";

export default function ImageSection({ images }) {
    const [ preview, setPreview ] = useState(null);

    return (
        <>
            <div className="img-grid">
                {/*images.map((src, i) => (
                    <img key={i} src={src} onClick={() => setPreview(src)} />
                ))*/}
            </div>
              
            <Modal show={!!preview} onHide={() => setPreview(null)} centered>
                    <img src={preview} style={{width: "100%"}} />
            </Modal>

        </>
    );
}