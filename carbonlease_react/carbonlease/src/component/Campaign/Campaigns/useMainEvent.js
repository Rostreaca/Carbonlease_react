
import { Client } from '@stomp/stompjs';
import { useContext, useEffect, useRef, useState } from 'react';
import SockJS from 'sockjs-client';
import { fetchMainEvent, participateEvent } from '../../../api/campaign/eventMainApi';
import { AuthContext } from '../../Context/AuthContext';

const useMainEvent = (onShowToast) => {
    const [event, setEvent] = useState(null);
    const [loading, setLoading] = useState(true);
    const { auth } = useContext(AuthContext);
    const wsClientRef = useRef(null);
    
    // 이벤트 로딩
    const loadEvent = () => {
        console.log('이벤트 로드 시작');
        setLoading(true);
        fetchMainEvent()
            .then((result) => {
                console.log('이벤트 로드 성공:', result.data);
                setEvent(result.data);
            })
            .catch((error) => {
                console.error(' 이벤트 로드 실패:', error);
                onShowToast?.('이벤트 정보를 불러오지 못했습니다.', 'error');
            })
            .finally(() => setLoading(false));
    };

    // 최초 마운트 시 이벤트 데이터 로드
    useEffect(() => {
        loadEvent();
    }, []);


    // 참여하기
    const handleParticipate = () => {

        if (!auth?.isAuthenticated) {
            onShowToast?.('로그인이 필요합니다.', 'error');
            return;
        }
        if (!event) return;

        console.log(' 참여 시도:', event.eventId);

        participateEvent(event.eventId)
            .then(() => {
                console.log(' 참여 성공');
                onShowToast?.('참여 완료!', 'success');
            })
            .catch((error) => {
                console.error(' 참여 실패:', error);
                onShowToast?.('이미 참여한 이벤트입니다.', 'error');
            });
    };
    
    // WebSocket 연결 및 실시간 반영
    useEffect(() => {
        const socket = new SockJS('/ws-stomp');
        const client = new Client({
            webSocketFactory: () => socket,
            reconnectDelay: 5000,
            debug: (str) => console.log('[STOMP]', str),
        });

        let subscription = null;

        client.onConnect = () => {
            subscription = client.subscribe('/sub/event/main', (msg) => {
                try {
                    const data = JSON.parse(msg.body);
                    console.log('WebSocket payload:', data);
                    setEvent(prev => {
                        if (!prev) return prev;
                        // eventId 타입이 다를 수 있으니 문자열로 비교
                        if (String(prev.eventId) !== String(data.eventId)) return prev;
                        return {
                            ...prev,
                            currentParticipants: data.currentParticipants,
                            participationRate: data.participationRate,
                        };
                    });
                } catch (e) {
                    console.error('메시지 파싱 실패:', e);
                }
            });
        };

        client.activate();

        return () => {
            if (subscription) subscription.unsubscribe();
            if (client && client.active) client.deactivate();
        };
    }, []);

    return { event, loading, loadEvent, handleParticipate };
};

export default useMainEvent;