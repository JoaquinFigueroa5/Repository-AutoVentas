import React, { useState } from 'react';
import {
    Box,
    Container,
    Grid,
    GridItem,
    VStack,
    HStack,
    Text,
    Button,
    Input,
    Textarea,
    FormControl,
    FormLabel,
    IconButton,
    Link,
    Divider,
    useToast,
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalCloseButton,
    useDisclosure
} from '@chakra-ui/react';
import { Link as LinkRouter } from 'react-router-dom';
import { motion } from 'framer-motion';
import {
    FaPhone,
    FaEnvelope,
    FaMapMarkerAlt,
    FaTiktok,
    FaTwitter,
    FaInstagram,
    FaWhatsapp,
    FaPaperPlane,
    FaFacebook,
    FaBuilding
} from 'react-icons/fa';
import { useContactRef } from '../context/ContactRefContext';

const MotionBox = motion(Box);
const MotionButton = motion(Button);
const MotionIconButton = motion(IconButton);

const ContactFooter = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        apellido: '',
        message: ''
    });
    const [isSubmitting, setIsSubmitting] = useState(false);
    const toast = useToast();
    const { isOpen, onOpen, onClose } = useDisclosure();
    const contactRef = useContactRef();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        // Simulación de envío
        await new Promise(resolve => setTimeout(resolve, 1500));

        toast({
            title: '¡Mensaje enviado!',
            description: 'Te contactaremos pronto.',
            status: 'success',
            duration: 3000,
            isClosable: true,
        });

        setFormData({
            name: '',
            email: '',
            phone: '',
            apellido: '',
            message: ''
        });
        setIsSubmitting(false);
        onClose();
    };

    const contactInfo = [
        {
            icon: FaPhone,
            label: 'Teléfono',
            value: '+502 3030-0738',
            action: 'tel:30300738'
        },
        {
            icon: FaWhatsapp,
            label: 'WhatsApp',
            value: '+502 3030-0738',
            action: `https://wa.me/50230300738?text=${encodeURIComponent('Hola, vengo de la página web y quisiera cotizar...')}`
        },
        {
            icon: FaEnvelope,
            label: 'Email',
            value: 'ventas@empresa.com',
            action: 'mailto:ventas@empresa.com'
        },
        {
            icon: FaMapMarkerAlt,
            label: 'Ubicación',
            value: 'Zona 18, Carretera al Atlántico Km 10.5, Ciudad de Guatemala',
            action: '#'
        }
    ];

    const socialMedia = [
        { icon: FaTiktok, url: 'https://www.tiktok.com/@autoventas_juanes', color: '#7b499cff' },
        { icon: FaInstagram, url: 'https://www.instagram.com/autoventas_juanes/', color: '#E4405F' },
        { icon: FaFacebook, url: 'https://www.facebook.com/profile.php?id=100092329325165', color: '#0866FF' }
    ];

    return (
        <>
            <MotionBox
                ref={contactRef}
                scrollMarginTop="80px"
                bg="linear-gradient(135deg, #000000 0%, #1a1a1a 100%)"
                color="white"
                pt={20}
                pb={8}
                position="relative"
                overflow="hidden"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
            >
                {/* Elementos decorativos de fondo */}
                <Box
                    position="absolute"
                    top="-50px"
                    right="-50px"
                    width="200px"
                    height="200px"
                    bg="red.500"
                    borderRadius="50%"
                    opacity="0.03"
                    filter="blur(40px)"
                />
                <Box
                    position="absolute"
                    bottom="-30px"
                    left="-30px"
                    width="150px"
                    height="150px"
                    bg="red.500"
                    borderRadius="50%"
                    opacity="0.05"
                    filter="blur(30px)"
                />

                <Container maxW="7xl">
                    <Grid templateColumns={{ base: '1fr', lg: '1fr 1fr' }} gap={16} mb={16}>
                        {/* Sección de Contacto Principal */}
                        <GridItem>
                            <MotionBox
                                initial={{ x: -50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.2 }}
                            >
                                <VStack align="flex-start" spacing={8}>
                                    <Box>
                                        <Text
                                            fontSize="4xl"
                                            fontWeight="bold"
                                            bgGradient="linear(to-r, white, red.400)"
                                            bgClip="text"
                                            mb={4}
                                        >
                                            ¿Necesitas financiamiento?
                                        </Text>
                                        <Text fontSize="lg" color="gray.300" maxW="md">
                                            ¡Te ayudamos a estrenar tu vehículo con planes accesibles y a tu medida!
                                            Contamos con opciones de financiamiento flexibles
                                            Aprobación rápida y cuotas que se ajustan a tu presupuesto.
                                            El auto de tus sueños está más cerca de lo que imaginas.
                                            Financiamiento fácil, sin complicaciones.
                                        </Text>
                                    </Box>

                                    <VStack align="flex-start" spacing={6} w="full">
                                        {contactInfo.map((item, index) => (
                                            <MotionBox
                                                key={index}
                                                initial={{ x: -20, opacity: 0 }}
                                                animate={{ x: 0, opacity: 1 }}
                                                transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                                                whileHover={{ x: 5 }}
                                            >
                                                <HStack spacing={4} cursor="pointer">
                                                    <Box
                                                        p={3}
                                                        bg="red.500"
                                                        borderRadius="lg"
                                                        color="white"
                                                        _hover={{ bg: 'red.600', transform: 'scale(1.05)' }}
                                                        transition="all 0.3s"
                                                    >
                                                        <item.icon size={20} />
                                                    </Box>
                                                    <Box>
                                                        <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                                            {item.label}
                                                        </Text>
                                                        <Link
                                                            href={item.action}
                                                            fontSize="md"
                                                            color="white"
                                                            _hover={{ color: 'red.400' }}
                                                            transition="color 0.3s"
                                                        >
                                                            {item.value}
                                                        </Link>
                                                    </Box>
                                                </HStack>
                                            </MotionBox>
                                        ))}
                                    </VStack>



                                    <HStack spacing={4} pt={4}>
                                        {socialMedia.map((social, index) => {
                                            const isTiktok = social.icon === FaTiktok;

                                            const Icon = (
                                                <social.icon
                                                    style={
                                                        isTiktok
                                                            ? {
                                                                background: 'linear-gradient(135deg, #25F4EE, #FE2C55)',
                                                                WebkitBackgroundClip: 'text',
                                                                WebkitTextFillColor: 'transparent',
                                                            }
                                                            : { color: social.color }
                                                    }
                                                />
                                            );

                                            return (
                                                <MotionIconButton
                                                    as='a'
                                                    key={index}
                                                    icon={Icon}
                                                    size="lg"
                                                    variant="ghost"
                                                    color="gray.400"
                                                    _hover={{
                                                        color: isTiktok ? undefined : social.color,
                                                        bg: 'whiteAlpha.100',
                                                        transform: 'translateY(-2px)',
                                                    }}
                                                    transition="all 0.3s"
                                                    whileHover={{ scale: 1.1 }}
                                                    whileTap={{ scale: 0.95 }}
                                                    href={social.url}
                                                />
                                            );
                                        })}

                                    </HStack>
                                </VStack>

                            </MotionBox>

                        </GridItem>

                        {/* Sección de Acción Rápida */}
                        <GridItem>
                            <MotionBox
                                initial={{ x: 50, opacity: 0 }}
                                animate={{ x: 0, opacity: 1 }}
                                transition={{ duration: 0.6, delay: 0.4 }}
                            >
                                <VStack spacing={8} align="stretch">
                                    <Box textAlign="center">
                                        <Text fontSize="2xl" fontWeight="bold" mb={4}>
                                            ¿Listo para empezar?
                                        </Text>
                                        <Text color="gray.300" fontSize="md">
                                            Envíame un mensaje y te responderé lo antes posible
                                        </Text>
                                    </Box>

                                    <MotionButton
                                        size="lg"
                                        bg="red.500"
                                        color="white"
                                        _hover={{ bg: 'red.600', transform: 'translateY(-2px)' }}
                                        _active={{ transform: 'translateY(0)' }}
                                        transition="all 0.3s"
                                        leftIcon={<FaPaperPlane />}
                                        onClick={onOpen}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        Enviar Mensaje
                                    </MotionButton>

                                    <Divider borderColor="gray.600" />

                                    <VStack spacing={4}>
                                        <Text fontSize="lg" fontWeight="semibold">
                                            Contacto Directo
                                        </Text>
                                        <HStack spacing={4} w="full">
                                            <MotionButton
                                                flex={1}
                                                variant="outline"
                                                borderColor="red.500"
                                                color="red.500"
                                                _hover={{ bg: 'red.500', color: 'white' }}
                                                leftIcon={<FaPhone />}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                as='a'
                                                href='tel:30300738'
                                            >
                                                Llamar
                                            </MotionButton>
                                            <MotionButton
                                                flex={1}
                                                variant="outline"
                                                borderColor="green.500"
                                                color="green.500"
                                                _hover={{ bg: 'green.500', color: 'white' }}
                                                leftIcon={<FaWhatsapp />}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                as='a'
                                                href='https://wa.me/30300738'
                                            >
                                                WhatsApp
                                            </MotionButton>
                                        </HStack>
                                    </VStack>
                                </VStack>
                            </MotionBox>
                        </GridItem>

                    </Grid>
                    {/* Mapa Interactivo */}
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
                                height="500"
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

                    {/* Footer Bottom */}
                    <Divider borderColor="gray.700" mb={8} />

                    <MotionBox
                        initial={{ y: 20, opacity: 0 }}
                        animate={{ y: 0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <HStack justify="space-between" align="center" flexWrap="wrap">
                            <Text color="gray.400" fontSize="sm">
                                © 2025 Auto Ventas Juanes. Todos los derechos reservados.
                            </Text>
                            <HStack spacing={6}>
                                <Link href="#" color="gray.400" fontSize="sm" _hover={{ color: 'white' }}>
                                    Privacidad
                                </Link>
                                <Link href="#" color="gray.400" fontSize="sm" _hover={{ color: 'white' }}>
                                    Términos
                                </Link>
                                <Link href="#" color="gray.400" fontSize="sm" _hover={{ color: 'white' }}>
                                    Cookies
                                </Link>
                                <LinkRouter to='/auth' color="gray.400" fontSize="sm" _hover={{ color: 'white' }}>
                                    Iniciar Sesion
                                </LinkRouter>
                            </HStack>
                        </HStack>
                    </MotionBox>
                </Container>
            </MotionBox>

            {/* Modal de Contacto */}
            <Modal isOpen={isOpen} onClose={onClose} size="xl">
                <ModalOverlay bg="blackAlpha.300" backdropFilter="blur(10px)" />
                <ModalContent bg="gray.900" color="white" borderRadius="xl">
                    <ModalHeader>
                        <Text fontSize="2xl" fontWeight="bold">
                            Contáctame
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody pb={6}>
                        <VStack spacing={4}>
                            <HStack spacing={4} w="full">
                                <FormControl>
                                    <FormLabel>Nombre</FormLabel>
                                    <Input
                                        name="name"
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        placeholder="Tu nombre"
                                        bg="gray.800"
                                        border="1px solid"
                                        borderColor="gray.600"
                                        _hover={{ borderColor: 'red.400' }}
                                        _focus={{ borderColor: 'red.500', boxShadow: 'none' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Apellido</FormLabel>
                                    <Input
                                        name="apellido"
                                        value={formData.apellido}
                                        onChange={handleInputChange}
                                        placeholder="Tu apellido"
                                        bg="gray.800"
                                        border="1px solid"
                                        borderColor="gray.600"
                                        _hover={{ borderColor: 'red.400' }}
                                        _focus={{ borderColor: 'red.500', boxShadow: 'none' }}
                                    />
                                </FormControl>
                            </HStack>

                            <HStack spacing={4} w="full">
                                <FormControl>
                                    <FormLabel>Email</FormLabel>
                                    <Input
                                        name="email"
                                        type="email"
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        placeholder="tu@email.com"
                                        bg="gray.800"
                                        border="1px solid"
                                        borderColor="gray.600"
                                        _hover={{ borderColor: 'red.400' }}
                                        _focus={{ borderColor: 'red.500', boxShadow: 'none' }}
                                    />
                                </FormControl>
                                <FormControl>
                                    <FormLabel>Teléfono</FormLabel>
                                    <Input
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleInputChange}
                                        placeholder="+502 1234-5678"
                                        bg="gray.800"
                                        border="1px solid"
                                        borderColor="gray.600"
                                        _hover={{ borderColor: 'red.400' }}
                                        _focus={{ borderColor: 'red.500', boxShadow: 'none' }}
                                    />
                                </FormControl>
                            </HStack>

                            <FormControl>
                                <FormLabel>Mensaje</FormLabel>
                                <Textarea
                                    name="message"
                                    value={formData.message}
                                    onChange={handleInputChange}
                                    placeholder="Cuéntame sobre tu proyecto..."
                                    bg="gray.800"
                                    border="1px solid"
                                    borderColor="gray.600"
                                    _hover={{ borderColor: 'red.400' }}
                                    _focus={{ borderColor: 'red.500', boxShadow: 'none' }}
                                    rows={4}
                                />
                            </FormControl>

                            <Button
                                as='a'
                                bg="red.500"
                                color="white"
                                _hover={{ bg: 'red.600' }}
                                size="lg"
                                w="full"
                                isLoading={isSubmitting}
                                loadingText="Enviando..."
                                leftIcon={<FaPaperPlane />}
                                href={`https://api.whatsapp.com/send?phone=50230300738&text=${encodeURIComponent(`Hola, soy ${formData.name} ${formData.apellido} ${formData.email} ${formData.phone} y mi mensaje es: ${formData.message}`)}`}
                            >
                                Enviar Mensaje
                            </Button>
                        </VStack>
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    );
};

export default ContactFooter;