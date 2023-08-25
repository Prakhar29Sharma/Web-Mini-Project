import React from "react";
import { Link } from "react-router-dom";

export default function PageTitle(props) {
    return (
        <div class="pagetitle">
            <h1>{props.title}</h1>
            <nav>
                <ol class="breadcrumb">
                <li class="breadcrumb-item"><Link to="/">Home</Link></li>
                <li class="breadcrumb-item active">{props.title}</li>
                </ol>
            </nav>
        </div>
    );
}