import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    VStack,
    HStack,
    Grid,
    GridItem,
    Image,
    Icon,
    Badge,
    Flex,
    useBreakpointValue,
    SimpleGrid,
    Avatar,
    Divider
} from '@chakra-ui/react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Car, Droplets, Shield, Clock, Star, Phone, MapPin, Mail, Zap, Award, Users, CheckCircle, ArrowRight, Sparkles } from 'lucide-react';
import PremiumNavbar from './NavBar';

const MotionBox = motion(Box);
const MotionText = motion(Text);
const MotionHeading = motion(Heading);

const Services = () => {
    const [isLoaded, setIsLoaded] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const { scrollY } = useScroll();
    const y1 = useTransform(scrollY, [0, 1000], [0, -200]);
    const y2 = useTransform(scrollY, [0, 1000], [0, 100]);
    const smoothY = useSpring(y1, { stiffness: 100, damping: 30 });

    const servicesRef = useRef(null);
    const reservationsRef = useRef(null);

    // Responsive breakpoint values
    const heroColumns = useBreakpointValue({ base: "1fr", lg: "1fr 1fr" });
    const heroImageHeight = useBreakpointValue({ base: "400px", md: "500px", lg: "600px" });
    const heroSpacing = useBreakpointValue({ base: 8, md: 10, lg: 12 });
    const containerMaxW = useBreakpointValue({ base: "container.sm", md: "container.md", lg: "container.xl" });
    const headingSize = useBreakpointValue({ base: "2xl", md: "3xl", lg: "4xl" });
    const textSize = useBreakpointValue({ base: "md", md: "lg", lg: "xl" });
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
    const statsColumns = useBreakpointValue({ base: "repeat(2, 1fr)", sm: "repeat(2, 1fr)", md: "repeat(4, 1fr)" });
    const servicesColumns = useBreakpointValue({ base: "1fr", md: "repeat(2, 1fr)", lg: "repeat(3, 1fr)" });
    const testimonialsColumns = useBreakpointValue({ base: 1, md: 2, lg: 3 });
    const contactColumns = useBreakpointValue({ base: 1, sm: 2, md: 3 });

    const services = [
        {
            icon: Droplets,
            title: "Lavado Premium",
            description: "Limpieza profunda con productos biodegradables de última generación",
            price: "Q25",
            features: ["Shampoo premium", "Encerado básico", "Limpieza de llantas"],
            duration: "30 min",
            popular: false
        },
        {
            icon: Shield,
            title: "Detallado Elite",
            description: "Protección completa con tecnología nanoceramic y acabado espejo",
            price: "Q45",
            features: ["Lavado premium", "Protección UV", "Encerado ceramico", "Interior completo"],
            duration: "60 min",
            popular: true
        },
        {
            icon: Sparkles,
            title: "Experiencia VIP",
            description: "El tratamiento más exclusivo con servicios adicionales de lujo",
            price: "Q75",
            features: ["Todo incluido", "Perfumado especial", "Limpieza motor", "Garantía 30 días"],
            duration: "90 min",
            popular: false
        }
    ];

    const testimonials = [
        {
            name: "Joaquin Figueroa",
            role: "Ingeniero",
            text: "Muy buen servicio, como si mi carro nunca hubiera pasado por el basurero de la zona 3.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Jeremy Miranda",
            role: "Joyero",
            text: "Excelente, ni en mi espejo me veo asi de claro.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1494790108755-2616b3e16c3e?w=100&h=100&fit=crop&crop=face"
        },
        {
            name: "Saul de Leon",
            role: "Ingeniero",
            text: "Increíble, ni el carwash del GTA.",
            rating: 5,
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop&crop=face"
        }
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.3,
                staggerChildren: 0.15
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { duration: 0.6, ease: "easeOut" }
        }
    };

    const floatingVariants = {
        animate: {
            y: [-10, 10, -10],
            rotate: [0, 5, -5, 0],
            transition: {
                duration: 6,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    const scrollTo = (ref) =>
        ref?.current?.scrollIntoView({ behavior: "smooth", block: "center" })

    return (
        <>
            <PremiumNavbar />
            <Box bg="black" color="white" minH="100vh" overflow="hidden" position="relative">
                {/* Hero Section */}
                <Box position="relative" minH={{ base: "90vh", md: "100vh" }} display="flex" alignItems="center">
                    {/* Enhanced Background Elements - Responsive */}
                    <MotionBox
                        position="absolute"
                        top={{ base: "10%", md: "15%" }}
                        right={{ base: "5%", md: "10%" }}
                        w={{ base: "200px", md: "250px", lg: "300px" }}
                        h={{ base: "200px", md: "250px", lg: "300px" }}
                        borderRadius="full"
                        bg="linear-gradient(135deg, #FF0000, #FF6B6B, #FF0000)"
                        opacity={0.08}
                        style={{ y: smoothY }}
                        animate={{
                            scale: [1, 1.3, 1],
                            rotate: [0, 360]
                        }}
                        transition={{
                            duration: 25,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <MotionBox
                        position="absolute"
                        bottom={{ base: "5%", md: "10%" }}
                        left={{ base: "2%", md: "5%" }}
                        w={{ base: "150px", md: "180px", lg: "200px" }}
                        h={{ base: "150px", md: "180px", lg: "200px" }}
                        borderRadius="30px"
                        bg="linear-gradient(45deg, #FFFFFF10, #FF000010)"
                        style={{ y: y2 }}
                        animate={{
                            rotate: [0, -360],
                            scale: [1, 1.1, 1]
                        }}
                        transition={{
                            duration: 20,
                            repeat: Infinity,
                            ease: "linear"
                        }}
                    />

                    <Container maxW={containerMaxW} zIndex={2} px={{ base: 4, md: 6, lg: 8 }}>
                        <Grid
                            templateColumns={heroColumns}
                            gap={heroSpacing}
                            alignItems="center"
                            minH={{ base: "auto", lg: "600px" }}
                        >
                            <GridItem order={{ base: 2, lg: 1 }}>
                                <MotionBox
                                    initial={{ opacity: 0, x: -80 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1, ease: "easeOut" }}
                                >
                                    <VStack align={{ base: "center", lg: "start" }} spacing={{ base: 6, md: 8 }} textAlign={{ base: "center", lg: "left" }}>

                                        <MotionHeading
                                            as="h1"
                                            size={headingSize}
                                            fontWeight="black"
                                            lineHeight="1.1"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.3, duration: 0.8 }}
                                        >
                                            EXPERIENCIA
                                            <Text as="span"
                                                bgGradient="linear(to-r, red.400, red.600)"
                                                bgClip="text"
                                                display="block"
                                            >
                                                PREMIUM
                                            </Text>
                                            PARA TU AUTO
                                        </MotionHeading>

                                        <MotionText
                                            fontSize={textSize}
                                            color="gray.300"
                                            maxW={{ base: "100%", lg: "500px" }}
                                            lineHeight="1.7"
                                            initial={{ opacity: 0, y: 30 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: 0.5, duration: 0.8 }}
                                        >
                                            Tecnología de vanguardia, productos eco-friendly premium y el mejor servicio al cliente de Guatemala.
                                            <Text as="span" color="red.400" fontWeight="semibold" display={{ base: "block", md: "inline" }}>
                                                {" "}¡Tu auto merece lo mejor!
                                            </Text>
                                        </MotionText>

                                        <VStack spacing={{ base: 4, md: 6 }} w="100%">
                                            <Flex
                                                direction={{ base: "column", sm: "row" }}
                                                gap={{ base: 4, sm: 6 }}
                                                justify={{ base: "center", lg: "flex-start" }}
                                                w="100%"
                                                flexWrap="wrap"
                                            >
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.7, duration: 0.5 }}
                                                    whileHover={{ scale: 1.05 }}
                                                    whileTap={{ scale: 0.95 }}
                                                >
                                                    <Button
                                                        size={buttonSize}
                                                        bg="linear-gradient(45deg, #FF0000, #FF4444)"
                                                        color="white"
                                                        px={{ base: 6, md: 10 }}
                                                        py={{ base: 6, md: 8 }}
                                                        borderRadius="full"
                                                        rightIcon={<ArrowRight size={20} />}
                                                        fontSize={{ base: "md", md: "lg" }}
                                                        fontWeight="bold"
                                                        _hover={{
                                                            transform: "translateY(-3px)",
                                                            boxShadow: "0 15px 35px rgba(255, 0, 0, 0.4)"
                                                        }}
                                                        transition="all 0.3s ease"
                                                        position="relative"
                                                        overflow="hidden"
                                                        onClick={() => scrollTo(reservationsRef)}
                                                        w={{ base: "full", sm: "auto" }}
                                                    >
                                                        RESERVAR AHORA
                                                    </Button>
                                                </motion.div>

                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0.8 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: 0.9, duration: 0.5 }}
                                                    whileHover={{ scale: 1.05 }}
                                                >
                                                    <Button
                                                        size={buttonSize}
                                                        variant="outline"
                                                        borderColor="white"
                                                        borderWidth="2px"
                                                        color="white"
                                                        px={{ base: 6, md: 10 }}
                                                        py={{ base: 6, md: 8 }}
                                                        borderRadius="full"
                                                        fontSize={{ base: "md", md: "lg" }}
                                                        _hover={{
                                                            bg: "white",
                                                            color: "black",
                                                            transform: "translateY(-3px)",
                                                            boxShadow: "0 15px 35px rgba(255, 255, 255, 0.2)"
                                                        }}
                                                        transition="all 0.3s ease"
                                                        onClick={() => scrollTo(servicesRef)}
                                                        w={{ base: "full", sm: "auto" }}
                                                    >
                                                        VER SERVICIOS
                                                    </Button>
                                                </motion.div>
                                            </Flex>

                                            {/* Trust indicators - Responsive */}
                                            <Flex
                                                justify={{ base: "center", lg: "flex-start" }}
                                                gap={{ base: 4, md: 8 }}
                                                pt={4}
                                                w="100%"
                                                flexWrap="wrap"
                                            >
                                                <VStack spacing={1}>
                                                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="black" color="red.500">150+</Text>
                                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">Clientes</Text>
                                                </VStack>
                                                <VStack spacing={1}>
                                                    <HStack>
                                                        {[...Array(5)].map((_, i) => (
                                                            <Icon key={i} as={Star} color="yellow.400" fill="currentColor" boxSize={{ base: "12px", md: "16px" }} />
                                                        ))}
                                                    </HStack>
                                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">5.0 Rating</Text>
                                                </VStack>
                                                <VStack spacing={1}>
                                                    <Text fontSize={{ base: "xl", md: "2xl" }} fontWeight="black" color="red.500">99%</Text>
                                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.400">Satisfacción</Text>
                                                </VStack>
                                            </Flex>
                                        </VStack>
                                    </VStack>
                                </MotionBox>
                            </GridItem>

                            <GridItem order={{ base: 1, lg: 2 }}>
                                <MotionBox
                                    initial={{ opacity: 0, x: 80 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 1.2 }}
                                    position="relative"
                                    mb={{ base: 8, lg: 0 }}
                                >
                                    <Box
                                        w="100%"
                                        h={heroImageHeight}
                                        bg="linear-gradient(135deg, #FF0000, #000000, #FF0000)"
                                        borderRadius={{ base: "20px", md: "25px", lg: "30px" }}
                                        position="relative"
                                        overflow="hidden"
                                        display="flex"
                                        alignItems="center"
                                        justifyContent="center"
                                        border="2px solid"
                                        borderColor="red.500"
                                        boxShadow="0 25px 50px rgba(255, 0, 0, 0.2)"
                                    >
                                        <motion.div
                                            animate={{
                                                scale: [1, 1.1, 1],
                                                rotateY: [0, 15, 0]
                                            }}
                                            transition={{
                                                duration: 4,
                                                repeat: Infinity,
                                                ease: "easeInOut"
                                            }}
                                        >
                                            <Image
                                                src='https://res.cloudinary.com/dbh9jfkoh/image/upload/v1752969460/LogoJuanes_ner8yk.png'
                                                borderRadius={{ base: 15, md: 20, lg: 25 }}
                                                maxW={{ base: "80%", md: "70%", lg: "60%" }}
                                                h="auto"
                                            />
                                        </motion.div>

                                        {/* Enhanced animated bubbles - Responsive */}
                                        {[...Array(8)].map((_, i) => (
                                            <MotionBox
                                                key={i}
                                                position="absolute"
                                                w={`${Math.random() * 20 + 10}px`}
                                                h={`${Math.random() * 20 + 10}px`}
                                                bg="white"
                                                borderRadius="full"
                                                opacity={0.4}
                                                top={`${Math.random() * 80 + 10}%`}
                                                left={`${Math.random() * 80 + 10}%`}
                                                animate={{
                                                    y: [-30, -60, -30],
                                                    opacity: [0.4, 0.8, 0.4],
                                                    scale: [1, 1.2, 1]
                                                }}
                                                transition={{
                                                    duration: 3 + Math.random() * 3,
                                                    repeat: Infinity,
                                                    delay: Math.random() * 3
                                                }}
                                            />
                                        ))}

                                        {/* Glow effect */}
                                        <Box
                                            position="absolute"
                                            top={0}
                                            left={0}
                                            right={0}
                                            bottom={0}
                                            bg="radial-gradient(circle at center, rgba(255,0,0,0.3), transparent 70%)"
                                            borderRadius={{ base: "20px", md: "25px", lg: "30px" }}
                                        />
                                    </Box>
                                </MotionBox>
                            </GridItem>
                        </Grid>
                    </Container>
                </Box>

                {/* Enhanced Services Section */}
                <Box py={{ base: 16, md: 24, lg: 32 }} bg="linear-gradient(135deg, #0a0a0a, #1a1a1a)" position="relative" ref={servicesRef}>
                    <Container maxW={containerMaxW} px={{ base: 4, md: 6, lg: 8 }}>
                        <motion.div
                            variants={containerVariants}
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true }}
                        >
                            <VStack spacing={{ base: 12, md: 16, lg: 20 }}>
                                <VStack spacing={{ base: 4, md: 6 }} textAlign="center">
                                    <motion.div variants={itemVariants}>
                                        <Heading size={{ base: "xl", md: "2xl", lg: "3xl" }} fontWeight="black" textAlign="center">
                                            ELIGE TU
                                            <Text as="span"
                                                bgGradient="linear(to-r, red.400, red.600)"
                                                bgClip="text"
                                            > EXPERIENCIA</Text>
                                        </Heading>
                                    </motion.div>

                                    <motion.div variants={itemVariants}>
                                        <Text
                                            fontSize={{ base: "md", md: "lg", lg: "xl" }}
                                            color="gray.400"
                                            maxW={{ base: "100%", md: "600px", lg: "700px" }}
                                            lineHeight="1.7"
                                            px={{ base: 4, md: 0 }}
                                        >
                                            Cada servicio está diseñado meticulosamente para brindar resultados excepcionales
                                            con la más alta atención al detalle y tecnología de vanguardia.
                                        </Text>
                                    </motion.div>
                                </VStack>

                                <Grid templateColumns={servicesColumns} gap={{ base: 6, md: 8 }} w="100%">
                                    {services.map((service, index) => (
                                        <motion.div
                                            key={index}
                                            variants={itemVariants}
                                            whileHover={{ y: -15, scale: 1.02 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <Box
                                                bg="black"
                                                p={{ base: 6, md: 8 }}
                                                borderRadius={{ base: "20px", md: "25px" }}
                                                border="2px solid"
                                                borderColor={service.popular ? "red.500" : "gray.800"}
                                                position="relative"
                                                overflow="hidden"
                                                _hover={{
                                                    borderColor: "red.500",
                                                    boxShadow: "0 25px 50px rgba(255, 0, 0, 0.15)"
                                                }}
                                                transition="all 0.4s ease"
                                                h="100%"
                                            >
                                                {service.popular && (
                                                    <Badge
                                                        position="absolute"
                                                        top={4}
                                                        right={4}
                                                        bg="linear-gradient(45deg, #FF0000, #FF4444)"
                                                        color="white"
                                                        px={3}
                                                        py={1}
                                                        borderRadius="full"
                                                        fontSize="xs"
                                                        fontWeight="bold"
                                                    >
                                                        🔥 POPULAR
                                                    </Badge>
                                                )}

                                                <VStack spacing={{ base: 4, md: 6 }} align="start" h="100%">
                                                    <Flex justify="space-between" w="100%" align="start">
                                                        <Box
                                                            p={{ base: 3, md: 4 }}
                                                            bg="linear-gradient(45deg, #FF0000, #FF4444)"
                                                            borderRadius="xl"
                                                            display="inline-block"
                                                        >
                                                            <Icon as={service.icon} boxSize={{ base: "24px", md: "28px" }} color="white" />
                                                        </Box>

                                                        <VStack spacing={0} align="end">
                                                            <Text fontSize={{ base: "2xl", md: "3xl" }} fontWeight="black" color="red.500">
                                                                {service.price}
                                                            </Text>
                                                            <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">
                                                                {service.duration}
                                                            </Text>
                                                        </VStack>
                                                    </Flex>

                                                    <VStack spacing={3} align="start" flex={1}>
                                                        <Heading size={{ base: "md", md: "lg", lg: "xl" }} fontWeight="bold">
                                                            {service.title}
                                                        </Heading>

                                                        <Text color="gray.400" lineHeight="1.7" fontSize={{ base: "sm", md: "md" }}>
                                                            {service.description}
                                                        </Text>

                                                        <VStack spacing={2} align="start" pt={2}>
                                                            {service.features.map((feature, i) => (
                                                                <HStack key={i} spacing={2}>
                                                                    <Icon as={CheckCircle} color="red.500" boxSize="16px" />
                                                                    <Text fontSize={{ base: "xs", md: "sm" }} color="gray.300">{feature}</Text>
                                                                </HStack>
                                                            ))}
                                                        </VStack>
                                                    </VStack>

                                                    <Button
                                                        w="100%"
                                                        size={{ base: "md", md: "lg" }}
                                                        bg={service.popular ? "linear-gradient(45deg, #FF0000, #FF4444)" : "transparent"}
                                                        color={service.popular ? "white" : "red.500"}
                                                        border={service.popular ? "none" : "2px solid"}
                                                        borderColor="red.500"
                                                        _hover={{
                                                            bg: service.popular ? "linear-gradient(45deg, #FF4444, #FF0000)" : "red.500",
                                                            color: "white",
                                                            transform: "translateY(-2px)"
                                                        }}
                                                        rightIcon={<ArrowRight size={18} />}
                                                        transition="all 0.3s ease"
                                                        fontSize={{ base: "sm", md: "md" }}
                                                    >
                                                        {service.popular ? "SELECCIONAR" : "ELEGIR PLAN"}
                                                    </Button>
                                                </VStack>
                                            </Box>
                                        </motion.div>
                                    ))}
                                </Grid>
                            </VStack>
                        </motion.div>
                    </Container>
                </Box>

                {/* Enhanced Stats Section */}
                <Box py={{ base: 12, md: 16, lg: 20 }} bg="linear-gradient(135deg, #FF0000, #CC0000)" position="relative" overflow="hidden">
                    {/* Background pattern */}
                    <Box
                        position="absolute"
                        top={0}
                        left={0}
                        right={0}
                        bottom={0}
                        opacity={0.1}
                        backgroundImage="radial-gradient(circle at 20% 50%, white 2px, transparent 2px), radial-gradient(circle at 80% 50%, white 2px, transparent 2px)"
                        backgroundSize="100px 100px"
                    />

                    <Container maxW={containerMaxW} position="relative" px={{ base: 4, md: 6, lg: 8 }}>
                        <Grid templateColumns={statsColumns} gap={{ base: 6, md: 8 }}>
                            {[
                                { number: "150+", label: "Clientes Satisfechos", icon: Users },
                                { number: "99.8%", label: "Tasa de Satisfacción", icon: Star },
                                { number: "24/7", label: "Servicio Disponible", icon: Clock },
                                { number: "1+", label: "Año", icon: Award }
                            ].map((stat, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, y: 30, scale: 0.8 }}
                                    whileInView={{ opacity: 1, y: 0, scale: 1 }}
                                    transition={{ delay: index * 0.15, duration: 0.7 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05 }}
                                >
                                    <VStack spacing={{ base: 2, md: 4 }} textAlign="center" p={{ base: 2, md: 4 }}>
                                        <Icon as={stat.icon} boxSize={{ base: "30px", md: "40px" }} color="white" opacity={0.9} />
                                        <Text fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} fontWeight="black" color="white">
                                            {stat.number}
                                        </Text>
                                        <Text fontSize={{ base: "xs", md: "sm", lg: "md" }} color="red.100" fontWeight="semibold" lineHeight="1.4">
                                            {stat.label}
                                        </Text>
                                    </VStack>
                                </motion.div>
                            ))}
                        </Grid>
                    </Container>
                </Box>

                {/* Testimonials Section */}
                <Box py={{ base: 16, md: 20, lg: 24 }} bg="gray.900">
                    <Container maxW={containerMaxW} px={{ base: 4, md: 6, lg: 8 }}>
                        <VStack spacing={{ base: 12, md: 16 }}>
                            <VStack spacing={{ base: 3, md: 4 }} textAlign="center">
                                <Badge bg="red.600" color="white" px={{ base: 4, md: 6 }} py={{ base: 2, md: 3 }} borderRadius="full" fontSize={{ base: "sm", md: "md" }}>
                                    💬 TESTIMONIOS
                                </Badge>
                                <Heading size={{ base: "xl", md: "2xl" }} fontWeight="black" textAlign="center">
                                    LO QUE DICEN NUESTROS
                                    <Text as="span" color="red.500"> CLIENTES</Text>
                                </Heading>
                            </VStack>

                            <SimpleGrid columns={testimonialsColumns} spacing={{ base: 6, md: 8 }} w="100%">
                                {testimonials.map((testimonial, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, y: 30 }}
                                        whileInView={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.2, duration: 0.6 }}
                                        viewport={{ once: true }}
                                        whileHover={{ y: -10 }}
                                    >
                                        <Box
                                            bg="black"
                                            p={{ base: 6, md: 8 }}
                                            borderRadius={{ base: "15px", md: "20px" }}
                                            border="1px solid"
                                            borderColor="gray.800"
                                            _hover={{
                                                borderColor: "red.500",
                                                boxShadow: "0 20px 40px rgba(255, 0, 0, 0.1)"
                                            }}
                                            transition="all 0.3s ease"
                                            h="100%"
                                        >
                                            <VStack spacing={4} align="start">
                                                <HStack>
                                                    {[...Array(testimonial.rating)].map((_, i) => (
                                                        <Icon key={i} as={Star} color="yellow.400" fill="currentColor" boxSize={{ base: "14px", md: "16px" }} />
                                                    ))}
                                                </HStack>

                                                <Text color="gray.300" fontSize={{ base: "md", md: "lg" }} lineHeight="1.7">
                                                    "{testimonial.text}"
                                                </Text>

                                                <HStack spacing={3} pt={2}>
                                                    <Avatar size={{ base: "sm", md: "md" }} src={testimonial.avatar} />
                                                    <VStack spacing={0} align="start">
                                                        <Text fontWeight="bold" fontSize={{ base: "sm", md: "md" }}>{testimonial.name}</Text>
                                                        <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500">{testimonial.role}</Text>
                                                    </VStack>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    </motion.div>
                                ))}
                            </SimpleGrid>
                        </VStack>
                    </Container>
                </Box>

                {/* Enhanced CTA Section */}
                <Box py={{ base: 16, md: 20, lg: 24 }} bg="black" position="relative" overflow="hidden" ref={reservationsRef}>
                    {/* Animated background */}
                    <MotionBox
                        position="absolute"
                        top="50%"
                        left="50%"
                        w={{ base: "600px", md: "700px", lg: "800px" }}
                        h={{ base: "600px", md: "700px", lg: "800px" }}
                        borderRadius="full"
                        bg="radial-gradient(circle, rgba(255,0,0,0.05), transparent 70%)"
                        transform="translate(-50%, -50%)"
                        animate={{
                            scale: [1, 1.2, 1],
                            opacity: [0.3, 0.1, 0.3]
                        }}
                        transition={{
                            duration: 8,
                            repeat: Infinity,
                            ease: "easeInOut"
                        }}
                    />

                    <Container maxW={containerMaxW} position="relative" zIndex={2} px={{ base: 4, md: 6, lg: 8 }}>
                        <motion.div
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            viewport={{ once: true }}
                        >
                            <VStack spacing={{ base: 8, md: 10, lg: 12 }} textAlign="center">
                                <VStack spacing={{ base: 4, md: 6 }}>
                                    <Heading size={{ base: "xl", md: "2xl", lg: "3xl" }} fontWeight="black" lineHeight="1.2">
                                        ¿LISTO PARA LA
                                        <Text as="span"
                                            bgGradient="linear(to-r, red.400, red.600)"
                                            bgClip="text"
                                        > EXPERIENCIA</Text>
                                        <br />DEFINITIVA?
                                    </Heading>

                                    <Text
                                        fontSize={{ base: "md", md: "lg", lg: "xl" }}
                                        color="gray.400"
                                        maxW={{ base: "100%", md: "600px", lg: "700px" }}
                                        lineHeight="1.7"
                                        px={{ base: 4, md: 0 }}
                                    >
                                        Únete a miles de clientes satisfechos y descubre por qué somos el carwash
                                        #1 de Guatemala. Tu auto merece el mejor cuidado.
                                    </Text>
                                </VStack>

                                {/* Contact info with enhanced styling */}
                                <SimpleGrid columns={contactColumns} spacing={{ base: 4, md: 6, lg: 8 }} w="100%" maxW="800px">
                                    {[
                                        { icon: Phone, text: "+502 3030-0738", label: "Llámanos" },
                                        { icon: MapPin, text: "Zona 18, Guatemala", label: "Visítanos" },
                                        { icon: Mail, text: "+502 3030-0738", label: "Escríbenos" }
                                    ].map((contact, index) => (
                                        <motion.div
                                            key={index}
                                            whileHover={{ scale: 1.05, y: -5 }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <VStack
                                                spacing={3}
                                                p={{ base: 4, md: 6 }}
                                                bg="gray.900"
                                                borderRadius={{ base: "lg", md: "xl" }}
                                                border="1px solid"
                                                borderColor="gray.800"
                                                _hover={{
                                                    borderColor: "red.500",
                                                    bg: "gray.800"
                                                }}
                                                transition="all 0.3s ease"
                                            >
                                                <Box
                                                    p={3}
                                                    bg="red.600"
                                                    borderRadius="lg"
                                                >
                                                    <Icon as={contact.icon} color="white" boxSize={{ base: "18px", md: "20px" }} />
                                                </Box>
                                                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" fontWeight="semibold">
                                                    {contact.label}
                                                </Text>
                                                <Text color="white" fontWeight="medium" fontSize={{ base: "sm", md: "md" }} textAlign="center">
                                                    {contact.text}
                                                </Text>
                                            </VStack>
                                        </motion.div>
                                    ))}
                                </SimpleGrid>

                                {/* Enhanced CTA buttons */}
                                <VStack spacing={4} w="100%">
                                    <motion.div
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        style={{ width: "100%" }}
                                    >
                                        <Button
                                            size={{ base: "lg", md: "xl" }}
                                            bg="linear-gradient(45deg, #FF0000, #FF4444)"
                                            color="white"
                                            px={{ base: 8, md: 12, lg: 16 }}
                                            py={{ base: 6, md: 8 }}
                                            borderRadius="full"
                                            fontSize={{ base: "lg", md: "xl" }}
                                            fontWeight="bold"
                                            rightIcon={<Zap size={24} />}
                                            _hover={{
                                                transform: "translateY(-4px)",
                                                boxShadow: "0 20px 40px rgba(255, 0, 0, 0.4)"
                                            }}
                                            transition="all 0.3s ease"
                                            position="relative"
                                            overflow="hidden"
                                            w={{ base: "100%", sm: "auto" }}
                                            maxW={{ base: "100%", sm: "400px" }}
                                        >
                                            <Box
                                                position="absolute"
                                                top={0}
                                                left={0}
                                                right={0}
                                                bottom={0}
                                                bg="linear-gradient(45deg, transparent, rgba(255,255,255,0.2), transparent)"
                                                transform="translateX(-100%)"
                                                _hover={{ transform: "translateX(100%)" }}
                                                transition="transform 0.6s ease"
                                            />
                                            AGENDA TU CITA AHORA
                                        </Button>
                                    </motion.div>

                                    <Flex
                                        direction={{ base: "column", sm: "row" }}
                                        gap={{ base: 2, sm: 4 }}
                                        fontSize={{ base: "xs", md: "sm" }}
                                        color="gray.500"
                                        align="center"
                                        justify="center"
                                        flexWrap="wrap"
                                    >
                                        <HStack spacing={2}>
                                            <Icon as={CheckCircle} color="green.400" />
                                            <Text>Reserva instantánea</Text>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Icon as={CheckCircle} color="green.400" />
                                            <Text>Sin costo adicional</Text>
                                        </HStack>
                                        <HStack spacing={2}>
                                            <Icon as={CheckCircle} color="green.400" />
                                            <Text>Garantía 100%</Text>
                                        </HStack>
                                    </Flex>
                                </VStack>
                            </VStack>
                        </motion.div>
                    </Container>
                </Box>

                {/* Footer */}
                <Box bg="gray.950" py={{ base: 6, md: 8 }} borderTop="1px solid" borderColor="gray.800">
                    <Container maxW={containerMaxW} px={{ base: 4, md: 6, lg: 8 }}>
                        <Flex
                            direction={{ base: "column", md: "row" }}
                            justify="space-between"
                            align="center"
                            gap={{ base: 4, md: 0 }}
                        >
                            <VStack spacing={2} align={{ base: "center", md: "start" }}>
                                <Heading size={{ base: "md", md: "lg" }} fontWeight="black">
                                    AutoVentas<Text as="span" color="red.500">Juanes</Text>
                                </Heading>
                                <Text fontSize={{ base: "xs", md: "sm" }} color="gray.500" textAlign={{ base: "center", md: "left" }}>
                                    El mejor carwash de Guatemala desde 2025
                                </Text>
                            </VStack>

                            <Flex
                                direction={{ base: "column", md: "row" }}
                                gap={{ base: 2, md: 6 }}
                                color="gray.500"
                                align="center"
                            >
                                <Text fontSize={{ base: "xs", md: "sm" }}>© 2025 AutoVentasJuanes</Text>
                                <Divider orientation="vertical" h="20px" display={{ base: "none", md: "block" }} />
                                <Text fontSize={{ base: "xs", md: "sm" }}>Todos los derechos reservados</Text>
                            </Flex>
                        </Flex>
                    </Container>
                </Box>

            </Box>
        </>
    );
};

export default Services;