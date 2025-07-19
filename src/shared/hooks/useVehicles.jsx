import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { getVehicles as getVehiclesRequest, addVehicles as addVehiclesRequest } from "../../services";

const useVehicles = () => {
    const [vehicles, setVehicles] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    const toast = useToast();

    const fetchVehicles = async () => {
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

    const addVehicles = async (newVehicle) => {
        setLoading(true);
        try {
            const response = await addVehiclesRequest(newVehicle);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast({
                title: "Vehículo agregado",
                description: "El vehículo fue agregado correctamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } catch (error) {
            setError(error);
            toast({
                title: "Error al agregar el vehículo",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top-right",
            });
        }
        await fetchVehicles();
    };


    useEffect(() => {
        fetchVehicles();
    }, []);

    return { vehicles, fetchVehicles, addVehicles, loading, error };
};

export default useVehicles;