
import { useContext, useEffect, useState } from 'react';
import { fetchMainEvent, participateEvent } from '../../../api/campaign/eventMainApi';
import { useEventSocket } from '../../../hooks/useEventSocket';
import { AuthContext } from '../../Context/AuthContext';

const useMainEvent = (onShowToast) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    

    // ===== 이벤트 로딩 =====
    const loadEvent = async () => {
        console.log('이벤트 로드 시작');
        setLoading(true);
        try {
            const result = await fetchMainEvent();
            console.log('이벤트 로드 성공:', result.data.data);
            setEvent(result.data.data);
        } catch (error) {
            console.error(' 이벤트 로드 실패:', error);
            onShowToast?.('이벤트 정보를 불러오지 못했습니다.', 'error');
        } finally {
            setLoading(false);
        }
    };

    // 최초 마운트 시 이벤트 데이터 로드
    useEffect(() => {
        loadEvent();
    }, []);



    // ===== 참여하기 =====
    const handleParticipate = async () => {
        if (!auth?.isAuthenticated) {
            onShowToast?.('로그인이 필요합니다.', 'error');
            return;
        }
        if (!event) return;
        console.log(' 참여 시도:', event.eventId);
        try {
            await participateEvent(event.eventId);
            console.log(' 참여 성공');
            onShowToast?.('참여 완료!', 'success');
        } catch (error) {
            console.error(' 참여 실패:', error);
            onShowToast?.('이미 참여한 이벤트입니다.', 'error');
        }
    };
    
    // 실시간 이벤트 메시지 처리 함수
    const handleEventMessage = (data) => {
        setEvent(prev => {
            if (!prev) return prev;
            if (String(prev.eventId) !== String(data.eventId)) return prev;
            return {
                ...prev,
                currentParticipants: data.currentParticipants,
                participationRate: data.participationRate,
            };
        });
    };

    useEventSocket(handleEventMessage);

    return { event, loading, loadEvent, handleParticipate };
};

export default useMainEvent;