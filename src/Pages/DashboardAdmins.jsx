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
    Grid,
    GridItem,
    Flex,
    Divider,
    useBreakpointValue,
    Stack,
    Stat,
    StatLabel,
    StatNumber,
    StatHelpText,
    StatArrow,
    Table,
    Thead,
    Tbody,
    Tr,
    Th,
    Td,
    TableContainer,
    Input,
    InputGroup,
    InputLeftElement,
    Select,
    Avatar,
    AvatarBadge,
    Progress,
    SimpleGrid,
    Card,
    CardBody,
    CardHeader
} from '@chakra-ui/react';
import {
    Car,
    TrendingUp,
    DollarSign,
    Users,
    Eye,
    Search,
    Filter,
    Plus,
    Settings,
    BarChart3,
    PieChart,
    Calendar,
    Bell,
    LogOut,
    Menu,
    X
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { logout } from '../shared/hooks/useLogout';
import useUserStore from '../context/UserStore';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionGrid = motion(Grid);

// Mock data
const mockData = {
    stats: {
        totalVehicles: 127,
        soldThisMonth: 23,
        revenue: 2850000,
        activeUsers: 1843
    },
    recentSales: [
        { id: 1, vehicle: 'Toyota Camry 2023', buyer: 'Carlos Mendez', price: 285000, date: '2025-01-15', status: 'completed' },
        { id: 2, vehicle: 'Honda Accord 2022', buyer: 'Maria Rodriguez', price: 275000, date: '2025-01-14', status: 'pending' },
        { id: 3, vehicle: 'Ford Mustang 2024', buyer: 'Juan Perez', price: 450000, date: '2025-01-13', status: 'completed' },
        { id: 4, vehicle: 'BMW X5 2023', buyer: 'Ana Garcia', price: 650000, date: '2025-01-12', status: 'completed' },
        { id: 5, vehicle: 'Audi A4 2022', buyer: 'Luis Morales', price: 380000, date: '2025-01-11', status: 'pending' }
    ],
    topVehicles: [
        { model: 'Toyota Camry', sales: 15, percentage: 85 },
        { model: 'Honda Accord', sales: 12, percentage: 70 },
        { model: 'Ford Mustang', sales: 8, percentage: 55 },
        { model: 'BMW X5', sales: 6, percentage: 40 }
    ]
};

export default function DashboardAdmin() {
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('all');
    const { user, fetchUser } = useUserStore();

    // Responsive values
    const sidebarWidth = useBreakpointValue({ base: "250px", lg: "280px" });
    const contentMargin = useBreakpointValue({
        base: sidebarOpen ? "250px" : "0",
        lg: sidebarOpen ? "280px" : "0"
    });

    const handleLogout = () => {
        logout();
        fetchUser();
    }

    const StatCard = ({ icon, label, value, change, isPositive = true }) => (
        <MotionBox
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            bg="gray.900"
            p={6}
            borderRadius="xl"
            border="1px solid"
            borderColor="gray.800"
            _hover={{ borderColor: "red.500", transform: "translateY(-2px)" }}
        >
            <HStack justify="space-between" mb={4}>
                <Box p={3} bg="red.500" borderRadius="lg">
                    {React.cloneElement(icon, { size: 24, color: "white" })}
                </Box>
                {change && (
                    <Badge colorScheme={isPositive ? "green" : "red"} variant="subtle">
                        {isPositive ? "+" : "-"}{change}%
                    </Badge>
                )}
            </HStack>
            <VStack align="start" spacing={1}>
                <Text color="gray.400" fontSize="sm" fontWeight="medium">
                    {label}
                </Text>
                <Heading color="white" size="lg">
                    {value}
                </Heading>
            </VStack>
        </MotionBox>
    );

    const SidebarItem = ({ icon, label, isActive = false }) => (
        <MotionBox
            whileHover={{ x: 5 }}
            transition={{ duration: 0.2 }}
        >
            <Button
                leftIcon={React.cloneElement(icon, { size: 20 })}
                variant="ghost"
                w="full"
                justifyContent="flex-start"
                color={isActive ? "white" : "gray.400"}
                bg={isActive ? "red.500" : "transparent"}
                _hover={{
                    bg: isActive ? "red.600" : "gray.800",
                    color: "white"
                }}
                borderRadius="lg"
                py={6}
                fontSize="md"
            >
                {label}
            </Button>
        </MotionBox>
    );

    return (
        <Box bg="black" minH="100vh">
            {/* Sidebar */}
            <AnimatePresence>
                {sidebarOpen && (
                    <MotionBox
                        initial={{ x: -280 }}
                        animate={{ x: 0 }}
                        exit={{ x: -280 }}
                        transition={{ duration: 0.3 }}
                        position="fixed"
                        left="0"
                        top="0"
                        w={sidebarWidth}
                        h="100vh"
                        bg="gray.900"
                        borderRight="1px solid"
                        borderColor="gray.800"
                        zIndex={1000}
                        overflowY="auto"
                    >
                        <VStack spacing={0} align="stretch" h="100%">
                            {/* Logo */}
                            <Box p={6} borderBottom="1px solid" borderColor="gray.800">
                                <HStack>
                                    <Box p={2} bg="red.500" borderRadius="lg">
                                        <Car size={24} color="white" />
                                    </Box>
                                    <VStack align="start" spacing={0}>
                                        <Heading size="md" color="white">
                                            Premium Cars
                                        </Heading>
                                        <Text color="gray.400" fontSize="sm">
                                            Dashboard Admin
                                        </Text>
                                    </VStack>
                                </HStack>
                            </Box>

                            {/* Navigation */}
                            <VStack spacing={2} p={4} flex="1">
                                <SidebarItem icon={<BarChart3 />} label="Dashboard" isActive />
                                <SidebarItem icon={<Car />} label="Vehículos" />
                                <SidebarItem icon={<Users />} label="Clientes" />
                                <SidebarItem icon={<DollarSign />} label="Ventas" />
                                <SidebarItem icon={<PieChart />} label="Reportes" />
                                <SidebarItem icon={<Calendar />} label="Calendario" />
                                <SidebarItem icon={<Settings />} label="Configuración" />
                            </VStack>

                            {/* User Profile */}
                            <Box p={4} borderTop="1px solid" borderColor="gray.800">
                                <HStack>
                                    <Avatar size="sm" name="Admin User">
                                        <AvatarBadge boxSize="1em" bg="green.500" />
                                    </Avatar>
                                    <VStack align="start" spacing={0} flex="1">
                                        <Text color="white" fontSize="sm" fontWeight="medium">
                                            Admin User
                                        </Text>
                                        <Text color="gray.400" fontSize="xs">
                                            Administrador
                                        </Text>
                                    </VStack>
                                    <IconButton
                                        aria-label="Logout"
                                        icon={<LogOut size={16} />}
                                        size="sm"
                                        variant="ghost"
                                        color="gray.400"
                                        _hover={{ color: "red.500" }}
                                        onClick={() => handleLogout()}
                                    />
                                </HStack>
                            </Box>
                        </VStack>
                    </MotionBox>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <Box
                ml={contentMargin}
                transition="margin-left 0.3s ease"
                minH="100vh"
            >
                {/* Header */}
                <Box
                    bg="gray.900"
                    borderBottom="1px solid"
                    borderColor="gray.800"
                    px={6}
                    py={4}
                    position="sticky"
                    top="0"
                    zIndex={100}
                >
                    <Flex justify="space-between" align="center">
                        <HStack>
                            <IconButton
                                aria-label="Toggle Sidebar"
                                icon={sidebarOpen ? <X size={20} /> : <Menu size={20} />}
                                variant="ghost"
                                color="white"
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                            />
                            <VStack align="start" spacing={0}>
                                <Heading color="white" size="lg">
                                    Dashboard
                                </Heading>
                                <Text color="gray.400" fontSize="sm">
                                    Bienvenido de vuelta, Admin
                                </Text>
                            </VStack>
                        </HStack>

                        <HStack spacing={4}>
                            <IconButton
                                aria-label="Notifications"
                                icon={<Bell size={20} />}
                                variant="ghost"
                                color="gray.400"
                                _hover={{ color: "white" }}
                                position="relative"
                            >
                                <Badge
                                    colorScheme="red"
                                    borderRadius="full"
                                    position="absolute"
                                    top="0"
                                    right="0"
                                    fontSize="xs"
                                    w="16px"
                                    h="16px"
                                >
                                    3
                                </Badge>
                            </IconButton>
                            <Avatar size="sm" name="Admin User" />
                        </HStack>
                    </Flex>
                </Box>

                <Container maxW="7xl" p={6}>
                    {/* Stats Grid */}
                    <MotionGrid
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.6 }}
                        templateColumns={{
                            base: "repeat(1, 1fr)",
                            md: "repeat(2, 1fr)",
                            lg: "repeat(4, 1fr)"
                        }}
                        gap={6}
                        mb={8}
                    >
                        <StatCard
                            icon={<Car />}
                            label="Total Vehículos"
                            value={mockData.stats.totalVehicles}
                            change={12}
                        />
                        <StatCard
                            icon={<TrendingUp />}
                            label="Vendidos Este Mes"
                            value={mockData.stats.soldThisMonth}
                            change={23}
                        />
                        <StatCard
                            icon={<DollarSign />}
                            label="Ingresos (Q)"
                            value={`${(mockData.stats.revenue / 1000)}K`}
                            change={18}
                        />
                        <StatCard
                            icon={<Users />}
                            label="Usuarios Activos"
                            value={mockData.stats.activeUsers}
                            change={8}
                        />
                    </MotionGrid>

                    <Grid
                        templateColumns={{ base: "1fr", lg: "2fr 1fr" }}
                        gap={8}
                        mb={8}
                    >
                        {/* Recent Sales Table */}
                        <MotionBox
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2, duration: 0.6 }}
                            bg="gray.900"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.800"
                            overflow="hidden"
                        >
                            <Box p={6} borderBottom="1px solid" borderColor="gray.800">
                                <Flex justify="space-between" align="center" mb={4}>
                                    <Heading color="white" size="md">
                                        Ventas Recientes
                                    </Heading>
                                    <MotionButton
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        bg="red.500"
                                        color="white"
                                        size="sm"
                                        _hover={{ bg: "red.600" }}
                                        leftIcon={<Plus size={16} />}
                                    >
                                        Nueva Venta
                                    </MotionButton>
                                </Flex>

                                <HStack spacing={4} mb={4}>
                                    <InputGroup maxW="300px">
                                        <InputLeftElement pointerEvents="none">
                                            <Search color="gray" size={16} />
                                        </InputLeftElement>
                                        <Input
                                            placeholder="Buscar ventas..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            bg="gray.800"
                                            border="none"
                                            color="white"
                                            _placeholder={{ color: "gray.400" }}
                                        />
                                    </InputGroup>
                                    <Select
                                        maxW="150px"
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        bg="gray.800"
                                        border="none"
                                        color="white"
                                    >
                                        <option value="all" style={{ backgroundColor: '#1A202C' }}>Todos</option>
                                        <option value="completed" style={{ backgroundColor: '#1A202C' }}>Completadas</option>
                                        <option value="pending" style={{ backgroundColor: '#1A202C' }}>Pendientes</option>
                                    </Select>
                                </HStack>
                            </Box>

                            <TableContainer>
                                <Table variant="simple">
                                    <Thead>
                                        <Tr>
                                            <Th color="gray.400" borderColor="gray.800">Vehículo</Th>
                                            <Th color="gray.400" borderColor="gray.800">Comprador</Th>
                                            <Th color="gray.400" borderColor="gray.800">Precio</Th>
                                            <Th color="gray.400" borderColor="gray.800">Estado</Th>
                                        </Tr>
                                    </Thead>
                                    <Tbody>
                                        {mockData.recentSales.map((sale, index) => (
                                            <MotionBox
                                                key={sale.id}
                                                as={Tr}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                transition={{ delay: index * 0.1, duration: 0.3 }}
                                                _hover={{ bg: "gray.800" }}
                                            >
                                                <Td color="white" borderColor="gray.800">
                                                    {sale.vehicle}
                                                </Td>
                                                <Td color="gray.300" borderColor="gray.800">
                                                    {sale.buyer}
                                                </Td>
                                                <Td color="red.400" fontWeight="bold" borderColor="gray.800">
                                                    Q{sale.price.toLocaleString()}
                                                </Td>
                                                <Td borderColor="gray.800">
                                                    <Badge
                                                        colorScheme={sale.status === 'completed' ? 'green' : 'yellow'}
                                                        variant="subtle"
                                                    >
                                                        {sale.status === 'completed' ? 'Completada' : 'Pendiente'}
                                                    </Badge>
                                                </Td>
                                            </MotionBox>
                                        ))}
                                    </Tbody>
                                </Table>
                            </TableContainer>
                        </MotionBox>

                        {/* Top Vehicles */}
                        <MotionBox
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.4, duration: 0.6 }}
                            bg="gray.900"
                            borderRadius="xl"
                            border="1px solid"
                            borderColor="gray.800"
                            p={6}
                        >
                            <Heading color="white" size="md" mb={6}>
                                Vehículos Más Vendidos
                            </Heading>
                            <VStack spacing={4} align="stretch">
                                {mockData.topVehicles.map((vehicle, index) => (
                                    <MotionBox
                                        key={vehicle.model}
                                        initial={{ opacity: 0, x: 20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: (index + 1) * 0.1, duration: 0.3 }}
                                        p={4}
                                        bg="gray.800"
                                        borderRadius="lg"
                                        _hover={{ bg: "gray.700" }}
                                    >
                                        <Flex justify="space-between" align="center" mb={2}>
                                            <Text color="white" fontWeight="medium">
                                                {vehicle.model}
                                            </Text>
                                            <Badge colorScheme="red" variant="subtle">
                                                {vehicle.sales} ventas
                                            </Badge>
                                        </Flex>
                                        <Progress
                                            value={vehicle.percentage}
                                            colorScheme="red"
                                            bg="gray.700"
                                            borderRadius="full"
                                        />
                                    </MotionBox>
                                ))}
                            </VStack>
                        </MotionBox>
                    </Grid>

                    {/* Quick Actions */}
                    <MotionBox
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.6, duration: 0.6 }}
                        bg="gray.900"
                        borderRadius="xl"
                        border="1px solid"
                        borderColor="gray.800"
                        p={6}
                    >
                        <Heading color="white" size="md" mb={6}>
                            Acciones Rápidas
                        </Heading>
                        <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4}>
                            {[
                                { icon: <Car />, label: 'Agregar Vehículo', color: 'red' },
                                { icon: <Users />, label: 'Nuevo Cliente', color: 'blue' },
                                { icon: <BarChart3 />, label: 'Ver Reportes', color: 'green' },
                                { icon: <Settings />, label: 'Configuración', color: 'purple' }
                            ].map((action, index) => (
                                <MotionButton
                                    key={action.label}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ delay: (index + 1) * 0.1, duration: 0.3 }}
                                    leftIcon={React.cloneElement(action.icon, { size: 20 })}
                                    variant="outline"
                                    borderColor="gray.700"
                                    color="white"
                                    _hover={{
                                        borderColor: `${action.color}.500`,
                                        color: `${action.color}.500`,
                                        bg: "gray.800"
                                    }}
                                    h="60px"
                                    flexDirection="column"
                                    fontSize="sm"
                                >
                                    {action.label}
                                </MotionButton>
                            ))}
                        </SimpleGrid>
                    </MotionBox>
                </Container>
            </Box>
        </Box>
    );
}