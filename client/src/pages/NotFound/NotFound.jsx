import React from "react";
import { Link } from "react-router-dom";
import './NotFound.css';

function NotFound() {
    return (
        <div className="container">
            <h1>404</h1>
            <p>Oops! Something is wrong.</p>
            <Link class="button" to="/"><i class="icon-home"></i>Go back to Home</Link>
        </div>
    );
}

export default NotFound;