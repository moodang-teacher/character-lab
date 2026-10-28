# 캐릭터 연구소 운영·배포 결정

기록일: 2026-10-28

## 결정한 방향

- 소스 코드는 GitHub 저장소에서 관리하고, 웹사이트는 GitHub Pages에 배포한다.
- 학생의 기획 내용과 프롬프트를 서버에 저장하지 않는다. 따라서 별도 데이터베이스를 사용하지 않는다.
- 선생님 로그인과 선생님 전용 화면은 두지 않는다.
- 학생에게 전화번호를 받지 않는다.
- 학생은 브라우저에서 캐릭터 특징을 선택하고 이미지·영상 프롬프트를 만든 뒤, 내용을 직접 수정하거나 복사할 수 있다.
- 이미지·영상 생성 API는 연결하지 않는다. 생성된 프롬프트를 외부 도구에서 사용하는 방식이다.

## 현재 코드와 달라지는 점

이전 버전은 Cloudflare Workers/Vinext 환경에서 동작했으며, D1에 `classes`(수업)와 `submissions`(제출물)를 저장했다. `/api/classroom`은 수업 생성, 참여 코드 확인, 학생 기획 제출, 교사용 조회를 처리했다. 교사용 조회와 수업 생성에는 ChatGPT 로그인 헤더를 사용했다.

GitHub Pages에 맞춰 아래 기능과 의존성을 앱에서 제거했다.

- 수업 생성, 8자리 참여 코드, 코드로 참여하기
- 학생 기획 제출 및 서버 저장
- 선생님 공간, 제출 목록 조회·검색, CSV 내보내기
- `/api/classroom`, D1 스키마·마이그레이션·바인딩, ChatGPT 로그인 처리
- Cloudflare Workers/Vinext 배포 설정을 전제로 한 실행 방식

학생용 캐릭터 기획 단계, 프롬프트 조합·수정·복사, 화면 디자인은 정적 사이트에 맞게 유지했다. 별도 참여 절차 없이 시작할 수 있다.

## 현재 구현 상태

- React + Vite 정적 앱으로 전환했다. `npm install` 후 `npm run dev`로 로컬 실행, `npm run build`로 배포용 `dist/` 생성이 가능하다.
- 모습에는 사람과 직접 작성, 성격·소품·반전 매력에는 직접 작성, 대표 색상에는 컬러 피커를 제공한다. 동작도 직접 작성할 수 있으며 이미지 스타일은 정해진 선택지만 제공한다.
- 입력 내용은 브라우저의 현재 화면 상태에만 있으며 서버나 브라우저 저장소에 기록하지 않는다. 새로고침하면 사라진다.
- 기존 Cloudflare 스타터의 일부 미사용 파일은 로컬에 남아 있으나 `.gitignore`로 Git 저장소와 빌드에서 제외한다.
- 로컬 TypeScript 검사와 정적 빌드를 통과했다.

## 배포 상태

- GitHub 저장소: https://github.com/moodang-teacher/character-lab
- 공개 사이트: https://moodang-teacher.github.io/character-lab/
- `main` 브랜치에 푸시하면 `.github/workflows/deploy-pages.yml`이 Vite 정적 빌드를 실행하고 `dist/`를 GitHub Pages에 배포한다.
- Pages 게시 방식은 GitHub Actions로 설정했다. 배포 HTML의 JS·CSS 경로와 JS 응답을 확인했다.

처음에는 Pages가 `main`의 원본 `index.html`을 그대로 제공해 빈 화면이 발생했다. 빌드 결과물 배포로 전환해 해결했다.
