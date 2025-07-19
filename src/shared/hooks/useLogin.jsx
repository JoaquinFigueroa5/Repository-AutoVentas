import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { login as loginRequest } from "../../services"
import useUserStore from "../../context/UserStore";
import { useToast } from "@chakra-ui/react";

export const useLogin = () => {
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    const setUser = useUserStore(state => state.setUser);

    const toast = useToast();

    const login = async (email, password) => {
        setIsLoading(true);
        try {
            const response = await loginRequest({ email, password });

            if (response.error) {
                toast({
                    title: "Error al iniciar sesión",
                    description:
                        response.error?.response?.data ||
                        response?.msg ||
                        "Ocurrió un error al iniciar sesión, usuario no encontrado",
                    status: "error",
                    duration: 4000,
                    isClosable: true,
                    position: "top-right",
                    containerStyle: {
                        background: "red",
                        color: "white",
                    },
                });
                setIsLoading(false);
                return;
            }

            const { userDetails } = response.data;

            localStorage.setItem("user", JSON.stringify(userDetails));

            setUser(userDetails);

            toast({
                title: "Sesión iniciada correctamente",
                status: "success",
                duration: 3000,
                isClosable: true,
                position: "top-right",
                containerStyle: {
                    background: "green",
                    color: "white",
                },
            });

            navigate("/admin");
            location.reload();
        } catch (error) {
            toast({
                title: "Error al iniciar sesión",
                description: error.message,
                status: "error",
                duration: 4000,
                isClosable: true,
                position: "top-right",
                containerStyle: {
                    background: "red",
                    color: "white",
                },
            });
        } finally {
            setIsLoading(false);
        }
    };


    return {
        login,
        isLoading
    };
};
