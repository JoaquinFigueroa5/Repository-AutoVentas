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
    Divider,
    Flex
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Clock, AlertTriangle, LogIn, Shield } from 'lucide-react';
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
                size="lg"
            >
                <ModalOverlay
                    bg="rgba(0, 0, 0, 0.92)"
                    backdropFilter="blur(12px)"
                />
                <MotionModalContent
                    background="linear-gradient(145deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%)"
                    border="none"
                    borderRadius="24px"
                    boxShadow="0 25px 80px rgba(255, 0, 0, 0.4), 0 0 0 1px rgba(255, 255, 255, 0.1)"
                    maxW="500px"
                    mx={4}
                    overflow="hidden"
                    position="relative"
                    initial={{ opacity: 0, scale: 0.8, y: 60 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.8, y: 60 }}
                    transition={{
                        type: "spring",
                        stiffness: 280,
                        damping: 25,
                        duration: 0.6
                    }}
                >
                    {/* Premium top accent */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        h="4px"
                        background="linear-gradient(to right, #dc2626, #ef4444, #ffffff, #ef4444, #dc2626)"
                        zIndex={1}
                    />

                    {/* Luxury side accents */}
                    <Box
                        position="absolute"
                        left={0}
                        top={0}
                        bottom={0}
                        w="2px"
                        background="linear-gradient(to bottom, transparent 0%, #dc267f 50%, transparent 100%)"
                        opacity={0.6}
                    />
                    <Box
                        position="absolute"
                        right={0}
                        top={0}
                        bottom={0}
                        w="2px"
                        background="linear-gradient(to bottom, transparent 0%, #dc267f 50%, transparent 100%)"
                        opacity={0.6}
                    />

                    <ModalHeader pt={10} pb={6}>
                        <VStack spacing={6} align="center">
                            {/* Premium logo/icon section */}
                            <MotionBox
                                initial={{ scale: 0, rotate: -90 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.2, duration: 0.8, type: "spring", stiffness: 200 }}
                            >
                                <Flex
                                    position="relative"
                                    w="80px"
                                    h="80px"
                                    borderRadius="50%"
                                    background="linear-gradient(135deg, #dc2626, #ef4444)"
                                    align="center"
                                    justify="center"
                                    boxShadow="0 10px 30px rgba(255, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.2)"
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: '-4px',
                                        left: '-4px',
                                        right: '-4px',
                                        bottom: '-4px',
                                        borderRadius: '50%',
                                        background: 'linear-gradient(45deg, rgba(255, 0, 0, 0.3), rgba(204, 0, 0, 0.3))',
                                        zIndex: -1
                                    }}
                                >
                                    <Icon
                                        as={AlertTriangle}
                                        boxSize={10}
                                        color="white"
                                        filter="drop-shadow(0 2px 4px rgba(0,0,0,0.3))"
                                    />

                                    {/* Rotating ring effect */}
                                    <Box
                                        position="absolute"
                                        top="-6px"
                                        left="-6px"
                                        w="calc(100% + 12px)"
                                        h="calc(100% + 12px)"
                                        borderRadius="50%"
                                        border="2px solid transparent"
                                        borderTopColor="rgba(255, 255, 255, 0.4)"
                                        borderRightColor="rgba(255, 255, 255, 0.1)"
                                        as={motion.div}
                                        animate={{ rotate: 360 }}
                                        transition={{
                                            duration: 3,
                                            repeat: Infinity,
                                            ease: "linear"
                                        }}
                                    />
                                </Flex>
                            </MotionBox>

                            {/* Premium title section */}
                            <MotionBox
                                initial={{ opacity: 0, y: 30 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.4, duration: 0.6 }}
                                textAlign="center"
                            >
                                <Text
                                    fontSize="3xl"
                                    fontWeight="800"
                                    color="white"
                                    letterSpacing="-0.03em"
                                    mb={3}
                                    textShadow="0 2px 4px rgba(0,0,0,0.5)"
                                >
                                    Sesión Expirada
                                </Text>
                                <Text
                                    fontSize="sm"
                                    fontWeight="500"
                                    color="rgba(255, 255, 255, 0.7)"
                                    textTransform="uppercase"
                                    letterSpacing="0.1em"
                                >
                                    ACCESO PREMIUM REQUERIDO
                                </Text>

                                {/* Decorative divider */}
                                <Flex align="center" justify="center" mt={4}>
                                    <Box w="30px" h="1px" background="linear-gradient(to right, transparent, #dc2626)" />
                                    <Icon as={Shield} mx={3} color="#dc2626" boxSize={4} />
                                    <Box w="30px" h="1px" background="linear-gradient(to left, transparent, #dc2626)" />
                                </Flex>
                            </MotionBox>
                        </VStack>
                    </ModalHeader>

                    <ModalBody px={8} py={4}>
                        <MotionBox
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                        >
                            <VStack spacing={6}>
                                <Text
                                    color="rgba(255, 255, 255, 0.95)"
                                    fontSize="lg"
                                    fontWeight="500"
                                    lineHeight="1.7"
                                    textAlign="center"
                                >
                                    Tu sesión ha expirado por medidas de seguridad premium.
                                </Text>

                                <Text
                                    color="rgba(255, 255, 255, 0.65)"
                                    fontSize="md"
                                    lineHeight="1.6"
                                    textAlign="center"
                                >
                                    Inicia sesión nuevamente para acceder a tu experiencia exclusiva.
                                </Text>

                                {/* Luxury security card */}
                                <Box
                                    w="100%"
                                    background="linear-gradient(135deg, rgba(255, 0, 0, 0.1), rgba(255, 0, 0, 0.05))"
                                    border="1px solid"
                                    borderColor="rgba(255, 0, 0, 0.3)"
                                    borderRadius="16px"
                                    p={5}
                                    position="relative"
                                    overflow="hidden"
                                    _before={{
                                        content: '""',
                                        position: 'absolute',
                                        top: 0,
                                        left: 0,
                                        right: 0,
                                        height: '1px',
                                        background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)'
                                    }}
                                >
                                    <HStack spacing={4}>
                                        <Flex
                                            w="40px"
                                            h="40px"
                                            borderRadius="12px"
                                            bg="rgba(255, 0, 0, 0.2)"
                                            align="center"
                                            justify="center"
                                            flexShrink={0}
                                        >
                                            <Icon
                                                as={Shield}
                                                color="#dc2626"
                                                boxSize={5}
                                            />
                                        </Flex>
                                        <Box flex={1}>
                                            <Text
                                                fontSize="sm"
                                                fontWeight="600"
                                                color="rgba(255, 255, 255, 0.9)"
                                                mb={1}
                                            >
                                                Seguridad Premium
                                            </Text>
                                            <Text
                                                fontSize="xs"
                                                color="rgba(255, 255, 255, 0.6)"
                                                lineHeight="1.5"
                                            >
                                                Las sesiones expiran automáticamente para proteger tu cuenta y datos.
                                            </Text>
                                        </Box>
                                    </HStack>
                                </Box>
                            </VStack>
                        </MotionBox>
                    </ModalBody>

                    <ModalFooter px={8} pb={8} pt={4}>
                        <MotionBox
                            w="100%"
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6, duration: 0.6 }}
                        >
                            <MotionButton
                                onClick={handleModalClose}
                                size="lg"
                                w="100%"
                                h="56px"
                                borderRadius="16px"
                                background="linear-gradient(135deg, #dc2626, #ef4444)"
                                color="white"
                                fontWeight="700"
                                fontSize="lg"
                                letterSpacing="0.02em"
                                border="1px solid rgba(255, 255, 255, 0.1)"
                                leftIcon={<Icon as={LogIn} boxSize={5} />}
                                boxShadow="0 8px 32px rgba(255, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.2)"
                                _hover={{
                                    background: "linear-gradient(135deg, #ef4444, #dc2626)",
                                    transform: "translateY(-2px)",
                                    boxShadow: "0 12px 40px rgba(255, 0, 0, 0.6), inset 0 1px 0 rgba(255, 255, 255, 0.3)"
                                }}
                                _active={{
                                    background: "linear-gradient(135deg, #b91c1c, #dc2626)",
                                    transform: "translateY(-1px)"
                                }}
                                initial={{ scale: 1 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                            >
                                ACCEDER AL SISTEMA
                            </MotionButton>
                        </MotionBox>
                    </ModalFooter>

                    {/* Bottom accent line */}
                    <Box
                        position="absolute"
                        bottom={0}
                        left={0}
                        right={0}
                        h="2px"
                        background="linear-gradient(to right, transparent, #dc2626, transparent)"
                        opacity={0.5}
                    />
                </MotionModalContent>
            </Modal>
        </>
    );
};

export default UserProvider;