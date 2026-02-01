/**
 * ComicSlideContainer.tsx
 *
 * PostDetail에서 MDX 본문의 children을 순회하며
 * <ComicSlide /> 타입의 요소들을 모아서 이 컨테이너에 전달합니다.
 *
 * 레이아웃:
 *   - 모바일 (< 768px) : 가로 스와이프 (Swiper)
 *   - 웹    (≥ 768px) : 세로 카드 나열
 *
 * props:
 *   slides: Array<{ title, body, image? }>
 *   accentColor?: string (기본 #4E68D1)
 */

import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css";
import { Pagination } from "swiper/modules";
import type { ComicSlideProps } from "@/components/ComicSlide";
import "./ComicSlideContainer.css";

interface ComicSlideContainerProps {
  slides: ComicSlideProps[];
  accentColor?: string;
}

const ComicSlideContainer: React.FC<ComicSlideContainerProps> = ({
  slides,
  accentColor = "#4E68D1",
}) => {
  const [currentMobile, setCurrentMobile] = useState(0);
  const isLast = (idx: number) => idx === slides.length - 1;

  // ─── 단일 카드 렌더 (공유) ───
  const renderCard = (slide: ComicSlideProps, idx: number) => (
    <div
      className="comic-card"
      key={idx}
      style={{ "--comic-accent": accentColor } as React.CSSProperties}
    >
      {/* 컷 번호 배지 */}
      <span className="comic-card__num">
        컷 {idx + 1}
      </span>

      {/* 이미지 (있으면) */}
      {slide.image && (
        <div className="comic-card__img-wrap">
          <img src={slide.image} alt={slide.title} />
        </div>
      )}

      {/* 타이틀 + 본문 */}
      <div className="comic-card__content">
        <h3 className="comic-card__title">{slide.title}</h3>
        <p  className="comic-card__body">{slide.body}</p>
      </div>

      {/* 마지막 컷에 "끝" 배지 */}
      {isLast(idx) && (
        <span className="comic-card__end">끝</span>
      )}
    </div>
  );

  return (
    <section className="comic-container">
      {/* ─── 웹 레이아웃 (≥768px) — CSS로 분기, 여기서는 둘 다 렌더 ─── */}
      <div className="comic-container__web">
        {slides.map((slide, idx) => renderCard(slide, idx))}
      </div>

      {/* ─── 모바일 레이아웃 (<768px) — Swiper ─── */}
      <div className="comic-container__mobile">
        <Swiper
          modules={[Pagination]}
          spaceBetween={16}
          slidesPerView={1}
          pagination={{ clickable: true }}
          onSlideChange={(swiper) => setCurrentMobile(swiper.activeIndex)}
          className="comic-swiper"
        >
          {slides.map((slide, idx) => (
            <SwiperSlide key={idx}>
              {renderCard(slide, idx)}
            </SwiperSlide>
          ))}
        </Swiper>

        {/* 현재 컷 / 총 컷 표시 */}
        <div className="comic-container__counter">
          {currentMobile + 1} / {slides.length}
        </div>
      </div>
    </section>
  );
};

export default ComicSlideContainer;
