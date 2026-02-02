import React from "react";
import { Link } from "react-router-dom";

const Retro: React.FC = () => {

  return (
    <div className="playground">
      <h1 className="page-title">🕹️ Playground</h1>
        <Link to={`/playground/markdown`} className="posts__item card">
            <h2 className="posts__title">✨ Markdown Editor</h2>
            <p className="posts__preview">내가 쓰려고 만든 마크다운 에디터</p>
        </Link>
    </div>
  );
};

export default Retro;
