import DataTable from "../../../../Common/DataTable/DataTable";
import {
  ButtonGroup,
  CategoryBadge,
  DeleteButton,
  EditButton,
  StatusBadge
} from "../../../../Common/DataTable/DataTable.styled";

const AdminTable = ({ boards, onEdit, onHide, onRestore, onDelete, searchComponent }) => {
  const columns = [
    { header: "ID", field: "activityNo" },
    { header: "제목", field: "title", render: (v) => <strong>{v}</strong> },
    { header: "작성자", field: "nickname" },
    { header: "카테고리", field: "categoryName", render: v => <CategoryBadge>{v || "-"}</CategoryBadge> },
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
      field: "activityNo",
      render: (val, row) => (
        <ButtonGroup>
          {row.status === "Y" ? (
            <DeleteButton onClick={() => onHide(row.activityNo)}>숨김</DeleteButton>
          ) : (
            <EditButton onClick={() => onRestore(row.activityNo)}>복구</EditButton>
          )}
          <EditButton onClick={() => onEdit(row.activityNo)}>수정</EditButton>
          <DeleteButton onClick={() => onDelete(row.activityNo)}>삭제</DeleteButton>
        </ButtonGroup>
      )
    }
  ];

  return (
    <DataTable
      title="인증 게시글 목록"
      columns={columns}
      data={boards}
      searchComponent={searchComponent}
    />
  );
};


export default AdminTable;
