import { Link } from "react-router-dom";

export default function Alert(props) {
    return (
        <div className="alert alert-danger alert-dismissible fade show" role="alert">
            {props.message} <Link to={props.link}>{props.link_text}</Link>
            <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
        </div>
    );
}