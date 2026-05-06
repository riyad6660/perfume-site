/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./components/layout/Navbar";
import Footer from "./components/layout/Footer";
import Home from "./pages/Home";
import { Suspense, lazy } from "react";
import { AuthProvider } from "./hooks/useAuth";

// Lazy load pages for better bundle size
const Shop = lazy(() => import("./pages/Shop"));
const ProductDetail = lazy(() => import("./pages/ProductDetail"));
const Quiz = lazy(() => import("./pages/Quiz"));
const Loyalty = lazy(() => import("./pages/Loyalty"));
const Journal = lazy(() => import("./pages/Journal"));

// Admin lazy loads (will be built later)
const AdminDashboard = lazy(() => import("./admin/Dashboard"));

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <Suspense fallback={
            <div className="h-screen flex items-center justify-center">
              <div className="w-12 h-12 border-t-2 border-rose rounded-full animate-spin"></div>
            </div>
          }>
            <Routes>
              {/* Frontend Routes */}
              <Route path="/" element={<Home />} />
              <Route path="/shop" element={<Shop />} />
              <Route path="/product/:id" element={<ProductDetail />} />
              <Route path="/oracle" element={<Quiz />} />
              <Route path="/loyalty" element={<Loyalty />} />
              <Route path="/journal" element={<Journal />} />

              {/* Admin Routes (Simplified for now) */}
              <Route path="/admin/*" element={<AdminDashboard />} />

              {/* Catch all */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </Router>
  </AuthProvider>
  );
}
