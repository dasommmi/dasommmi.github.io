#!/bin/bash
# ============================================================
# Jekyll 블로그 – git init / add / commit 스크립트
# 실행: bash /Users/sandy/workspace/blog/setup-git.sh
# ============================================================

set -euo pipefail
BLOG="/Users/sandy/workspace/blog"
cd "$BLOG"

# ─── 1. git init (없으면만) ───
if [ ! -d .git ]; then
  git init
  echo "✅ git init 완료"
else
  echo "ℹ️  .git 폴더 이미 존재 – init 건너뜀"
fi

# ─── 2. remote origin 설정 (없으면만) ───
if ! git remote | grep -q origin; then
  git remote add origin https://github.com/dasommmi/dasommmi.github.io.git
  echo "✅ remote origin 설정 완료"
else
  echo "ℹ️  remote origin 이미 존재"
fi

# ─── 3. git add ───
git add -A
echo "✅ git add -A 완료"

# ─── 4. git status ───
echo ""
echo "===== git status ====="
git status

# ─── 5. git commit ───
git -c user.email="dasommmi@github.com" \
    -c user.name="dasommmi" \
    commit -m "feat: Jekyll 블로그 초기 세팅 (GitHub Pages)

- _config.yml : minima 테마, activities/retro 컬렉션 정의
- index.md, tags.md (/tags/ 페이지)
- _layouts/tags.html : 순수 Liquid 태그 목록 레이아웃
- _posts/2025-01-15-first-post.md : 4컷 & 10컷 형식 예시
- _activities/study-group.md : 활동 컬렉션 샘플
- _retro/2025-01-retro.md : 회고 컬렉션 샘플
- README.md : 블로그 안내문" || echo "ℹ️  커밋할 변경사항 없음"

echo ""
echo "===== git log ====="
git log --oneline

# ─── 6. 생성된 파일 목록 출력 ───
echo ""
echo "===== 블로그 파일 구조 ====="
find . -not -path './.git*' -not -name '.DS_Store' | sort

# ─── 7. 스크립트 자체 삭제 ───
echo ""
echo "✅ setup-git.sh 자동 삭제"
rm -- "$0"

echo ""
echo "🎉 완료! 이제 'git push -u origin main' 으로 배포하면 됩니다."
