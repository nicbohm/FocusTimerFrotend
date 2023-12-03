// AuthHelper.js

// Funktion zum Abrufen des Tokens aus dem localStorage
export const getToken = () => {
    return localStorage.getItem('authToken');
};

// Funktion zum Speichern des Tokens im localStorage
export const setToken = (token) => {
    localStorage.setItem('authToken', token);
};

// Funktion zum Entfernen des Tokens aus dem localStorage
export const removeToken = () => {
    localStorage.removeItem('authToken');
};