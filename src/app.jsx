import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { firebaseAuth } from "./firebase";
import Main from "./routes/main/pages/main";
import Signup from "./routes/login/pages/signup";
import Login from "./routes/login/pages/login";

export default function App() {
  firebaseAuth.onAuthStateChanged((user) => {
    if (user) {
      sessionStorage.setItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]", JSON.stringify(user));
    }
  });

  const isLoggedIn = sessionStorage.getItem("firebase:authUser:" + process.env.REACT_APP_API_KEY + ":[DEFAULT]");

  return (
    <BrowserRouter>
      <Routes>
        {isLoggedIn && <Route path="/" element={<Main />} />}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </BrowserRouter>
  );
}
