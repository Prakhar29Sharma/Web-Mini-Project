export default function action() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('time_created');
    window.location.href = '/';
    return null;
}
