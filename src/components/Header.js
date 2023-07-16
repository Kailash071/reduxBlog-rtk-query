import { Link } from "react-router-dom";

const Header = () => {
  return (
    <nav className="navbar navbar-expand-lg sticky-top bg-dark"  data-bs-theme="dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          Redux-Blog
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link to="post">Post</Link>
            </li>
            <div className="nav-item">
            <Link to="user">Users</Link>
            </div>
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Header;
