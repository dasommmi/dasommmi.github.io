import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ThemeProvider } from "@/context/ThemeContext";

import Header     from "@/components/Header";
import Sidebar    from "@/components/Sidebar";
import AppRoutes  from "@/routes";

import "@/styles/theme.css";
import "@/styles/global.css";

const App: React.FC = () => (
  <ThemeProvider>
    <BrowserRouter>
      <Header />
      <div className="layout-wrapper">
        <Sidebar />
        <main className="main-content">
          <AppRoutes />
        </main>
      </div>
    </BrowserRouter>
  </ThemeProvider>
);

export default App;
