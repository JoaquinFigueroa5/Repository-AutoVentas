import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'http://127.0.0.1:3000/AutoVentas/v1',
    timeout: 500
});

apiClient.interceptors.request.use(
    (config) => {
        const useUserDetails = localStorage.getItem('user');

        if(useUserDetails) {
            const token = JSON.parse(useUserDetails).token
            config.headers['x-token'] = token;
        }

        return config;
    },
    response => response,
    error => {
        if(error.response?.status === 401) {
            window.dispatchEvent(new Event('token-expired'));
        }
        return Promise.reject(error)
    }
);

export const login = async(data) => {
    try {
        return await apiClient.post('/auth/login', data)
    } catch (e) {
        const msg = e.response?.data?.msg || 'Error desconocido';
        return {
            error: true,
            msg,
            e
        }
    }
}

export const getVehicles = async() => {
    try {
        return await apiClient.get('/vehicles')
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error'
        return {
            error: true,
            msg,
            error
        }
    }
}