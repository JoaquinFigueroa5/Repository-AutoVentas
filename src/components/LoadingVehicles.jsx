import {
    Box,
    Text,
    Button,
    HStack,
    VStack
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionText = motion(Text);

const LoadingVehicles = () => {
    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut"
            }
        }
    };

    const pulseVariants = {
        pulse: {
            scale: [1, 1.05, 1],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const spinVariants = {
        spin: {
            rotate: 360,
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    const dotVariants = {
        bounce: {
            y: [0, -10, 0],
            transition: {
                duration: 0.6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.6,
                staggerChildren: 0.2
            }
        }
    };
    return (
        <AnimatePresence>
            <MotionBox
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                minH="60vh"
                display="flex"
                alignItems="center"
                justifyContent="center"
                bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
                position="relative"
                overflow="hidden"
            >
                {/* Elementos de fondo animados */}
                <MotionBox
                    position="absolute"
                    top="20%"
                    left="10%"
                    width="100px"
                    height="100px"
                    borderRadius="50%"
                    bg="red.500"
                    opacity="0.1"
                    variants={pulseVariants}
                    animate="pulse"
                />
                <MotionBox
                    position="absolute"
                    bottom="20%"
                    right="15%"
                    width="150px"
                    height="150px"
                    borderRadius="50%"
                    bg="red.600"
                    opacity="0.05"
                    variants={pulseVariants}
                    animate="pulse"
                    transition={{ delay: 1 }}
                />

                <VStack spacing={8} zIndex={1}>
                    {/* Spinner principal */}
                    <MotionBox variants={itemVariants}>
                        <MotionBox
                            width="80px"
                            height="80px"
                            border="4px solid"
                            borderColor="gray.800"
                            borderTopColor="red.500"
                            borderRadius="50%"
                            variants={spinVariants}
                            animate="spin"
                        />
                    </MotionBox>

                    {/* Icono de vehículo estilizado */}
                    <MotionBox variants={itemVariants}>
                        <MotionBox
                            variants={pulseVariants}
                            animate="pulse"
                            p={4}
                            borderRadius="xl"
                            bg="rgba(255, 255, 255, 0.05)"
                            backdropFilter="blur(10px)"
                            border="1px solid"
                            borderColor="rgba(239, 68, 68, 0.3)"
                        >
                            <svg
                                width="60"
                                height="40"
                                viewBox="0 0 60 40"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    d="M8 30h4a4 4 0 008 0h20a4 4 0 008 0h4v-8l-6-8H14l-6 8v8z"
                                    fill="#ef4444"
                                    fillOpacity="0.8"
                                />
                                <circle cx="16" cy="30" r="3" fill="#ffffff" />
                                <circle cx="44" cy="30" r="3" fill="#ffffff" />
                                <rect x="20" y="18" width="20" height="8" rx="2" fill="#000000" />
                            </svg>
                        </MotionBox>
                    </MotionBox>

                    {/* Texto principal */}
                    <MotionBox variants={itemVariants}>
                        <VStack spacing={3}>
                            <MotionText
                                fontSize="2xl"
                                fontWeight="bold"
                                color="white"
                                textAlign="center"
                                variants={pulseVariants}
                                animate="pulse"
                            >
                                Cargando Vehículos
                            </MotionText>

                            {/* Puntos animados */}
                            <HStack spacing={2}>
                                {[0, 1, 2].map((index) => (
                                    <MotionBox
                                        key={index}
                                        width="8px"
                                        height="8px"
                                        borderRadius="50%"
                                        bg="red.500"
                                        variants={dotVariants}
                                        animate="bounce"
                                        transition={{
                                            delay: index * 0.2,
                                            duration: 0.6,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                ))}
                            </HStack>

                            <MotionText
                                fontSize="md"
                                color="gray.300"
                                textAlign="center"
                                mt={2}
                                variants={itemVariants}
                            >
                                Preparando tu experiencia automotriz
                            </MotionText>
                        </VStack>
                    </MotionBox>

                    {/* Barra de progreso animada */}
                    <MotionBox variants={itemVariants} width="300px">
                        <Box
                            width="100%"
                            height="4px"
                            bg="gray.800"
                            borderRadius="full"
                            overflow="hidden"
                            position="relative"
                        >
                            <MotionBox
                                height="100%"
                                bg="linear-gradient(90deg, #ef4444, #dc2626, #ef4444)"
                                borderRadius="full"
                                initial={{ x: "-100%" }}
                                animate={{ x: "100%" }}
                                transition={{
                                    duration: 2,
                                    repeat: Infinity,
                                    ease: "easeInOut"
                                }}
                            />
                        </Box>
                    </MotionBox>
                </VStack>

                {/* Efectos de partículas */}
                {[...Array(6)].map((_, index) => (
                    <MotionBox
                        key={index}
                        position="absolute"
                        width="4px"
                        height="4px"
                        bg="red.500"
                        borderRadius="50%"
                        opacity="0.6"
                        initial={{
                            x: Math.random() * 100 + "%",
                            y: Math.random() * 100 + "%",
                        }}
                        animate={{
                            y: [0, -20, 0],
                            opacity: [0.6, 0.2, 0.6],
                        }}
                        transition={{
                            duration: 3 + Math.random() * 2,
                            repeat: Infinity,
                            delay: Math.random() * 2,
                            ease: "easeInOut"
                        }}
                    />
                ))}
            </MotionBox>
        </AnimatePresence>
    );
}

export default LoadingVehicles