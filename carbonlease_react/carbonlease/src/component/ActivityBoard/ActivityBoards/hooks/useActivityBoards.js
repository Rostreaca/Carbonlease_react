import { useEffect, useState } from "react";
import { fetchActivityBoards } from "../../../../api/activity/activityAPI";


export const useActivityBoards = () => {
  const [activityBoards, setActivityBoards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [keyword, setKeyword] = useState("");
  const [filter, setFilter] = useState("title");
  const [currentPage, setCurrentPage] = useState(1);
  
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    totalPage: 1
  });

  const loadBoards = (page = 1, f = filter, k = keyword ) => {
    setLoading(true);
    fetchActivityBoards(page, f, k)
      .then((res) => {
        const list = res.data.activityListDTO || [];

        setActivityBoards(list);
        setPageInfo({
          startPage: res.data.pageInfo.startPage,
          endPage: res.data.pageInfo.endPage,
          totalPage: res.data.pageInfo.maxPage
        });
      })
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadBoards(currentPage);
  }, [currentPage]);

  const handleSearch = (value) => {
    setKeyword(value);
    setCurrentPage(1);
    loadBoards(1, filter, value);
  };

  return {
    activityBoards,
    filter,
    setFilter,
    keyword,
    currentPage,
    setCurrentPage,
    pageInfo,
    handleSearch,
    loading,
    setLoading
  };
}