import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    useDisclosure,
    Box,
    VStack,
    Text,
    Icon,
    HStack,
    Divider
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, LogIn } from 'lucide-react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useUserStore from './UserStore';

const MotionModalContent = motion(ModalContent);
const MotionBox = motion(Box);
const MotionButton = motion(Button);

const UserProvider = ({ children }) => {
    const navigate = useNavigate();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const {
        user,
        fetchUser,
        handleTokenExpired,
        showTokenModal,
        closeTokenModal
    } = useUserStore();

    useEffect(() => {
        const interval = setInterval(() => {
            const storedUser = JSON.parse(localStorage.getItem('user'));
            const token = storedUser?.token;
            if (!token) return;

            try {
                const payload = JSON.parse(atob(token.split('.')[1]));
                const exp = payload.exp * 1000;
                if (Date.now() > exp) {
                    handleTokenExpired();
                }
            } catch (e) {
                console.error("Token inválido:", e);
                handleTokenExpired();
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [handleTokenExpired]);

    useEffect(() => {
        window.addEventListener('token-expired', onOpen);
        return () => window.removeEventListener('token-expired', onOpen);
    }, [onOpen]);

    useEffect(() => {
        fetchUser();
    }, [fetchUser]);

    const handleModalClose = () => {
        closeTokenModal();
        onClose();
        navigate('/');
    };

    return (
        <>
            {children}

            <Modal
                isOpen={isOpen && showTokenModal}
                onClose={handleModalClose}
                isCentered
                closeOnOverlayClick={false}
                closeOnEsc={false}
            >
                <ModalOverlay
                    bg="rgba(0, 0, 0, 0.8)"
                    backdropFilter="blur(10px)"
                />
                <MotionModalContent
                    bg="black"
                    border="2px solid rgba(218, 165, 32, 0.6)"
                    borderRadius="2xl"
                    boxShadow="0 0 50px rgba(218, 165, 32, 0.3)"
                    maxW="md"
                    mx={4}
                    initial={{ opacity: 0, scale: 0.8, y: 50 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 50 }}
                    transition={{
                        type: "spring",
                        stiffness: 300,
                        damping: 30,
                        duration: 0.5
                    }}
                >
                    {/* Decorative top border */}
                    <Box
                        h="4px"
                        w="100%"
                        bgGradient="linear(to-r, rgba(218, 165, 32, 0.8), rgba(218, 165, 32, 1), rgba(218, 165, 32, 0.8))"
                        borderTopRadius="2xl"
                    />

                    <ModalHeader pb={2} pt={6}>
                        <VStack spacing={4} align="center">
                            {/* Animated Warning Icon */}
                            <MotionBox
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.6, type: "spring" }}
                            >
                                <Box
                                    p={4}
                                    borderRadius="full"
                                    bg="linear-gradient(135deg, rgba(218, 165, 32, 0.2) 0%, rgba(218, 165, 32, 0.1) 100%)"
                                    border="2px solid rgba(218, 165, 32, 0.4)"
                                    position="relative"
                                >
                                    <Icon
                                        as={AlertTriangle}
                                        boxSize={8}
                                        color="rgba(218, 165, 32, 0.9)"
                                    />
                                    {/* Pulsing effect */}
                                    <Box
                                        position="absolute"
                                        top="50%"
                                        left="50%"
                                        transform="translate(-50%, -50%)"
                                        w="100%"
                                        h="100%"
                                        borderRadius="full"
                                        border="1px solid rgba(218, 165, 32, 0.3)"
                                        as={motion.div}
                                        animate={{
                                            scale: [1, 1.2, 1],
                                            opacity: [0.3, 0.1, 0.3]
                                        }}
                                        transition={{
                                            duration: 2,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                    />
                                </Box>
                            </MotionBox>

                            {/* Title */}
                            <MotionBox
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                textAlign="center"
                            >
                                <Text
                                    fontSize="2xl"
                                    fontWeight="700"
                                    color="white"
                                    letterSpacing="-0.02em"
                                    mb={2}
                                >
                                    Sesión Expirada
                                </Text>
                                <HStack justify="center" spacing={2} opacity={0.6}>
                                    <Icon as={Clock} boxSize={4} color="rgba(218, 165, 32, 0.8)" />
                                    <Divider
                                        orientation="horizontal"
                                        borderColor="rgba(218, 165, 32, 0.3)"
                                        w="40px"
                                    />
                                    <Icon as={Clock} boxSize={4} color="rgba(218, 165, 32, 0.8)" />
                                </HStack>
                            </MotionBox>
                        </VStack>
                    </ModalHeader>

                    <ModalBody py={6}>
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.4, duration: 0.5 }}
                        >
                            <VStack spacing={4} textAlign="center">
                                <Text
                                    color="rgba(255, 255, 255, 0.9)"
                                    fontSize="md"
                                    lineHeight="1.6"
                                >
                                    Tu sesión ha expirado por seguridad.
                                </Text>
                                <Text
                                    color="rgba(255, 255, 255, 0.6)"
                                    fontSize="sm"
                                    lineHeight="1.5"
                                >
                                    Por favor, inicia sesión nuevamente para continuar usando la aplicación.
                                </Text>

                                {/* Security notice */}
                                <Box
                                    bg="rgba(218, 165, 32, 0.05)"
                                    border="1px solid rgba(218, 165, 32, 0.2)"
                                    borderRadius="lg"
                                    p={3}
                                    w="100%"
                                    mt={4}
                                >
                                    <HStack spacing={3}>
                                        <Icon
                                            as={AlertTriangle}
                                            color="rgba(218, 165, 32, 0.8)"
                                            boxSize={4}
                                            flexShrink={0}
                                        />
                                        <Text
                                            fontSize="xs"
                                            color="rgba(255, 255, 255, 0.7)"
                                            lineHeight="1.4"
                                        >
                                            Por tu seguridad, las sesiones expiran automáticamente después de un período de inactividad.
                                        </Text>
                                    </HStack>
                                </Box>
                            </VStack>
                        </MotionBox>
                    </ModalBody>

                    <ModalFooter pt={2} pb={6}>
                        <MotionBox
                            w="100%"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.5 }}
                        >
                            <MotionButton
                                onClick={handleModalClose}
                                size="lg"
                                w="100%"
                                h="52px"
                                borderRadius="xl"
                                bg="linear-gradient(135deg, rgba(218, 165, 32, 0.9) 0%, rgba(218, 165, 32, 0.7) 100%)"
                                color="black"
                                fontWeight="600"
                                fontSize="md"
                                border="1px solid rgba(218, 165, 32, 0.3)"
                                leftIcon={<Icon as={LogIn} boxSize={5} />}
                                _hover={{
                                    bg: "linear-gradient(135deg, rgba(218, 165, 32, 1) 0%, rgba(218, 165, 32, 0.8) 100%)",
                                    transform: "translateY(-1px)",
                                    boxShadow: "0 6px 20px rgba(218, 165, 32, 0.4)"
                                }}
                                _active={{
                                    bg: "linear-gradient(135deg, rgba(218, 165, 32, 0.8) 0%, rgba(218, 165, 32, 0.6) 100%)",
                                    transform: "translateY(0)"
                                }}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition="all 0.2s ease"
                            >
                                Ir al Login
                            </MotionButton>
                        </MotionBox>
                    </ModalFooter>
                </MotionModalContent>
            </Modal>
        </>
    );
};

export default UserProvider;