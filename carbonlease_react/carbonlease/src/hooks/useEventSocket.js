import { Client } from '@stomp/stompjs';
import { useEffect } from 'react';
import SockJS from 'sockjs-client';
import { WS_BASE_URL } from '../api/api.js';

export function useEventSocket(onEventMessage) {
    useEffect(() => {

        // 웹소켓 주소
        const socket = new SockJS(WS_BASE_URL);

        const stompClient = new Client({
            webSocketFactory: () => socket,
            debug: (str) => console.log(str),
        });

        stompClient.onConnect = () => {

        // STOMP 클라이언트로 /sub/event/main 구독
        stompClient.subscribe('/sub/event/main', (message) => {
            // 메시지 수신 시 콜백 실행
            const eventData = JSON.parse(message.body);
            onEventMessage(eventData);
        });
        };

        stompClient.activate();

        return () => {
            // 컴포넌트 언마운트 시 연결 해제
            stompClient.deactivate();
        };

    }, [onEventMessage]);
}