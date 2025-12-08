import React, { useState, useContext } from 'react'; // useContext import 추가
import { Button } from "react-bootstrap";
import { AuthContext } from "../../Context/AuthContext";
import { ReplyListBox } from "../../Common/Comments/Comment.styled";


const BoardReply = ({ data = [], onUpdate, onDelete }) => { 
   
    const { auth } = useContext(AuthContext); 
    console.log("로그인 사용자 auth:", auth);
    console.log("로그인 사용자 memberId:", auth?.memberId, "타입:", typeof auth?.memberId);

    // 어떤 댓글이 수정 중인지 상태로 관리 (수정 중인 댓글 ID -> replyNo 사용)
    const [editingReplyNo, setEditingReplyNo] = useState(null);
    // 수정 중인 내용을 임시로 저장할 상태
    const [editContent, setEditContent] = useState('');

    const handleEditClick = (reply) => {
        setEditingReplyNo(reply.replyNo); // replyId 대신 replyNo 사용
        setEditContent(reply.replyContent); 
    };

    const handleCancelClick = () => {
        setEditingReplyNo(null);
        setEditContent('');
    };

    const handleSaveClick = (replyNo) => { // replyId 대신 replyNo 사용
        if (onUpdate) {
            onUpdate(replyNo, editContent);
        }
        setEditingReplyNo(null); // 저장 후 모드 종료
    };
    
    const buttonStyle = { marginLeft: '5px', padding: '3px 5px', cursor: 'pointer' };

    return (
        <>
        { data.length === 0 ? (
            <ReplyListBox>
                <div style={{ padding:"10px", textAlign:"center", color:"#777" }}>
                  아직 댓글이 없습니다. 첫 댓글을 남겨보세요! 💬
                </div>
            </ReplyListBox> 
        ) : (
            data.map((reply) => ( 
               <div 
                   key={reply.replyNo} // key도 replyNo 사용
                   style={{
                        padding:"14px 10px",
                        borderBottom:"1px solid #eee",
                        fontSize:"14px"
                    }}
                > 
            
        {/* 특정 댓글이 수정 모드인지 확인 (replyNo 비교) */}
        {editingReplyNo === reply.replyNo ? (
            // **수정 모드 UI**
            <div>
                <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                    style={{ width: '80%', height: '80px', marginTop: '10px' }}
                />
                <div style={{ marginTop: '10px' }}>
                    <Button variant="primary" style={buttonStyle} onClick={() => handleSaveClick(reply.replyNo)}>저장</Button>
                    <Button variant="secondary" style={buttonStyle} onClick={handleCancelClick}>취소</Button>
                </div>
            </div>
        ) : (
            // **일반 보기 모드 UI**
            <div>
                <div> 
                    작성자 : {reply.nickname} / {reply.enrollDate} <br />
                </div> 
                <div>
                    댓  글 : {reply.replyContent}
                </div>
                
                {/* --- [핵심: 버튼 표시 조건] --- */}
                {/* 로그인 되어있고, 현재 사용자의 memberNo와 댓글 작성자의 memberNo가 같을 때만 표시 */}
                {auth && auth.isAuthenticated && auth.memberId === reply.memberId && (
                    <div style={{ marginTop: '10px' }}>
                        <Button 
                            variant="outline-primary"
                            size="sm"
                            style={buttonStyle} 
                            onClick={() => handleEditClick(reply)}
                        >수정
                        </Button>
                        <Button 
                            variant="outline-danger"
                            size="sm"
                            style={buttonStyle} 
                            onClick={() => onDelete(reply.replyNo)} // onDelete에도 replyNo 전달
                        >삭제
                        </Button>
                    </div>
                )}
            </div>
        )}
        </div>
            ))
        )}
        </>
    );
}

export default BoardReply;  