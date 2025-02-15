import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TodoMain from "./components/TodoMain";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login"; // ✅ Import Login Page
import useAuth from "./hooks/useAuth"; // ✅ Import Auth Hook
import "./style/App.css";

function App() {
  const isAuthenticated = useAuth(); // ✅ Check if user is logged in

  return (
    <Router>
      <div className="app-wrapper">
        <header>
          <Navbar />
        </header>
        <main style={{ paddingTop: "80px" }}>
          <Routes>
            {/* ✅ Public Route for Login */}
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />

            {/* ✅ Protected Route for To-Do List */}
            <Route
              path="/"
              element={isAuthenticated ? <TodoMain /> : <Navigate to="/login" />}
            />

            {/* ✅ Redirect unknown routes to login */}
            <Route path="*" element={<Navigate to={isAuthenticated ? "/" : "/login"} />} />
          </Routes>
        </main>
        <footer>
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
