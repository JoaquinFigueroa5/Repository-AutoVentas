import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    HStack,
    VStack,
    Input,
    InputGroup,
    InputLeftElement,
    InputRightElement,
    IconButton,
    FormControl,
    FormErrorMessage,
    Checkbox,
    Divider,
    useBreakpointValue,
    Image,
    Flex,
    Link,
    Badge,
    Circle
} from '@chakra-ui/react';
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Car,
    ArrowRight,
    Shield,
    Star,
    Zap
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useLogin } from '../shared/hooks/useLogin';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionFlex = motion(Flex);

const Login = () => {
    const [formState, setFormState] = useState({
        email: {
            value: "",
            isValid: false,
            showError: false,
        },
        password: {
            value: "",
            isValid: false,
            showError: false,
        },
    });

    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const { login, isLoading } = useLogin();

    // Responsive breakpoints mejorados
    const containerPadding = useBreakpointValue({
        base: 2,
        sm: 4,
        md: 6,
        lg: 8
    });
    const formMaxWidth = useBreakpointValue({
        base: "100%",
        sm: "400px",
        md: "450px",
        lg: "900px",
        xl: "1000px"
    });
    const headingSize = useBreakpointValue({
        base: "lg",
        sm: "xl",
        md: "2xl",
        lg: "2xl",
        xl: "3xl"
    });
    const textSize = useBreakpointValue({
        base: "sm",
        sm: "md",
        md: "md",
        lg: "lg"
    });
    const buttonSize = useBreakpointValue({
        base: "md",
        sm: "md",
        md: "lg"
    });
    const inputSize = useBreakpointValue({
        base: "md",
        sm: "md",
        md: "lg"
    });
    const logoSize = useBreakpointValue({
        base: "50px",
        sm: "60px",
        md: "70px",
        lg: "80px"
    });
    const containerHeight = useBreakpointValue({
        base: "auto",
        lg: "100vh"
    });
    const flexDirection = useBreakpointValue({
        base: "column",
        lg: "row"
    });
    const leftPanelDisplay = useBreakpointValue({
        base: "none",
        md: "flex",
        lg: "flex"
    });
    const rightPanelPadding = useBreakpointValue({
        base: 6,
        sm: 8,
        md: 10,
        lg: 12
    });
    const leftPanelPadding = useBreakpointValue({
        base: 6,
        sm: 8,
        md: 10,
        lg: 12
    });

    const validateEmail = (email) => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const validatePassword = (password) => {
        return password.length >= 6;
    };

    const handleInputChange = (field, value) => {
        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                value,
            }
        }));
    };

    const handleInputBlur = (field, value) => {
        let isValid = false;
        switch (field) {
            case 'email':
                isValid = validateEmail(value);
                break;
            case 'password':
                isValid = validatePassword(value);
                break;
            default:
                break;
        }

        setFormState(prev => ({
            ...prev,
            [field]: {
                ...prev[field],
                isValid,
                showError: !isValid && value.length > 0
            }
        }));
    };

    const handleLogin = async () => {
        login(formState.email.value, formState.password.value)
    };

    const isSubmitDisabled = !formState.email.isValid || !formState.password.isValid || isLoading;

    return (
        <Box bg="black" minH="100vh" position="relative" overflow="hidden">
            {/* Animated Background Elements - Responsive */}
            <Box
                position="absolute"
                top={{ base: "5%", md: "10%" }}
                right={{ base: "5%", md: "10%" }}
                opacity={0.1}
                display={{ base: "none", sm: "block" }}
            >
                <MotionBox
                    animate={{
                        rotate: 360,
                        scale: [1, 1.2, 1]
                    }}
                    transition={{
                        rotate: { duration: 20, repeat: Infinity, ease: "linear" },
                        scale: { duration: 4, repeat: Infinity, ease: "easeInOut" }
                    }}
                >
                    <Car size={useBreakpointValue({ base: 40, md: 60, lg: 80 })} color="#ef4444" />
                </MotionBox>
            </Box>

            <Box
                position="absolute"
                bottom={{ base: "10%", md: "15%" }}
                left={{ base: "2%", md: "5%" }}
                opacity={0.05}
                display={{ base: "none", md: "block" }}
            >
                <MotionBox
                    animate={{
                        y: [-20, 20, -20]
                    }}
                    transition={{
                        duration: 6,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                >
                    <Circle
                        size={useBreakpointValue({ base: "80px", md: "120px", lg: "150px" })}
                        bg="red.500"
                    />
                </MotionBox>
            </Box>

            <Container
                maxW="7xl"
                h={containerHeight}
                p={containerPadding}
                display="flex"
                alignItems="center"
                justifyContent="center"
                minH="100vh"
            >
                <MotionFlex
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    direction={flexDirection}
                    bg="gray.900"
                    borderRadius={{ base: "xl", md: "2xl" }}
                    overflow="hidden"
                    boxShadow={{
                        base: "0 10px 25px -5px rgba(0, 0, 0, 0.6)",
                        md: "0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                    }}
                    border="1px solid"
                    borderColor="gray.800"
                    maxW={formMaxWidth}
                    w="100%"
                    mx={{ base: 2, sm: 4 }}
                    my={{ base: 4, lg: 0 }}
                >
                    {/* Left Panel - Branding - Hidden on small screens */}
                    <MotionBox
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                        flex="1"
                        bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)"
                        p={leftPanelPadding}
                        display={leftPanelDisplay}
                        flexDirection="column"
                        justifyContent="center"
                        position="relative"
                        minH={{ base: "auto", md: "500px", lg: "600px" }}
                    >
                        {/* Decorative elements - Responsive */}
                        <Box
                            position="absolute"
                            top={{ base: "15px", md: "20px" }}
                            right={{ base: "15px", md: "20px" }}
                            opacity={0.3}
                        >
                            <Star size={useBreakpointValue({ base: 18, md: 24 })} color="#ef4444" />
                        </Box>
                        <Box
                            position="absolute"
                            bottom={{ base: "15px", md: "20px" }}
                            left={{ base: "15px", md: "20px" }}
                            opacity={0.2}
                        >
                            <Zap size={useBreakpointValue({ base: 16, md: 20 })} color="#ef4444" />
                        </Box>

                        <VStack align="start" spacing={{ base: 4, md: 6 }}>
                            {/* Logo - Responsive */}
                            <HStack spacing={{ base: 3, md: 4 }}>
                                <MotionBox
                                    animate={{
                                        rotate: [0, 5, -5, 0]
                                    }}
                                    transition={{
                                        duration: 4,
                                        repeat: Infinity,
                                        ease: "easeInOut"
                                    }}
                                    p={{ base: 2, md: 3 }}
                                    bg="whiteAlpha.900"
                                    borderRadius={{ base: "lg", md: "xl" }}
                                    boxShadow="0 10px 25px rgba(255, 0, 0, 0.3)"
                                    w={logoSize}
                                    h={logoSize}
                                >
                                    <Image
                                        src="https://res.cloudinary.com/dbh9jfkoh/image/upload/v1752969460/LogoJuanes_ner8yk.png"
                                        w="100%"
                                        h="100%"
                                        objectFit="contain"
                                    />
                                </MotionBox>
                                <VStack align="flex-start" spacing={0}>
                                    <Heading
                                        color="white"
                                        size={{ base: "md", md: "lg" }}
                                        fontWeight="bold"
                                    >
                                        <Text as="span" color="red.500">Auto</Text>
                                        <Text as="span">Ventas</Text>
                                    </Heading>
                                    <Text
                                        color="red.500"
                                        fontSize={{ base: "md", md: "xl" }}
                                        letterSpacing="wider"
                                        fontWeight="bold"
                                    >
                                        Juanes
                                    </Text>
                                </VStack>
                            </HStack>

                            <Box>
                                <Heading
                                    color="white"
                                    size={headingSize}
                                    mb={4}
                                    lineHeight="1.2"
                                >
                                    Bienvenido de vuelta
                                </Heading>
                                <Text
                                    color="gray.400"
                                    fontSize={textSize}
                                    lineHeight="1.6"
                                >
                                    Accede a tu panel administrativo y gestiona tu
                                    predio de manera eficiente.
                                </Text>
                            </Box>

                            {/* Features - Responsive */}
                            <VStack align="start" spacing={{ base: 3, md: 4 }}>
                                {[
                                    { icon: <Shield />, text: "Acceso seguro y encriptado" },
                                    { icon: <Zap />, text: "Dashboard en tiempo real" },
                                    { icon: <Star />, text: "Gestión premium de vehículos" }
                                ].map((feature, index) => (
                                    <MotionBox
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: 0.5 + index * 0.1, duration: 0.5 }}
                                    >
                                        <HStack spacing={{ base: 2, md: 3 }}>
                                            <Box color="red.500">
                                                {React.cloneElement(feature.icon, {
                                                    size: useBreakpointValue({ base: 14, md: 16 })
                                                })}
                                            </Box>
                                            <Text
                                                color="gray.300"
                                                fontSize={{ base: "xs", md: "sm" }}
                                            >
                                                {feature.text}
                                            </Text>
                                        </HStack>
                                    </MotionBox>
                                ))}
                            </VStack>
                        </VStack>
                    </MotionBox>

                    {/* Right Panel - Login Form */}
                    <MotionBox
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.4, duration: 0.6 }}
                        flex="1"
                        p={rightPanelPadding}
                        bg="gray.900"
                        minH={{ base: "auto", md: "500px", lg: "600px" }}
                        w="100%"
                    >
                        <VStack
                            spacing={{ base: 6, md: 8 }}
                            h="100%"
                            justify="center"
                            w="100%"
                            maxW={{ base: "100%", sm: "400px" }}
                            mx="auto"
                        >
                            {/* Header con logo móvil */}
                            <VStack spacing={3} textAlign="center" w="100%">
                                {/* Logo móvil - Solo visible en pantallas pequeñas */}
                                <Box display={{ base: "block", md: "none" }} mb={2}>
                                    <HStack justify="center" spacing={3}>
                                        <MotionBox
                                            animate={{
                                                rotate: [0, 5, -5, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                            p={2}
                                            bg="whiteAlpha.900"
                                            borderRadius="lg"
                                            boxShadow="0 10px 25px rgba(255, 0, 0, 0.3)"
                                            w="50px"
                                            h="50px"
                                        >
                                            <Image
                                                src="https://res.cloudinary.com/dbh9jfkoh/image/upload/v1752969460/LogoJuanes_ner8yk.png"
                                                w="100%"
                                                h="100%"
                                                objectFit="contain"
                                            />
                                        </MotionBox>
                                        <VStack align="flex-start" spacing={0}>
                                            <Heading color="white" size="sm" fontWeight="bold">
                                                <Text as="span" color="red.500">Auto</Text>
                                                <Text as="span">Ventas</Text>
                                            </Heading>
                                            <Text color="red.500" fontSize="md" letterSpacing="wider" fontWeight="bold">
                                                Juanes
                                            </Text>
                                        </VStack>
                                    </HStack>
                                </Box>

                                <Heading
                                    color="white"
                                    size={useBreakpointValue({ base: "lg", md: "xl" })}
                                    fontWeight="bold"
                                >
                                    Iniciar Sesión
                                </Heading>
                                <Text
                                    color="gray.400"
                                    fontSize={useBreakpointValue({ base: "sm", md: "md" })}
                                >
                                    Ingresa tus credenciales para continuar
                                </Text>
                                <Badge
                                    colorScheme="red"
                                    variant="subtle"
                                    px={3}
                                    py={1}
                                    fontSize={{ base: "xs", md: "sm" }}
                                >
                                    Panel Administrativo
                                </Badge>
                            </VStack>

                            <VStack spacing={{ base: 5, md: 6 }} w="100%">
                                {/* Email Field */}
                                <FormControl isInvalid={formState.email.showError}>
                                    <InputGroup size={inputSize}>
                                        <InputLeftElement pointerEvents="none">
                                            <Mail color="#ef4444" size={18} />
                                        </InputLeftElement>
                                        <Input
                                            type="email"
                                            placeholder="Correo electrónico"
                                            value={formState.email.value}
                                            onChange={(e) => handleInputChange('email', e.target.value)}
                                            onBlur={(e) => handleInputBlur('email', e.target.value)}
                                            bg="gray.800"
                                            border="2px solid"
                                            borderColor={formState.email.showError ? "red.500" : "gray.700"}
                                            color="white"
                                            fontSize={{ base: "sm", md: "md" }}
                                            _placeholder={{ color: "gray.400" }}
                                            _hover={{ borderColor: "red.500" }}
                                            _focus={{
                                                borderColor: "red.500",
                                                boxShadow: "0 0 0 1px #ef4444"
                                            }}
                                            borderRadius="lg"
                                            autoComplete='email'
                                            required
                                        />
                                    </InputGroup>
                                    <AnimatePresence>
                                        {formState.email.showError && (
                                            <MotionBox
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FormErrorMessage fontSize={{ base: "xs", md: "sm" }}>
                                                    Por favor ingresa un correo válido
                                                </FormErrorMessage>
                                            </MotionBox>
                                        )}
                                    </AnimatePresence>
                                </FormControl>

                                {/* Password Field */}
                                <FormControl isInvalid={formState.password.showError}>
                                    <InputGroup size={inputSize}>
                                        <InputLeftElement pointerEvents="none">
                                            <Lock color="#ef4444" size={18} />
                                        </InputLeftElement>
                                        <Input
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Contraseña"
                                            value={formState.password.value}
                                            onChange={(e) => handleInputChange('password', e.target.value)}
                                            onBlur={(e) => handleInputBlur('password', e.target.value)}
                                            bg="gray.800"
                                            border="2px solid"
                                            borderColor={formState.password.showError ? "red.500" : "gray.700"}
                                            color="white"
                                            fontSize={{ base: "sm", md: "md" }}
                                            _placeholder={{ color: "gray.400" }}
                                            _hover={{ borderColor: "red.500" }}
                                            _focus={{
                                                borderColor: "red.500",
                                                boxShadow: "0 0 0 1px #ef4444"
                                            }}
                                            borderRadius="lg"
                                            autoComplete='current-password'
                                            required
                                        />
                                        <InputRightElement>
                                            <IconButton
                                                aria-label="Toggle password visibility"
                                                icon={showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                variant="ghost"
                                                color="gray.400"
                                                size="sm"
                                                _hover={{ color: "red.500" }}
                                                onClick={() => setShowPassword(!showPassword)}
                                            />
                                        </InputRightElement>
                                    </InputGroup>
                                    <AnimatePresence>
                                        {formState.password.showError && (
                                            <MotionBox
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                            >
                                                <FormErrorMessage fontSize={{ base: "xs", md: "sm" }}>
                                                    La contraseña debe tener al menos 6 caracteres
                                                </FormErrorMessage>
                                            </MotionBox>
                                        )}
                                    </AnimatePresence>
                                </FormControl>

                                {/* Forgot Password */}
                                <Flex justify="flex-end" w="100%">
                                    <Link
                                        as='a'
                                        color="red.400"
                                        fontSize={{ base: "xs", md: "sm" }}
                                        _hover={{ color: "red.300", textDecoration: "underline" }}
                                        href={`https://wa.me/50258694127?text=${encodeURIComponent('Ayudame cerote...')}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        ¿Olvidaste tu contraseña?
                                    </Link>
                                </Flex>

                                {/* Login Button */}
                                <MotionButton
                                    whileHover={{ scale: isSubmitDisabled ? 1 : 1.02 }}
                                    whileTap={{ scale: isSubmitDisabled ? 1 : 0.98 }}
                                    bg="red.500"
                                    color="white"
                                    size={buttonSize}
                                    w="100%"
                                    _hover={{ bg: isSubmitDisabled ? "red.500" : "red.600" }}
                                    _disabled={{
                                        opacity: 0.6,
                                        cursor: "not-allowed"
                                    }}
                                    isDisabled={isSubmitDisabled}
                                    isLoading={isLoading}
                                    loadingText="Iniciando sesión..."
                                    onClick={handleLogin}
                                    rightIcon={!isLoading ? <ArrowRight size={18} /> : null}
                                    borderRadius="lg"
                                    h={{ base: "48px", md: "56px" }}
                                    fontWeight="bold"
                                    fontSize={{ base: "sm", md: "md" }}
                                    boxShadow="0 4px 15px rgba(239, 68, 68, 0.3)"
                                >
                                    Iniciar Sesión
                                </MotionButton>
                            </VStack>

                            <Divider borderColor="gray.700" />

                            {/* Footer */}
                            <VStack spacing={{ base: 2, md: 3 }} w="100%">
                                <Text
                                    color="gray.500"
                                    fontSize={{ base: "xs", md: "sm" }}
                                    textAlign="center"
                                    lineHeight="1.5"
                                >
                                    ¿No tienes cuenta?{' '}
                                    <Link
                                        as='a'
                                        color="red.400"
                                        _hover={{ color: "red.300" }}
                                        href={`https://wa.me/50258694127?text=${encodeURIComponent('Ayudame cerote...')}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Contacta al administrador
                                    </Link>
                                </Text>
                                <HStack spacing={2} justify="center">
                                    <Text color="gray.600" fontSize={{ base: "xs", md: "xs" }}>
                                        Protegido por
                                    </Text>
                                    <Shield size={12} color="#ef4444" />
                                    <Text
                                        color="red.400"
                                        fontSize={{ base: "xs", md: "xs" }}
                                        fontWeight="medium"
                                    >
                                        Premium Security
                                    </Text>
                                </HStack>
                            </VStack>
                        </VStack>
                    </MotionBox>
                </MotionFlex>
            </Container>
        </Box>
    );
};

export default Login;