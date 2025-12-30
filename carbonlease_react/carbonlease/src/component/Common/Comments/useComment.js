
// 공통 댓글 기능을 위한 커스텀 훅
// 1. fetchAPI: 도메인별 댓글 조회 API를 파라미터로 받아서 호출
// 2. mapping: 댓글 데이터의 필드명을 통일하기 위한 매핑 객체
// 3. boardId, page 등은 각 도메인에서 전달
// 내부에서 페이징, 데이터 정규화, 상태 관리까지 일괄 처리
import { useEffect, useState } from "react";

/**
 * 공통 댓글 조회/페이징/정규화 로직을 제공하는 커스텀 훅
 * @param {Function} fetchAPI - 도메인별 댓글 조회 API 함수
 * @param {string|number} boardId - 댓글이 속한 게시글/캠페인 ID
 * @param {Object} mapping - 댓글 데이터 필드명 매핑 객체
 * @returns {Object} 댓글 목록, 페이징 정보, 페이지 이동 함수 등
 */
export const useComment = (fetchAPI, boardId, mapping) => {
  // 댓글 목록 상태
  const [comments, setComments] = useState([]);
  // 페이징 정보 상태
  const [pageInfo, setPageInfo] = useState({
    startPage: 1,
    endPage: 1,
    totalPage: 1
  });
  // 현재 페이지 상태
  const [currentPage, setCurrentPage] = useState(1);

  /**
   * 페이지별 댓글 목록을 불러오고 상태를 갱신
   * - fetchAPI: 도메인별 댓글 조회 API 호출
   * - mapping: 댓글 데이터 필드명 통일
   * - 페이징 정보 및 현재 페이지 상태 관리
   */
  const loadPage = async (page) => {
    // API 호출 (boardId, page 전달)
    const res = await fetchAPI(boardId, page);
    const data = res.data.data || {};
    const list = data.replies || [];

    // 댓글 데이터 정규화 (필드명 통일)
    const normalized = list.map(r => ({
      id: r[mapping.id],
      writer: r[mapping.writer],
      content: r[mapping.content],
      date: r[mapping.date]
    }));

    setComments(normalized);

    // pageInfo가 없을 때 기본값 사용
    const pageInfo = data.pageInfo || { startPage: 1, endPage: 1, maxPage: 1 };
    setPageInfo({
      startPage: pageInfo.startPage,
      endPage: pageInfo.endPage,
      totalPage: pageInfo.maxPage
    });

    setCurrentPage(page);
  };

  // boardId가 변경될 때마다 첫 페이지 댓글 목록 로드
  useEffect(() => {
    loadPage(1);
  }, [boardId]);

  // 댓글 목록, 페이징 정보, 페이지 이동 함수 등 반환
  return {
    comments,
    pageInfo,
    currentPage,
    setCurrentPage: (p) => loadPage(p),
    loadPage
  };
};