import React, { useEffect, useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    VStack,
    HStack,
    Icon,
    Box,
    Badge,
    useDisclosure,
    Divider,
    Flex
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Trash2, AlertTriangle, Car, X } from 'lucide-react';
import useVehicles from '../shared/hooks/useVehicles';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const VehicleDeleteModal = ({ isOpen, onOpen, onClose, selectedCar }) => {
    const [isDeleting, setIsDeleting] = useState(false);
    const { deleteVehicles, loading, error, fetchVehiclesRecents } = useVehicles();

    useEffect(() => {
        fetchVehiclesRecents();
    }, [])

    const handleDelete = async (id) => {
        setIsDeleting(true);
        try {
            await deleteVehicles(id)
            onClose();
            location.reload();
        } catch (error) {
            console.error('Error al eliminar:', error);
            toast({
                title: "Error",
                description: error.message || "No se pudo eliminar el vehículo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsDeleting(false);
        }
    };

    const modalVariants = {
        hidden: {
            opacity: 0,
            scale: 0.8,
            y: -50
        },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 20,
            transition: {
                duration: 0.2
            }
        }
    };

    const iconVariants = {
        initial: { scale: 0, rotate: -180 },
        animate: {
            scale: 1,
            rotate: 0,
            transition: {
                type: "spring",
                damping: 15,
                stiffness: 300,
                delay: 0.2
            }
        }
    };

    const pulseVariants = {
        animate: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    return (
        <Box>
            <AnimatePresence>
                {isOpen && (
                    <Modal isOpen={isOpen} onClose={onClose} size="md" isCentered>
                        <ModalOverlay
                            bg="blackAlpha.600"
                            backdropFilter="blur(4px)"
                        />

                        <MotionBox
                            as={ModalContent}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            bg="white"
                            borderRadius="xl"
                            overflow="hidden"
                            boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.25)"
                            border="1px solid"
                            borderColor="gray.200"
                        >
                            {/* Header con gradiente */}
                            <Box
                                bg="linear-gradient(135deg, #000000 0%, #1a1a1a 100%)"
                                p={6}
                                position="relative"
                                overflow="hidden"
                            >
                                <MotionBox
                                    position="absolute"
                                    top="-50%"
                                    right="-20%"
                                    width="200px"
                                    height="200px"
                                    bg="red.500"
                                    borderRadius="full"
                                    opacity={0.1}
                                    variants={pulseVariants}
                                    animate="animate"
                                />

                                <Flex justify="space-between" align="center">
                                    <HStack spacing={3}>
                                        <MotionBox
                                            variants={iconVariants}
                                            initial="initial"
                                            animate="animate"
                                        >
                                            <Box
                                                p={3}
                                                bg="red.500"
                                                borderRadius="full"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                <Icon as={AlertTriangle} boxSize={6} color="white" />
                                            </Box>
                                        </MotionBox>
                                        <VStack align="start" spacing={0}>
                                            <Text color="white" fontSize="lg" fontWeight="bold">
                                                Confirmar Eliminación
                                            </Text>
                                            <Text color="gray.300" fontSize="sm">
                                                Esta acción no se puede deshacer
                                            </Text>
                                        </VStack>
                                    </HStack>

                                    <Button
                                        variant="ghost"
                                        color="gray.400"
                                        _hover={{ color: "white", bg: "whiteAlpha.200" }}
                                        onClick={onClose}
                                        size="sm"
                                    >
                                        <X size={18} />
                                    </Button>
                                </Flex>
                            </Box>

                            <ModalBody p={6}>
                                <VStack spacing={4} align="stretch">
                                    <Text color="gray.700" fontSize="md" textAlign="center" mb={2}>
                                        ¿Estás seguro de que deseas eliminar este vehículo del inventario?
                                    </Text>

                                    {/* Información del vehículo */}
                                    <MotionBox
                                        bg="gray.50"
                                        p={4}
                                        borderRadius="lg"
                                        border="1px solid"
                                        borderColor="gray.200"
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                    >
                                        <HStack mb={3}>
                                            <Icon as={Car} color="gray.600" boxSize={5} />
                                            <Text fontWeight="semibold" color="gray.800">
                                                Información del Vehículo
                                            </Text>
                                        </HStack>

                                        <VStack align="stretch" spacing={2}>
                                            <HStack justify="space-between">
                                                <Text color="gray.600" fontSize="sm">Marca y Modelo:</Text>
                                                <Text fontWeight="semibold" color="gray.800">
                                                    {selectedCar.name} {selectedCar.model}
                                                </Text>
                                            </HStack>

                                            <HStack justify="space-between">
                                                <Text color="gray.600" fontSize="sm">Año:</Text>
                                                <Text fontWeight="bold" color="red.500">
                                                    {selectedCar.year}
                                                </Text>
                                            </HStack>

                                            <HStack justify="space-between">
                                                <Text color="gray.600" fontSize="sm">Precio:</Text>
                                                <Text fontWeight="bold" color="green.600" fontSize="lg">
                                                    Q{selectedCar.price.$numberDecimal}
                                                </Text>
                                            </HStack>

                                            <Divider my={1} />

                                            <HStack justify="space-between">
                                                <Text color="gray.600" fontSize="sm">ID:</Text>
                                                <Text fontFamily="mono" fontSize="xs" color="gray.700">
                                                    {selectedCar._id}
                                                </Text>
                                            </HStack>
                                        </VStack>
                                    </MotionBox>

                                    <Box
                                        bg="red.50"
                                        border="1px solid"
                                        borderColor="red.200"
                                        p={3}
                                        borderRadius="md"
                                    >
                                        <Text fontSize="sm" color="red.700" textAlign="center">
                                            <strong>Advertencia:</strong> Una vez eliminado, todos los datos
                                            del vehículo se perderán permanentemente.
                                        </Text>
                                    </Box>
                                </VStack>
                            </ModalBody>

                            <ModalFooter bg="gray.50" p={6}>
                                <HStack spacing={3} width="100%">
                                    <MotionButton
                                        variant="outline"
                                        onClick={onClose}
                                        flex={1}
                                        borderColor="gray.300"
                                        color="gray.700"
                                        _hover={{
                                            bg: "gray.100",
                                            borderColor: "gray.400",
                                            transform: "translateY(-1px)"
                                        }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition="all 0.2s"
                                    >
                                        Cancelar
                                    </MotionButton>

                                    <MotionButton
                                        bg="red.500"
                                        color="white"
                                        onClick={() => handleDelete(selectedCar._id)}
                                        isLoading={isDeleting}
                                        loadingText="Eliminando..."
                                        flex={1}
                                        leftIcon={!isDeleting ? <Trash2 size={16} /> : undefined}
                                        _hover={{
                                            bg: "red.600",
                                            transform: "translateY(-1px)"
                                        }}
                                        _active={{ bg: "red.700" }}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                        transition="all 0.2s"
                                    >
                                        {isDeleting ? "Eliminando..." : "Eliminar Vehículo"}
                                    </MotionButton>
                                </HStack>
                            </ModalFooter>
                        </MotionBox>
                    </Modal>
                )}
            </AnimatePresence>
        </Box>
    );
};

export default VehicleDeleteModal;