export const logout = () => {
    localStorage.removeItem('user');
    location.href = '/';
}