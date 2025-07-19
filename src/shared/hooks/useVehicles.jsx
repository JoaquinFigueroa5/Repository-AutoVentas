import { useState, useEffect } from "react";
import { getVehicles as getVehiclesRequest } from "../../services";

const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const fetchVehicles = async() => {
        setLoading(true);
        try {
            const response = await getVehiclesRequest();
            setVehicles(response.data.vehicles)
        } catch (error) {
            setError(error.response?.data?.msg || 'Error loading vehicles')
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchVehicles();
    }, []);

    return { vehicles, fetchVehicles, loading, error};
};

export default useVehicles;