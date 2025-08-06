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
    Skeleton,
    InputRightElement
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, Filter, Calendar, Zap, Fuel, Car, DollarSign, Maximize2, Gauge, Phone, Mail, MapPin, ZoomIn, ZoomOut, X, ChevronLeft, ChevronRight } from 'lucide-react';
import useVehicles from '../shared/hooks/useVehicles';

const MotionBox = motion(Box);
const MotionGrid = motion(Grid);
const MotionImage = motion(Image);
const MotionVStack = motion(VStack);
const MotionHStack = motion(HStack);
const MotionButton = motion(Button);
const MotionInputGroup = motion(InputGroup);
const MotionSelect = motion(Select);
const MotionText = motion(Text);

const CarListing = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [brandFilter, setBrandFilter] = useState('');
    const [yearFilter, setYearFilter] = useState('');
    const [priceFilter, setPriceFilter] = useState('');
    const [typeFilter, setTypeFilter] = useState('');
    const [selectedCar, setSelectedCar] = useState(null);
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

    // Filtrado de autos
    const filteredCars = useMemo(() => {
        const noFilters =
            searchTerm === '' && yearFilter === '' && typeFilter === '' && priceFilter === '' && brandFilter === '';
        if (noFilters) return vehicles;

        return vehicles.filter(vehicle => {
            const matchesSearch = vehicle.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                vehicle.model.toLowerCase().includes(searchTerm.toLowerCase());
            const matchesYear = yearFilter === '' || vehicle.year.toString() === yearFilter;
            const matchesType = typeFilter === '' || vehicle.model === typeFilter;
            const matchesBrand = brandFilter === '' || vehicle.name === brandFilter;

            let matchesPrice = true;
            const price = vehicle?.price?.$numberDecimal;
            if (priceFilter === 'under25k') matchesPrice = price && price < 25000;
            else if (priceFilter === '25k-50k') matchesPrice = price && price >= 25000 && price <= 50000;
            else if (priceFilter === '50k-100k') matchesPrice = price && price >= 50000 && price <= 100000;
            else if (priceFilter === '100k-200k') matchesPrice = price && price >= 100000 && price < 200000;
            else if (priceFilter === 'over200k') matchesPrice = price && price >= 200000;

            return matchesSearch && matchesYear && matchesType && matchesPrice && matchesBrand;
        });
    }, [searchTerm, yearFilter, priceFilter, typeFilter, brandFilter, vehicles]);


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

    if (loading || vehicles.length === 0) {
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
                                <MotionText
                                    fontSize="md"
                                    color="gray.300"
                                    textAlign="center"
                                    mt={2}
                                    variants={itemVariants}
                                >
                                    Por mientras pueden ver nuestra locacion y nuestro contacto aqui abajo 👇
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

    return (
        <>
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
                        <MotionBox
                            w="full"
                            bg="linear-gradient(135deg, #1a1a1a 0%, #2d1b1b 100%)"
                            p={8}
                            borderRadius="3xl"
                            border="2px"
                            borderColor="red.600"
                            boxShadow="0 25px 50px -12px rgba(239, 68, 68, 0.25)"
                            position="relative"
                            overflow="hidden"
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.6, ease: "easeOut" }}
                            _before={{
                                content: '""',
                                position: 'absolute',
                                top: 0,
                                left: 0,
                                right: 0,
                                height: '2px',
                                background: 'linear-gradient(90deg, transparent, red.500, transparent)',
                                animation: 'shimmer 3s infinite'
                            }}
                        >
                            {/* Efectos de fondo decorativos */}
                            <Box
                                position="absolute"
                                top="-50%"
                                right="-50%"
                                width="200%"
                                height="200%"
                                background="radial-gradient(circle, rgba(239, 68, 68, 0.03) 0%, transparent 70%)"
                                pointerEvents="none"
                            />

                            <VStack spacing={6} position="relative" zIndex={2}>
                                {/* Header del buscador */}
                                <MotionBox
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: 0.2, duration: 0.5 }}
                                    w="full"
                                    textAlign="center"
                                >
                                    <HStack justify="center" spacing={3} mb={2}>
                                        <Box
                                            p={2}
                                            bg="red.600"
                                            borderRadius="xl"
                                            boxShadow="0 0 20px rgba(239, 68, 68, 0.4)"
                                        >
                                            <Search color="white" size={20} />
                                        </Box>
                                        <Text
                                            fontSize="xl"
                                            fontWeight="bold"
                                            color="white"
                                            textShadow="0 2px 4px rgba(0,0,0,0.5)"
                                        >
                                            Buscar Vehículos
                                        </Text>
                                    </HStack>
                                    <Text fontSize="sm" color="gray.400">
                                        Encuentra el vehículo perfecto para ti
                                    </Text>
                                </MotionBox>

                                {/* Barra de búsqueda principal */}
                                <MotionInputGroup
                                    size="lg"
                                    initial={{ opacity: 0, scale: 0.95 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    transition={{ delay: 0.3, duration: 0.5 }}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                >
                                    <InputLeftElement pointerEvents="none" pl={4}>
                                        <motion.div
                                            animate={{
                                                color: searchTerm ? "#ef4444" : "#9ca3af",
                                                scale: searchTerm ? 1.1 : 1
                                            }}
                                            transition={{ duration: 0.2 }}
                                        >
                                            <Search size={22} />
                                        </motion.div>
                                    </InputLeftElement>
                                    <Input
                                        placeholder="Buscar marca, modelo o características..."
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                        bg="rgba(0, 0, 0, 0.7)"
                                        backdropFilter="blur(10px)"
                                        border="2px"
                                        borderColor="gray.700"
                                        color="white"
                                        fontSize="lg"
                                        h="60px"
                                        pl={16}
                                        pr={searchTerm ? 16 : 6}
                                        borderRadius="2xl"
                                        _placeholder={{
                                            color: 'gray.500',
                                            fontSize: 'md'
                                        }}
                                        _hover={{
                                            borderColor: 'red.400',
                                            boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.3)'
                                        }}
                                        _focus={{
                                            borderColor: 'red.500',
                                            boxShadow: '0 0 0 3px rgba(239, 68, 68, 0.2), 0 0 20px rgba(239, 68, 68, 0.1)',
                                            bg: 'rgba(0, 0, 0, 0.9)'
                                        }}
                                        transition="all 0.3s ease"
                                    />
                                    {searchTerm && (
                                        <InputRightElement pr={4} h="full">
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0 }}
                                                animate={{ opacity: 1, scale: 1 }}
                                                exit={{ opacity: 0, scale: 0 }}
                                                whileHover={{ scale: 1.1 }}
                                                whileTap={{ scale: 0.9 }}
                                            >
                                                <IconButton
                                                    size="sm"
                                                    aria-label="Limpiar búsqueda"
                                                    icon={<X size={16} />}
                                                    onClick={() => setSearchTerm('')}
                                                    bg="gray.700"
                                                    color="gray.300"
                                                    borderRadius="full"
                                                    _hover={{
                                                        bg: 'red.600',
                                                        color: 'white',
                                                        transform: 'rotate(90deg)'
                                                    }}
                                                    transition="all 0.2s ease"
                                                />
                                            </motion.div>
                                        </InputRightElement>
                                    )}
                                </MotionInputGroup>

                                {/* Filtros con diseño mejorado */}
                                <MotionBox
                                    w="full"
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: 0.4, duration: 0.5 }}
                                >
                                    <HStack spacing={2} mb={4} align="center">
                                        <Filter size={18} color="#ef4444" />
                                        <Text fontSize="md" fontWeight="semibold" color="white">
                                            Filtros Avanzados
                                        </Text>
                                        <Box flex={1} h="1px" bg="gray.700" />
                                    </HStack>

                                    <Grid
                                        templateColumns={['1fr', '1fr 1fr', '1fr 1fr 1fr']}
                                        gap={4}
                                        w="full"
                                    >
                                        {/* Filtro de Marca */}
                                        <MotionSelect
                                            placeholder="🏷️ Seleccionar Marca"
                                            value={brandFilter}
                                            onChange={(e) => setBrandFilter(e.target.value)}
                                            bg="rgba(0, 0, 0, 0.7)"
                                            backdropFilter="blur(10px)"
                                            border="2px"
                                            borderColor="gray.700"
                                            color="white"
                                            h="50px"
                                            borderRadius="xl"
                                            fontSize="md"
                                            whileHover={{ scale: 1.02 }}
                                            _hover={{
                                                borderColor: 'red.400',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.2)'
                                            }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)'
                                            }}
                                            transition="all 0.2s ease"
                                        >
                                            {[...new Set(vehicles.map(vehicle => vehicle.name))].map(name => (
                                                <option key={name} value={name} style={{
                                                    background: '#1a1a1a',
                                                    color: 'white',
                                                    padding: '10px'
                                                }}>
                                                    {name}
                                                </option>
                                            ))}
                                        </MotionSelect>

                                        {/* Filtro de Año */}
                                        <MotionSelect
                                            placeholder="📅 Seleccionar Año"
                                            value={yearFilter}
                                            onChange={(e) => setYearFilter(e.target.value)}
                                            bg="rgba(0, 0, 0, 0.7)"
                                            backdropFilter="blur(10px)"
                                            border="2px"
                                            borderColor="gray.700"
                                            color="white"
                                            h="50px"
                                            borderRadius="xl"
                                            fontSize="md"
                                            whileHover={{ scale: 1.02 }}
                                            _hover={{
                                                borderColor: 'red.400',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.2)'
                                            }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)'
                                            }}
                                            transition="all 0.2s ease"
                                        >
                                            {[...new Set(vehicles.map(vehicle => vehicle.year))].sort().reverse().map(year => (
                                                <option key={year} value={year} style={{
                                                    background: '#1a1a1a',
                                                    color: 'white',
                                                    padding: '10px'
                                                }}>
                                                    {year}
                                                </option>
                                            ))}
                                        </MotionSelect>

                                        {/* Filtro de Precio */}
                                        <MotionSelect
                                            placeholder="💰 Rango de Precio"
                                            value={priceFilter}
                                            onChange={(e) => setPriceFilter(e.target.value)}
                                            bg="rgba(0, 0, 0, 0.7)"
                                            backdropFilter="blur(10px)"
                                            border="2px"
                                            borderColor="gray.700"
                                            color="white"
                                            h="50px"
                                            borderRadius="xl"
                                            fontSize="md"
                                            whileHover={{ scale: 1.02 }}
                                            _hover={{
                                                borderColor: 'red.400',
                                                boxShadow: '0 0 0 1px rgba(239, 68, 68, 0.2)'
                                            }}
                                            _focus={{
                                                borderColor: 'red.500',
                                                boxShadow: '0 0 0 2px rgba(239, 68, 68, 0.3)'
                                            }}
                                            transition="all 0.2s ease"
                                        >
                                            <option value="under25k" style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '10px'
                                            }}>
                                                Menos de Q25K
                                            </option>
                                            <option value="25k-50k" style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '10px'
                                            }}>
                                                Q25k-Q50k
                                            </option>
                                            <option value="50k-100k" style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '10px'
                                            }}>
                                                Q50k-Q100k
                                            </option>
                                            <option value="100k-200k" style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '10px'
                                            }}>
                                                Q100K - Q200K
                                            </option>
                                            <option value="over200k" style={{
                                                background: '#1a1a1a',
                                                color: 'white',
                                                padding: '10px'
                                            }}>
                                                Más de Q200K
                                            </option>
                                        </MotionSelect>
                                    </Grid>
                                </MotionBox>

                                {/* Indicador de filtros activos */}
                                {(brandFilter || yearFilter || priceFilter || searchTerm) && (
                                    <MotionBox
                                        w="full"
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: 'auto' }}
                                        exit={{ opacity: 0, height: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <HStack spacing={2} flexWrap="wrap">
                                            <Text fontSize="xs" color="gray.400">Filtros activos:</Text>
                                            {searchTerm && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                >
                                                    <Badge colorScheme="red" variant="subtle" borderRadius="full" px={3} py={1}>
                                                        Búsqueda: {searchTerm}
                                                    </Badge>
                                                </motion.div>
                                            )}
                                            {brandFilter && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                >
                                                    <Badge colorScheme="red" variant="subtle" borderRadius="full" px={3} py={1}>
                                                        Marca: {brandFilter}
                                                    </Badge>
                                                </motion.div>
                                            )}
                                            {yearFilter && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                >
                                                    <Badge colorScheme="red" variant="subtle" borderRadius="full" px={3} py={1}>
                                                        Año: {yearFilter}
                                                    </Badge>
                                                </motion.div>
                                            )}
                                            {priceFilter && (
                                                <motion.div
                                                    initial={{ opacity: 0, scale: 0 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    exit={{ opacity: 0, scale: 0 }}
                                                >
                                                    <Badge colorScheme="red" variant="subtle" borderRadius="full" px={3} py={1}>
                                                        Precio: {priceFilter === 'under100k' ? 'Menos de Q100K' :
                                                            priceFilter === '100k-200k' ? 'Q100K - Q200K' : 'Más de Q200K'}
                                                    </Badge>
                                                </motion.div>
                                            )}
                                        </HStack>
                                    </MotionBox>
                                )}
                            </VStack>
                        </MotionBox>
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
                            </Box>
                        </ModalContent>
                    </Modal>
                </Container>
            </Box>
        </>
    );
};

export default CarListing;