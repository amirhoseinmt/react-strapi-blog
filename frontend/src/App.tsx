import { Routes, Route } from "react-router-dom";
import PublicLayout from "./layouts/PublicLayout";
import DashboardLayout from "./layouts/DashboardLayout";
import AdminLayout from "./layouts/AdminLayout";

import HomePage from "./pages/public/HomePage";
import PostsPage from "./pages/public/PostsPage";
import PostDetailPage from "./pages/public/PostDetailPage";
import LoginPage from "./pages/public/LoginPage";
import RegisterPage from "./pages/public/RegisterPage";

import DashboardHomePage from "./pages/dashboard/DashboardHomePage";
import DashboardPostsPage from "./pages/dashboard/DashboardPostsPage";
import DashboardPostEditPage from "./pages/dashboard/DashboardPostEditPage";

import AdminHomePage from "./pages/admin/AdminHomePage";
import AdminUsersPage from "./pages/admin/AdminUsersPage";

function App() {
  return (
    <>
      <Routes>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/posts" element={<PostsPage />} />
          <Route path="/posts/:slug" element={<PostDetailPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
        </Route>

        {/* Dashboard */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<DashboardHomePage />} />
          <Route path="/dashboard/posts" element={<DashboardPostsPage />} />
          <Route
            path="/dashboard/posts/:slug/edit"
            element={<DashboardPostEditPage />}
          />
        </Route>

        {/* Admin */}
        <Route element={<AdminLayout />}>
          <Route path="/admin" element={<AdminHomePage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
