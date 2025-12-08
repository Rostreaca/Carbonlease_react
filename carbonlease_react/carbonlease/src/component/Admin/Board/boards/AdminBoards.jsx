import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Pagination from '../../../ActivityBoard/Pagination/Pagination';
import ConfirmDialog from "../../../Common/ConfirmDialog/ConfirmDialog";
import Toast from "../../../Common/Toast/Toast";
import { PageHeader } from "../../../Common/DataTable/DataTable.styled";
import AdminTable from "./components/AdminTable";
import useAdminBoards from "./hooks/useAdminBoards";
import SearchFilterBox from "../../Util/StatusFilter";

const AdminBoards = () => {
    const navigate = useNavigate();

    const [status, setStatus] = useState("");
    const [keyword, setKeyword] = useState("");
    const {
      boards,
      pageInfo,
      loading,
      loadBoards,
      handleHide,
      handleRestore,
      handleDelete
    } = useAdminBoards();
    
    const [confirm, setConfirm] = useState({ show: false, id: null, type: null});
    const [toast, setToast] = useState({ show: false, message: "", variant: "success"});
    
    const openConfirm = (id, type) => setConfirm({ show: true, id, type});
    const closeConfirm = () => setConfirm({ show: false, id: null, type: null});
    
    const doAction = () => {
      const { id, type } = confirm;
    
      const actions = {
        hide: handleHide,
        restore: handleRestore,
        delete: handleDelete
      };
    
      actions[type](id).then(() => {
        setToast({ show: true, message: "처리 되었습니다.", variant: "success"});
        closeConfirm();
      });
    };

   return (
    <div>
      <PageHeader><h1>일반 게시판 관리</h1></PageHeader>

      {loading ? (
        <div style={{ padding: "20px" }}>로딩중...</div>
      ) : (
        <AdminTable
          boards={boards}
          onEdit={(id) => navigate(`/admin/boards/update/${id}`)}
          onHide={(id) => openConfirm(id, "hide")}
          onRestore={(id) => openConfirm(id, "restore")}
          onDelete={(id) => openConfirm(id, "delete")}
          searchComponent={
            <SearchFilterBox
              status={status}
              keyword={keyword}
              onStatusChange={(val) => {
                setStatus(val);
                loadBoards(1, val, keyword);
              }}
              onKeywordChange={(e) => setKeyword(e.target.value)}
              onSearch={() => loadBoards(1, status, keyword)}
            />
          }
        />
      )}

      <Pagination 
        currentPage={pageInfo.currentPage}
        setCurrentPage={(p) => loadBoards(p, status, keyword)}
        pageInfo={pageInfo}
      />

      <ConfirmDialog 
        show={confirm.show}
        onClose={closeConfirm}
        onConfirm={doAction}
        title="관리자 확인"
        message="정말로 처리 하시겠습니까?"
        confirmText="확인"
        cancelText="취소"
        variant="danger"
      />

      <Toast 
        isVisible={toast.show}
        message={toast.message}
        variant={toast.variant}
        onClose={() => setToast({ ...toast, show: false})}      
      />
    </div>
  );
};

export default AdminBoards;
