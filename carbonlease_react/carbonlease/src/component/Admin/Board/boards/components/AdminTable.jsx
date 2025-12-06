import DataTable from "../../../../Common/DataTable/DataTable";
import {
  ButtonGroup,
  CategoryBadge,
  DeleteButton,
  EditButton,
  StatusBadge
} from "../../../../Common/DataTable/DataTable.styled";

const AdminTable = ({ boards, onEdit, onHide, onRestore, onDelete, searchComponent}) => {
  const columns = [
    { header: "ID", field: "boardNo" },
    { header: "제목", field: "title", render: (v) => <strong>{v}</strong> },
    { header: "작성자", field: "nickname" },
    { header: "지역", field: "categoryName", render: (v) => <CategoryBadge>{v || "-"}</CategoryBadge> },
    {
      header: "상태",
      field: "status",
      render: (v) => (
        <StatusBadge $status={v === "Y" ? "진행중" : "삭제"}>
            {v === "Y" ? "정상" : "숨김"}
        </StatusBadge>
      )
    },

    { header: "작성일", field: "enrollDate" },

    {
      header: "관리",
      field: "boardNo",
      render: (value, row) => (
        <ButtonGroup>
          {row.status === "Y" ? (
            <DeleteButton onClick={() => onHide(row.boardNo)}>숨김</DeleteButton>
          ) : (
            <EditButton onClick={() => onRestore(row.boardNo)}>복구</EditButton>
          )}
          <EditButton onClick={() => onEdit(row.boardNo)}>수정</EditButton>
          <DeleteButton onClick={() => onDelete(row.boardNo)}>삭제</DeleteButton>
        </ButtonGroup>
      ),
    },
  ];

  return <DataTable title="일반 게시글 목록" columns={columns} data={boards} searchComponent={searchComponent}/>;
};

export default AdminTable;
