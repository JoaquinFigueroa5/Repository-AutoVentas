import React, { useState, useEffect } from 'react';
import {
    Box,
    Grid,
    GridItem,
    Flex,
    Text,
    VStack,
    HStack,
    Card,
    CardBody,
    CardHeader,
    Stat,
    StatLabel,
    StatNumber,
    Progress,
    Button,
    IconButton,
    Divider,
    useBreakpointValue,
    Circle,
    Modal,
    ModalBody,
    ModalFooter,
    useDisclosure,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    Heading,
    ModalCloseButton,
    Wrap,
    Stack,
    Image,
    WrapItem,
    Skeleton,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Car,
    Users,
    Calendar,
    MoreVertical,
    Plus,
    Filter,
    LogOutIcon,
    Gauge,
    Fuel,
    Phone,
    Mail,
    MapPin,
    Heart,
    Maximize2,
    ChevronLeft,
    ChevronRight,
    ZoomIn,
    ZoomOut,
    X,
    MenuIcon,
    Trash2
} from 'lucide-react';
import useVehicles from '../shared/hooks/useVehicles';
import useUserStore from '../context/UserStore';
import { logout } from '../shared/hooks/useLogout';
import ModalAddVehicle from '../components/ModalAddVehicle';
import VehicleDeleteModal from '../components/ConfirModal';
import ContactFooter from '../components/Footer';

const MotionBox = motion(Box);
const MotionCard = motion(Card);
const MotionFlex = motion(Flex);

