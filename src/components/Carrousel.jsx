import React, { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Button,
    HStack,
    VStack,
    Badge,
    IconButton,
    useDisclosure,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Image,
    Grid,
    GridItem,
    Flex,
    Divider
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, Eye, Heart, Calendar, Gauge, Fuel, Users, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const cars = [
    {
        id: 1,
        name: "BMW M4 Competition",
        price: "Q85,000",
        year: "2024",
        mileage: "5,000 km",
        fuel: "Gasolina",
        seats: "4",
        image: "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1555215695-3004980ad54e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1503376780353-7e6692767b70?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1502877338535-766e1452684a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Transmisión automática", "Cuero premium", "Sistema de navegación", "Cámara trasera"],
        description: "Deportivo de alto rendimiento con motor turbo de 3.0L y 510 HP. Perfecto para los amantes de la velocidad y el lujo."
    },
    {
        id: 2,
        name: "Mercedes-Benz C-Class",
        price: "Q65,000",
        year: "2023",
        mileage: "12,000 km",
        fuel: "Híbrido",
        seats: "5",
        image: "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1542362567-b07e54358753?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1514316454349-750a7fd3da3a?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Tracción integral", "Asientos calefaccionados", "Pantalla táctil", "Piloto automático"],
        description: "Elegancia y eficiencia combinadas en un sedan premium con tecnología híbrida avanzada."
    },
    {
        id: 3,
        name: "Audi RS6 Avant",
        price: "Q120,000",
        year: "2024",
        mileage: "2,500 km",
        fuel: "Gasolina",
        seats: "5",
        image: "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1544636331-e26879cd4d9b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1549927681-6f7529be7129?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1583121274602-3e2820c69888?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Quattro AWD", "Suspensión adaptativa", "Matrix LED", "Bang & Olufsen"],
        description: "Station wagon deportivo con 600 HP. La combinación perfecta de practicidad y rendimiento extremo."
    },
    {
        id: 4,
        name: "Porsche 911 Turbo S",
        price: "Q200,000",
        year: "2024",
        mileage: "1,000 km",
        fuel: "Gasolina",
        seats: "4",
        image: "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1544829099-b9a0c5303bea?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1563720223185-11003d516935?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1525609004556-c46c7d6cf023?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["PDK automático", "Sport Chrono", "Asientos deportivos", "Frenos cerámicos"],
        description: "El icónico deportivo alemán con 640 HP y aceleración de 0-100 km/h en 2.7 segundos."
    },
    {
        id: 5,
        name: "Tesla Model S Plaid",
        price: "Q130,000",
        year: "2024",
        mileage: "3,000 km",
        fuel: "Eléctrico",
        seats: "5",
        image: "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
        images: [
            "https://images.unsplash.com/photo-1560958089-b8a1929cea89?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1571019613914-85f342c6a11e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80",
            "https://images.unsplash.com/photo-1536700503339-1e4b06520771?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
        ],
        features: ["Autopilot avanzado", "Carga súper rápida", "Pantalla 17\"", "Modo ludicrous"],
        description: "Sedan eléctrico de lujo con 1020 HP y autonomía de 628 km. El futuro de la movilidad premium."
    }
];

