import logo from "./logo.svg";
import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { useSelector } from "react-redux";

function App() {
  const { isLogin } = useSelector((state) => state.flightReducer);
  return (
    <>
      <BrowserRouter>
        <Routes>
          {!isLogin ? (
            <>
              <Route path="/" element={<Login />} />
              <Route path="*" element={<Navigate to={"/"} replace />} />
            </>
          ) : (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/" element={<Navigate to={"/profile"} replace />} />
            </>
          )}
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
