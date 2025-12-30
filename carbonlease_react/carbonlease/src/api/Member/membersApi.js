import axios from "axios";
import { API_BASE_URL } from "../api";

// 이메일 중복 확인
export function checkEmailDuplicateApi(email) {
    return axios.post(`${API_BASE_URL}/api/members/checkEmail`, { email });
}

// 닉네임 중복 확인
export function checkNickNameDuplicateApi(nickName) {
    return axios.post(`${API_BASE_URL}/api/members/checkNickName`, { nickName });
}

// 아이디 중복 확인
export function checkIdDuplicateApi(memberId) {
    return axios.post(`${API_BASE_URL}/api/members/checkId`, { memberId });
}

// 회원가입
export function enrollMemberApi(data) {
    return axios.post(`${API_BASE_URL}/api/members`, data);
}

// 카카오 회원가입
export function kakaoEnrollMemberApi(data) {
    return axios.post(`${API_BASE_URL}/api/members`, data);
}

// 회원정보 수정
export function updateMemberApi(data, token) {
    return axios.put(`${API_BASE_URL}/api/members`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// 카카오 회원정보 수정
export function updateKakaoMemberApi(data, token) {
    return axios.put(`${API_BASE_URL}/api/members/kakao`, data, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// 내 게시글 조회
export function getMyBoardsApi(token) {
    return axios.get(`${API_BASE_URL}/api/members/boards`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// 내 활동글 조회
export function getMyActivityBoardsApi(token) {
    return axios.get(`${API_BASE_URL}/api/members/activityBoards`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}

// 회원탈퇴
export function signOutApi(memberPwd, token) {
    return axios.delete(`${API_BASE_URL}/api/members`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { memberPwd }
    });
}

// 카카오 회원탈퇴
export function kakaoSignOutApi(token) {
    return axios.delete(`${API_BASE_URL}/api/members/kakao`, {
        headers: { Authorization: `Bearer ${token}` }
    });
}
