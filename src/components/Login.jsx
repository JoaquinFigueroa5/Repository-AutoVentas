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
    const { login, isLoading} = useLogin();

    // Responsive values
    const containerPadding = useBreakpointValue({ base: 4, md: 8 });
    const formWidth = useBreakpointValue({ base: "100%", md: "400px", lg: "450px" });
    const headingSize = useBreakpointValue({ base: "xl", md: "2xl", lg: "3xl" });
    const textSize = useBreakpointValue({ base: "md", md: "lg" });
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });

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
            {/* Animated Background Elements */}
            <Box position="absolute" top="10%" right="10%" opacity={0.1}>
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
                    <Car size={80} color="#ef4444" />
                </MotionBox>
            </Box>

            <Box position="absolute" bottom="15%" left="5%" opacity={0.05}>
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
                    <Circle size="150px" bg="red.500" />
                </MotionBox>
            </Box>

            <Container maxW="7xl" h="100vh" p={0}>
                <Flex h="100%" align="center" justify="center">
                    <MotionFlex
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8, ease: "easeOut" }}
                        direction={{ base: "column", lg: "row" }}
                        bg="gray.900"
                        borderRadius="2xl"
                        overflow="hidden"
                        boxShadow="0 25px 50px -12px rgba(0, 0, 0, 0.8)"
                        border="1px solid"
                        borderColor="gray.800"
                        maxW="900px"
                        w="100%"
                        mx={4}
                    >
                        {/* Left Panel - Branding */}
                        <MotionBox
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3, duration: 0.6 }}
                            flex="1"
                            bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)"
                            p={{ base: 8, md: 12 }}
                            display="flex"
                            flexDirection="column"
                            justifyContent="center"
                            position="relative"
                        >
                            {/* Decorative elements */}
                            <Box position="absolute" top="20px" right="20px" opacity={0.3}>
                                <Star size={24} color="#ef4444" />
                            </Box>
                            <Box position="absolute" bottom="20px" left="20px" opacity={0.2}>
                                <Zap size={20} color="#ef4444" />
                            </Box>

                            <VStack align="start" spacing={6}>
                                {/* Logo */}
                                <HStack>
                                    <MotionBox
                                        animate={{
                                            rotate: [0, 5, -5, 0]
                                        }}
                                        transition={{
                                            duration: 4,
                                            repeat: Infinity,
                                            ease: "easeInOut"
                                        }}
                                        p={3}
                                        bg="red.500"
                                        borderRadius="xl"
                                        boxShadow="0 10px 25px rgba(239, 68, 68, 0.3)"
                                    >
                                        <Car size={32} color="white" />
                                    </MotionBox>
                                    <VStack align="start" spacing={0}>
                                        <Heading color="white" size="lg" fontWeight="bold">
                                            Premium Cars
                                        </Heading>
                                        <Text color="red.400" fontSize="sm" fontWeight="medium">
                                            Dashboard Admin
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
                                    <Text color="gray.400" fontSize={textSize} lineHeight="1.6">
                                        Accede a tu panel administrativo y gestiona tu
                                        concesionario de manera eficiente.
                                    </Text>
                                </Box>

                                {/* Features */}
                                <VStack align="start" spacing={4}>
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
                                            <HStack>
                                                <Box color="red.500">
                                                    {React.cloneElement(feature.icon, { size: 16 })}
                                                </Box>
                                                <Text color="gray.300" fontSize="sm">
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
                            p={{ base: 8, md: 12 }}
                            bg="gray.900"
                        >
                            <VStack spacing={8} h="100%" justify="center">
                                <VStack spacing={2} textAlign="center">
                                    <Heading color="white" size="xl" fontWeight="bold">
                                        Iniciar Sesión
                                    </Heading>
                                    <Text color="gray.400" fontSize="md">
                                        Ingresa tus credenciales para continuar
                                    </Text>
                                    <Badge colorScheme="red" variant="subtle" px={3} py={1}>
                                        Panel Administrativo
                                    </Badge>
                                </VStack>

                                <VStack spacing={6} w="100%">
                                    {/* Email Field */}
                                    <FormControl isInvalid={formState.email.showError}>
                                        <InputGroup size="lg">
                                            <InputLeftElement pointerEvents="none">
                                                <Mail color="#ef4444" size={20} />
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
                                                _placeholder={{ color: "gray.400" }}
                                                _hover={{ borderColor: "red.500" }}
                                                _focus={{
                                                    borderColor: "red.500",
                                                    boxShadow: "0 0 0 1px #ef4444"
                                                }}
                                                borderRadius="lg"
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
                                                    <FormErrorMessage>
                                                        Por favor ingresa un correo válido
                                                    </FormErrorMessage>
                                                </MotionBox>
                                            )}
                                        </AnimatePresence>
                                    </FormControl>

                                    {/* Password Field */}
                                    <FormControl isInvalid={formState.password.showError}>
                                        <InputGroup size="lg">
                                            <InputLeftElement pointerEvents="none">
                                                <Lock color="#ef4444" size={20} />
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
                                                _placeholder={{ color: "gray.400" }}
                                                _hover={{ borderColor: "red.500" }}
                                                _focus={{
                                                    borderColor: "red.500",
                                                    boxShadow: "0 0 0 1px #ef4444"
                                                }}
                                                borderRadius="lg"
                                            />
                                            <InputRightElement>
                                                <IconButton
                                                    aria-label="Toggle password visibility"
                                                    icon={showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                                    variant="ghost"
                                                    color="gray.400"
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
                                                    <FormErrorMessage>
                                                        La contraseña debe tener al menos 6 caracteres
                                                    </FormErrorMessage>
                                                </MotionBox>
                                            )}
                                        </AnimatePresence>
                                    </FormControl>

                                    {/* Remember Me & Forgot Password */}
                                    <Flex justify="space-between" align="center" w="100%">
                                        <Checkbox
                                            isChecked={rememberMe}
                                            onChange={(e) => setRememberMe(e.target.checked)}
                                            colorScheme="red"
                                            color="gray.300"
                                            size="md"
                                        >
                                            Recordarme
                                        </Checkbox>
                                        <Link
                                            color="red.400"
                                            fontSize="sm"
                                            _hover={{ color: "red.300", textDecoration: "underline" }}
                                        >
                                            ¿Olvidaste tu contraseña?
                                        </Link>
                                    </Flex>

                                    {/* Login Button */}
                                    <MotionButton
                                        whileHover={{ scale: isSubmitDisabled ? 1 : 1.05 }}
                                        whileTap={{ scale: isSubmitDisabled ? 1 : 0.95 }}
                                        bg="red.500"
                                        color="white"
                                        size="lg"
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
                                        rightIcon={!isLoading ? <ArrowRight size={20} /> : null}
                                        borderRadius="lg"
                                        h="56px"
                                        fontWeight="bold"
                                        boxShadow="0 4px 15px rgba(239, 68, 68, 0.3)"
                                    >
                                        Iniciar Sesión
                                    </MotionButton>
                                </VStack>

                                <Divider borderColor="gray.700" />

                                {/* Footer */}
                                <VStack spacing={2}>
                                    <Text color="gray.500" fontSize="sm" textAlign="center">
                                        ¿No tienes cuenta?{' '}
                                        <Link color="red.400" _hover={{ color: "red.300" }}>
                                            Contacta al administrador
                                        </Link>
                                    </Text>
                                    <HStack spacing={2}>
                                        <Text color="gray.600" fontSize="xs">
                                            Protegido por
                                        </Text>
                                        <Shield size={14} color="#ef4444" />
                                        <Text color="red.400" fontSize="xs" fontWeight="medium">
                                            Premium Security
                                        </Text>
                                    </HStack>
                                </VStack>
                            </VStack>
                        </MotionBox>
                    </MotionFlex>
                </Flex>
            </Container>
        </Box>
    );
};

export default Login;