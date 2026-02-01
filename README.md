# dasommmi's blog

Jekyll 기반 개인 블로그 — GitHub Pages로 배포됩니다.

## 배포 URL

<https://dasommmi.github.io>

## 구조 한눈에 보기

| 폴더 | 역할 |
|---|---|
| `_posts/` | 블로그 포스팅 (날짜-제목.md) |
| `_activities/` | 활동 기록 컬렉션 |
| `_retro/` | 회고(retrospective) 컬렉션 |
| `_layouts/` | 커스텀 레이아웃 |
| `tags.md` | 태그 목록 페이지 (`/tags/`) |

## 로컬 빌드 (선택사항)

```bash
gem install bundler jekyll
bundle exec jekyll serve
# → http://localhost:4000
```

## 새 글 작성

```bash
# posts 폴더에 아래 형식으로 파일 생성
_posts/YYYY-MM-DD-제목.md
```
