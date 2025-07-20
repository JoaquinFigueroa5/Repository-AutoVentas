import React, { useState, useEffect, useRef } from 'react';
import {
    Box,
    Container,
    Flex,
    Heading,
    HStack,
    VStack,
    Button,
    IconButton,
    Text,
    Input,
    InputGroup,
    InputRightElement,
    Badge,
    Menu,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    useDisclosure,
    Collapse,
    Divider,
    Image
} from '@chakra-ui/react';
import {
    Car,
    Search,
    Heart,
    Phone,
    Mail,
    MapPin,
    X,
    ChevronDown,
    Star,
    Shield,
    Headphones,
    User,
    Settings,
    LogOut,
    Bell,
    Calculator,
    FileText,
    Award,
    Zap
} from 'lucide-react';
import { FaMapMarkerAlt } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';
import useUserStore from '../context/UserStore';
import { HamburgerIcon } from '@chakra-ui/icons';

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);
const MotionButton = motion(Button);


export default function PremiumNavbar({contactRef}) {
    const [isScrolled, setIsScrolled] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [searchValue, setSearchValue] = useState('');
    const [notifications, setNotifications] = useState(5);
    const { isOpen, onOpen, onClose } = useDisclosure();
    const { user, fetchUser } = useUserStore();
    
    const navItems = [
        {
            label: 'Vehículos',
            icon: Car,
            href: '/catalog'
        },
        {
            label: 'Servicios',
            icon: Shield,
            submenu: [
                { label: 'Financiamiento', icon: Calculator },
                { label: 'Seguro', icon: Shield },
                { label: 'Mantenimiento', icon: Settings },
                { label: 'Garantía', icon: Award },
                { label: 'Evaluación', icon: FileText }
            ]
        },
        {
            label: 'Favoritos',
            icon: Heart,
            badge: 3
        },
        {
            label: 'Contacto',
            icon: Phone,
            ref: contactRef
        }
    ];

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const handleDropdownToggle = (index) => {
        setActiveDropdown(activeDropdown === index ? null : index);
    };

    return (
        <>
            {/* Main Navbar */}
            <MotionBox
                position="fixed"
                top={0}
                left={0}
                right={0}
                zIndex={1000}
                bg={isScrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.8)"}
                backdropFilter="blur(10px)"
                borderBottom="1px solid"
                borderColor={isScrolled ? "red.500" : "rgba(255,255,255,0.1)"}
                transition="all 0.3s ease"
                animate={{
                    backgroundColor: isScrolled ? "rgba(0,0,0,0.95)" : "rgba(0,0,0,0.8)"
                }}
            >
                <Container maxW="7xl" py={4}>
                    <Flex align="center" justify="space-between">
                        {/* Logo */}
                        <MotionFlex
                            as='a'
                            align="center"
                            whileHover={{ scale: 1.05 }}
                            cursor="pointer"
                            href='/'
                        >
                            <MotionBox
                                w="160px"
                                h="80px"
                                p={2}
                                bg="whiteAlpha.900"
                                borderRadius="xl"
                                mr={3}
                            >
                                <Image
                                    src="https://res.cloudinary.com/dbh9jfkoh/image/upload/v1752969460/LogoJuanes_ner8yk.png"
                                    w="100%"
                                    h="100%"
                                    objectFit="contain"
                                />
                            </MotionBox>

                            <VStack align="flex-end" spacing={0} pr={5} >
                                <Heading color="white" size="lg" fontWeight="bold">
                                    <Text as="span" color="red.500">Auto</Text>
                                    <Text as="span">Ventas</Text>
                                </Heading>
                                <Text color="red.500" fontSize="xl" letterSpacing="wider" fontWeight="bold">
                                    Juanes
                                </Text>
                            </VStack>

                        </MotionFlex>

                        {/* Desktop Navigation */}
                        <HStack spacing={8} display={{ base: 'none', lg: 'flex' }}>
                            {navItems.map((item, index) => (
                                <Box key={index} position="relative">
                                    <MotionButton
                                        as='a'
                                        variant="ghost"
                                        color="white"
                                        size="md"
                                        leftIcon={<item.icon size={18} />}
                                        rightIcon={item.submenu ? <ChevronDown size={16} /> : null}
                                        _hover={{
                                            bg: "rgba(239,68,68,0.1)",
                                            color: "red.400",
                                            transform: "translateY(-2px)"
                                        }}
                                        onClick={() => 
                                            {
                                                item.submenu && handleDropdownToggle(index),
                                                scrollTo(item.ref)
                                            }
                                        }
                                        position="relative"
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        href={item.href}
                                    >
                                        {item.label}
                                        {item.badge && (
                                            <Badge
                                                position="absolute"
                                                top="-8px"
                                                right="-8px"
                                                colorScheme="red"
                                                borderRadius="full"
                                                fontSize="xs"
                                                minW="20px"
                                                h="20px"
                                                display="flex"
                                                alignItems="center"
                                                justifyContent="center"
                                            >
                                                {item.badge}
                                            </Badge>
                                        )}
                                    </MotionButton>

                                    {/* Dropdown Menu */}
                                    <AnimatePresence>
                                        {item.submenu && activeDropdown === index && (
                                            <MotionBox
                                                initial={{ opacity: 0, y: -10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                transition={{ duration: 0.2 }}
                                                position="absolute"
                                                top="100%"
                                                left={0}
                                                mt={2}
                                                bg="gray.900"
                                                border="1px solid"
                                                borderColor="gray.700"
                                                borderRadius="xl"
                                                boxShadow="xl"
                                                minW="200px"
                                                py={2}
                                                zIndex={1001}
                                            >
                                                {item.submenu.map((subItem, subIndex) => (
                                                    <MotionFlex
                                                        key={subIndex}
                                                        align="center"
                                                        px={4}
                                                        py={3}
                                                        color="white"
                                                        cursor="pointer"
                                                        _hover={{
                                                            bg: "rgba(239,68,68,0.1)",
                                                            color: "red.400"
                                                        }}
                                                        whileHover={{ x: 5 }}
                                                        transition={{ duration: 0.2 }}
                                                    >
                                                        <subItem.icon size={16} />
                                                        <Text ml={3} fontSize="sm">
                                                            {subItem.label}
                                                        </Text>
                                                    </MotionFlex>
                                                ))}
                                            </MotionBox>
                                        )}
                                    </AnimatePresence>
                                </Box>
                            ))}
                        </HStack>

                        {/* Search Bar */}
                        {/* <InputGroup
                            maxW="300px"
                            display={{ base: 'none', md: 'block' }}
                            position="relative"
                        >
                            <Input
                                placeholder="Buscar vehículos..."
                                bg="rgba(255,255,255,0.1)"
                                border="1px solid"
                                borderColor="rgba(255,255,255,0.2)"
                                color="white"
                                _placeholder={{ color: "gray.400" }}
                                _focus={{
                                    borderColor: "red.500",
                                    boxShadow: "0 0 0 1px #ef4444"
                                }}
                                borderRadius="lg"
                                value={searchValue}
                                onChange={(e) => setSearchValue(e.target.value)}
                            />
                            <InputRightElement>
                                <IconButton
                                    aria-label="Search"
                                    icon={<Search size={18} />}
                                    size="sm"
                                    bg="red.500"
                                    color="white"
                                    borderRadius="md"
                                    _hover={{ bg: "red.600" }}
                                />
                            </InputRightElement>
                        </InputGroup> */}

                        {/* Right Actions */}
                        <HStack spacing={4}>
                            {/* Notifications */}
                            <Box position="relative" display={{ base: 'none', md: 'block' }}>
                                <MotionButton
                                    variant="ghost"
                                    color="white"
                                    size="md"
                                    whileHover={{ scale: 1.1 }}
                                    whileTap={{ scale: 0.9 }}
                                    _hover={{ color: "red.400" }}
                                >
                                    <Bell size={20} />
                                    {notifications > 0 && (
                                        <Badge
                                            position="absolute"
                                            top="-2px"
                                            right="-2px"
                                            colorScheme="red"
                                            borderRadius="full"
                                            fontSize="xs"
                                            minW="18px"
                                            h="18px"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            {notifications}
                                        </Badge>
                                    )}
                                </MotionButton>
                            </Box>

                            {/* Mobile Menu Button */}
                            <IconButton
                                aria-label="Open menu"
                                icon={<HamburgerIcon size={24} />}
                                variant="outline"
                                color="whiteAlpha.900"
                                display={{ base: 'flex', lg: 'none' }}
                                _hover={{ color: "red.400" }}
                                onClick={onOpen}
                            />
                        </HStack>
                    </Flex>
                </Container>
            </MotionBox>

            {/* Mobile Drawer */}
            <Drawer isOpen={isOpen} placement="right" onClose={onClose} size="sm">
                <DrawerOverlay bg="rgba(0,0,0,0.8)" />
                <DrawerContent bg="gray.900" color="white">
                    <DrawerCloseButton color="white" size="lg" />
                    <DrawerHeader borderBottomWidth="1px" borderColor="gray.700">
                        <Flex align="center">
                            <Box
                                bg="red.500"
                                p={2}
                                borderRadius="lg"
                                mr={3}
                            >
                                <Car size={20} color="white" />
                            </Box>
                            <VStack align="start" spacing={0}>
                                <Heading size="md">
                                    Auto<Text as="span" color="red.500">Ventas</Text>
                                </Heading>
                                <Text color="red.500" fontSize="xs">
                                    Juanes
                                </Text>
                            </VStack>
                        </Flex>
                    </DrawerHeader>

                    <DrawerBody>
                        <VStack spacing={6} align="stretch" py={4}>
                            {/* Mobile Search */}
                            {/* <InputGroup>
                                <Input
                                    placeholder="Buscar vehículos..."
                                    bg="rgba(255,255,255,0.1)"
                                    border="1px solid"
                                    borderColor="rgba(255,255,255,0.2)"
                                    color="white"
                                    _placeholder={{ color: "gray.400" }}
                                    _focus={{
                                        borderColor: "red.500",
                                        boxShadow: "0 0 0 1px #ef4444"
                                    }}
                                    borderRadius="lg"
                                />
                                <InputRightElement>
                                    <IconButton
                                        aria-label="Search"
                                        icon={<Search size={18} />}
                                        size="sm"
                                        bg="red.500"
                                        color="white"
                                        borderRadius="md"
                                        _hover={{ bg: "red.600" }}
                                    />
                                </InputRightElement>
                            </InputGroup> */}

                            {/* Mobile Navigation */}
                            <VStack spacing={4} align="stretch">
                                {navItems.map((item, index) => (
                                    <Box key={index}>
                                        <MotionButton
                                            variant="ghost"
                                            color="white"
                                            size="lg"
                                            width="100%"
                                            justifyContent="flex-start"
                                            leftIcon={<item.icon size={20} />}
                                            rightIcon={item.submenu ? <ChevronDown size={16} /> : null}
                                            _hover={{
                                                bg: "rgba(239,68,68,0.1)",
                                                color: "red.400"
                                            }}
                                            onClick={() => item.submenu && handleDropdownToggle(index)}
                                            whileHover={{ x: 5 }}
                                            position="relative"
                                        >
                                            {item.label}
                                            {item.badge && (
                                                <Badge
                                                    position="absolute"
                                                    right="20px"
                                                    colorScheme="red"
                                                    borderRadius="full"
                                                    fontSize="xs"
                                                >
                                                    {item.badge}
                                                </Badge>
                                            )}
                                        </MotionButton>

                                        {/* Mobile Submenu */}
                                        <Collapse in={item.submenu && activeDropdown === index}>
                                            <VStack spacing={2} align="stretch" pl={8} pt={2}>
                                                {item.submenu?.map((subItem, subIndex) => (
                                                    <MotionButton
                                                        key={subIndex}
                                                        variant="ghost"
                                                        color="gray.300"
                                                        size="md"
                                                        width="100%"
                                                        justifyContent="flex-start"
                                                        leftIcon={<subItem.icon size={16} />}
                                                        _hover={{
                                                            bg: "rgba(239,68,68,0.1)",
                                                            color: "red.400"
                                                        }}
                                                        whileHover={{ x: 5 }}
                                                    >
                                                        {subItem.label}
                                                    </MotionButton>
                                                ))}
                                            </VStack>
                                        </Collapse>
                                    </Box>
                                ))}
                            </VStack>

                            <Divider borderColor="gray.700" />

                            {/* Contact Info */}
                            <VStack spacing={3} align="stretch">
                                <Text fontSize="lg" fontWeight="bold" color="red.400">
                                    Contacto
                                </Text>
                                <VStack spacing={2} align="start">
                                    <HStack>
                                        <Phone size={16} color="#ef4444" />
                                        <Text fontSize="sm">+502 3030-0738</Text>
                                    </HStack>
                                    <HStack>
                                        <Mail size={16} color="#ef4444" />
                                        <Text fontSize="sm">info@correo.com</Text>
                                    </HStack>
                                    <HStack>
                                        <MapPin size={16} color="#ef4444" />
                                        <Text fontSize="sm">Zona 18, Carretera al atlantico km 10.5, Ciudad de Guatemala</Text>
                                    </HStack>
                                </VStack>
                                <MotionBox
                                    initial={{ y: 20, opacity: 0 }}
                                    animate={{ y: 0, opacity: 1 }}
                                    transition={{ duration: 0.6, delay: 0.7 }}
                                    w="full"
                                    mt={6}
                                >
                                    <Text fontSize="sm" color="gray.400" fontWeight="medium" mb={3}>
                                        Nuestra Ubicación
                                    </Text>
                                    <Box
                                        position="relative"
                                        borderRadius="xl"
                                        overflow="hidden"
                                        bg="gray.800"
                                        border="1px solid"
                                        borderColor="gray.700"
                                        _hover={{ borderColor: 'red.500' }}
                                        transition="border-color 0.3s"
                                    >
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m17!1m12!1m3!1d3860.095923165555!2d-90.432344!3d14.650496!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMTTCsDM5JzAxLjgiTiA5MMKwMjUnNTYuNCJX!5e0!3m2!1ses-419!2sgt!4v1752552726146!5m2!1ses-419!2sgt"
                                            width="100%"
                                            height="250"
                                            style={{ border: 0 }}
                                            allowFullScreen=""
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        />
                                        <Box
                                            position="absolute"
                                            top="0"
                                            left="0"
                                            right="0"
                                            bottom="0"
                                            bg="blackAlpha.200"
                                            opacity="0"
                                            _hover={{ opacity: 1 }}
                                            transition="opacity 0.3s"
                                            display="flex"
                                            alignItems="center"
                                            justifyContent="center"
                                        >
                                            <HStack spacing={3}>
                                                <Button
                                                    bg="red.500"
                                                    color="white"
                                                    _hover={{ bg: 'red.600' }}
                                                    leftIcon={<FaMapMarkerAlt />}
                                                    size="sm"
                                                    borderRadius="full"
                                                    onClick={() => window.open('https://maps.app.goo.gl/3kGDkxvDiMKwNQ8P6', '_blank')}
                                                >
                                                    Google Maps
                                                </Button>
                                                <Button
                                                    bg="blue.500"
                                                    color="white"
                                                    _hover={{ bg: 'blue.600' }}
                                                    leftIcon={<FaMapMarkerAlt />}
                                                    size="sm"
                                                    borderRadius="full"
                                                    onClick={() => window.open('https://ul.waze.com/ul?ll=14.65056545%2C-90.43240428&navigate=yes&utm_campaign=default&utm_source=waze_website&utm_medium=lm_share_location', '_blank')}
                                                >
                                                    Waze
                                                </Button>
                                            </HStack>
                                        </Box>
                                    </Box>
                                </MotionBox>
                            </VStack>
                        </VStack>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>

            {/* Overlay for dropdown */}
            {activeDropdown !== null && (
                <Box
                    position="fixed"
                    top={0}
                    left={0}
                    right={0}
                    bottom={0}
                    zIndex={999}
                    onClick={() => setActiveDropdown(null)}
                />
            )}
        </>
    );
}