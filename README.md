<div align="center">
  <img
  src="https://github.com/dltkddnjs/coworking-space-management/assets/68457677/520c877f-3297-4e64-8e0a-59a1813728cb" alt="logo"
  width="200" />

## 오피스 현황 대시보드

오피스별 정보를 통계와 표로 수치화한 대시보드 미니 프로젝트입니다.
</div>

<br/>

## DEMO
[데모사이트 바로가기](https://coworking-space-management-dltkddnjs.vercel.app/branch)


<br/>

## 기술 스택

<img src="https://github.com/dltkddnjs/coworking-space-management/assets/68457677/49b6e542-5c40-4ac4-8016-19e44d0aab80" alt="image" width="500" align="center" />

<br/>

**Next.js**

단순 정보성 페이지이며 동적으로 데이터들이 변경될 일이 없다고 판단하여 SSG 렌더링 방식을 선택하여 접속시 초기 로딩 속도를 빠르게 해주었고 빌드 시 pre-rendering을 하여 페이지 요청 시 웹 서버에서 페이지를 생성하는 부하를 줄였습니다.

**TypeScript**

함수나 객체에 들어가는 구조에 타입을 정의함으로써 인자나 프로퍼티의 자동완성으로 개발 진행할 때 편의성을 얻었습니다. 또한 함수, 객체의 값들을 실행 전에 타입이 틀린 부분을 발견하여 실행 후 에러를 방지했습니다.

**Ant Design**

컴포넌트 UI 라이브러리를 활용해 인터페이스 개발을 빠르게 하였습니다. 또한 대시보드 페이지에 잘 어울리는 무난하고 깔끔한 디자인을 가지고 있어서 사용했습니다.

**Vercel**

Next.js로 빌드한 프로젝트에 최적화된 Vercel을 이용하여 배포를 하면서 간소화된 배포 프로세스를 경험하였습니다. 대시보드가 사용자 친화적이였고 무료 SSL/TLS 인증서를 제공받아 자동으로 HTTPS를 적용할 수 있었습니다. CI/CD 또한 자동으로 적용되어 연결된 Git Repository에 Commit이 일어나면 빌드와 배포 자동화를 해주어 굉장히 편리했습니다.

<br/>

## 구현사항

- Vercel을 이용한 프로젝트 배포
- 다양한 브라우저 환경 및 사이즈 대응한 UI 개발
- 테이블 컴포넌트 Pagination
- JSON 타입의 더미데이터를 만들어 Next.js의 API Routes 기능을 활용해 REST API 생성
- REST API를 수신하여 데이터가 적절하게 렌더링 될 수 있도록 프론트엔드단에서 데이터 가공
- 페이지 새로고침 시에 발생하는 FOUC 현상 해결
- Context API를 활용한 전역상태관리
