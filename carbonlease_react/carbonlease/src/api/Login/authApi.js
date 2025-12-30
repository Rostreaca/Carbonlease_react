import { API_BASE_URL, createApiInstance } from '../api.js';

const authApi = createApiInstance(`${API_BASE_URL}/api/auth/`);

// 관리자 로그인
export function adminLogin(data) {
  return authApi.post('adminLogin', data);
}

// 일반 로그인
export function login(data) {
  return authApi.post('login', data);
}

// 카카오 로그인 (code 쿼리)
export function kakaoLogin(code) {
  return authApi.post(`kakaoLogin?code=${code}`);
}

// 토큰 리프레시
export function refreshToken() {
  return authApi.post('refresh');
}
