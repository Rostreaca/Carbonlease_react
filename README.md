> # 프로젝트명 : Carbonlease ( 탄소 절약 인증 플랫폼 )

### 한 줄 소개
* 탄소 절약 활동을 기록·공유하고, 캠페인 및 공지사항을 통해 친환경 활동을 장려하는 웹 서비스입니다.

> ## 메인 화면

<img width="1216" height="771" alt="메인1" src="https://github.com/user-attachments/assets/6fa7f362-c375-49de-8b9f-dd542da0bd24" />

> ## 프로젝트 소개

&nbsp; 이 프로젝트는 Spring Boot & React 기반의 웝 서비스로,
CRUD, JWT 기반 인증, REST API, 파일 업로드, 공공데이터 API  <br />
활용, 관리자 기능 웹 개발의 전반적인 기능을 구현하고 학습하는 것을 목표로 하였습니다.

> ## 개발 기간

* 2025.11.10 ~ 2025.12.10 (약 4주)
* 개발 인원 총 5명

> ## 주요 기능
>
> ### 메인 ###
> 한국전력공사 ONPEN API

* ### 회원 관리 ###
  * 회원가입 / 로그인 (JWT 인증)
  * 토큰 기반 권한 부여 (일반 사용자 / 관리자)
  * 정보 수정 및 탈퇴
  * 카카오 주소 검색 API를 이용한 주소 입력
  * AccessToken & RefreshToken 관리

* ### 일반 게시판 ###
  * 조회수 / 좋아요 카운트
  * 기본 CRUD
  * 페이징 처리

* ### 인증 게시판 ###
  * 사진 업로드
  * 조회수 / 좋아요 카운트
  * 댓글 CRUD
  * 지도 기반 좌표 저장
  * 썸네일 이미지 처리
  * 페이지 처리

* ### 공지사항 게시판 ###
  * 공지 등록 / 수정 / 삭제
  * 상세 조회 및 목록 페이징
  * 캘린더 API를 이용한 일정 관리
 
*  ### 캠페인 ###
   * 캠페인 생성 / 수정 / 삭제
   * 캠페인 상태 (진행 / 종료 / 삭제) 표시
   * 좋아요 기능

* ### 실시간 대기오염 정보 제공 ###
  * 공공데이터 API 연동
  * 지역·시도별 실시간 대기질 조회
  * 캐싱 및 Rate-limit을 통한 요청 최소화
 
* ### 관리자 페이지 ###
  * 게시글 숨김 / 복구 / 삭제
  * 사용자 상태 관리
  * 공지사항 및 캠페인 등록 및 수정
  * 모든 게시판 관리
  * ROLE_ADMIN 전용 기능
 
> ## 기술 스택
### Frontend
* React
* Node.js
* Bootstrap
* Styled-Components
* Axios

> ## 프로젝트 구조

<img width="214" height="509" alt="프로젝트 구조" src="https://github.com/user-attachments/assets/5d79443c-86f4-4df1-8dac-773868dbf9f6" />

> ## 주요 트러블 슈팅

#### 박수현
* 내용

#### 박세혁
 1. 관리자 로그인 시 라우트 처리
문제점 : 사용자가 관리자 아이디로 로그인했을 경우에만 관리자 페이지에 접근할 수 있어야하나, 비로그인 시에도 관리자 페이지에 접근하는 문제가 발생

해결 시도 1 : 사용자 권한이 없는 경우에도 로그인페이지로 넘어가도록 수정하였으나,
AdminLayout 컴포넌트가 authContext의 사용자 정보를 늦게 불러와 로그인 상태이더라도 처음엔 사용자 권한이 null이어서 관리자도 로그인 페이지로 이동하는 문제가 생겨 해결이 안됨

해결 방법 : 라우터를 감싼 AdminLayout 컴포넌트에서 useState를 사용해 windows.location.pathname으로 현재 URL 경로를 저장한 후 useEffect에 auth.role의존성을 추가하고
사용자 정보를 불러왔을 경우 관리자는 저장한 URL 경로로, 사용자 / 비로그인 의 경우 로그인 페이지로 이동하도록 만들어 해결함.

#### 백준걸
* 내용

#### 최준영
* 내용

#### 현금자
* 내용

> ## 배운점

#### 박수현
* 내용

#### 박세혁
* Axios 요청 및 헤더와 바디 데이터 전송 방식
* Git 협업 방식 및 흐름
* 소셜 로그인 API 활용
* 여러가지 기획방법 및 툴 사용법
* react 컴포넌트 활용에 대한 이해

#### 백준걸
* 내용

#### 최준영
* 내용

#### 현금자
* 내용

> ## 개선 사항

#### 박수현
* 내용

#### 박세혁
* 회원가입 요청 시 비밀번호 재확인 기능 추가
* 카카오 외 타 소셜 로그인 가능하게 로그인 기능 확장
* 유저 및 마이페이지 등 복잡한 컴포넌트 구조 개선
#### 백준걸
* 내용

#### 최준영
* 내용

#### 현금자
* 내용

> ## 팀원 정보


| 이름 | 담당 | GitHub |
|------|------------------------|------------------------------|
| 박수현 (팀장) | 메인페이지 & 캠페인 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/Elinasu001) &nbsp; https://github.com/Elinasu001 |
| 백준걸 | 인증게시판 & 사이드바 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/ajungeul93-rgb) &nbsp; https://github.com/ajungeul93-rgb|
| 최준영 | 공지사항 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/cjysy0104) &nbsp;https://github.com/cjysy0104|
| 현금자 | 일반게시판 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/yoonja486) &nbsp;https://github.com/yoonja486|
| 박세혁 | 회원관리 & 로그인 | [![GitHub](https://img.shields.io/badge/GitHub-000?logo=github&logoColor=white)](https://github.com/Rostreaca) &nbsp;https://github.com/Rostreaca|

> ## 문의
* Email : (누군가의 이메일)
* GitHub Issues 활용
