import { Client } from '@stomp/stompjs';
import { useCallback, useEffect, useState } from 'react';
import SockJS from 'sockjs-client';
import { fetchMainEvent, participateEvent } from '../../../api/campaign/eventMainApi';

const useMainEvent = (onShowToast) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const [stompClient, setStompClient] = useState(null);
    
    // 이벤트 정보 불러오기
    const loadEvent = useCallback(() => {
        setLoading(true);
        fetchMainEvent()
            .then(res => setEvent(res.data))
            .catch(() => onShowToast(
                '이벤트 정보를 불러오지 못했습니다.',
                'error'
            ))
            .finally(() => {
                setLoading(false);
            });
    }, [onShowToast]);

    // 참여하기
    const handleParticipate = () => {
        if (!event) return;
        participateEvent(event.eventId)
            .then(() => {
                onShowToast('참여 완료했습니다!', 'success');
                loadEvent(); // 참여 성공 시만 이벤트 정보 갱신
            })
            .catch(err => onShowToast(
                err?.response?.data?.message || '로그인이 필요합니다.',
                'error'
            ));
    };

    // WebSocket 연결 및 실시간 참여자 수 반영
    useEffect(() => {
        loadEvent();
        const sock = new SockJS('/ws-event');
        const client = new Client({ webSocketFactory: () => sock });
        client.onConnect = () => {
            client.subscribe('/topic/event/main', (msg) => {
                const data = JSON.parse(msg.body);
                setEvent(prev => prev && prev.eventId === data.eventId
                    ? { ...prev, currentParticipants: data.currentParticipants, participationRate: data.participationRate }
                    : prev
                );
            });
        };
        client.activate();
        return () => client.deactivate();
    }, []); // 의존성 배열을 []로 고정하여 최초 1회만 연결

    return { event, loading, handleParticipate };
};

export default useMainEvent;