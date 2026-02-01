# dasommmi's blog – Aim Higher

React + Vite + TypeScript + MDX 기반 개인 블로그 — GitHub Pages로 배포됩니다.

## 배포 URL

<https://dasommmi.github.io>

---

## 프로젝트 구조

```
src/
├── components/          # 공유 컴포넌트
│   ├── Header.tsx       # 상단 헤더 (검색, GitHub, LinkedIn, 다크모드 토글)
│   ├── Sidebar.tsx      # 왼쪽 고정 사이드바 (Activity / Retro / Posts)
│   ├── ThemeToggle.tsx  # 라이트 ↔ 다크 테마 토글
│   ├── ComicSlide.tsx   # 만화형 슬라이드 (Swiper 사용)
│   └── ComicSlideContainer.tsx
├── context/
│   └── ThemeContext.tsx  # 다크모드 컨텍스트 + localStorage 퍼시스턴스
├── data/
│   ├── posts/           # 📝 포스트 MDX 파일 (폴더별 관리)
│   ├── activity/        # ⚡ 활동 MDX 파일
│   └── retro/           # 🔄 회고 MDX 파일
├── hooks/
│   └── useContentLoader.ts  # MDX 파일 동적 로드 훅
├── pages/               # 페이지 컴포넌트
│   ├── Home.tsx         # /  (홈)
│   ├── Activity.tsx     # /activity
│   ├── Retro.tsx        # /retro
│   ├── Posts.tsx        # /posts (목록)
│   ├── PostDetail.tsx   # /posts/:slug (단일 포스트)
│   └── Tags.tsx         # /tags (태그 클라우드 + 필터)
├── styles/
│   ├── theme.css        # CSS 변수 (라이트/다크 테마)
│   └── global.css       # 글로벌 리셋 + 타이포그래피 + Swiper CSS
├── App.tsx              # 루트 컴포넌트 (라우터 + ThemeProvider)
├── main.tsx             # React DOM 엔트리
├── routes.tsx           # React Router 경로 정의
└── vite-env.d.ts        # MDX 타입 정의
```

---

## 로컬 개발

```bash
# 의존성 설치
yarn install

# 개발 서버 시작
yarn dev        # http://localhost:5173
```

## 프로덕션 빌드

```bash
yarn build      # → dist/ 폴더 생성
yarn preview    # 빌드 결과 미리보기
```

---

## GitHub Pages 배포

`.github/workflows/deploy.yml`이 설정되어 있어서 `main` 브랜치에 푸시하면 자동으로 배포됩니다.

Repository Settings → Pages → Source: **GitHub Actions**로 설정되어 있어야 합니다.

---

## 블로그 콘텐츠 추가

### 새 포스트 작성

1. `src/data/posts/` 폴더에 새 폴더 생성 (예: `my-new-post/`)
2. 해당 폴더에 `my-new-post.mdx` 파일 생성
3. frontmatter + 본문 작성:

```mdx
---
title: "새 포스트 제목"
date: "2026-02-10"
tags: ["태그1", "태그2"]
category: "카테고리"
summary: "간단한 요약 (선택사항)"
---

# 본문 시작

마크다운으로 자유롭게 작성...

## 만화형 슬라이드 사용 예시

import ComicSlideContainer from "@/components/ComicSlideContainer";

<ComicSlideContainer slides={[
  { title: "슬라이드 1", content: "내용 1", image: "/path/to/image1.jpg" },
  { title: "슬라이드 2", content: "내용 2", image: "/path/to/image2.jpg" },
]} />
```

### 활동/회고 작성

- `src/data/activity/` 또는 `src/data/retro/` 폴더에 동일한 형식으로 MDX 파일 생성

---

## 주요 기능

- ✅ MDX 기반 콘텐츠 관리 (frontmatter + 동적 import)
- ✅ Swiper 기반 만화형 슬라이드 (ComicSlideContainer)
- ✅ 다크모드 (localStorage 퍼시스턴스)
- ✅ 태그 시스템 (클라우드 + 필터링)
- ✅ 반응형 디자인
- ✅ GitHub Pages 자동 배포

---

## 기술 스택

- **프레임워크**: React 18 + TypeScript
- **빌드**: Vite 6
- **라우팅**: React Router 6
- **콘텐츠**: MDX 3 (frontmatter 지원)
- **슬라이더**: Swiper 11
- **배포**: GitHub Pages (Actions)
