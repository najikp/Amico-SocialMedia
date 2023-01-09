import "./App.css";
import Auth from "./pages/Auth/Auth";
import Home from "./pages/home/Home";
import Profile from "./pages/home/Profile/Profile";
import { Route, Routes, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Chat from "./pages/Chat/Chat";
import AdminAuth from "./pages/Auth/AdminAuth";
import Forgot from "./pages/Auth/Forgot";
import Admin from "./pages/Admin/Admin";

function App() {
  const user = useSelector((state) => state.authReducer.authData);
  const admin = useSelector((state) => state.adminAuthReducer.adminAuthData);
  return (
    <div className="App">
      <div className="blur" style={{ top: "-18%", right: "0" }}></div>
      <div className="blur" style={{ top: "36%", left: "-8rem" }}></div>
      <Routes>
        <Route
          path="/"
          element={user ? <Navigate to="home" /> : <Navigate to="auth" />}
        />
        <Route
          path="/auth/forgot-pass"
          element={user ? <Navigate to='home' /> : <Forgot />}
        />

        <Route
          path="/home"
          element={user ? <Home /> : <Navigate to="../auth" />}
        />

        <Route
          path="/auth"
          element={user ? <Navigate to="../home" /> : <Auth />}
        />

        <Route
          path="/profile/:id"
          element={user ? <Profile /> : <Navigate to="../auth" />}
        />
        <Route path="/chat" element={user ? <Chat /> : <Navigate to='../auth' />} />

        {/* Admin Routes */}

        <Route path="/auth-admin"
          element={admin ? <Navigate to='/admin' /> : <AdminAuth />}
        />

        <Route
          path="/admin"
          element={admin ? <Admin /> : <Navigate to='/auth-admin' />}
        />
      </Routes>
    </div>
  );
}

export default App;
