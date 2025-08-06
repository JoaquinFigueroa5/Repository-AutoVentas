import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    Button,
    Text,
    Box,
    Icon,
    VStack
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiLock, FiArrowLeft } from 'react-icons/fi';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const UnauthorizedModal = () => {
    const navigate = useNavigate();

    const handleRedirect = () => {
        localStorage.removeItem('user');
        navigate('/');
    };

    return (
        <Modal isOpen={true} isCentered onClose={handleRedirect}>
            <ModalOverlay
                bg="blackAlpha.900"
                backdropFilter="blur(12px)"
            />
            <ModalContent
                bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
                border={{ base: "1px solid", md: "2px solid" }}
                borderColor="red.500"
                borderRadius={{ base: "16px", md: "20px" }}
                boxShadow="0 25px 50px -12px rgba(220, 38, 127, 0.6), 0 0 0 1px rgba(220, 38, 127, 0.3), 0 0 30px rgba(220, 38, 127, 0.4)"
                maxW={{ base: "90vw", sm: "380px", md: "400px" }}
                minW={{ base: "280px", sm: "320px" }}
                mx={{ base: 2, sm: 4 }}
                my={{ base: 4, md: 0 }}
                position="relative"
                overflow="hidden"
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: { base: '2px', md: '3px' },
                    background: 'linear-gradient(90deg, transparent, #DC143C, #FF4500, #DC143C, transparent)',
                }}
            >
                <ModalHeader
                    textAlign="center"
                    pt={{ base: 6, md: 8 }}
                    pb={{ base: 1, md: 2 }}
                    px={{ base: 4, md: 6 }}
                    color="white"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                >
                    <VStack spacing={{ base: 3, md: 4 }}>
                        <MotionBox
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{ duration: 0.5, ease: "easeOut" }}
                        >
                            <Box
                                bg="linear-gradient(135deg, #DC143C, #B22222)"
                                borderRadius="full"
                                p={{ base: 3, md: 4 }}
                                boxShadow="0 15px 40px rgba(220, 20, 60, 0.5), 0 5px 15px rgba(220, 20, 60, 0.3)"
                                border={{ base: "1px solid", md: "2px solid" }}
                                borderColor="whiteAlpha.200"
                            >
                                <Icon as={FiLock} boxSize={{ base: 6, md: 8 }} color="white" />
                            </Box>
                        </MotionBox>
                        <Text
                            bgGradient="linear(to-r, #DC143C, #FF4500, #DC143C)"
                            bgClip="text"
                            fontSize={{ base: "xl", md: "2xl" }}
                            fontWeight="bold"
                            lineHeight="1.2"
                        >
                            Acceso Denegado
                        </Text>
                    </VStack>
                </ModalHeader>

                <ModalBody textAlign="center" py={{ base: 4, md: 6 }} px={{ base: 4, md: 6 }}>
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <Text
                            color="whiteAlpha.900"
                            fontSize={{ base: "md", md: "lg" }}
                            lineHeight="1.6"
                            mb={{ base: 3, md: 4 }}
                            fontWeight="medium"
                        >
                            No tienes los permisos necesarios para acceder a esta sección.
                        </Text>
                        <Text
                            color="whiteAlpha.700"
                            fontSize={{ base: "xs", md: "sm" }}
                        >
                            Por favor, inicia sesión con las credenciales adecuadas.
                        </Text>
                    </MotionBox>
                </ModalBody>

                <ModalFooter justifyContent="center" pb={{ base: 6, md: 8 }} px={{ base: 4, md: 6 }}>
                    <MotionButton
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        whileHover={{
                            scale: { base: 1.02, md: 1.05 },
                            boxShadow: "0 15px 35px rgba(220, 20, 60, 0.6), 0 5px 15px rgba(220, 20, 60, 0.4)"
                        }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                        onClick={handleRedirect}
                        bg="linear-gradient(135deg, #DC143C, #B22222)"
                        color="white"
                        size={{ base: "md", md: "lg" }}
                        borderRadius="full"
                        px={{ base: 6, md: 8 }}
                        py={{ base: 4, md: 6 }}
                        fontSize={{ base: "sm", md: "md" }}
                        fontWeight="bold"
                        leftIcon={<Icon as={FiArrowLeft} boxSize={{ base: 4, md: 5 }} />}
                        border={{ base: "1px solid", md: "2px solid" }}
                        borderColor="whiteAlpha.200"
                        w={{ base: "full", sm: "auto" }}
                        maxW={{ base: "280px", sm: "none" }}
                        _hover={{
                            bg: "linear-gradient(135deg, #FF4500, #DC143C)",
                            borderColor: "whiteAlpha.400",
                        }}
                        _active={{
                            bg: "linear-gradient(135deg, #B22222, #8B0000)",
                            borderColor: "whiteAlpha.300",
                        }}
                        position="relative"
                        overflow="hidden"
                        _before={{
                            content: '""',
                            position: 'absolute',
                            top: 0,
                            left: '-100%',
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.15), transparent)',
                            transition: 'left 0.6s ease',
                        }}
                        _after={{
                            content: '""',
                            position: 'absolute',
                            inset: 0,
                            borderRadius: 'full',
                            padding: { base: '1px', md: '2px' },
                            background: 'linear-gradient(135deg, #DC143C, transparent, #DC143C)',
                            mask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
                            maskComposite: 'exclude',
                        }}
                    >
                        Volver a la pagina principal
                    </MotionButton>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UnauthorizedModal;