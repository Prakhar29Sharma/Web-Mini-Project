import React from "react";
import { Form, Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
        <header className="p-3 mb-3 border-bottom">
            <div className="container">
                <div className="d-flex flex-wrap align-items-center justify-content-center justify-content-lg-start">
                    <Link to="/" className="d-flex align-items-center mb-2 mb-lg-0 link-body-emphasis text-decoration-none">
                    Edulib
                    </Link>

                    <ul className="nav col-12 col-lg-auto me-lg-auto mb-2 justify-content-center mb-md-0">
                    <li><Link to="" className="nav-link px-2 link-secondary">Dashboard</Link></li>
                    <li><Link to="" className="nav-link px-2 link-body-emphasis">Subjects</Link></li>
                    <li><Link to="" className="nav-link px-2 link-body-emphasis">Units</Link></li>
                    <li><Link to="" className="nav-link px-2 link-body-emphasis">Uploaded Courses</Link></li>
                    </ul>

                    <div className="dropdown text-end">
                    <Link to="" className="d-block link-body-emphasis text-decoration-none dropdown-toggle" data-bs-toggle="dropdown" aria-expanded="false">
                        <img src="https://github.com/mdo.png" alt="mdo" width="32" height="32" className="rounded-circle" />
                    </Link>
                    <ul className="dropdown-menu text-small">
                        <li><Link className="dropdown-item" to="#">Notifications</Link></li>
                        <li><Link className="dropdown-item" to="#">Profile</Link></li>
                        <li><hr className="dropdown-divider" /></li>
                        <li>
                            <Form action="/logout" method="post" className="dropdown-item">
                                <button style={{ backgroundColor: 'white', border: 0, width: '100%' }} type="submit">Logout</button>
                            </Form>
                        </li>
                    </ul>
                    </div>
                </div>
            </div>
        </header>
        </>
    );
}
