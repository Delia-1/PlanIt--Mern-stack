import planit from '../assets/planIt.svg';
import '../style/Navbar.css';

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg fixed-top navbar-light bg-light">
      <div id="mid-container"className="container-fluid d-flex  align-items-center">
        <a className="navbar-brand d-flex align-items-center" href="#">
          <img className="navbar-logo" src={planit} alt="planIt-logo" />
          <span className="logo-name ms-2">PlanIt</span>
        </a>
      </div>
    </nav>
  );
}

export default Navbar;
