import { useEffect, useState, useCallback } from "react";
import {
  fetchAdminBoards,
  hideBoard,
  restoreBoard,
  deleteBoard,
} from "../../../../../api/board/adminBoardsAPI";

const useAdminBoards = () => {
  const [boards, setBoards] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    startPage: 1,
    endPage: 1,
    totalPage: 1,
  });
  const [loading, setLoading] = useState(false);

  // 목록 조회
  const loadBoards = useCallback(async (page = 1, status = "", keyword = "") => {
    try {
      setLoading(true);

      const res = await fetchAdminBoards(page, status, keyword);

      const { boards, pageInfo } = res.data;

      setBoards(boards || []);
      setPageInfo(
        pageInfo || {
          currentPage: page,
          startPage: 1,
          endPage: 1,
          totalPage: 1,
        }
      );
    } catch (err) {
      console.error("관리자 일반게시판 목록 조회 실패:", err);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    loadBoards(1);
  }, [loadBoards]);

  // 숨김 처리
  const handleHide = async (id) => {
    await hideBoard(id);
    await loadBoards(pageInfo.currentPage);
  };

  // 복구 처리
  const handleRestore = async (id) => {
    await restoreBoard(id);
    await loadBoards(pageInfo.currentPage);
  };

  // 삭제 처리
  const handleDelete = async (id) => {
    await deleteBoard(id);
    await loadBoards(pageInfo.currentPage);
  };

  return {
    boards,
    pageInfo,
    loading,
    loadBoards,
    handleHide,
    handleRestore,
    handleDelete,
  };
};

export default useAdminBoards;