const AutoSalesDashboard = () => {
    const [selectedCar, setSelectedCar] = useState(null);
    const [favorites, setFavorites] = useState(new Set());
    const [selectedImageIndex, setSelectedImageIndex] = useState(0);
    const [loadedImages, setLoadedImages] = useState({});
    const [hoveredCard, setHoveredCard] = useState(null);
    const [isFullscreen, setIsFullscreen] = useState(false);
    const [zoomLevel, setZoomLevel] = useState(1);
    const [panPosition, setPanPosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [lastMousePosition, setLastMousePosition] = useState({ x: 0, y: 0 });

    const { vehicles, fetchVehiclesRecents, loading, error, deleteVehicles } = useVehicles();
    const { user, fetchUser } = useUserStore();
    const { isOpen: isOpenCard, onOpen: onOpenCard, onClose: onCloseCard } = useDisclosure();
    const { isOpen: isOpenDrawer, onOpen: onOpenDrawer, onClose: onCloseDrawer } = useDisclosure();
    const { isOpen: isOpenModal, onOpen: onOpenModal, onClose: onCloseModal } = useDisclosure();
    const { isOpen: isOpenDelete, onOpen: onOpenDelete, onClose: onCloseDelete } = useDisclosure();


    useEffect(() => {
        fetchVehiclesRecents();
    }, [])



    const openModal = (car) => {
        setSelectedCar(car);
        setSelectedImageIndex(0);
        onOpenCard();
    };

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                delayChildren: 0.1,
                staggerChildren: 0.05
            }
        }
    };

    const itemVariants = {
        hidden: { y: 30, opacity: 0, scale: 0.95 },
        visible: {
            y: 0,
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.6,
                ease: [0.25, 0.46, 0.45, 0.94]
            }
        }
    };

    const cardHoverVariants = {
        hover: {
            scale: 1.02,
            y: -8,
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

    // Responsive values
    const modalSize = useBreakpointValue({ base: "full", md: "4xl", lg: "6xl" });

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

    const metrics = [
        {
            key: 'vehiculos',
            label: 'Vehículos Disponibles',
            value: vehicles.length,
            icon: Car,
            gradient: 'linear(135deg, red.600, red.700)'
        },
        {
            key: 'clientes',
            label: 'Usuarios activos',
            value: 1,
            icon: Users,
            change: 15.3,
            isPositive: true,
            gradient: 'linear(135deg, red.400, red.500)'
        }
    ];

    // Mobile Actions Drawer Component

    useEffect(() => {
        if (isFullscreen) {
            document.addEventListener('keydown', handleKeyDown);
            return () => document.removeEventListener('keydown', handleKeyDown);
        }
    }, [isFullscreen]);

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

    const handleLogout = () => {
        logout();
        fetchUser();
    }

    // Mobile Actions Drawer Component
    const MobileActionsDrawer = () => (
        <Drawer isOpen={isOpenDrawer} placement="right" onClose={onCloseDrawer}>
            <DrawerOverlay />
            <DrawerContent bg="gray.900" color="white">
                <DrawerCloseButton color="white" />
                <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
                    Acciones
                </DrawerHeader>
                <DrawerBody p={0}>
                    <VStack spacing={0} align="stretch">
                        <Button
                            leftIcon={<Filter size={18} />}
                            variant="ghost"
                            justifyContent="flex-start"
                            borderRadius={0}
                            p={6}
                            color="red.400"
                            _hover={{
                                bg: 'rgba(239, 68, 68, 0.1)',
                                color: 'red.300'
                            }}
                        >
                            Filtros
                        </Button>
                        <Divider borderColor="gray.700" />
                        <Button
                            leftIcon={<Plus size={18} />}
                            variant="ghost"
                            justifyContent="flex-start"
                            borderRadius={0}
                            p={6}
                            color="red.400"
                            _hover={{
                                bg: 'rgba(239, 68, 68, 0.1)',
                                color: 'red.300'
                            }}
                            onClick={onOpenModal}
                        >
                            Nueva Venta
                        </Button>
                        <Divider borderColor="gray.700" />
                        <Button
                            leftIcon={<LogOutIcon size={18} />}
                            variant="ghost"
                            justifyContent="flex-start"
                            borderRadius={0}
                            p={6}
                            color="red.400"
                            _hover={{
                                bg: 'rgba(239, 68, 68, 0.1)',
                                color: 'red.300'
                            }}
                            onClick={() => {
                                handleLogout();
                                onClose();
                            }}
                        >
                            Cerrar Sesión
                        </Button>
                    </VStack>
                </DrawerBody>
            </DrawerContent>
        </Drawer>
    );

    // Desktop Actions Component
    const DesktopActions = () => (
        <HStack spacing={4}>
            <Button
                leftIcon={<Filter size={18} />}
                variant="outline"
                borderColor="red.500"
                color="red.400"
                bg="rgba(239, 68, 68, 0.1)"
                backdropFilter="blur(10px)"
                _hover={{
                    bg: 'red.500',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
                }}
                borderRadius="lg"
                px={6}
                py={6}
                size={buttonSize}
                transition="all 0.3s ease"
            >
                Filtros
            </Button>
            <Button
                leftIcon={<Plus size={18} />}
                bg="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                color="white"
                _hover={{
                    transform: 'translateY(-2px)',
                    boxShadow: '0 12px 35px rgba(239, 68, 68, 0.4)'
                }}
                borderRadius="lg"
                px={6}
                py={6}
                size={buttonSize}
                fontWeight="600"
                transition="all 0.3s ease"
                onClick={onOpenModal}
            >
                Nueva Venta
            </Button>
            <Button
                leftIcon={<LogOutIcon size={18} />}
                variant="outline"
                borderColor="red.500"
                color="red.400"
                bg="rgba(239, 68, 68, 0.1)"
                backdropFilter="blur(10px)"
                _hover={{
                    bg: 'red.500',
                    color: 'white',
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 25px rgba(239, 68, 68, 0.3)'
                }}
                borderRadius="lg"
                px={6}
                py={6}
                size={buttonSize}
                transition="all 0.3s ease"
                onClick={handleLogout}
            >
                Cerrar sesión
            </Button>
        </HStack>
    );

    // Tablet Actions Component
    const TabletActions = () => (
        <HStack spacing={2}>
            <Button
                leftIcon={<Filter size={16} />}
                variant="outline"
                borderColor="red.500"
                color="red.400"
                bg="rgba(239, 68, 68, 0.1)"
                size="sm"
                borderRadius="lg"
            >
                Filtros
            </Button>
            <Button
                leftIcon={<Plus size={16} />}
                bg="linear-gradient(135deg, #EF4444 0%, #DC2626 100%)"
                color="white"
                size="sm"
                borderRadius="lg"
                onClick={onOpenModal}
            >
                Nueva Venta
            </Button>
            <Menu>
                <MenuButton
                    as={IconButton}
                    icon={<MoreVertical size={16} />}
                    variant="outline"
                    borderColor="red.500"
                    color="red.400"
                    size="sm"
                />
                <MenuList bg="gray.900" borderColor="gray.700">
                    <MenuItem
                        icon={<LogOutIcon size={16} />}
                        onClick={handleLogout}
                        bg="gray.900"
                        color="red.400"
                        _hover={{ bg: "rgba(239, 68, 68, 0.1)" }}
                    >
                        Cerrar Sesión
                    </MenuItem>
                </MenuList>
            </Menu>
        </HStack>
    );

    // Mobile Actions Component
    const MobileActions = () => (
        <IconButton
            icon={<MenuIcon size={20} />}
            variant="outline"
            borderColor="red.500"
            color="red.400"
            bg="rgba(239, 68, 68, 0.1)"
            onClick={onOpenDrawer}
            size={buttonSize}
            borderRadius="lg"
        />
    );

    return (
        <>
            <Box
                bg="linear-gradient(135deg, #000000 0%, #1a1a1a 50%, #000000 100%)"
                minH="100vh"
                p={8}
                position="relative"
                _before={{
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundImage: 'radial-gradient(circle at 20% 80%, rgba(239, 68, 68, 0.1) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(239, 68, 68, 0.05) 0%, transparent 50%)',
                    pointerEvents: 'none'
                }}
            >
                <MotionBox
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    position="relative"
                    zIndex={1}
                >
                    {/* Header Mejorado */}
                    <MotionBox variants={itemVariants} mb={{ base: 6, md: 8, lg: 10 }}>
                        <MotionFlex
                            justify="space-between"
                            align={{ base: "flex-start", md: "center" }}
                            direction={{ base: "column", md: "row" }}
                            gap={{ base: 4, md: 0 }}
                            mb={{ base: 6, md: 8 }}
                            p={headerPadding}
                            bg="rgba(30, 30, 30, 0.8)"
                            backdropFilter="blur(20px)"
                            borderRadius={{ base: "xl", md: "2xl" }}
                            border="1px solid rgba(239, 68, 68, 0.1)"
                            boxShadow="0 8px 32px rgba(0, 0, 0, 0.4)"
                            whileHover={{
                                boxShadow: "0 12px 40px rgba(239, 68, 68, 0.2)",
                                transition: { duration: 0.3 }
                            }}
                        >
                            <VStack align={{ base: "center", md: "start" }} spacing={1} flex="1">
                                <Text
                                    fontSize={titleSize}
                                    fontWeight="900"
                                    bgGradient="linear(to-r, white, gray.300)"
                                    bgClip="text"
                                    letterSpacing="-0.02em"
                                    textAlign={{ base: "center", md: "left" }}
                                    lineHeight="1.1"
                                >
                                    Dashboard Administrativo
                                </Text>
                                <Text
                                    color="gray.400"
                                    fontSize={subtitleSize}
                                    fontWeight="500"
                                    letterSpacing="0.02em"
                                    textAlign={{ base: "center", md: "left" }}
                                >
                                    Gestión de Ventas Automotriz
                                </Text>
                            </VStack>

                            {/* Responsive Actions */}
                            <Box>
                                {isMobile && <MobileActions />}
                                {isTablet && <TabletActions />}
                                {isDesktop && <DesktopActions />}
                            </Box>
                        </MotionFlex>
                    </MotionBox>

                    {/* Métricas Principales Responsivas */}
                    <Grid
                        templateColumns={gridColumns}
                        gap={gridGap}
                        mb={{ base: 8, md: 10, lg: 12 }}
                    >
                        {metrics.map((metric, index) => (
                            <MotionCard
                                key={metric.key}
                                bg="rgba(20, 20, 20, 0.9)"
                                backdropFilter="blur(20px)"
                                border="1px solid rgba(239, 68, 68, 0.1)"
                                borderRadius={{ base: "xl", md: "2xl" }}
                                overflow="hidden"
                                position="relative"
                                onMouseEnter={() => setHoveredCard?.(metric.key)}
                                onMouseLeave={() => setHoveredCard?.(null)}
                                whileHover="hover"
                                variants={cardHoverVariants}
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                                _hover={{
                                    border: "1px solid rgba(239, 68, 68, 0.3)",
                                    boxShadow: "0 20px 60px rgba(239, 68, 68, 0.15)"
                                }}
                                transition="all 0.3s ease"
                            >
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h="4px"
                                    bgGradient={metric.gradient}
                                />
                                <CardBody p={cardPadding}>
                                    <Flex
                                        justify="space-between"
                                        align="start"
                                        mb={{ base: 4, md: 6 }}
                                        direction={{ base: "column", sm: "row" }}
                                        gap={{ base: 3, sm: 0 }}
                                    >
                                        <Stat flex="1">
                                            <StatLabel
                                                color="gray.400"
                                                fontSize={{ base: "xs", md: "sm" }}
                                                fontWeight="600"
                                                letterSpacing="0.05em"
                                                textTransform="uppercase"
                                                mb={1}
                                            >
                                                {metric.label}
                                            </StatLabel>
                                            <StatNumber
                                                color="white"
                                                fontSize={{ base: "2xl", sm: "3xl" }}
                                                fontWeight="900"
                                                mb={2}
                                            >
                                                {metric.value}
                                            </StatNumber>
                                        </Stat>
                                        <MotionBox
                                            p={{ base: 3, md: 4 }}
                                            bgGradient={metric.gradient}
                                            borderRadius={{ base: "lg", md: "xl" }}
                                            whileHover={{
                                                scale: 1.1,
                                                rotate: 5,
                                                transition: { duration: 0.2 }
                                            }}
                                            boxShadow="0 8px 25px rgba(239, 68, 68, 0.3)"
                                            alignSelf={{ base: "center", sm: "flex-start" }}
                                        >
                                            <metric.icon
                                                color="white"
                                                size={useBreakpointValue({ base: 24, md: 28 })}
                                            />
                                        </MotionBox>
                                    </Flex>
                                    <Progress
                                        value={75}
                                        size={{ base: "sm", md: "sm" }}
                                        colorScheme="red"
                                        bg="gray.800"
                                        borderRadius="full"
                                        sx={{
                                            '& > div': {
                                                background: metric.gradient
                                            }
                                        }}
                                    />
                                </CardBody>
                            </MotionCard>
                        ))}
                    </Grid>

                    {/* Mobile Actions Drawer */}
                    <MobileActionsDrawer />

                    {/* Contenido Principal Mejorado */}
                    <Grid gap={8}>
                        {/* Ventas Recientes Mejoradas */}
                        <GridItem>
                            <MotionCard
                                variants={itemVariants}
                                bg="rgba(20, 20, 20, 0.9)"
                                backdropFilter="blur(20px)"
                                border="1px solid rgba(239, 68, 68, 0.1)"
                                borderRadius="2xl"
                                boxShadow="0 8px 32px rgba(0, 0, 0, 0.3)"
                                overflow="hidden"
                            >
                                <Box
                                    position="absolute"
                                    top={0}
                                    left={0}
                                    right={0}
                                    h="3px"
                                    bgGradient="linear(90deg, red.500, orange.500, red.500)"
                                />
                                <CardHeader p={8} pb={4}>
                                    <Flex justify="space-between" align="center">
                                        <HStack spacing={3}>
                                            <Circle size="12px" bg="red.500" />
                                            <Text
                                                color="white"
                                                fontSize="2xl"
                                                fontWeight="800"
                                                letterSpacing="-0.01em"
                                            >
                                                Agregados recientemente
                                            </Text>
                                        </HStack>
                                        <IconButton
                                            icon={<MoreVertical />}
                                            variant="ghost"
                                            color="gray.400"
                                            size="sm"
                                            _hover={{ color: 'red.400', bg: 'rgba(239, 68, 68, 0.1)' }}
                                            borderRadius="lg"
                                        />
                                    </Flex>
                                </CardHeader>
                                <CardBody pt={0} p={8}>
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
                                                            <Trash2
                                                                size={20}
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
                                                            setSelectedCar(car)
                                                            onOpenDelete();
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
                                </CardBody>
                            </MotionCard>
                        </GridItem>
                    </Grid>
                </MotionBox>
            </Box>
            <ModalAddVehicle isOpen={isOpenModal} onOpen={onOpenModal} onClose={onCloseModal} />
            <VehicleDeleteModal isOpen={isOpenDelete} onOpen={onOpenDelete} onClose={onCloseDelete} selectedCar={selectedCar} />
            {/* <ContactFooter /> */}
        </>
    );
};

export default AutoSalesDashboard;