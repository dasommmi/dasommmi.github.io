/**
 * Utterances.tsx
 *
 * GitHub Issues 기반 댓글 컴포넌트 (utterances)
 *
 * 설정값은 아래 상수를 직접 수정하면 됨:
 *   UTTERANCES_REPO  : "유저명/레포명"
 *   ISSUE_TERM       : "pathname" | "title" | "og:title" | "title and pathname"
 *   LABEL            : GitHub Issue에 붙을 라벨 (레포에서 미리 생성해야 함)
 *   THEME            : "light-theme" | "dark-theme" | "preferred-color-scheme"
 */

import React, { useEffect, useRef } from "react";
import { useTheme } from "@/context/ThemeContext";

// ── 설정값 (나중에 자유롭게 수정 가능) ──────────────
const UTTERANCES_REPO  = "dasommmi/dasommmi.github.io"; // ← 레포 주소 (유저명/레포명)
const ISSUE_TERM       = "pathname";                     // ← issue 매칭 기준
const LABEL            = "💬 댓글";                       // ← GitHub Issue 라벨 (선택사항, 빈 문자열이면 라벨 안 붙음)
// THEME은 현재 다크모드 상태에 따라 동적으로 결정됨

const Utterances: React.FC = () => {
  const { theme } = useTheme();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // 기존 utterances iframe이 있으면 제거 (테마 전환 시 다시 로드)
    if (containerRef.current) {
      containerRef.current.innerHTML = "";
    }

    const script = document.createElement("script");
    script.src        = "https://utterances.es/client.js";
    script.setAttribute("data-repo",       UTTERANCES_REPO);
    script.setAttribute("data-issue-term", ISSUE_TERM);
    if (LABEL) script.setAttribute("data-label", LABEL);
    script.setAttribute("data-theme",      theme === "dark" ? "dark-theme" : "light-theme");
    script.setAttribute("data-crossorigin","anonymous");
    script.async = true;

    containerRef.current?.appendChild(script);

    return () => {
      // 클린업: 컴포넌트 unmount 시 스크립트 제거
      if (containerRef.current) {
        containerRef.current.innerHTML = "";
      }
    };
  }, [theme]); // theme 변경 시 재로드

  return (
    <div className="utterances-wrap" ref={containerRef} />
  );
};

export default Utterances;
