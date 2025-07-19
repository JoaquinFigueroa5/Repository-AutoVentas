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
    Divider,
    useBreakpointValue,
    Stack,
    Wrap,
    WrapItem,
    Skeleton
} from '@chakra-ui/react';
import { ChevronLeft, ChevronRight, Eye, Heart, Calendar, Gauge, Fuel, Users, Phone, Mail, MapPin } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import useVehicles from '../shared/hooks/useVehicles';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

export default function Carrousel() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState(new Set());
    const [selectedCar, setSelectedCar] = useState(null);
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { vehicles, fetchVehicles, loading } = useVehicles();

    // Responsive values
    const containerMaxW = useBreakpointValue({ base: "100%", md: "7xl" });
    const carouselHeight = useBreakpointValue({ base: "500px", md: "550px", lg: "600px" });
    const carouselPadding = useBreakpointValue({ base: 4, md: 8, lg: 12 });
    const headingSize = useBreakpointValue({ base: "xl", md: "2xl" });
    const textSize = useBreakpointValue({ base: "md", md: "lg" });
    const buttonSize = useBreakpointValue({ base: "md", md: "lg" });
    const imageWidth = useBreakpointValue({ base: "280px", md: "350px", lg: "400px" });
    const imageHeight = useBreakpointValue({ base: "180px", md: "220px", lg: "250px" });
    const modalSize = useBreakpointValue({ base: "full", md: "4xl", lg: "6xl" });
    const gridColumns = useBreakpointValue({
        base: "repeat(2, 1fr)",
        md: "repeat(2, 1fr)",
        lg: "repeat(auto-fit, minmax(300px, 1fr))"
    });

    useEffect(() => {
        fetchVehicles();
    }, [])

    useEffect(() => {
        if (vehicles.length === 0) return;

        const interval = setInterval(() => {
            setCurrentIndex((prevIndex) =>
                (prevIndex + 1) % vehicles.length
            );
        }, 5000);

        return () => clearInterval(interval);
    }, [vehicles]);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % vehicles.length);
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + vehicles.length) % vehicles.length);
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

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    const openModal = (car) => {
        setSelectedCar(car);
        setSelectedImageIndex(0);
        onOpen();
    };

    if (loading || vehicles.length === 0) return <p>Cargando vehículos...</p>;

    const currentCar = vehicles[currentIndex];

    return (
        <Box bg="black" minH="100vh" py={{ base: 4, md: 8 }}>
            <Container maxW={containerMaxW} px={{ base: 4, md: 6 }}>
                {/* Header */}
                <VStack spacing={{ base: 4, md: 6 }} mb={{ base: 8, md: 12 }}>
                    <MotionBox
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        textAlign="center"
                    >
                        <Heading
                            color="white"
                            size={headingSize}
                            textAlign="center"
                            fontWeight="bold"
                            letterSpacing="tight"
                            pt={{ base: 6, md: 10 }}
                        >
                            Vehículos <Text as="span" color="red.500">Premium</Text>
                        </Heading>
                        <Heading
                            color="white"
                            size={headingSize}
                            textAlign="center"
                            fontWeight="bold"
                            letterSpacing="tight"
                        >
                            <Text as="span" color="red.500">¡Traspaso </Text>
                            <Text as="span" color="whiteAlpha.900">Gratis!</Text>
                        </Heading>
                        <Text color="gray.400" textAlign="center" fontSize={textSize} mt={2}>
                            Descubre nuestros vehículos disponibles para entrega inmediata.
                        </Text>
                        <Text color="gray.400" textAlign="center" fontSize={textSize} mt={2}>
                            Más de 95 vehículos disponibles para entrega inmediata!!!
                        </Text>
                        <Text
                            color="gray.400"
                            textAlign="center"
                            fontSize={textSize}
                            mt={2}
                            px={{ base: 4, md: 0 }}
                        >
                            No vendemos autos 🚘, ayudamos a alcanzar tus metas 🏎️🔥 🙏🏽🦾
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
                            h={carouselHeight}
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
                                bgImage={`linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.6)), url(${currentCar.images[0].url})`}
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
                                px={carouselPadding}
                                zIndex={2}
                                direction={{ base: "column", lg: "row" }}
                                gap={{ base: 6, lg: 0 }}
                            >
                                {/* Car Info */}
                                <MotionBox
                                    initial={{ opacity: 0, x: -50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    maxW={{ base: "100%", lg: "500px" }}
                                    textAlign={{ base: "center", lg: "left" }}
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

                                    <Heading
                                        color="white"
                                        size={headingSize}
                                        mb={4}
                                        fontWeight="bold"
                                        fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }}
                                    >
                                        {currentCar.name} {currentCar.model} {currentCar.year}
                                    </Heading>

                                    {/* <Text
                                        color="gray.300"
                                        fontSize={textSize}
                                        mb={6}
                                        lineHeight="1.6"
                                        display={{ base: "none", md: "block" }}
                                    >
                                        {currentCar.description}
                                    </Text> */}

                                    <HStack
                                        spacing={{ base: 4, md: 6 }}
                                        mb={6}
                                        justify={{ base: "center", lg: "flex-start" }}
                                        flexWrap="wrap"
                                    >
                                        <VStack spacing={1}>
                                            <Calendar size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.year}
                                            </Text>
                                        </VStack>
                                        <VStack spacing={1}>
                                            <Gauge size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                {currentCar.model}
                                            </Text>
                                        </VStack>
                                        <VStack spacing={1}>
                                            <Fuel size={20} color="#ef4444" />
                                            <Text color="white" fontSize="sm" fontWeight="medium">
                                                Q{currentCar.price.$numberDecimal}
                                            </Text>
                                        </VStack>
                                    </HStack>

                                    <Text
                                        color="red.400"
                                        fontSize={{ base: "2xl", md: "3xl" }}
                                        fontWeight="bold"
                                        mb={6}
                                    >
                                        Q{currentCar.price.$numberDecimal}
                                    </Text>

                                    <Stack
                                        direction={{ base: "column", sm: "row" }}
                                        spacing={4}
                                        align="center"
                                        justify={{ base: "center", lg: "flex-start" }}
                                    >
                                        <MotionButton
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            bg="red.500"
                                            color="white"
                                            size={buttonSize}
                                            px={8}
                                            _hover={{ bg: "red.600" }}
                                            onClick={() => openModal(currentCar)}
                                            leftIcon={<Eye size={20} />}
                                            w={{ base: "full", sm: "auto" }}
                                        >
                                            Ver Detalles
                                        </MotionButton>

                                        <MotionButton
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            variant="outline"
                                            borderColor="white"
                                            color="white"
                                            size={buttonSize}
                                            px={8}
                                            _hover={{ bg: "white", color: "black" }}
                                            onClick={() => toggleFavorite(currentCar._id)}
                                            leftIcon={
                                                <Heart
                                                    size={20}
                                                    fill={favorites.has(currentCar._id) ? "#ef4444" : "none"}
                                                    color={favorites.has(currentCar._id) ? "#ef4444" : "white"}
                                                />
                                            }
                                            w={{ base: "full", sm: "auto" }}
                                        >
                                            {favorites.has(currentCar._id) ? "Favorito" : "Favoritos"}
                                        </MotionButton>
                                    </Stack>
                                </MotionBox>

                                {/* Car Image */}
                                <MotionBox
                                    initial={{ opacity: 0, x: 50 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    display={{ base: "none", lg: "block" }}
                                >
                                    <Image
                                        src={currentCar.images[1]?.url || currentCar.images[0]?.url}
                                        alt={currentCar.name}
                                        w={imageWidth}
                                        h={imageHeight}
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
                        left={{ base: 2, md: 4 }}
                        top="50%"
                        transform="translateY(-50%)"
                        bg="rgba(0,0,0,0.7)"
                        color="white"
                        size={{ base: "md", md: "lg" }}
                        borderRadius="full"
                        _hover={{ bg: "red.500" }}
                        onClick={prevSlide}
                        zIndex={3}
                    />

                    <IconButton
                        aria-label="Next"
                        icon={<ChevronRight size={24} />}
                        position="absolute"
                        right={{ base: 2, md: 4 }}
                        top="50%"
                        transform="translateY(-50%)"
                        bg="rgba(0,0,0,0.7)"
                        color="white"
                        size={{ base: "md", md: "lg" }}
                        borderRadius="full"
                        _hover={{ bg: "red.500" }}
                        onClick={nextSlide}
                        zIndex={3}
                    />
                </Box>

                {/* Dots Indicator */}
                <HStack justify="center" spacing={3} mb={12} flexWrap="wrap">
                    {vehicles.map((_, index) => (
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
                            minW="12px"
                        />
                    ))}
                </HStack>

                {/* Car Grid */}
                <Grid templateColumns={gridColumns} gap={{ base: 4, md: 6 }}>
                    {vehicles.map((car, index) => (
                        <MotionBox
                            key={car._id}
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
                                    src={car.images[0].url}
                                    alt={car.name}
                                    w="100%"
                                    h={{ base: "180px", md: "200px" }}
                                    objectFit="cover"
                                />
                                <IconButton
                                    aria-label="Toggle favorite"
                                    icon={
                                        <Heart
                                            size={20}
                                            fill={favorites.has(car._id) ? "#ef4444" : "none"}
                                            color={favorites.has(car._id) ? "#ef4444" : "white"}
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
                                        toggleFavorite(car._id);
                                    }}
                                />
                            </Box>

                            <Box p={{ base: 4, md: 6 }}>
                                <Heading color="white" size="md" mb={2}>
                                    {car.name} {car.model} {car.year}
                                </Heading>
                                <Text color="red.400" fontSize="xl" fontWeight="bold" mb={4}>
                                    Q{car.price.$numberDecimal}
                                </Text>
                                <Stack
                                    direction={{ base: "column", sm: "row" }}
                                    spacing={4}
                                    mb={4}
                                    flexWrap="wrap"
                                >
                                    <Text color="gray.400" fontSize="sm">
                                        {car.year}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        {car.model}
                                    </Text>
                                    <Text color="gray.400" fontSize="sm">
                                        {car.status === true ? "DISPONIBLE" : "NO DISPONIBLE"}
                                    </Text>
                                </Stack>
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
                <Modal isOpen={isOpen} onClose={onClose} size={modalSize}>
                    <ModalOverlay bg="rgba(0,0,0,0.8)" />
                    <ModalContent
                        bg="gray.900"
                        color="white"
                        borderRadius="xl"
                        mx={{ base: 4, md: 6 }}
                        my={{ base: 4, md: "auto" }}
                    >
                        <ModalHeader>
                            <Heading size={{ base: "md", md: "lg" }}>
                                {selectedCar?.name}
                            </Heading>
                            <Text color="red.400" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                                Q{selectedCar?.price.$numberDecimal}
                            </Text>
                        </ModalHeader>
                        <ModalCloseButton />
                        <ModalBody>
                            <Grid
                                templateColumns={{ base: "1fr", md: "1fr 1fr" }}
                                gap={{ base: 4, md: 7 }}
                            >
                                {/* Imagen principal y miniaturas */}
                                <GridItem>
                                    <Image
                                        src={selectedCar?.images[selectedImageIndex]?.url}
                                        alt={selectedCar?.name}
                                        w="100%"
                                        h={{ base: "250px", md: "300px" }}
                                        objectFit="cover"
                                        borderRadius="lg"
                                        mb={4}
                                    />

                                    {/* Galería responsiva */}
                                    <Box
                                        maxH={{ base: "auto", md: "500px" }}
                                        overflowY="auto"
                                        overflowX={{ base: "auto", md: "visible" }}
                                        pr={2}
                                    >
                                        {loading ? (
                                            <p>Cargando</p>
                                        ) : (
                                            <Wrap spacing="10px">
                                                {selectedCar?.images.map((img, index) => (
                                                    <WrapItem key={index}>
                                                        <Box
                                                            w={{ base: "60px", md: "80px" }}
                                                            h={{ base: "45px", md: "60px" }}
                                                            position="relative"
                                                        >
                                                            {!loadedImages[index] && (
                                                                <Skeleton
                                                                    w="100%"
                                                                    h="100%"
                                                                    borderRadius="md"
                                                                    startColor="gray.600"
                                                                    endColor="gray.700"
                                                                    fadeDuration={0.2}
                                                                    position="absolute"
                                                                    top="0"
                                                                    left="0"
                                                                />

                                                            )}
                                                            <Image
                                                                src={img.url}
                                                                alt={`${selectedCar.name} ${index + 1}`}
                                                                w="100%"
                                                                h="100%"
                                                                objectFit="cover"
                                                                borderRadius="md"
                                                                cursor="pointer"
                                                                border="2px solid"
                                                                borderColor={
                                                                    selectedImageIndex === index ? "red.500" : "transparent"
                                                                }
                                                                onClick={() => setSelectedImageIndex(index)}
                                                                onLoad={() => handleImageLoad(index)}
                                                                display={loadedImages[index] ? "block" : "none"}
                                                                flexShrink={0}
                                                            />
                                                        </Box>
                                                    </WrapItem>
                                                ))}
                                            </Wrap>
                                        )}
                                    </Box>
                                </GridItem>

                                {/* Detalles */}
                                <GridItem>
                                    <VStack align="start" spacing={4}>
                                        <Text color="red.400" fontSize={{ base: "xl", md: "2xl" }} fontWeight="bold">
                                            Descripción
                                        </Text>
                                        <Text color="gray.300" fontSize={{ base: "md", md: "lg" }}>
                                            {selectedCar?.description}
                                        </Text>

                                        <Divider borderColor="gray.700" />

                                        <Box>
                                            <Heading size="md" mb={3}>Especificaciones</Heading>
                                            <Grid templateColumns={{ base: "1fr", sm: "1fr 1fr" }} gap={4}>
                                                <VStack align="start">
                                                    <HStack>
                                                        <Calendar size={18} color="#ef4444" />
                                                        <Text fontSize="sm">Año: {selectedCar?.year}</Text>
                                                    </HStack>
                                                    <HStack>
                                                        <Gauge size={18} color="#ef4444" />
                                                        <Text fontSize="sm">Línea: {selectedCar?.model}</Text>
                                                    </HStack>
                                                </VStack>
                                                <VStack align="start">
                                                    <HStack>
                                                        <Fuel size={18} color="#ef4444" />
                                                        <Text fontSize="sm">Precio: Q{selectedCar?.price?.$numberDecimal}</Text>
                                                    </HStack>
                                                </VStack>
                                            </Grid>
                                        </Box>

                                        <Divider borderColor="gray.700" />

                                        <Box>
                                            <Heading size="md" mb={3}>Contacto</Heading>
                                            <VStack align="start" spacing={2}>
                                                <HStack>
                                                    <Phone size={18} color="#ef4444" />
                                                    <Text as='a' href='tel:30300738' fontSize="sm">
                                                        +502 3030-0738
                                                    </Text>
                                                </HStack>
                                                <HStack>
                                                    <Mail size={18} color="#ef4444" />
                                                    <Text fontSize="sm">ventas@premiumcars.com</Text>
                                                </HStack>
                                                <HStack>
                                                    <MapPin size={18} color="#ef4444" />
                                                    <Text fontSize="sm">Guatemala, Zona 18, km 10.5</Text>
                                                </HStack>
                                            </VStack>
                                        </Box>
                                    </VStack>
                                </GridItem>
                            </Grid>
                        </ModalBody>

                        <ModalFooter>
                            <Stack
                                direction={{ base: "column", sm: "row" }}
                                spacing={4}
                                w="100%"
                            >
                                <Button
                                    bg="red.500"
                                    color="white"
                                    _hover={{ bg: "red.600" }}
                                    size={{ base: "md", md: "lg" }}
                                    px={8}
                                    flex={1}
                                >
                                    Contactar Vendedor
                                </Button>
                                <Button
                                    variant="outline"
                                    borderColor="red.500"
                                    color="red.500"
                                    _hover={{ bg: "red.500", color: "white" }}
                                    size={{ base: "md", md: "lg" }}
                                    px={8}
                                    onClick={() => toggleFavorite(selectedCar._id)}
                                    flex={1}
                                >
                                    {favorites.has(selectedCar?._id) ? "Remover de Favoritos" : "Agregar a Favoritos"}
                                </Button>
                            </Stack>
                        </ModalFooter>
                    </ModalContent>
                </Modal>
            </Container>
        </Box>
    );
}