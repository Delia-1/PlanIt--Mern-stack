import planit from "../assets/planIt.svg";
import "../style/Navbar.css";
import { useNavigate, Link } from "react-router-dom"; // ✅ Use Link instead of <a>
import { logoutUser } from "../api/api";
import useAuth from "../hooks/useAuth"; // ✅ Import authentication hook

function Navbar() {
  const navigate = useNavigate();
  const isAuthenticated = useAuth(); // ✅ Check if user is logged in

  const handleLogout = async () => {
    try {
      await logoutUser();
      console.log("✅ Successfully logged out");


        navigate("/auth/login", { replace: true });
        window.location.reload();
    } catch (error) {
      console.error("❌ Logout failed:", error);
    }
  };

  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div id="mid-container" className="container-fluid d-flex align-items-center">
        <Link className="navbar-brand d-flex align-items-center" to="/"> {/* ✅ Use Link instead of <a> */}
          <img className="navbar-logo" src={planit} alt="planIt-logo" />
          <span className="logo-name ms-2">PlanIt</span>
        </Link>

        {/* ✅ Only show Logout button if user is authenticated */}
        {isAuthenticated && <button className="btn btn-success" onClick={handleLogout}>Logout</button>}
      </div>
    </nav>
  );
}

export default Navbar;