export default function Carrousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set());
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const { isOpen, onOpen, onClose } = useDisclosure();

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % cars.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + cars.length) % cars.length);
    };

    const toggleFavorite = (carId) => {
        setFavorites(prev => {
            const newFavorites = new Set(prev);
            if (newFavorites.has(carId)) {
                newFavorites.delete(carId);
            } else {
                newFavorites.add(carId);
            }
            return newFavorites;
        });
    };

    const openModal = (car) => {
        setSelectedCar(car);
        setSelectedImageIndex(0);
        onOpen();
    };

    const currentCar = cars[currentIndex];

    return (
        <Box bg="black" minH="100vh" py={8}>
            <Container maxW="7xl">
                {/* Header */}
                <VStack spacing={6} mb={12}>
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        <Heading
                            color="white"
                            size="2xl"
                            textAlign="center"
                            fontWeight="bold"
                            letterSpacing="tight"
                            pt='10'
                        >
                            Vehículos <Text as="span" color="red.500">Premium</Text>
                        </Heading>
                        <Heading
                            color="white"
                            size="2xl"
                            textAlign="center"
                            fontWeight="bold"
                            letterSpacing="tight"
                        >
                            <Text as="span" color="red.500" >¡Traspaso </Text><Text as="span" color="whiteAlpha.900">Gratis!</Text>
                        </Heading>
                        <Text color="gray.400" textAlign="center" fontSize="lg" mt={2}>
                            Descubre nuestra coleccion variado de carros.
                        </Text>
                        <Text color="gray.400" textAlign="center" fontSize="lg" mt={2}>
                            Más de 95 vehiculos disponibles para entrega inmediata!!!
                        </Text>
                        <Text color="gray.400" textAlign="center" fontSize="lg" mt={2}>
                            No vendemos autos 🚘, ayudamos a  alcanzar tus metas 🏎️🔥
                            🙏🏽🦾

                        </Text>
                    </MotionBox>
                </VStack>

                {/* Main Carousel */}
                <Box position="relative" overflow="hidden" borderRadius="2xl" mb={8}>
                    <AnimatePresence mode="wait">
                        <MotionBox
                            key={currentIndex}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            position="relative"
                            h="600px"
                            bg="gray.900"
                            borderRadius="2xl"
                            overflow="hidden"
                        >
                            {/* Background Image */}
                            <Box
                                position="absolute"
                                top="0"
                                left="0"
                                right="0"
                                bottom="0"
                                bgImage={`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentCar.image})`}
                                bgSize="cover"
                                bgPosition="center"
                                filter="blur(0.5px)"
                            />

                            {/* Content */}
                            <Flex
                                position="relative"
                                h="100%"
                                align="center"
                                justify="space-between"
                                px={12}
                                zIndex={2}
                            >
                                {/* Car Info */}
                                <MotionBox
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    maxW="500px"
                                >
                                    <Badge
                                        colorScheme="red"
                                        mb={4}
                                        px={3}
                                        py={1}
                                        fontSize="sm"
                                        fontWeight="bold"
                                    >
                                        DISPONIBLE
                                    </Badge>

                                    <Heading color="white" size="2xl" mb={4} fontWeight="bold">
                                        {currentCar.name}
                                    </Heading>

                                    <Text color="gray.300" fontSize="lg" mb={6} lineHeight="1.6">
                                        {currentCar.description}
                                    </Text>

                                    <HStack spacing={6} mb={6}>
                                        <VStack spacing={1}>
                                            <Calendar size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.year}
                                            </Text>
                                        </VStack>
                                        <VStack spacing={1}>
                                            <Gauge size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.mileage}
                                            </Text>
                                        </VStack>
                                        <VStack spacing={1}>
                                            <Fuel size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.fuel}
                                            </Text>
                                        </VStack>
                                        <VStack spacing={1}>
                                            <Users size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.seats} asientos
                                            </Text>
                                        </VStack>
                                    </HStack>

                                    <Text color="red.400" fontSize="3xl" fontWeight="bold" mb={6}>
                                        {currentCar.price}
                                    </Text>

                                    <HStack spacing={4}>
                                        <MotionButton
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            bg="red.500"
                                            color="white"
                                            size="lg"
                                            px={8}
                                            _hover={{ bg: "red.600" }}
                                            onClick={() => openModal(currentCar)}
                                            leftIcon={<Eye size={20} />}
                                        >
                                            Ver Detalles
                                        </MotionButton>

                                        <MotionButton
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            variant="outline"
                                            borderColor="white"
                                            color="white"
                                            size="lg"
                                            px={8}
                                            _hover={{ bg: "white", color: "black" }}
                                            onClick={() => toggleFavorite(currentCar.id)}
                                            leftIcon={
                                                <Heart
                                                    size={20}
                                                    fill={favorites.has(currentCar.id) ? "#ef4444" : "none"}
                                                    color={favorites.has(currentCar.id) ? "#ef4444" : "white"}
                                                />
                                            }
                                        >
                                            {favorites.has(currentCar.id) ? "Favorito" : "Favoritos"}
                                        </MotionButton>
                                    </HStack>
                                </MotionBox>

                                {/* Car Image */}
                                <MotionBox
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                >
                                    <Image
                                        src={currentCar.image}
                                        alt={currentCar.name}
                                        w="400px"
                                        h="250px"
                                        objectFit="cover"
                                        borderRadius="xl"
                                        border="2px solid"
                                        borderColor="red.500"
                                    />
                                </MotionBox>
                            </Flex>
                        </MotionBox>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <IconButton
                        aria-label="Previous"
                        icon={<ChevronLeft size={24} />}
                        position="absolute"
                        left={4}
                        top="50%"
                        transform="translateY(-50%)"
                        bg="rgba(0,0,0,0.7)"
                        color="white"
                        size="lg"
                        borderRadius="full"
                        _hover={{ bg: "red.500" }}
                        onClick={prevSlide}
                        zIndex={3}
                    />

                    <IconButton
                        aria-label="Next"
                        icon={<ChevronRight size={24} />}
                        position="absolute"
                        right={4}
                        top="50%"
                        transform="translateY(-50%)"
                        bg="rgba(0,0,0,0.7)"
                        color="white"
                        size="lg"
                        borderRadius="full"
                        _hover={{ bg: "red.500" }}
                        onClick={nextSlide}
                        zIndex={3}
                    />
                </Box>

                {/* Dots Indicator */}
                <HStack justify="center" spacing={3} mb={12}>
                    {cars.map((_, index) => (
                        <MotionBox
                            key={index}
                            w={index === currentIndex ? "40px" : "12px"}
                            h="12px"
                            bg={index === currentIndex ? "red.500" : "gray.600"}
                            borderRadius="full"
                            cursor="pointer"
                            onClick={() => setCurrentIndex(index)}
                            whileHover={{ scale: 1.2 }}
                            transition={{ duration: 0.3 }}
                        />
                    ))}
                </HStack>

                {/* Car Grid */}
                <Grid templateColumns="repeat(auto-fit, minmax(300px, 1fr))" gap={6}>
                    {cars.map((car, index) => (
                        <MotionBox
                            key={car.id}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            bg="gray.900"
                            borderRadius="xl"
                            overflow="hidden"
                            border="1px solid"
                            borderColor="gray.800"
                            _hover={{ borderColor: "red.500", transform: "translateY(-5px)" }}
                            cursor="pointer"
                            onClick={() => openModal(car)}
                        >
                            <Box position="relative">
                                <Image
                                    src={car.image}
                                    alt={car.name}
                                    w="100%"
                                    h="200px"
                                    objectFit="cover"
                                />
                                <IconButton
                                    aria-label="Toggle favorite"
                                    icon={
                                        <Heart
                                            size={20}
                                            fill={favorites.has(car.id) ? "#ef4444" : "none"}
                                            color={favorites.has(car.id) ? "#ef4444" : "white"}
                                        />
                                    }
                                    position="absolute"
                                    top={3}
                                    right={3}
                                    size="sm"
                                    bg="rgba(0,0,0,0.6)"
                                    color="white"
                                    borderRadius="full"
                                    _hover={{ bg: "red.500" }}
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleFavorite(car.id);
                                    }}
                                />
                            </Box>

                            <Box p={6}>
                                <Heading color="white" size="md" mb={2}>
                                    {car.name}
                                </Heading>
                                <Text color="red.400" fontSize="xl" fontWeight="bold" mb={4}>
                                    {car.price}
                                </Text>
                                <HStack spacing={4} mb={4}>
                                    <Text color="gray.400" fontSize="sm">
                                        {car.year}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        {car.mileage}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        {car.fuel}
                                    </Text>
                                </HStack>
                                <Button
                                    size="sm"
                                    variant="outline"
                                    borderColor="red.500"
                                    color="red.500"
                                    _hover={{ bg: "red.500", color: "white" }}
                                    w="100%"
                                >
                                    Ver Detalles
                                </Button>
                            </Box>
                        </MotionBox>
                    ))}
                </Grid>

                {/* Modal */}
                <Modal isOpen={isOpen} onClose={onClose} size="6xl">
                    <ModalOverlay bg="rgba(0,0,0,0.8)" />
                    <ModalContent bg="gray.900" color="white" borderRadius="xl">
                        <ModalHeader>
                            <Heading size="lg">{selectedCar?.name}</Heading>
                            <Text color="red.400" fontSize="2xl" fontWeight="bold">
                                {selectedCar?.price}
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid templateColumns="1fr 1fr" gap={8}>
                                {/* Images */}
                                <GridItem>
                                    <Image
                                        src={selectedCar?.images[selectedImageIndex]}
                                        alt={selectedCar?.name}
                                        w="100%"
                                        h="300px"
                                        objectFit="cover"
                                        borderRadius="lg"
                                        mb={4}
                                    />
                                    <HStack spacing={2}>
                                        {selectedCar?.images.map((img, index) => (
                                            <Image
                                                key={index}
                                                src={img}
                                                alt={`${selectedCar.name} ${index + 1}`}
                                                w="80px"
                                                h="60px"
                                                objectFit="cover"
                                                borderRadius="md"
                                                cursor="pointer"
                                                border="2px solid"
                                                borderColor={selectedImageIndex === index ? "red.500" : "transparent"}
                                                onClick={() => setSelectedImageIndex(index)}
                                            />
                                        ))}
                                    </HStack>
                                </GridItem>

                                {/* Details */}
                                <GridItem>
                                    <VStack align="start" spacing={4}>
                                        <Text color="gray.300" fontSize="lg">
                                            {selectedCar?.description}
                                        </Text>

                                        <Divider borderColor="gray.700" />

                                        <Box>
                                            <Heading size="md" mb={3}>Especificaciones</Heading>
                                            <Grid templateColumns="1fr 1fr" gap={4}>
                                                <VStack align="start">
                                                    <HStack>
                                                        <Calendar size={18} color="#ef4444" />
                                                        <Text>Año: {selectedCar?.year}</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Gauge size={18} color="#ef4444" />
                                                        <Text>Kilometraje: {selectedCar?.mileage}</Text>
                                                    </HStack>
                                                </VStack>
                                                <VStack align="start">
                                                    <HStack>
                                                        <Fuel size={18} color="#ef4444" />
                                                        <Text>Combustible: {selectedCar?.fuel}</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Users size={18} color="#ef4444" />
                                                        <Text>Asientos: {selectedCar?.seats}</Text>
                                                    </HStack>
                                                </VStack>
                                            </Grid>
                                        </Box>

                                        <Divider borderColor="gray.700" />

                                        <Box>
                                            <Heading size="md" mb={3}>Características</Heading>
                                            <Grid templateColumns="1fr 1fr" gap={2}>
                                                {selectedCar?.features.map((feature, index) => (
                                                    <Text key={index} color="gray.300" fontSize="sm">
                                                        • {feature}
                                                    </Text>
                                                ))}
                                            </Grid>
                                        </Box>

                                        <Divider borderColor="gray.700" />

                                        <Box>
                                            <Heading size="md" mb={3}>Contacto</Heading>
                                            <VStack align="start" spacing={2}>
                                                <HStack>
                                                    <Phone size={18} color="#ef4444" />
                                                    <Text>+502 1234-5678</Text>
                                                </HStack>
                                                <HStack>
                                                    <Mail size={18} color="#ef4444" />
                                                    <Text>ventas@premiumcars.com</Text>
                                                </HStack>
                                                <HStack>
                                                    <MapPin size={18} color="#ef4444" />
                                                    <Text>Guatemala City, Guatemala</Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </ModalBody>
                        <ModalFooter>
                            <HStack spacing={4}>
                                <Button
                                    bg="red.500"
                                    color="white"
                                    _hover={{ bg: "red.600" }}
                                    size="lg"
                                    px={8}
                                >
                                    Contactar Vendedor
                                </Button>
                                <Button
                                    variant="outline"
                                    borderColor="red.500"
                                    color="red.500"
                                    _hover={{ bg: "red.500", color: "white" }}
                                    size="lg"
                                    px={8}
                                    onClick={() => toggleFavorite(selectedCar.id)}
                                >
                                    {favorites.has(selectedCar?.id) ? "Remover de Favoritos" : "Agregar a Favoritos"}
                                </Button>
                            </HStack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
}