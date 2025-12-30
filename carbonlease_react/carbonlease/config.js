const isLocal = window.location.hostname === "localhost";

window.ENV = {
    API_URL: isLocal ? "http://localhost:8080" : "https://sh-pk.store",
    WS_URL: isLocal ? "http://localhost:8080/ws-stomp" : "https://sh-pk.store/ws-stomp",
    KAKAO_REDIRECT_URI: isLocal ? "http://localhost:8080/kakao/callback" : "https://sh-pk.store/kakao/callback",
    KAKAO_MAP_API_KEY: "7317ce02b514818da5c2a34210dc75ac",
    KAKAO_CLIENT_ID: "6caaa3a7fb9c9fd967792899e6949126"
};




