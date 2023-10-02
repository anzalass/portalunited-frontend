import { ToastContainer } from "react-toastify";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";
import HomePage from "./pages/user/HomePage";
import LoginPage from "./pages/user/LoginPage";
import RegisterPage from "./pages/user/RegisterPage";
import DetailArtikel from "./pages/user/DetailArtikel";
import Profile from "./pages/user/Profile";
import CreatePost from "./pages/user/CreatePost";
import { server } from "./server";
import { useEffect, useState } from "react";
import axios from "axios";
import { store } from "./redux/store";
import { loadUser } from "./redux/actions/user";
import EditArtikel from "./pages/user/EditArtikel";
import { useSelector } from "react-redux";
import AllArtikel from "./pages/user/AllArtikel";
import ForgotPassword from "./pages/user/ForgotPassword";
import ResetPassword from "./pages/user/ResetPassword";
import SearchResult from "./pages/user/SearchResult";

function App() {
  const { isAuthenticated } = useSelector((state) => state.user);
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/login"
            element={isAuthenticated ? <HomePage /> : <LoginPage />}
          />
          <Route
            path="/register"
            element={isAuthenticated ? <HomePage /> : <RegisterPage />}
          />
          <Route path="/artikel" element={<AllArtikel />} />
          <Route path="/artikel/:id" element={<DetailArtikel />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/create" element={<CreatePost />} />
          <Route path="/edit/:id" element={<EditArtikel />} />
          <Route path="/reset/" element={<ResetPassword />} />
          <Route path="/forgot" element={<ForgotPassword />} />
          <Route path="/search" element={<SearchResult />} />
        </Routes>
        <ToastContainer
          position="top-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          className={"z-40"}
        />
      </BrowserRouter>
    </>
  );
}

export default App;
