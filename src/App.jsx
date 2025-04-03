import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Articles from "./pages/Articles";

import Signin from "./pages/Signin";
import Signup from "./pages/Signup";
import Header from "./components/Header";
import Footer from "./components/Footer";
import UnAuthenticatedRoutes from "./components/UnAuthenticatedRoutes";
import ProtectedRoute from "./components/ProtectedRoute";
import Profile from "./pages/Profile";
import { Toaster } from "react-hot-toast";
import ArticleEditorPage from "./pages/ArticleEditorPage";
import MyArticles from "./pages/MyArticles";
import ArticleDetails from "./pages/ArticleDetails";

function App() {
  return (
    <div className="flex flex-col min-h-screen w-full">
      <Header />
      <main className="flex-grow w-full">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<Articles />} />

          {/* protected Routes */}
          <Route path="/myArticles" 
          element={
            <ProtectedRoute>
                 <MyArticles />
            </ProtectedRoute>
       
          } 
          />
           {/* protected Routes */}
           <Route path="/article/:id" 
          element={
            <ProtectedRoute>
                 <ArticleDetails />
            </ProtectedRoute>
       
          } 
          />
          <Route path="/editor" 
          element={
            <ProtectedRoute>
              <ArticleEditorPage />
            </ProtectedRoute>
          
          } 
          />
           <Route path="editor/:id" 
          element={
            <ProtectedRoute>
              <ArticleEditorPage />
            </ProtectedRoute>
          
          } 
          />
          <Route path="/profile" 
          element={
            <ProtectedRoute>
              <Profile />
            </ProtectedRoute>
          
          } 
          />
          {/* Authenticated Route */}
          <Route path="/signin" 
          element={
            <UnAuthenticatedRoutes>
              <Signin />
            </UnAuthenticatedRoutes>
            } />
          <Route path="/signup" 
          element={
            <UnAuthenticatedRoutes>
              <Signup />
            </UnAuthenticatedRoutes>
          
          } />
        </Routes>
      </main>
      <Footer />
      <Toaster />
    </div>
  );
}

export default App;
