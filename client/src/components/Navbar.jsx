import React from "react";
import { Link, Outlet } from "react-router-dom";

function Navbar() {
    return (
        <>
        <header className="d-flex flex-wrap align-items-center justify-content-center justify-content-md-between py-3 mb-4 border-bottom">
            <div className="col-md-3 mb-2 mb-md-0">
                <a href="/" className="d-inline-flex link-body-emphasis text-decoration-none">
                    <h2 style={{color: "white"}}>Edulib</h2>
                </a>
            </div>

            <ul className="nav col-12 col-md-auto mb-2 justify-content-center mb-md-0">
                <li><Link to="/" className="nav-link px-2 link-secondary">Home</Link></li>
                <li><Link to="/about" className="nav-link px-2">About</Link></li>
                <li><Link to="/contact" className="nav-link px-2">Contact</Link></li>
            </ul>

            <div className="col-md-3 text-end">
                <Link to="/login" className="btn btn-outline-primary me-2">Login</Link>
                <Link to="/register" className="btn btn-primary">Register</Link>
            </div>
        </header>
        <Outlet />
        </>
    );
}

export default Navbar;