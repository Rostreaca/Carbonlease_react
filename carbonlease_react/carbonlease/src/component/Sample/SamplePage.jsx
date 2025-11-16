import { useState } from "react";
import PageTitle from "../Common/Layout/PageTitle/PageTitle";
import PageContent from "../Common/PageContent/PageContent";
import { Button, Container, Stack } from "react-bootstrap";
import PrimaryButton from "./Buttons/PrimaryButton";
import SecondaryButton from "./Buttons/SecondaryButton";
import SuccessButton from "./Buttons/SuccessButton";
import WarningButton from "./Buttons/WarningButton";
import DangerButton from "./Buttons/DangerButton";
import InfoButton from "./Buttons/InfoButton";
import OutlinePrimaryButton from "./Outlinebuttons/OutlinePrimaryButton";
import OutlineSecondaryButton from "./Outlinebuttons/OutlineSecondaryButton";
import OutlineSuccessButton from "./Outlinebuttons/OutlineSuccessButton";
import OutlineWarningButton from "./Outlinebuttons/OutlineWarningButton";
import OutlineDangerButton from "./Outlinebuttons/OutlineDangerButton";
import OutlineInfoButton from "./Outlinebuttons/OutlineInfoButton";
import SaveModal from "./Modal/ConfirmModal";
import AlertModal from "./Modal/AlertModal";
import FileInput from "./FileInput/FileInput";
import Dropdowns from "./Dropdowns/Dropdowns";
import ReplyPagination from "../Common/UI/ReplyPagination.jsx";
import Pagination from "../Common/UI/Pagination.jsx";
import IconButton from "../Common/UI/Button/IconButton.jsx";

export default function SamplePage() {

    const [msg, setMsg] = useState("");
    const [show, setShow] = useState(false);
    const [page, setPage] = useState(1);

    const openModal = (text) => {
        setMsg(text);
        setShow(true);
    };

  return (
    <>
      <PageTitle 
        title="샘플 페이지" 
        breadcrumbs={[
          { label: 'Home', path: '/' },
          { label: '샘플 페이지', current: true }
        ]} 
      />
      
      <PageContent>
        <Container className="py-4">
          
            <h2>Sample Button</h2>
            <PrimaryButton />
            <SecondaryButton />
            <SuccessButton />
            <WarningButton />
            <DangerButton />
            <InfoButton />

            <br /><br />
            <h2>Icon Button</h2>
            <IconButton icon="bi bi-heart" ariaLabel="Like"><h1>❤️</h1></IconButton>
            

            <br /><br />

            <h2>Outline Button</h2>
            <OutlinePrimaryButton />
            <OutlineSecondaryButton />
            <OutlineSuccessButton />
            <OutlineWarningButton />
            <OutlineDangerButton />
            <OutlineInfoButton />

            <br /><br />

            <h2>Modal</h2>
            <SaveModal />

            <br /><br />

            <Stack direction="horizontal" gap={2} className="mb-4">
                <Button onClick={() => openModal("로그인 후 등록 가능합니다.")}>로그인 확인</Button>
                <Button onClick={() => openModal("~~~을 작성해주세요!")}>작성누락</Button>
                <Button onClick={() => openModal("글 작성이 완료되었습니다!")}>작성완료</Button>
            </Stack>
            <AlertModal 
                show={show}
                onHide={() => setShow(false)}
                message={msg}
            />

            <br /><br />

            <h2>File Input</h2>
            <FileInput />

            <br /><br />

            <h2>Dropdowns</h2>
            <Dropdowns />

            <br /><br />

            <h2>Pagination</h2>
            <h5>(댓글 페이징)현재 페이지: {page}</h5>
            <ReplyPagination 
                page={page}
                totalPages={5}
                onChange={(p) => setPage(p)}
            />
            <br /><br />
            <h5>(일반 페이징)현재 페이지: {page}</h5>
            <Pagination
                page={page}
                totalPages={5}
                onChange={(p) => setPage(p)}
            />



        </Container>
      </PageContent>
    </>
  );
}
