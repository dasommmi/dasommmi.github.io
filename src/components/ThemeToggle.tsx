import React from "react";
import { useTheme } from "@/context/ThemeContext";

const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === "light" ? "다크모드로 전환" : "라이트모드로 전환"}
      title={theme === "light" ? "다크모드" : "라이트모드"}
    >
      <span className="theme-toggle__icon">{theme === "light" ? "🌙" : "☀️"}</span>
    </button>
  );
};

export default ThemeToggle;
