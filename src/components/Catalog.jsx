import React, { useState, useMemo, useEffect } from 'react';
import {
    Box,
    Container,
    Grid,
    Text,
    Input,
    Select,
    HStack,
    VStack,
    Image,
    Badge,
    Button,
    Flex,
    InputGroup,
    InputLeftElement,
    useColorModeValue,
    useDisclosure,
    Modal,
    useBreakpointValue,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Heading,
    ModalCloseButton,
    ModalBody,
    GridItem,
    IconButton,
    Wrap,
    Divider,
    ModalFooter,
    Stack,
    WrapItem,
    Skeleton
} from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, Zap, Fuel, Car, DollarSign, Maximize2, Gauge, Phone, Mail, MapPin, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import PremiumNavbar from './NavBar';
import useVehicles from '../shared/hooks/useVehicles';
import ContactFooter from './Footer';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionImage = motion(Image);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionButton = motion(Button);
const MotionText = motion(Text);

const CarListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const { isOpen: isOpenCard, onOpen: onOpenCard, onClose: onCloseCard } = useDisclosure();
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();

    const modalSize = useBreakpointValue({ base: "full", md: "4xl", lg: "6xl" });


    const { fetchVehicles, vehicles, loading, error } = useVehicles();

    useEffect(() => {
        fetchVehicles();
    }, [])

    console.log(vehicles);

    // Filtrado de autos
    const filteredCars = useMemo(() => {
        const noFilters =
            searchTerm === '' && yearFilter === '' && typeFilter === '' && priceFilter === '';
        if (noFilters) return vehicles;

        return vehicles.filter(vehicle => {
            const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = yearFilter === '' || vehicle.year.toString() === yearFilter;
            const matchesType = typeFilter === '' || vehicle.status === typeFilter;

            let matchesPrice = true;
            const price = vehicle?.price?.$numberDecimal;
            if (priceFilter === 'under100k') matchesPrice = price && price < 100000;
            else if (priceFilter === '100k-200k') matchesPrice = price && price >= 100000 && price < 200000;
            else if (priceFilter === 'over200k') matchesPrice = price && price >= 200000;

            return matchesSearch && matchesYear && matchesType && matchesPrice;
        });
    }, [searchTerm, yearFilter, priceFilter, typeFilter, vehicles]);


    const openModal = (car) => {
        setSelectedCar(car);
        setSelectedImageIndex(0);
        onOpenCard();
    };

    // Variantes de animación mejoradas
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                duration: 0.3,
                staggerChildren: 0.1, // Retraso entre cada card
                delayChildren: 0.2 // Retraso inicial antes de que empiecen las cards
            }
        }
    };

    const cardVariants = {
        hidden: {
            opacity: 0,
            y: 50,
            scale: 0.95,
            filter: "blur(4px)"
        },
        visible: {
            opacity: 1,
            y: 0,
            scale: 1,
            filter: "blur(0px)",
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94], // Curva de easing personalizada más suave
                type: "spring",
                stiffness: 100,
                damping: 15
            }
        },
        hover: {
            y: -8,
            scale: 1.02,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        }
    };

    // Funciones de navegación
    const goToPrevImage = () => {
        if (selectedCar?.images?.length > 0) {
            setSelectedImageIndex(prev =>
                prev === 0 ? selectedCar.images.length - 1 : prev - 1
            );
            resetZoomAndPan();
        }
    };

    const goToNextImage = () => {
        if (selectedCar?.images?.length > 0) {
            setSelectedImageIndex(prev =>
                prev === selectedCar.images.length - 1 ? 0 : prev + 1
            );
            resetZoomAndPan();
        }
    };

    // Funciones de zoom
    const zoomIn = () => {
        setZoomLevel(prev => Math.min(prev * 1.2, 3));
    };

    const zoomOut = () => {
        setZoomLevel(prev => Math.max(prev / 1.2, 0.5));
    };

    const resetZoomAndPan = () => {
        setZoomLevel(1);
        setPanPosition({ x: 0, y: 0 });
    };

    // Funciones de pan (arrastrar)
    const handleMouseDown = (e) => {
        if (zoomLevel > 1) {
            setIsDragging(true);
            setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseMove = (e) => {
        if (isDragging && zoomLevel > 1) {
            const deltaX = e.clientX - lastMousePosition.x;
            const deltaY = e.clientY - lastMousePosition.y;

            setPanPosition(prev => ({
                x: prev.x + deltaX,
                y: prev.y + deltaY
            }));

            setLastMousePosition({ x: e.clientX, y: e.clientY });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    // Función para abrir fullscreen
    const openFullscreen = () => {
        setIsFullscreen(true);
        resetZoomAndPan();
    };

    // Función para cerrar fullscreen
    const closeFullscreen = () => {
        setIsFullscreen(false);
        resetZoomAndPan();
    };

    // Manejo de teclas
    const handleKeyDown = (e) => {
        if (!isFullscreen) return;

        switch (e.key) {
            case 'Escape':
                closeFullscreen();
                break;
            case 'ArrowLeft':
                goToPrevImage();
                break;
            case 'ArrowRight':
                goToNextImage();
                break;
            case '+':
            case '=':
                zoomIn();
                break;
            case '-':
                zoomOut();
                break;
            case '0':
                resetZoomAndPan();
                break;
        }
    };

    // Responsive breakpoints
    const isMobile = useBreakpointValue({ base: true, md: false });
    const isTablet = useBreakpointValue({ base: false, md: true, lg: false });
    const isDesktop = useBreakpointValue({ base: false, lg: true });

    const headerPadding = useBreakpointValue({
        base: 4,
        sm: 5,
        md: 6
    });
    const titleSize = useBreakpointValue({
        base: "xl",
        sm: "2xl",
        md: "3xl",
        lg: "4xl"
    });
    const subtitleSize = useBreakpointValue({
        base: "sm",
        sm: "md",
        md: "lg"
    });
    const buttonSize = useBreakpointValue({
        base: "sm",
        md: "md"
    });
    const cardPadding = useBreakpointValue({
        base: 4,
        sm: 6,
        md: 8
    });

    const gridColumns = useBreakpointValue({
        base: "1fr",
        sm: "repeat(auto-fit, minmax(250px, 1fr))",
        md: "repeat(auto-fit, minmax(280px, 1fr))"
    });
    const gridGap = useBreakpointValue({
        base: 4,
        sm: 6,
        md: 8
    });

    const handleImageLoad = (index) => {
        setLoadedImages((prev) => ({ ...prev, [index]: true }));
    };

    return (
        <>
            <PremiumNavbar />
            <Box bg="black" minH="100vh" py={8} mt='20' >
                <Container maxW="7xl">
                    {/* Header */}
                    <VStack spacing={8} mb={10}>
                        <Text
                            fontSize={['3xl', '4xl', '5xl']}
                            fontWeight="bold"
                            bgGradient="linear(to-r, red.500, white)"
                            bgClip="text"
                            textAlign="center"
                        >

                        </Text>

                        {/* Filtros */}
                        <Box w="full" bg="gray.900" p={6} borderRadius="2xl" border="1px" borderColor="red.500">
                            <VStack spacing={4}>
                                {/* Barra de búsqueda */}
                                <InputGroup size="lg">
                                    <InputLeftElement>
                                        <Search color="white" size={20} />
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Buscar marca o modelo..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        bg="black"
                                        border="1px"
                                        borderColor="gray.700"
                                        color="white"
                                        _placeholder={{ color: 'gray.400' }}
                                        _focus={{ borderColor: 'red.500', boxShadow: '0 0 0 1px red.500' }}
                                    />
                                </InputGroup>

                                {/* Filtros en línea */}
                                <Grid templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr 1fr']} gap={4} w="full">
                                    <Select
                                        placeholder="Marca"
                                        value={brandFilter}
                                        onChange={(e) => setBrandFilter(e.target.value)}
                                        bg="black"
                                        borderColor="gray.700"
                                        color="white"
                                        _focus={{ borderColor: 'red.500' }}
                                    >
                                        {[...new Set(vehicles.map(vehicle => vehicle.name))].map(name => (
                                            <option key={name} value={name} style={{ background: 'black' }}>
                                                {name}
                                            </option>
                                        ))}
                                    </Select>

                                    <Select
                                        placeholder="Año"
                                        value={yearFilter}
                                        onChange={(e) => setYearFilter(e.target.value)}
                                        bg="black"
                                        borderColor="gray.700"
                                        color="white"
                                        _focus={{ borderColor: 'red.500' }}
                                    >
                                        {[...new Set(vehicles.map(vehicle => vehicle.year))].sort().reverse().map(year => (
                                            <option key={year} value={year} style={{ background: 'black' }}>
                                                {year}
                                            </option>
                                        ))}
                                    </Select>
                                    <Select
                                        placeholder="Precio"
                                        value={priceFilter}
                                        onChange={(e) => setPriceFilter(e.target.value)}
                                        bg="black"
                                        borderColor="gray.700"
                                        color="white"
                                        _focus={{ borderColor: 'red.500' }}
                                    >
                                        <option value="under100k" style={{ background: 'black' }}>Menos de Q100K</option>
                                        <option value="100k-200k" style={{ background: 'black' }}>Q100K - Q200K</option>
                                        <option value="over200k" style={{ background: 'black' }}>Más de Q200K</option>
                                    </Select>
                                </Grid>
                            </VStack>
                        </Box>
                    </VStack>

                    {/* Resultados */}
                    <Box mb={6}>
                        <Text color="gray.400" fontSize="lg">
                            {filteredCars.length} vehículos encontrados
                        </Text>
                    </Box>

                    {/* Grid de autos */}
                    <MotionGrid
                        templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                        gap={8}
                        variants={containerVariants}
                        initial="hidden"
                        animate="visible"
                    >
                        {filteredCars.map((vehicle, index) => (
                            <MotionBox
                                key={vehicle._id}
                                variants={cardVariants}
                                whileHover="hover"
                                custom={index} // Pasamos el índice para animaciones más complejas si es necesario
                                bg="gray.900"
                                borderRadius="2xl"
                                overflow="hidden"
                                border="1px"
                                borderColor="gray.800"
                                transition="all 0.3s ease"
                                onClick={() => openModal(vehicle)}
                                cursor="pointer"
                                // Añadimos una sombra sutil que se anima en hover
                                boxShadow="0 4px 20px rgba(0, 0, 0, 0.3)"
                                _hover={{
                                    borderColor: 'red.500',
                                    boxShadow: '0 8px 40px rgba(239, 68, 68, 0.2)'
                                }}
                            >
                                {/* Imagen con animación mejorada */}
                                <Box position="relative" overflow="hidden">
                                    <MotionImage
                                        src={vehicle.images[0].url}
                                        alt={`${vehicle.name} ${vehicle.model}`}
                                        w="full"
                                        h="200px"
                                        objectFit="cover"
                                        initial={{ scale: 1.1, opacity: 0 }}
                                        animate={{ scale: 1, opacity: 1 }}
                                        transition={{
                                            duration: 0.8,
                                            delay: 0.3,
                                            ease: "easeOut"
                                        }}
                                        whileHover={{
                                            scale: 1.05,
                                            transition: { duration: 0.3 }
                                        }}
                                    />
                                    <MotionBox
                                        position="absolute"
                                        top={4}
                                        right={4}
                                        bg="red.500"
                                        color="white"
                                        px={3}
                                        py={1}
                                        borderRadius="full"
                                        fontSize="sm"
                                        fontWeight="bold"
                                        initial={{ opacity: 0, x: 20, scale: 0.8 }}
                                        animate={{ opacity: 1, x: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 0.8,
                                            ease: "backOut"
                                        }}
                                    >
                                        {vehicle.year}
                                    </MotionBox>
                                </Box>

                                {/* Contenido con animaciones escalonadas */}
                                <VStack p={6} align="start" spacing={4}>
                                    {/* Título y precio */}
                                    <Flex justify="space-between" align="start" w="full">
                                        <MotionVStack
                                            align="start"
                                            spacing={1}
                                            initial={{ opacity: 0, x: -20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.4 }}
                                        >
                                            <Text fontSize="xl" fontWeight="bold" color="white">
                                                {vehicle.name} {vehicle.model} {vehicle.year}
                                            </Text>
                                            <Text fontSize="lg" color="gray.300">
                                                DISPONIBLE
                                            </Text>
                                        </MotionVStack>
                                        <MotionText
                                            fontSize="xl"
                                            fontWeight="bold"
                                            color="red.400"
                                            initial={{ opacity: 0, x: 20 }}
                                            animate={{ opacity: 1, x: 0 }}
                                            transition={{ duration: 0.5, delay: 0.5 }}
                                        >
                                            Q{vehicle.price.$numberDecimal}
                                        </MotionText>
                                    </Flex>

                                    {/* Badges con animación */}
                                    <MotionHStack
                                        spacing={2}
                                        flexWrap="wrap"
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.6 }}
                                    >
                                        <Badge colorScheme="red" variant="subtle">
                                            {vehicle.year}
                                        </Badge>
                                        <Badge colorScheme="gray" variant="outline">
                                            {vehicle.name}
                                        </Badge>
                                    </MotionHStack>

                                    {/* Especificaciones con animación individual */}
                                    <Grid templateColumns="1fr 1fr 1fr" gap={4} w="full">
                                        {[
                                            { icon: Calendar, value: vehicle.year },
                                            { icon: Car, value: vehicle.model },
                                            { icon: DollarSign, value: `Q${vehicle.price.$numberDecimal}` }
                                        ].map((spec, specIndex) => (
                                            <MotionVStack
                                                key={specIndex}
                                                spacing={1}
                                                initial={{ opacity: 0, y: 15, scale: 0.9 }}
                                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                                transition={{
                                                    duration: 0.4,
                                                    delay: 0.7 + (specIndex * 0.1),
                                                    ease: "easeOut"
                                                }}
                                            >
                                                <spec.icon size={16} color="#EF4444" />
                                                <Text fontSize="sm" color="gray.400" textAlign="center">
                                                    {spec.value}
                                                </Text>
                                            </MotionVStack>
                                        ))}
                                    </Grid>

                                    {/* Botón con animación final */}
                                    <MotionButton
                                        w="full"
                                        bg="red.500"
                                        color="white"
                                        _hover={{ bg: 'red.600', transform: 'translateY(-2px)' }}
                                        _active={{ bg: 'red.700' }}
                                        size="lg"
                                        borderRadius="xl"
                                        initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        transition={{
                                            duration: 0.5,
                                            delay: 1.0,
                                            ease: "backOut"
                                        }}
                                        whileHover={{
                                            scale: 1.02,
                                            y: -2,
                                            transition: { duration: 0.2 }
                                        }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Ver Detalles
                                    </MotionButton>
                                </VStack>
                            </MotionBox>
                        ))}
                    </MotionGrid>

                    {/* Mensaje cuando no hay resultados */}
                    {filteredCars?.length === 0 && (
                        <MotionBox
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6 }}
                            textAlign="center"
                            py={20}
                        >
                            <Text fontSize="2xl" color="gray.400" mb={4}>
                                No se encontraron vehículos
                            </Text>
                            <Text color="gray.500">
                                Prueba ajustando los filtros de búsqueda
                            </Text>
                        </MotionBox>
                    )}

                    {/* Modal Principal */}
                    <Modal isOpen={isOpenCard} onClose={onCloseCard} size={modalSize}>
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
                                        <Box position="relative" mb={4}>
                                            <Image
                                                src={selectedCar?.images[selectedImageIndex]?.url}
                                                alt={selectedCar?.name}
                                                w="100%"
                                                h={{ base: "250px", md: "300px" }}
                                                objectFit="cover"
                                                borderRadius="lg"
                                            />

                                            {/* Botón de maximizar en esquina inferior derecha */}
                                            <IconButton
                                                icon={<Maximize2 size={16} />}
                                                aria-label="Maximizar imagen"
                                                position="absolute"
                                                bottom={2}
                                                right={2}
                                                size="sm"
                                                bg="rgba(0,0,0,0.7)"
                                                color="white"
                                                _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                                borderRadius="md"
                                                onClick={openFullscreen}
                                            />

                                            {/* Navegación en imagen principal (solo si hay múltiples imágenes) */}
                                            {selectedCar?.images?.length > 1 && (
                                                <>
                                                    <IconButton
                                                        icon={<ChevronLeft size={20} />}
                                                        aria-label="Imagen anterior"
                                                        position="absolute"
                                                        left={2}
                                                        top="50%"
                                                        transform="translateY(-50%)"
                                                        size="sm"
                                                        bg="rgba(0,0,0,0.7)"
                                                        color="white"
                                                        _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                                        borderRadius="full"
                                                        onClick={goToPrevImage}
                                                    />
                                                    <IconButton
                                                        icon={<ChevronRight size={20} />}
                                                        aria-label="Imagen siguiente"
                                                        position="absolute"
                                                        right={2}
                                                        top="50%"
                                                        transform="translateY(-50%)"
                                                        size="sm"
                                                        bg="rgba(0,0,0,0.7)"
                                                        color="white"
                                                        _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                                        borderRadius="full"
                                                        onClick={goToNextImage}
                                                    />
                                                </>
                                            )}

                                            {/* Contador de imágenes */}
                                            {selectedCar?.images?.length > 1 && (
                                                <Box
                                                    position="absolute"
                                                    bottom={2}
                                                    left={2}
                                                    bg="rgba(0,0,0,0.7)"
                                                    color="white"
                                                    px={2}
                                                    py={1}
                                                    borderRadius="md"
                                                    fontSize="xs"
                                                >
                                                    {selectedImageIndex + 1} / {selectedCar.images.length}
                                                </Box>
                                            )}
                                        </Box>

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
                                        as='a'
                                        variant="outline"
                                        borderColor="red.500"
                                        color="red.500"
                                        _hover={{ bg: "red.500", color: "white" }}
                                        size={{ base: "md", md: "lg" }}
                                        px={8}
                                        flex={1}
                                        href={`https://api.whatsapp.com/send?phone=50230300738&text=${encodeURIComponent(`Buenas tardes, quisiera cotizar acerca del vehículo ${selectedCar?.name} ${selectedCar?.model} ${selectedCar?.year} que vi en su sitio web.`)}`}
                                        target='_blank'
                                        rel='noopener noreferrer'
                                    >
                                        Contactar Vendedor
                                    </Button>
                                </Stack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>

                    {/* Modal Fullscreen para zoom e imágenes */}
                    <Modal isOpen={isFullscreen} onClose={closeFullscreen} size="full">
                        <ModalOverlay bg="rgba(0,0,0,0.95)" />
                        <ModalContent bg="transparent" boxShadow="none">
                            <Box
                                position="relative"
                                w="100vw"
                                h="100vh"
                                display="flex"
                                alignItems="center"
                                justifyContent="center"
                                overflow="hidden"
                            >
                                {/* Imagen con zoom */}
                                <Box
                                    w="100%"
                                    h="100%"
                                    display="flex"
                                    alignItems="center"
                                    justifyContent="center"
                                    cursor={zoomLevel > 1 ? (isDragging ? "grabbing" : "grab") : "default"}
                                    onMouseDown={handleMouseDown}
                                    onMouseMove={handleMouseMove}
                                    onMouseUp={handleMouseUp}
                                    onMouseLeave={handleMouseUp}
                                >
                                    <Image
                                        src={selectedCar?.images[selectedImageIndex]?.url}
                                        alt={selectedCar?.name}
                                        maxW="90%"
                                        maxH="90%"
                                        objectFit="contain"
                                        transform={`scale(${zoomLevel}) translate(${panPosition.x}px, ${panPosition.y}px)`}
                                        transition={isDragging ? "none" : "transform 0.2s ease"}
                                        userSelect="none"
                                        pointerEvents={zoomLevel > 1 ? "auto" : "none"}
                                    />
                                </Box>

                                {/* Controles de zoom */}
                                <VStack
                                    position="absolute"
                                    right={4}
                                    top="50%"
                                    transform="translateY(-50%)"
                                    spacing={2}
                                    bg="rgba(0,0,0,0.7)"
                                    borderRadius="md"
                                    p={2}
                                >
                                    <IconButton
                                        icon={<ZoomIn size={16} />}
                                        aria-label="Zoom in"
                                        size="sm"
                                        bg="transparent"
                                        color="white"
                                        _hover={{ bg: "rgba(255,255,255,0.2)" }}
                                        onClick={zoomIn}
                                        isDisabled={zoomLevel >= 3}
                                    />
                                    <Text color="white" fontSize="xs" textAlign="center">
                                        {Math.round(zoomLevel * 100)}%
                                    </Text>
                                    <IconButton
                                        icon={<ZoomOut size={16} />}
                                        aria-label="Zoom out"
                                        size="sm"
                                        bg="transparent"
                                        color="white"
                                        _hover={{ bg: "rgba(255,255,255,0.2)" }}
                                        onClick={zoomOut}
                                        isDisabled={zoomLevel <= 0.5}
                                    />
                                </VStack>

                                {/* Navegación entre imágenes */}
                                {selectedCar?.images?.length > 1 && (
                                    <>
                                        <IconButton
                                            icon={<ChevronLeft size={32} />}
                                            aria-label="Imagen anterior"
                                            position="absolute"
                                            left={4}
                                            top="50%"
                                            transform="translateY(-50%)"
                                            size="lg"
                                            bg="rgba(0,0,0,0.7)"
                                            color="white"
                                            _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                            borderRadius="full"
                                            onClick={goToPrevImage}
                                        />
                                        <IconButton
                                            icon={<ChevronRight size={32} />}
                                            aria-label="Imagen siguiente"
                                            position="absolute"
                                            right={20}
                                            top="50%"
                                            transform="translateY(-50%)"
                                            size="lg"
                                            bg="rgba(0,0,0,0.7)"
                                            color="white"
                                            _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                            borderRadius="full"
                                            onClick={goToNextImage}
                                        />
                                    </>
                                )}

                                {/* Botón de cerrar */}
                                <IconButton
                                    icon={<X size={24} />}
                                    aria-label="Cerrar"
                                    position="absolute"
                                    top={4}
                                    right={4}
                                    size="lg"
                                    bg="rgba(0,0,0,0.7)"
                                    color="white"
                                    _hover={{ bg: "rgba(0,0,0,0.9)" }}
                                    borderRadius="full"
                                    onClick={closeFullscreen}
                                />

                                {/* Información de la imagen */}
                                <Box
                                    position="absolute"
                                    bottom={4}
                                    left={4}
                                    bg="rgba(0,0,0,0.7)"
                                    color="white"
                                    px={4}
                                    py={2}
                                    borderRadius="md"
                                >
                                    <Text fontSize="sm" fontWeight="bold">
                                        {selectedCar?.name}
                                    </Text>
                                    {selectedCar?.images?.length > 1 && (
                                        <Text fontSize="xs" color="gray.300">
                                            Imagen {selectedImageIndex + 1} de {selectedCar.images.length}
                                        </Text>
                                    )}
                                </Box>

                                {/* Instrucciones de uso */}
                                <Box
                                    position="absolute"
                                    top={4}
                                    left={4}
                                    bg="rgba(0,0,0,0.7)"
                                    color="white"
                                    px={3}
                                    py={2}
                                    borderRadius="md"
                                    fontSize="xs"
                                >
                                    <Text>ESC: Salir • ←→: Navegar • +/-: Zoom • Arrastrar para mover</Text>
                                </Box>
                            </Box>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
            <ContactFooter />
        </>
    );
};

export default CarListing;