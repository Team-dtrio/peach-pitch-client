## **PEACHPITCH**
PEACHPITCH는 온라인으로 프레젠테이션을 만들고 슬라이드쇼 모드로 발표를 할 수 있는 웹 어플리케이션 입니다.
(배포 링크 추가필요)

## **Table of Contents**
- Introduction
- Tech stack
- Features
- Challenges
- Project timeline
- Our team

## **Intro**
**왜 프레젠테이션 어플리케이션인가?**
저희 팀의 목표는 기존에 ........... 이어적기

## **Tech Stack**
**Client**
- React, React-Query
**Server**
- Node.js, Express.js, MongoDB, Amazon S3  
**Test**
Jest, SuperTest, Cypress
**Deployment**
Netlify, AWS Elastic Beanstalk

## **Feature**

**프레젠테이션 생성 및 내가 만든 프레젠테이션 보기**
  - 로그인 이후, 사용자는 새로운 프레젠테이션을 생성 할 수 있고, 내가 만든 프레젠테이션 파일을 볼 수 있습니다.
 
**프레젠테이션 파일의 편집**
  
  생성
  - 새로운 슬라이드 생성 및 삭제
  - 이미지 업로드 및 삭제 (업로드 된 amazon S3에 저장)
  - 도형 생성 및 삭제
  - 텍스트박스 생성 및 삭제

  편집
  - 이미지, 도형, 텍스트박스의 수정 (내부색, 테두리색, 폰트, 폰트사이즈, 폰트스타일, 폰트정렬)
  - 개체의 z-index 수정

  저장
  - 프레젠테이션, 슬라이드, 개체에 대해서 추가, 수정, 삭제작업이 이뤄질 경우 자동저장

  애니메이션 추가 및 수정
  - 각 개체를 누르고 애니메이션 추가/삭제
  - 슬라이드 내에서의 애니메이션 순서 수정

**슬라이드 쇼**
  - 사용자는 전체 프레젠테이션을 슬라이드 쇼 형식으로 재생할 수 있습니다.
  - 이때 각 슬라이드와 객체는 설정된 순서와 애니메이션 효과에 따라 표시됩니다.

(Toggle List) - **기여도**

클라이언트 (컴포넌트별)
- 기본세팅 : 나영
- 로그인 화면 및 기능 (Login) : 형석
- 메인페이지 화면 및 기능 (Main) : 형석
- 프레젠테이션 편집기능 (Presentation)
  - 슬라이드 장표 (SlideCanvasLayout) : 형석
  - 개체 정의 (Object) : 정우
  - 개체 삽입 (ObjectCreator) : 정우, 형석 공동작업
  - 개체 수정
    -  색 및 폰트 (StyleEditor - ColorEditor, TextEditor) :  정우
    -  z-index (StyleEditor - ArrangeEditor) : 나영
  - 애니메이션 효과추가 및 수정(AnimationEditor) : 나영
  - 슬라이드 네비게이터(SlideNavigator) : 나영
  - 슬라이드 쇼 모드(ScreenShowLayout) : 형석

서버
- 로그인 및 토큰인증 : 나영
- 애니메이션 추가,수정,삭제 : 나영 
- 개체, 슬라이드, 프레젠테이션 추가,수정,삭제 : 정우
- DB Schema : 정우, 나영, 형석 공동작업


## **Challenges and Issues**

**프레젠테이션 앱이 갖고 있어야 할 DB구조는 무엇일까?**
DB구조와 설계

**개체들의 상태와 DB를 동시에 관리하기 위해서는 어떻게 해야할까?**
React query 와 Context API

**개체들은 좌표는 어떻게 설정하고, 크기 조절을 할 수 있을까?**
개체의 크기조절과 좌표의 설정

**라이브러리 없이 생동감 있는 슬라이드쇼 애니메이션을 구현 할 수 있는 방법은 무엇인가?**
애니메이션의 구현 (CSS animation / keyframes의 활용)

**contenteditable을 이용하면서 나타난 오류**



## **Project Timeline**
프로젝트 기간 : 2023.07.10 ~ 2023.08.04 (총 25일)

**기획 및 설계 (10일)**
- 아이디어 수집
- Figma를 사용한 Mockup 제작
- 기술 스택 선정
- Git 작업 플로우 및 코드 컨벤션, 커밋 룰 등 팀 협업 규칙 정립
- MongoDB Schema 설계

**기능 개발 및 테스트코드 작성 (15일)**
- 클라이언트 기능 구현
- 백엔드 서버 구현
- 테스트 코드
- 팀 프로젝트 발표 준비 및 발표
- 리드미 작성
- 배포

## **Our Team**
- 문형석 : 
- 곽나영 : ny931118@gmail.com
- 김정우 : kjw5757@gmail.com
