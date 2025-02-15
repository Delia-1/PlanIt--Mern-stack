import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import TodoMain from "./components/TodoMain";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Login from "./pages/Login";
import useAuth from "./hooks/useAuth";
import "./style/App.css";

function App() {
  const isAuthenticated = useAuth();

  if (isAuthenticated === null) {
    return <p>Loading...</p>; // ✅ Prevents redirect loop while checking auth
  }

  return (
    <Router>
      <div className="app-wrapper">
        <header>
          <Navbar />
        </header>
        <main style={{ paddingTop: "80px" }}>
          <Routes>
            <Route path="/login" element={!isAuthenticated ? <Login /> : <Navigate to="/" />} />
            <Route path="/" element={isAuthenticated ? <TodoMain /> : <Navigate to="/login" />} />
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
