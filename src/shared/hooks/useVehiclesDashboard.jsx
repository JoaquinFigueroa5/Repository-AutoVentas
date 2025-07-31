import { useState, useEffect } from "react";
import {
    getVehiclesDashboard as getVehiclesDashboardRequest
} from '../../services'

const useVehiclesDashboard = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVehiclesDashboard = async () => {
        setLoading(true);
        try {
            const response = await getVehiclesDashboardRequest();
            setVehicles(response.data.vehicles)
        } catch (error) {
            setError(error.response?.data?.msg || 'Error loading vehicles')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVehiclesDashboard();
    }, []);

    return { vehicles, loading, error, fetchVehiclesDashboard }
};

export default useVehiclesDashboard;