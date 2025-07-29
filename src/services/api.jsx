import axios from 'axios';

const apiClient = axios.create({
    baseURL: 'https://repository-backendautoventas.onrender.com/AutoVentas/v1',
    timeout: 5000000
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
            msg
        }
    }
}
export const getVehiclesRecents = async() => {
    try {
        return await apiClient.get('/vehicles/recents')
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error'
        return {
            error: true,
            msg
        }
    }
}

export const getVehiclesDashboard = async() => {
    try {
        return await apiClient.get('/vehicles/dashboard')
    } catch (error) {
        const msg = error.response?.data?.msg || 'Error'
        return {
            error: true,
            msg
        }
    }
}

export const addVehicles = async(data) => {
    try {
        return await apiClient.post('/vehicles/addVehicle', data)
    } catch (error) {        
        const msg = error.response?.data?.msg || error.response?.data || 'Error'
        return {
            error: true,
            msg
        }
    }
}

export const deleteVehicles = async(id) => {
    try {
        return await apiClient.delete(`/vehicles/${id}`)
    } catch (error) {
        const msg = error.response?.data?.msg || error.response?.data || 'Error'
        return {
            error: true,
            msg
        }
    }
}

export const editVehicles = async(id, data) => {
    try {
        return await apiClient.put(`/vehicles/${id}`, data)
    } catch (error) {
        const msg = error.response?.data?.msg || error.response?.data || 'Error'
        return {
            error: true,
            msg
        }
    }
}