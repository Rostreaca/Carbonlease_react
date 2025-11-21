import axios from "axios";
import { useState } from "react";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import { Form, Button } from "react-bootstrap";
import AddressSearchInput from "./components/AddressSearchInput.jsx";
import CategorySelect from "./components/CategorySelect.jsx";
import RegionSelect from "./components/RegionSelect.jsx";
import { FormCard } from "./ActivityBoardInsertForm.styles.js";
import ImagePreviewBox from "./components/ImagePreviewBox.jsx";

const ActivityBoardInsertForm = () => {
  const [regionNo, setRegionNo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [files, setFiles] = useState([]);
  const [category, setCategory] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !content || !address || !lat || !lng) {
      alert("필수 입력값이 비어있습니다. (제목/내용/주소)");
      return;
    }

    const token = localStorage.getItem("accessToken");
    const formData = new FormData();

    formData.append("title", title);
    formData.append("content", content);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("certificationNo", category);
    formData.append("regionNo", regionNo);

    if (files) {
      formData.append("files", files);
    }

    try {
        const res = await axios.post(
          "http://localhost:80/activityBoards/insertForm",
          formData,
          {
            headers: {
              Authorization: token ? `Bearer ${token}` : undefined,
              "Content-Type": "multipart/form-data",
            },
          } 
        );
        const newActivityNo = res.data.activityNo;

        console.log("Token:", token);
        alert("등록 완료!");

        window.location.href = `/activityBoards/${newActivityNo}`;
      } catch (err) {
        console.error("등록 실패:", err);
        alert("등록 실패하였습니다.");
      }
  };

  return (
    <>
      <PageTitle 
        title="인증 게시글 작성"
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: "인증게시판", path: "/ActivityBoards" },
          { label: '인증 게시글 작성', current: true }
        ]}
      />

      <PageContent>
        <FormCard>
          <Form onSubmit={handleSubmit}>
            
            {/* 제목 */}
            <Form.Group className="mb-4">
              <Form.Label>제목</Form.Label>
              <Form.Control
                type="text"
                placeholder="제목을 입력하세요."
                value={title}
                maxLength={100}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* 내용 */}
            <Form.Group className="mb-4">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                placeholder="내용을 입력하세요."
                value={content}
                maxLength={1000}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>

            {/* 주소 */}
            <Form.Group className="mb-4">
              <Form.Label>주소</Form.Label>
              <AddressSearchInput
                value={address}
                onChange={(addr, latValue, lngValue) => {
                  setAddress(addr);
                  setLat(latValue);
                  setLng(lngValue);
                }}
              />
            </Form.Group>

            {/* 지역 + 카테고리 두개 나란히 */}
            <div className="d-flex gap-3 mb-4">
              <div className="flex-fill">
                <Form.Label>지역</Form.Label>
                <RegionSelect value={regionNo} onChange={setRegionNo} />
              </div>

              <div className="flex-fill">
                <Form.Label>탄소 절감 카테고리</Form.Label>
                <CategorySelect value={category} onChange={setCategory} />
              </div>
            </div>

            {/* 사진 미리보기 */}
                <Form.Group className="mb-4">
                <Form.Label>사진 미리보기</Form.Label>

                <ImagePreviewBox file={files} />

                <Form.Control
                    type="file"
                    accept="image/*"
                    className="mt-2"
                    onChange={(e) => setFiles(e.target.files[0])}
                />
                </Form.Group>

            {/* 버튼: 맨 아래 */}
            <div className="d-flex justify-content-end gap-2 mt-4">
                <Button variant="success" type="submit">등록</Button>
                <Button variant="secondary" type="button" onClick={() => window.history.back()}>
                    취소
                </Button>
            </div>

          </Form>
        </FormCard>
      </PageContent>
    </>
  );
};

export default ActivityBoardInsertForm;
