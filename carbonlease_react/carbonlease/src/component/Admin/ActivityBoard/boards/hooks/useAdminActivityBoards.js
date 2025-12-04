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

  const loadBoards = (page = 1) => {
  
    const token = localStorage.getItem("accessToken");

    if (!token) {
      console.warn("토큰 없음. 목록 요청 중단");
      return;
    }
  
    setLoading(true);

  fetchAdminBoards(page)
    .then((res) => {

      setBoards(res.data.list);
      setPageInfo({
        currentPage: page,
        totalPage: res.data.pageInfo.maxPage,
        startPage: res.data.pageInfo.startPage,
        endPage: res.data.pageInfo.endPage,
      });
    })
    .finally(() => setLoading(false));
};

  const handleHide = (id) => hideBoard(id).then(() => loadBoards(pageInfo.currentPage));
  const handleRestore = (id) => restoreBoard(id).then(() => loadBoards(pageInfo.currentPage));
  const handleDelete = (id) => deleteBoard(id).then(() => loadBoards(pageInfo.currentPage));

  useEffect(() => {
    loadBoards(1);
  }, []);

  return { boards, pageInfo, loading, loadBoards, handleHide, handleRestore, handleDelete };
}
