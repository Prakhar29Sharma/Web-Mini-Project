import React from "react";
import { Link } from "react-router-dom";

export default function PageTitle(props) {
    return (
        <div className="pagetitle">
            <h1>{props.title}</h1>
            <nav>
                <ol className="breadcrumb">
                <li className="breadcrumb-item"><Link to="/">Home</Link></li>
                <li className="breadcrumb-item active">{props.title}</li>
                </ol>
            </nav>
        </div>
    );
}