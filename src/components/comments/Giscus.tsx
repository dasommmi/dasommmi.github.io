import React, { useEffect, useRef, useState } from 'react';
import { useTheme } from '@/context/ThemeContext';
import './Giscus.css';

interface GiscusProps {
  repo: string; // "username/repo-name"
  repoId: string; // GitHub repo ID
  category: string; // Discussion 카테고리명
  categoryId: string; // Discussion 카테고리 ID
}

const Giscus: React.FC<GiscusProps> = ({ repo, repoId, category, categoryId }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  const [isLoaded, setIsLoaded] = useState(false);
  const [tooltipOpen, setTooltipOpen] = useState(false);

  useEffect(() => {
    if (!containerRef.current) return;

    const container = containerRef.current;
    
    // 기존 giscus 제거
    while (container.firstChild) {
      container.removeChild(container.firstChild);
    }

    setIsLoaded(false);

    // giscus script 생성
    const script = document.createElement('script');
    script.src = 'https://giscus.app/client.js';
    script.async = true;
    script.crossOrigin = 'anonymous';
    
    // 필수 설정
    script.setAttribute('data-repo', repo);
    script.setAttribute('data-repo-id', repoId);
    script.setAttribute('data-category', category);
    script.setAttribute('data-category-id', categoryId);
    script.setAttribute('data-mapping', 'pathname');
    script.setAttribute('data-strict', '0');
    script.setAttribute('data-reactions-enabled', '0'); // 반응 비활성화
    script.setAttribute('data-emit-metadata', '0');
    script.setAttribute('data-input-position', 'top');
    // 테마 설정 변경 - 더 나은 투명 테마 사용
    script.setAttribute('data-theme', theme === 'dark' ? 'dark_dimmed' : 'light');
    script.setAttribute('data-lang', 'ko');
    script.setAttribute('data-loading', 'lazy');
    
    // 로딩 완료 감지 및 배경색 수정
    script.onload = () => {
      setTimeout(() => {
        setIsLoaded(true);
        
        // iframe 내부 스타일 강제 적용
        const iframe = container.querySelector('iframe.giscus-frame') as HTMLIFrameElement;
        if (iframe) {
          try {
            const iframeDoc = iframe.contentDocument || iframe.contentWindow?.document;
            if (iframeDoc) {
              // 배경색 강제 변경
              const style = iframeDoc.createElement('style');
              style.textContent = `
                body {
                  background: transparent !important;
                }
                .gsc-main {
                  background: transparent !important;
                }
              `;
              iframeDoc.head.appendChild(style);
            }
          } catch (e) {
            // CORS 정책으로 접근 불가할 수 있음
            console.log('iframe 스타일 수정 불가 (CORS)');
          }
        }
      }, 500);
    };
    
    container.appendChild(script);
  }, [repo, repoId, category, categoryId, theme]);

  // 툴팁 외부 클릭 감지
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      if (!target.closest('.info-tooltip-wrapper')) {
        setTooltipOpen(false);
      }
    };

    if (tooltipOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [tooltipOpen]);

  return (
    <div className="comments-section">
      <div className="comments-header">
        <div className="comments-title-wrapper">
          <div className="comments-title">
            <span className="comments-icon">💬</span>
            <h2>댓글</h2>
          </div>
          
          {/* 정보 툴팁 */}
          <div className="info-tooltip-wrapper">
            <button 
              className="info-icon" 
              aria-label="댓글 안내"
              onClick={() => setTooltipOpen(!tooltipOpen)}
            >
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5"/>
                <path d="M10 14V10M10 6H10.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </button>
            <div className={`info-tooltip ${tooltipOpen ? 'open' : ''}`}>
              <div className="tooltip-content">
                <p className="tooltip-title">💡 댓글 안내</p>
                <ul className="tooltip-list">
                  <li>GitHub 계정으로 로그인</li>
                  <li>답글, 수정/삭제 지원</li>
                </ul>
                <a 
                  href={`https://github.com/${repo}/discussions`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="tooltip-link"
                >
                  GitHub Discussions →
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className={`giscus-wrapper ${isLoaded ? 'loaded' : 'loading'}`}>
        {!isLoaded && (
          <div className="giscus-loading">
            <div className="loading-spinner"></div>
            <p>댓글을 불러오는 중...</p>
          </div>
        )}
        <div ref={containerRef} className="giscus" />
      </div>
    </div>
  );
};

export default Giscus;
