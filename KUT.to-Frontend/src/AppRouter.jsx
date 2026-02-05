import React, { Suspense, lazy } from "react";
import { Route, Routes } from "react-router-dom";
import Navbar from "./components/Navbar";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer";
import PrivateRoute from "./PrivateRoute";
import ScrollToTop from "./components/ScrollToTop";

// Lazy Load Components
const LandingPage = lazy(() => import("./components/LandingPage"));
const AboutPage = lazy(() => import("./components/AboutPage"));
const ShortenUrlPage = lazy(() => import("./components/ShortenUrlPage"));
const RegisterPage = lazy(() => import("./components/RegisterPage"));
const LoginPage = lazy(() => import("./components/LoginPage"));
const ForgotPassword = lazy(() => import("./components/ForgotPassword"));
const ResetPassword = lazy(() => import("./components/ResetPassword"));
const DashboardLayout = lazy(() => import("./components/Dashboard/DashboardLayout"));
const ProfilePage = lazy(() => import("./components/Dashboard/ProfilePage"));
const NotFoundPage = lazy(() => import("./components/NotFoundPage"));

const Loader = () => (
  <div className="flex items-center justify-center min-h-screen bg-gray-50">
    <div className="w-12 h-12 border-4 border-purple-200 border-t-purple-600 rounded-full animate-spin"></div>
  </div>
);

const AppRouter = () => {

  const hideHeaderFooter = location.pathname.startsWith("/s");

  return (
    <>
      <ScrollToTop />
      {!hideHeaderFooter && <Navbar />}
      <Toaster position='bottom-center' />
      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/s/:url" element={<ShortenUrlPage />} />

          <Route path="/register" element={<PrivateRoute publicPage={true}><RegisterPage /></PrivateRoute>} />
          <Route path="/login" element={<PrivateRoute publicPage={true}><LoginPage /></PrivateRoute>} />
          <Route path="/forgot-password" element={<PrivateRoute publicPage={true}><ForgotPassword /></PrivateRoute>} />
          <Route path="/reset-password" element={<PrivateRoute publicPage={true}><ResetPassword /></PrivateRoute>} />

          <Route path="/dashboard" element={<PrivateRoute publicPage={false}><DashboardLayout /></PrivateRoute>} />
          <Route path="/profile" element={<PrivateRoute publicPage={false}><ProfilePage /></PrivateRoute>} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
      {!hideHeaderFooter && <Footer />}
    </>
  );
}

export default AppRouter;

export const SubDomainRouter = () => {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route path="/:url" element={<ShortenUrlPage />} />
      </Routes>
    </>
  )
}
