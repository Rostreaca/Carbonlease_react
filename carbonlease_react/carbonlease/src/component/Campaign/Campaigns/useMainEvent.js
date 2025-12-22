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
    

    // STOMP SEND : 서버로 메시지 전송
    const sendTestMessage = (message = '테스트 메시지') => {
        if (wsClientRef.current && wsClientRef.current.connected) {
            wsClientRef.current.publish({
                destination: '/pub/event/participate', // 서버의 @MessageMapping 경로에 맞게 수정
                body: JSON.stringify({ message }),
            });
            console.log('메시지 전송:', message);
        } else {
            console.warn('WebSocket이 연결되어 있지 않습니다.');
        }
    };

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
                // Optimistic UI: WebSocket 메시지 오기 전 화면에 즉시 반영
                setEvent(prev => {
                    if (!prev) return prev;
                    return {
                        ...prev,
                        currentParticipants: prev.currentParticipants + 1,
                        participationRate: Math.round(((prev.currentParticipants + 1) / prev.maxParticipants) * 10000) / 100
                    };
                });
            })
            .catch((error) => {
                console.error(' 참여 실패:', error);
                onShowToast?.('이미 참여한 이벤트입니다.', 'error');
            });
    };
    
    // WebSocket 연결
    useEffect(() => {

        console.log('useEffect 실행');

        loadEvent();

        // 항상 상대경로로 연결하여 Vite 프록시가 동작하게 함
        console.log('SockJS 연결 시도');
        const sock = new SockJS('/ws-stomp');
        const client = new Client({
            webSocketFactory: () => sock,
            reconnectDelay: 5000,
            debug: (str) => console.log('[STOMP]', str),
            onConnect: () => {
                console.log(' WebSocket 연결 성공!');
                client.subscribe('/sub/event/main', (msg) => {
                    try {
                        console.log('메시지 수신:', msg.body);
                        const data = JSON.parse(msg.body);
                        setEvent(prev => {
                            if (!prev) return prev;
                            if (prev.eventId !== data.eventId) return prev;
                            if (prev.currentParticipants === data.currentParticipants && 
                                prev.participationRate === data.participationRate) {
                                return prev;
                            }
                            console.log(' 이벤트 업데이트:', {
                                before: prev.currentParticipants,
                                after: data.currentParticipants
                            });
                            return {
                                ...prev,
                                currentParticipants: data.currentParticipants,
                                participationRate: data.participationRate,
                            };
                        });
                    } catch (e) {
                        console.error(' 메시지 파싱 실패:', e);
                    }
                });
            },
            onStompError: (frame) => {
                console.error(' STOMP 에러:', frame);
            },
            onWebSocketError: (err) => {
                console.error(' WebSocket 에러:', err);
            },
            onWebSocketClose: (event) => {
                console.warn(' WebSocket 닫힘:', event.code, event.reason);
            }
        });

        client.activate();
        wsClientRef.current = client;

        return () => {
            console.log(' WebSocket 연결 해제');
            client.deactivate();
            wsClientRef.current = null;
        };
    }, []); // 빈 배열 - 마운트 시 1회만

    // sendTestMessage를 반환하여 외부에서 호출 가능하게 함
    return { event, loading, handleParticipate, sendTestMessage };
};

export default useMainEvent;