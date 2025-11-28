import { useEffect, useState } from "react";
import { deleteReplyAPI, fetchRepliesAPI, updateReplyAPI } from "../../../../api/activity/activityAPI";

export default function useReplies(activityNo, accessToken) {
    
    const [replies, setReplies] = useState([]);
    const [editReplyId, setEditReplyId] = useState(null);

    const [currentPage, setCurrentPage] = useState(1);
    const [pageInfo, setPageInfo] = useState({
        startPage: 1,
        endPage: 1,
        totalPage: 1
    });


    const fetchReplies = async () => {
        try {
            const res = await fetchRepliesAPI(activityNo, currentPage);

            setReplies(res.data.replies || []);

            setPageInfo({
                startPage: res.data.pageInfo.startPage,
                endPage: res.data.pageInfo.endPage,
                totalPage: res.data.pageInfo.maxPage
            });
        } catch (err) {
            console.error("댓글 조회 실패", err);
        }
    };

    const updateReply = async (replyNo, content, stopEditing, onSuccess, onError) => {
        if (content === undefined) {
            setEditReplyId(replyNo);
            return;
        }
        
        try {
            await updateReplyAPI(replyNo, content, accessToken );
            stopEditing();
            fetchReplies();
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("댓글 수정 실패", err);
            if (onError) onError();
        }
    };

    const deleteReply = async (replyNo, onSuccess, onError) => {
        
        if (!window.confirm("정말 삭제하시겠습니까?")) return;

        try {
            await deleteReplyAPI(replyNo, accessToken);
            fetchReplies();
            if (onSuccess) onSuccess();
        } catch (err) {
            console.error("댓글 삭제 실패", err);
            if (onError) onError();
        }
    };

    useEffect(() => {
        fetchReplies();
    }, [currentPage]);

    return {
        replies,
        currentPage,
        pageInfo,
        editReplyId,
        setEditReplyId,
        setCurrentPage,
        fetchReplies,
        updateReply,
        deleteReply
    };
}