export function getTokenDuration() {
    const storedExpirationDate = localStorage.getItem('expiration');
    const expirationDate = new Date(storedExpirationDate);
    const now = new Date();
    const duration = expirationDate.getTime() - now.getTime();
    return duration;
}

export function getToken() {

    if (getTokenDuration() <= 0) {
        return 'EXPIRED';
    }

    return localStorage.getItem('token');
}

export function setToken(token) {
    localStorage.setItem('token', token);
}