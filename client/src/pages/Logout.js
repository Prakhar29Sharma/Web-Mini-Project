export default function action() {
    localStorage.clear();
    sessionStorage.clear();
    window.location.href = '/';
    return null;
}
