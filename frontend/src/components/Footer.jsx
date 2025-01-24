import '../style/Footer.css';

function Footer() {
  return (
    <div className="footer w-100 fixed-bottom">
  <div className="footer-links">
    <a href="#"><i className="fab fa-github"></i></a>
    <a href="#"><i className="fa-brands fa-facebook-f"></i></a>
    <a href="#"><i className="fab fa-linkedin"></i></a>
  </div>
  <div className="footer-copyright">
    This footer is made with <i className="fas fa-heart"></i> by Délia
  </div>
</div>
  )
}

export default Footer;
