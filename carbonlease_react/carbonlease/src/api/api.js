
export const API_BASE_URL = window.ENV?.API_URL || "http://localhost:8080";
export const WS_BASE_URL = window.ENV?.WS_URL || "http://localhost:8080/ws-stomp";
export const KAKAO_REDIRECT_URI = window.ENV?.KAKAO_REDIRECT_URI || "";
export const KAKAO_MAP_API_KEY = window.ENV?.KAKAO_MAP_API_KEY || "";
export const KAKAO_CLIENT_ID = window.ENV?.KAKAO_CLIENT_ID || "";

import axios from 'axios';

// 공통 Axios 인스턴스 생성 함수 (인터셉터 포함)
export function createApiInstance(baseURL) {
	const instance = axios.create({ baseURL });
	instance.interceptors.request.use(
		(config) => {
			const accessToken = localStorage.getItem('accessToken');
			if (accessToken) {
				config.headers['Authorization'] = `Bearer ${accessToken}`;
			}
			return config;
		},
		(error) => Promise.reject(error)
	);
	return instance;
}
