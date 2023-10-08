import axios from "axios";
import { getToken } from "./auth";

export default function createNotification(username, title, message) {
    axios.post('http://localhost:5000/api/notifications', {
        username: username,
        title: title,
        message: message
    }, {
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + getToken()
        }
    })
    .then((res) => {
        console.log(res);
    })
    .catch((err) => console.log(err));
}