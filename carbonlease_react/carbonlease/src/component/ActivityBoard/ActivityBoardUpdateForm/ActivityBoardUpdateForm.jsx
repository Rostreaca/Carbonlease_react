import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import PageTitle from "../../Common/Layout/PageTitle/PageTitle";
import PageContent from "../../Common/PageContent/PageContent";
import { Form, Button } from "react-bootstrap";
import AddressSearchInput from "../ActivityBoardInsertForm/components/AddressSearchInput.jsx";
import CategorySelect from "../ActivityBoardInsertForm/components/CategorySelect.jsx";
import RegionSelect from "../ActivityBoardInsertForm/components/RegionSelect.jsx";
import ImagePreviewBox from "../ActivityBoardInsertForm/components/ImagePreviewBox.jsx";
import { FormCard } from "../ActivityBoardInsertForm/ActivityBoardInsertForm.styles.js";

const ActivityBoardUpdateForm = () => {
  const { id } = useParams(); // /activityBoard/updateForm/:id
  const navigate = useNavigate();

  const [regionNo, setRegionNo] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const [address, setAddress] = useState("");
  const [lat, setLat] = useState(null);
  const [lng, setLng] = useState(null);

  const [file, setFile] = useState(null);       // 변경 이미지 파일
  const [originImg, setOriginImg] = useState(""); // 기존 이미지 URL
  const [category, setCategory] = useState("");

  useEffect(() => { 
    async function fetchData() {
      try {
        const res = await fetch(`http://localhost/activityBoards/updateForm/${id}`);
        const data = await res.json();

        setTitle(data.title);
        setContent(data.content);
        setAddress(data.address);
        setLat(data.lat);
        setLng(data.lng);
        setRegionNo(data.regionNo);
        setCategory(data.certificationNo);
        setOriginImg(data.thumbnailPath); // 기존 썸네일 이미지
      } catch (err) {
        console.error("게시글 불러오기 실패:", err);
      }
    }
    fetchData();
  }, [id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("content", content);
    formData.append("address", address);
    formData.append("lat", lat);
    formData.append("lng", lng);
    formData.append("regionNo", regionNo);
    formData.append("certificationNo", category);

    if (file) formData.append("file", file);

    console.log("수정 데이터:", Object.fromEntries(formData));

    alert("수정 완료 (Mock)");
    navigate(`/activityBoards/${id}`);
  };

  return (
    <>
      <PageTitle
        title="인증 게시글 수정"
        breadcrumbs={[
          { label: "Home", path: "/" },
          { label: "인증 게시판", path: "/activityBoards" },
          { label: "상세보기", path: `/activityBoards/${id}` },
          { label: "인증 게시글 수정", current: true }
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
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </Form.Group>

            {/* 내용 */}
            <Form.Group className="mb-4">
              <Form.Label>내용</Form.Label>
              <Form.Control
                as="textarea"
                rows={6}
                value={content}
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

            {/* 지역 + 카테고리 */}
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

            {/* 이미지 미리보기 */}
            <Form.Group className="mb-4">
              <Form.Label>사진 미리보기</Form.Label>
              <ImagePreviewBox file={file} originUrl={originImg} />
              <Form.Control
                className="mt-3"
                type="file"
                accept="image/*"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </Form.Group>

            {/* 버튼 */}
            <div className="d-flex justify-content-end gap-2">
              <Button variant="primary" type="submit">수정</Button>
              <Button variant="secondary" onClick={() => navigate(-1)}>취소</Button>
            </div>

          </Form>
        </FormCard>
      </PageContent>
    </>
  );
};

export default ActivityBoardUpdateForm;
