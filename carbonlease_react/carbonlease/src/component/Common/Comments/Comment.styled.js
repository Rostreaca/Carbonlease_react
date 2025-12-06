import styled from "styled-components";

/* ====== 댓글 ====== */
export const CommentSection = styled.div`
  margin-top: 40px;
  padding-top: 16px;
  border-top: 1px solid #eee;

  display: flex;
  flex-direction: column;
`;

export const ReplyListBox = styled.div`
  width: 100%;
`;

export const ReplyInputSection = styled.div`
  display: flex;
`;

export const ReplyInput = styled.textarea`
  width: 100%;
  height: 100px;
  min-height: 105px;
  margin: 6px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #3cb371;
    box-shadow: 0 0 0 2px rgba(60,179,113,0.2);
  }
`;

export const ReplyEditInput = styled.textarea`
  width: 100%;
  height: 80px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
  resize: none;

  &:focus {
    outline: none;
    border: 1px solid #3cb371;
    box-shadow: 0 0 0 2px rgba(60,179,113,0.2);
  }
`;

export const NoReplyText = styled.div`
  padding: 20px 0;
  color: #777;
  text-align: center;
  font-size: 14px;
`;


export const ReplyInputButton = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 6px;
  padding: 10px 0;
  background: #00A34A;
  color: white;
  min-width: 100px;
  height: 100px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  font-weight: 600;
  box-shadow: 0 2px 6px rgba(0,0,0,0.12);
  transition: 0.2s ease;

  &:hover {
    background: #00833bff;
    box-shadow: 0 4px 10px rgba(0,0,0,0.18);
    transform: translateY(-1px);
  }
`;

export const Reply = styled.div`
  padding: 16px 0;
  border-bottom: 1px solid #ddd;
  font-size: 15px;
`;

/* 닉네임 */
export const ReplyWriter = styled.div`
  font-weight: 600;
  margin-bottom: 6px;
  font-size: 15px;
  color: #111;
`;

/* 댓글 본문 */
export const ReplyContent = styled.div`
  margin: 4px 0 8px 0;
  line-height: 1.6;
  color: #333;
  white-space: pre-line;
`;

/* 날짜 + 수정 삭제 줄 */
export const ReplyFooter = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-top: 4px;
  font-size: 14px;
  color: #777;
`;

/* 날짜 */
export const ReplyDate = styled.span`
  color: #aaa;
  font-size: 13px;
  margin-right: 14px;
`;

/* 수정/삭제 버튼 */
export const ReplyButton = styled.span`
  font-size: 13px;
  color: #007aff;
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

/* 페이지 네이션 */
export const PaginationContainer = styled.div`
    width: 60%; 
    margin: 30px auto 20px auto;
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 6px;
`;

export const PageButton = styled.button`
    min-width: 32px;
    height: 32px;

    /* 기본 / active */
    border: 1px solid #00A34A;
    background-color: 
        ${props => props.$active ? '#00A34A' : '#ffffff'};
    color: 
        ${props => props.$active ? '#ffffff' : '#00A34A'};

    border-radius: 6px;
    cursor: ${props => props.disabled ? 'not-allowed' : 'pointer'};
    opacity: ${props => props.disabled ? '0.5' : '1'};
    transition: all 0.2s ease;
    font-weight: ${props => props.$active ? '600' : '400'};
    display: flex;
    align-items: center;
    justify-content: center;

    /* hover */
    &:hover:not(:disabled) {
        background-color: 
            ${props => props.$active ? '#00833bff' : '#e3fdf2'};
        border-color: 
            ${props => props.$active ? '#00833bff' : '#00833bff'};
    }

    /* 아이콘 같은 경우 */
    i {
        font-size: 14px;
    }
`;
