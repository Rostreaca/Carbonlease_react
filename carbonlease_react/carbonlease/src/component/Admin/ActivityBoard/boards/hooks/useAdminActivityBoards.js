import { useState, useEffect } from "react";
import {
  fetchAdminBoards,
  hideBoard,
  restoreBoard,
  deleteBoard,
} from "../../../../../api/activity/adminActivityAPI";

export default function useAdminBoards() {
  const [boards, setBoards] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    currentPage: 1,
    totalPage: 1,
    startPage: 1,
    endPage: 1,
  });

  const [loading, setLoading] = useState(true);

  const loadBoards = async (page = 1, status = "", keyword = "") => {
  setLoading(true);

  try {
    const res = await fetchAdminBoards(page, status, keyword);

    setBoards(res.data.list);
    setPageInfo({
      currentPage: page,
      totalPage: res.data.pageInfo.maxPage,
      startPage: res.data.pageInfo.startPage,
      endPage: res.data.pageInfo.endPage,
    });
  } catch (err) {
    console.error("목록 조회 실패", err);
  } finally {
    setLoading(false);
  }
};


  const handleHide = (id) => hideBoard(id).then(() => loadBoards(pageInfo.currentPage));
  const handleRestore = (id) => restoreBoard(id).then(() => loadBoards(pageInfo.currentPage));
  const handleDelete = (id) => deleteBoard(id).then(() => loadBoards(pageInfo.currentPage));

  useEffect(() => {
    loadBoards(1);
  }, []);

  return { boards, pageInfo, loading, loadBoards, handleHide, handleRestore, handleDelete };
}
