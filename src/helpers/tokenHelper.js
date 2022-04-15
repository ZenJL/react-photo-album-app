export const getTokenFromSession = () => sessionStorage.getItem('token');

export const removeToken = () => sessionStorage.removeItem('token');
