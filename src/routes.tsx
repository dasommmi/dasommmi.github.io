import React from "react";
import { Routes, Route } from "react-router-dom";

import Home       from "@/pages/Home";
import Activity   from "@/pages/Activity";
import Retro      from "@/pages/Retro";
import Posts      from "@/pages/Posts";
import Tags       from "@/pages/Tags";
import PostDetail from "@/pages/PostDetail";

const AppRoutes: React.FC = () => (
  <Routes>
    <Route path="/"              element={<Home />}       />
    <Route path="/activity"      element={<Activity />}   />
    <Route path="/retro"         element={<Retro />}      />
    <Route path="/posts"         element={<Posts />}      />
    <Route path="/posts/:slug"   element={<PostDetail />} />
    <Route path="/tags"          element={<Tags />}       />
    <Route path="*"              element={<Home />}       />
  </Routes>
);

export default AppRoutes;
