import { useState } from "react";
import { useNavigate } from "react-router-dom";
import DataTable from "../../Common/DataTable/DataTable";
import Pagination from '../../Common/Pagination/Pagination';
import ConfirmDialog from "../../Common/ConfirmDialog/ConfirmDialog";
import Toast from "../../Common/Toast/Toast";
import {
  PageHeader,
  EditButton,
  DeleteButton,
  ButtonGroup,
  CategoryBadge,
  StatusBadge
} from "../../Common/DataTable/DataTable.styled";

const AdminActivityBoards = () => {
  const navigate = useNavigate();

  const [adminConfirm, setAdminConfirm] = useState({ show: false, id: null, type: null });
  const [toast, setToast] = useState({ show: false, message: "", variant: "success" });

  // Pagination 상태
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(5);
  const [pageNumbers, setPageNumbers] = useState([1, 2, 3, 4, 5]);

  const updatePageNumbers = (page, total) => {
    const maxVisible = 5;
    const blockNumber = Math.ceil(page / maxVisible);
    const start = (blockNumber - 1) * maxVisible + 1;
    const end = Math.min(blockNumber * maxVisible, total);

    const numbers = [];
    for (let i = start; i <= end; i++) numbers.push(i);
    setPageNumbers(numbers);
  };

  const handleFirstPage = () => { setCurrentPage(1); updatePageNumbers(1, totalPages); };
  const handlePrevPage = () => {
    if (currentPage > 1) {
      const newPage = currentPage - 1;
      setCurrentPage(newPage);
      updatePageNumbers(newPage, totalPages);
    }
  };
  const handlePageClick = (page) => { setCurrentPage(page); updatePageNumbers(page, totalPages); };
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      const newPage = currentPage + 1;
      setCurrentPage(newPage);
      updatePageNumbers(newPage, totalPages);
    }
  };
  const handleLastPage = () => { setCurrentPage(totalPages); updatePageNumbers(totalPages, totalPages); };

  // 임시 데이터
  const [boards] = useState([
    { id: 31, title: "대중교통 이용", writer: "user1", region: "서울특별시", category: "대중교통", status: "Y", createdAt: "2025-01-12" },
    { id: 30, title: "텀블러 사용", writer: "user2", region: "부산광역시", category: "텀블러", status: "Y", createdAt: "2025-01-10" },
    { id: 29, title: "전기 절약 도전", writer: "user5", region: "경기도", category: "전기절약", status: "N", createdAt: "2025-01-05" }
  ]);

  const handleEdit = (id) => navigate(`/admin/activityBoards/update/${id}`);
  const handleHide = (id) => setAdminConfirm({ show: true, id, type: "hide" });
  const handleRestore = (id) => setAdminConfirm({ show: true, id, type: "restore" });
  const handleDelete = (id) => setAdminConfirm({ show: true, id, type: "delete" });

  const confirmAction = () => {
    const { id, type } = adminConfirm;
    console.log("관리자 처리:", type, id);

    let message = "";
    if (type === "hide") message = "게시글이 숨김 처리되었습니다.";
    else if (type === "restore") message = "게시글이 복구되었습니다.";
    else if (type === "delete") message = "게시글이 완전히 삭제되었습니다.";

    setToast({ show: true, message, variant: "success" });
    setAdminConfirm({ show: false, id: null, type: null });
  };

  const cancelAction = () => setAdminConfirm({ show: false, id: null, type: null });

  const columns = [
    { header: "ID", field: "id" },
    { header: "제목", field: "title", render: (v) => <strong>{v}</strong> },
    { header: "작성자", field: "writer" },
    { header: "지역", field: "region" },
    { header: "카테고리", field: "category", render: (v) => <CategoryBadge>{v}</CategoryBadge> },
    { header: "상태", field: "status", render: (v) => <StatusBadge $status={v}>{v === "Y" ? "정상" : "숨김"}</StatusBadge> },
    { header: "작성일", field: "createdAt" },
    {
      header: "관리",
      field: "id",
      render: (value, row) => (
        <ButtonGroup>
          {row.status === "Y" ? (
            <DeleteButton onClick={() => handleHide(value)}>숨김</DeleteButton>
          ) : (
            <EditButton onClick={() => handleRestore(value)}>복구</EditButton>
          )}
          <EditButton onClick={() => handleEdit(value)}>수정</EditButton>
          <DeleteButton onClick={() => handleDelete(value)}>삭제</DeleteButton>
        </ButtonGroup>
      )
    }
  ];

  return (
    <div>
      <PageHeader><h1>인증 게시판 관리</h1></PageHeader>

      <DataTable title="인증 게시글 목록" columns={columns} data={boards} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageNumbers={pageNumbers}
        onFirstPage={handleFirstPage}
        onPrevPage={handlePrevPage}
        onPageClick={handlePageClick}
        onNextPage={handleNextPage}
        onLastPage={handleLastPage}
      />

      <ConfirmDialog
        show={adminConfirm.show}
        onClose={cancelAction}
        onConfirm={confirmAction}
        title="관리자 작업 확인"
        message={
          adminConfirm.type === "hide"
            ? "해당 인증 게시글을 숨김 처리하시겠습니까?"
            : adminConfirm.type === "restore"
            ? "해당 인증 게시글을 복구하시겠습니까?"
            : "정말로 삭제하시겠습니까? 삭제 시 복구가 불가능합니다."
        }
        confirmText={
          adminConfirm.type === "hide"
            ? "숨김 처리"
            : adminConfirm.type === "restore"
            ? "복구"
            : "삭제"
        }
        cancelText="취소"
        variant="danger"
      />

      <Toast
        isVisible={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false })}
      />
    </div>
  );
};

export default AdminActivityBoards;
