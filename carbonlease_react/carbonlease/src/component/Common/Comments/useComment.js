import { useState, useEffect } from "react";

export const useComment = (fetchAPI, boardId, mapping) => {
  const [comments, setComments] = useState([]);
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    totalPage: 1
  });
  const [currentPage, setCurrentPage] = useState(1);

  const loadPage = async (page) => {
    const res = await fetchAPI(boardId, page);

    const list = res.data.replies || [];

    // DTO 통일
    const normalized = list.map(r => ({
      id: r[mapping.id],
      writer: r[mapping.writer],
      content: r[mapping.content],
      date: r[mapping.date]
    }));

    setComments(normalized);

    setPageInfo({
      startPage: res.data.pageInfo.startPage,
      endPage: res.data.pageInfo.endPage,
      totalPage: res.data.pageInfo.maxPage
    });

    setCurrentPage(page);
  };

  useEffect(() => {
    loadPage(1);
  }, [boardId]);

  return {
    comments,
    pageInfo,
    currentPage,
    setCurrentPage: (p) => loadPage(p),
    loadPage
  };
};
