import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Users from "./pages/User";
import Artists from "./pages/Artist";
import ProtectedLayout from "./components/ProtectedLayout";
import PublicLayout from "./components/PublicLayout";
import "antd/dist/reset.css";
import CreateUser from "./pages/CreateUser";
import CreateArtist from "./pages/CreateArtist";
import Music from "./pages/Music";

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route element={<PublicLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Route>

        {/* Protected Routes */}
        <Route element={<ProtectedLayout />}>
          <Route path="/" element={<Users />} />
          <Route path="/users/create" element={<CreateUser />} />
          <Route path="/artists" element={<Artists />} />
          <Route path="/artists/create" element={<CreateArtist />} />
          <Route path="/music/:artistId" element={<Music />} />
        </Route>

        {/* 404 Not Found */}
        <Route
          path="*"
          element={
            <div className="flex justify-center items-center min-h-screen w-100">
              <h1 className="text-red-white">404 page not found!</h1>
            </div>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
