import React from "react";
import { NavLink } from "react-router-dom";

interface NavItem {
  to: string;
  label: string;
  icon: string;
}

const NAV_ITEMS: NavItem[] = [
  { to: "/activity",   label: "Activity",   icon: "⚡" },
  { to: "/retro",      label: "Retro",      icon: "🔄" },
  { to: "/posts",      label: "Posts",      icon: "📝" },
  { to: "/playground", label: "Playground", icon: "🕹️" },
  { to: "/tags", label: "Tags", icon: "🏷️️" },
];

const Sidebar: React.FC = () => (
  <nav className="sidebar" aria-label="메인 네비게이션">
    <ul className="sidebar__list">
      {NAV_ITEMS.map((item) => (
        <li key={item.to} className="sidebar__item">
          <NavLink
            to={item.to}
            className={({ isActive }) =>
              "sidebar__link" + (isActive ? " sidebar__link--active" : "")
            }
          >
            <span className="sidebar__icon">{item.icon}</span>
            <span className="sidebar__label">{item.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  </nav>
);

export default Sidebar;
