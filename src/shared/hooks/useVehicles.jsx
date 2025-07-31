import { useState, useEffect } from "react";
import { useToast } from "@chakra-ui/react";
import { 
    getVehicles as getVehiclesRequest, 
    addVehicles as addVehiclesRequest, 
    getVehiclesRecents as getVehiclesRecentsRequest,
    deleteVehicles as deleteVehiclesRequest,
    editVehicles as editVehiclesRequest,
    getVehiclesDashboard as getVehiclesDashboardRequest
} from "../../services";

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

    const fetchVehiclesRecents = async () => {
        setLoading(true);
        try {
            const response = await getVehiclesRecentsRequest();
            setVehicles(response.data.vehicles)
        } catch (error) {
            setError(error.response?.data?.msg || 'Error loading vehicles')
        } finally {
            setLoading(false);
        }
    }

    // const fetchVehiclesDashboard = async () => {
    //     setLoading(true);
    //     try {
    //         const response = await getVehiclesDashboardRequest();
    //         setVehicles(response.data.vehicles)
    //     } catch (error) {
    //         setError(error.response?.data?.msg || 'Error loading vehicles')
    //     } finally {
    //         setLoading(false);
    //     }
    // }

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

            await fetchVehiclesRecents();

            return response;

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
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const deleteVehicles = async(id) => {
        setLoading(true);
        try {
            const response = deleteVehiclesRequest(id);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast({
                title: "Vehículo eliminado",
                description: "El vehículo fue eliminado correctamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });

            await fetchVehiclesRecents();

            return response;

        } catch (error) {
            setError(error.response?.data?.msg || 'Error to delete vehicle');
            toast({
                title: "Vehículo no ha podido ser eliminado",
                description: "El vehículo no fue eliminado correctamente.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        } finally {
            setLoading(false);
        }
    }

    const editVehicles = async(id, data) => {
        setLoading(true);
        try {
            const response = editVehiclesRequest(id, data);

            if (response.error) {
                throw new Error(response.msg);
            }

            toast({
                title: "Vehículo editado",
                description: "El vehículo fue editado correctamente.",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });

            await fetchVehiclesRecents();

            return response;

        } catch (error) {
            setError(error.response?.data?.msg || 'Error to delete vehicle');
            toast({
                title: "Vehículo no ha podido ser editado",
                description: "El vehículo no fue editado correctamente.",
                status: "warning",
                duration: 3000,
                isClosable: true,
                position: "top-right",
            });
        }
    }

    // useEffect(() => {
    //     fetchVehiclesDashboard();
    // }, []);

    useEffect(() => {
        fetchVehicles();
    }, []);

    useEffect(() => {
        fetchVehiclesRecents();
    }, []);



    return { vehicles, fetchVehicles, addVehicles, loading, error, fetchVehiclesRecents, deleteVehicles, editVehicles };
};

export default useVehicles;