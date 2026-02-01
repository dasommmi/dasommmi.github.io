/**
 * ComicSlide.tsx
 *
 * MDX 안에서 이렇게 사용:
 *   <ComicSlide title="상황" body="첫 컷 내용" image="/images/..." />
 *
 * 여러 개의 <ComicSlide />를 연속으로 쓰면 자동으로 감지하여
 * ComicSlideContainer가 감싸서 렌더링합니다.
 *
 * ─────────────────────────────────────────────
 * 이 파일은 "단일 컷 데이터를 받는 컴포넌트"입니다.
 * 실제 만화형 레이아웃(가로 스와이프 / 세로 그리드)은
 * ComicSlideContainer.tsx에서 처리합니다.
 * ─────────────────────────────────────────────
 */

import React from "react";

export interface ComicSlideProps {
  title: string;
  body: string;
  image?: string;
}

/**
 * MDX에서 사용되는 컴포넌트.
 * 직접 렌더링되지 않고, PostDetail에서 children을 순회하며
 * ComicSlide 타입의 자식을 모아서 ComicSlideContainer로 전달합니다.
 *
 * 만약 ComicSlideContainer 밖에서 단독으로 쓰이는 경우에도
 * 단일 카드로 렌더링되도록 fallback 있음.
 */
const ComicSlide: React.FC<ComicSlideProps> = ({ title, body, image }) => (
  <div className="comic-slide-single">
    {image && <img src={image} alt={title} className="comic-slide-single__img" />}
    <h3 className="comic-slide-single__title">{title}</h3>
    <p className="comic-slide-single__body">{body}</p>
  </div>
);

ComicSlide.displayName = "ComicSlide";

export default ComicSlide;
