import { API_BASE_URL, createApiInstance } from '../api.js';

const adminMembersApi = createApiInstance(`${API_BASE_URL}/api/admin/members`);

// 관리자 회원 목록 조회
export function fetchAdminMembers({ orderBy, keyword }) {
  return adminMembersApi.get(``, {
    params: { orderBy, keyword },
  });
}

// 관리자 회원 복구
export function restoreAdminMember({ memberNo }) {
  return adminMembersApi.put(`restore`, null, {
    params: { memberNo },
  });
}

// 관리자 회원 삭제
export function deleteAdminMember({ memberNo }) {
  return adminMembersApi.delete(``, {
    params: { memberNo },
  });
}
