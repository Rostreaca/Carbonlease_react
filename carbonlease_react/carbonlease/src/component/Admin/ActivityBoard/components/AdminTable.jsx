import DataTable from "../../../Common/DataTable/DataTable";
import { ButtonGroup, CategoryBadge, DeleteButton, EditButton, StatusBadge } from "../../../Common/DataTable/DataTable.styled"


const AdminTable = ({ boards, onEdit, onHide, onRestore, onDelete}) => {
  const columns = [
    { header: "ID", field: "id" },
    { header: "제목", field: "title", render: (v) => <strong>{v}</strong> },
    { header: "작성자", field: "writer" },
    { header: "지역", field: "region" },
    { header: "카테고리", field: "category", render: (v) => <CategoryBadge>{v}</CategoryBadge> },
    { 
      header: "상태", 
      field: "status", 
      render: (v) => <StatusBadge $status={v}>{ v === "Y" ? "정상" : "숨김" }</StatusBadge>
    },
    { header: "작성일", field: "createdAt" },
    {
      header: "관리",
      field: "id",
      render: (value, row) => (
        <ButtonGroup>
          {row.status === "Y" ? (
            <DeleteButton onClick={() => onHide(value)}>숨김</DeleteButton>
          ) : (
            <EditButton onClick={() => onRestore(value)}>복구</EditButton>
          )}
          <EditButton onClick={() => onEdit(value)}>수정</EditButton>
          <DeleteButton onClick={() => onDelete(value)}>삭제</DeleteButton>
        </ButtonGroup>
      ),
    }
  ];

  return <DataTable title="인증 게시글 목록" columns={columns} data={boards} />;
};

export default AdminTable;