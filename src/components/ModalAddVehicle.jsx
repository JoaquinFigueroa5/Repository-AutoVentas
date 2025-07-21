import React, { useState } from 'react';
import {
    Modal,
    ModalOverlay,
    ModalContent,
    ModalHeader,
    ModalFooter,
    ModalBody,
    ModalCloseButton,
    Button,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    VStack,
    HStack,
    Box,
    Text,
    InputGroup,
    InputLeftElement,
    useToast,
    Grid,
    GridItem,
    NumberInput,
    NumberInputField,
    NumberInputStepper,
    NumberIncrementStepper,
    NumberDecrementStepper,
    Image,
    SimpleGrid,
    IconButton,
} from '@chakra-ui/react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Car,
    Calendar,
    DollarSign,
    Upload,
    Check,
    X,
    FileText
} from 'lucide-react';
import useVehicles from '../shared/hooks/useVehicles';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const ModalAddVehicle = ({ isOpen, onOpen, onClose }) => {
    const { addVehicles, fetchVehicles, loading, vehicles, error } = useVehicles();
    const toast = useToast();

    const [formData, setFormData] = useState({
        name: '',
        model: '',
        year: '',
        price: '',
        description: '',
        imagenes: []
    });

    const [currentStep, setCurrentStep] = useState(1);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [dragActive, setDragActive] = useState(false);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));
    };

    const handleImageUpload = (files) => {
        const newImages = Array.from(files).slice(0, 20).map(file => ({
            id: Date.now() + Math.random(),
            file: file,
            url: URL.createObjectURL(file),
            name: file.name
        }));

        setFormData(prev => ({
            ...prev,
            imagenes: [...prev.imagenes, ...newImages].slice(0, 20)
        }));
    };

    const removeImage = (imageId) => {
        setFormData(prev => ({
            ...prev,
            imagenes: prev.imagenes.filter(img => img.id !== imageId)
        }));
    };

    const handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        if (e.type === "dragenter" || e.type === "dragover") {
            setDragActive(true);
        } else if (e.type === "dragleave") {
            setDragActive(false);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
            handleImageUpload(e.dataTransfer.files);
        }
    };

    const handleSubmit = async () => {
        if (!formData.name || !formData.model || !formData.year || !formData.price) {
            toast({
                title: "Campos requeridos",
                description: "Por favor completa todos los campos obligatorios.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        if (formData.imagenes.length === 0) {
            toast({
                title: "Imágenes requeridas",
                description: "Por favor selecciona al menos una imagen.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        setIsSubmitting(true);

        try {
            const data = new FormData();

            data.append('name', formData.name);
            data.append('model', formData.model);
            data.append('year', formData.year);
            data.append('price', formData.price);
            data.append('description', formData.description || '');

            formData.imagenes.forEach((img, index) => {
                if (img.file) {
                    data.append('images', img.file, img.file.name);
                }
            });


            await addVehicles(data);

            setFormData({
                name: '',
                model: '',
                year: '',
                price: '',
                description: '',
                imagenes: []
            });
            setCurrentStep(1);
            onClose();
            location.reload();

        } catch (error) {
            console.error('Error al enviar:', error);
            toast({
                title: "Error",
                description: error.message || "No se pudo agregar el vehículo.",
                status: "error",
                duration: 3000,
                isClosable: true,
            });
        } finally {
            setIsSubmitting(false);
        }
    };


    const nextStep = () => {
        if (currentStep < 2) {
            setCurrentStep(currentStep + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const stepVariants = {
        hidden: { opacity: 0, x: 50 },
        visible: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -50 }
    };

    const modalVariants = {
        hidden: { opacity: 0, scale: 0.9, y: 50 },
        visible: {
            opacity: 1,
            scale: 1,
            y: 0,
            transition: {
                duration: 0.3,
                ease: "easeOut"
            }
        },
        exit: {
            opacity: 0,
            scale: 0.9,
            y: 50,
            transition: {
                duration: 0.2,
                ease: "easeIn"
            }
        }
    };

    const renderStep1 = () => (
        <MotionBox
            key="step1"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            <VStack spacing={6}>
                <Box textAlign="center" mb={4}>
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                        Información del Vehículo
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Completa los datos básicos del vehículo
                    </Text>
                </Box>

                <Grid templateColumns="repeat(2, 1fr)" gap={6} w="full">
                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                                Marca
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <Car color="#dc2626" size={20} />
                                </InputLeftElement>
                                <Input
                                    placeholder="Toyota, Honda, BMW..."
                                    value={formData.name}
                                    onChange={(e) => handleInputChange('name', e.target.value)}
                                    focusBorderColor="red.500"
                                    borderColor="gray.600"
                                    bg="black"
                                    color="white"
                                    borderRadius="lg"
                                    borderWidth="2px"
                                    _placeholder={{ color: 'gray.500' }}
                                    _hover={{
                                        borderColor: 'red.400',
                                        boxShadow: '0 0 0 1px #dc2626'
                                    }}
                                    _focus={{
                                        borderColor: 'red.500',
                                        boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
                                    }}
                                />
                            </InputGroup>
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                                Modelo
                            </FormLabel>
                            <Input
                                placeholder="Corolla, Civic, X3..."
                                value={formData.model}
                                onChange={(e) => handleInputChange('model', e.target.value)}
                                focusBorderColor="red.500"
                                borderColor="gray.600"
                                bg="black"
                                color="white"
                                borderRadius="lg"
                                borderWidth="2px"
                                _placeholder={{ color: 'gray.500' }}
                                _hover={{
                                    borderColor: 'red.400',
                                    boxShadow: '0 0 0 1px #dc2626'
                                }}
                                _focus={{
                                    borderColor: 'red.500',
                                    boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
                                }}
                            />
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                                Año
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <Calendar color="#dc2626" size={20} />
                                </InputLeftElement>
                                <NumberInput
                                    value={formData.year}
                                    onChange={(value) => handleInputChange('year', value)}
                                    min={1990}
                                    max={2025}
                                >
                                    <NumberInputField
                                        placeholder="2024"
                                        focusBorderColor="red.500"
                                        borderColor="gray.600"
                                        bg="black"
                                        color="white"
                                        borderRadius="lg"
                                        borderWidth="2px"
                                        pl={12}
                                        _placeholder={{ color: 'gray.500' }}
                                        _hover={{
                                            borderColor: 'red.400',
                                            boxShadow: '0 0 0 1px #dc2626'
                                        }}
                                        _focus={{
                                            borderColor: 'red.500',
                                            boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
                                        }}
                                    />
                                    <NumberInputStepper>
                                        <NumberIncrementStepper
                                            color="red.400"
                                            _hover={{ color: 'red.300' }}
                                        />
                                        <NumberDecrementStepper
                                            color="red.400"
                                            _hover={{ color: 'red.300' }}
                                        />
                                    </NumberInputStepper>
                                </NumberInput>
                            </InputGroup>
                        </FormControl>
                    </GridItem>

                    <GridItem>
                        <FormControl isRequired>
                            <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                                Precio (GTQ)
                            </FormLabel>
                            <InputGroup>
                                <InputLeftElement pointerEvents="none">
                                    <DollarSign color="#dc2626" size={20} />
                                </InputLeftElement>
                                <NumberInput
                                    value={formData.price}
                                    onChange={(value) => handleInputChange('price', value)}
                                    min={0}
                                >
                                    <NumberInputField
                                        placeholder="Q25000"
                                        focusBorderColor="red.500"
                                        borderColor="gray.600"
                                        bg="black"
                                        color="white"
                                        borderRadius="lg"
                                        borderWidth="2px"
                                        pl={12}
                                        _placeholder={{ color: 'gray.500' }}
                                        _hover={{
                                            borderColor: 'red.400',
                                            boxShadow: '0 0 0 1px #dc2626'
                                        }}
                                        _focus={{
                                            borderColor: 'red.500',
                                            boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
                                        }}
                                    />
                                </NumberInput>
                            </InputGroup>
                        </FormControl>
                    </GridItem>
                </Grid>

                <FormControl isRequired>
                    <FormLabel color="white" fontSize="sm" fontWeight="semibold">
                        Descripción
                    </FormLabel>
                    <InputGroup>
                        <InputLeftElement pointerEvents="none" alignItems="flex-start" pt={3}>
                            <FileText color="#dc2626" size={20} />
                        </InputLeftElement>
                        <Textarea
                            placeholder="Describe las características principales del vehículo..."
                            value={formData.description}
                            onChange={(e) => handleInputChange('description', e.target.value)}
                            focusBorderColor="red.500"
                            borderColor="gray.600"
                            bg="black"
                            color="white"
                            borderRadius="lg"
                            borderWidth="2px"
                            minH="120px"
                            resize="vertical"
                            pl={12}
                            _placeholder={{ color: 'gray.500' }}
                            _hover={{
                                borderColor: 'red.400',
                                boxShadow: '0 0 0 1px #dc2626'
                            }}
                            _focus={{
                                borderColor: 'red.500',
                                boxShadow: '0 0 0 3px rgba(220, 38, 38, 0.1)'
                            }}
                        />
                    </InputGroup>
                </FormControl>
            </VStack>
        </MotionBox>
    );

    const renderStep2 = () => (
        <MotionBox
            key="step2"
            variants={stepVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            transition={{ duration: 0.3 }}
        >
            <VStack spacing={6}>
                <Box textAlign="center" mb={4}>
                    <Text fontSize="xl" fontWeight="bold" color="white" mb={2}>
                        Imágenes del Vehículo
                    </Text>
                    <Text fontSize="sm" color="gray.400">
                        Agrega hasta 5 imágenes del vehículo
                    </Text>
                </Box>

                <MotionBox
                    w="full"
                    border="3px dashed"
                    borderColor={dragActive ? "red.400" : "gray.600"}
                    borderRadius="xl"
                    p={8}
                    textAlign="center"
                    cursor="pointer"
                    bg={dragActive ? "red.900" : "black"}
                    transition="all 0.3s"
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                    onClick={() => document.getElementById('file-input').click()}
                    whileHover={{
                        borderColor: "#dc2626",
                        backgroundColor: "rgba(220, 38, 38, 0.05)"
                    }}
                    whileTap={{ scale: 0.98 }}
                >
                    <input
                        id="file-input"
                        type="file"
                        multiple
                        accept="image/*"
                        onChange={(e) => handleImageUpload(e.target.files)}
                        style={{ display: 'none' }}
                    />
                    <MotionBox
                        animate={dragActive ? { scale: 1.1 } : { scale: 1 }}
                        transition={{ duration: 0.2 }}
                    >
                        <Upload size={48} color="#dc2626" style={{ margin: "0 auto 16px" }} />
                        <Text color="white" fontSize="lg" fontWeight="semibold" mb={2}>
                            Arrastra las imágenes aquí o haz clic para seleccionar
                        </Text>
                        <Text color="gray.400" fontSize="sm">
                            Formato: JPG, PNG • Tamaño máximo: 10MB cada una
                        </Text>
                    </MotionBox>
                </MotionBox>

                {formData.imagenes.length > 0 && (
                    <Box w="full">
                        <Text color="white" fontSize="md" fontWeight="semibold" mb={4}>
                            Imágenes seleccionadas ({formData.imagenes.length})
                        </Text>
                        <SimpleGrid columns={[2, 3]} spacing={4}>
                            <AnimatePresence>
                                {formData.imagenes.map((imagen) => (
                                    <MotionBox
                                        key={imagen.id}
                                        initial={{ opacity: 0, scale: 0.8 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        exit={{ opacity: 0, scale: 0.8 }}
                                        transition={{ duration: 0.2 }}
                                        position="relative"
                                        borderRadius="lg"
                                        overflow="hidden"
                                        border="2px solid"
                                        borderColor="gray.600"
                                        _hover={{ borderColor: 'red.400' }}
                                    >
                                        <Image
                                            src={imagen.url}
                                            alt={imagen.name}
                                            w="full"
                                            h="100px"
                                            objectFit="cover"
                                        />
                                        <IconButton
                                            icon={<X size={16} />}
                                            size="sm"
                                            colorScheme="red"
                                            position="absolute"
                                            top={2}
                                            right={2}
                                            onClick={() => removeImage(imagen.id)}
                                            bg="red.600"
                                            _hover={{ bg: 'red.700' }}
                                        />
                                        <Box
                                            position="absolute"
                                            bottom={0}
                                            left={0}
                                            right={0}
                                            bg="blackAlpha.700"
                                            p={2}
                                        >
                                            <Text color="white" fontSize="xs" isTruncated>
                                                {imagen.name}
                                            </Text>
                                        </Box>
                                    </MotionBox>
                                ))}
                            </AnimatePresence>
                        </SimpleGrid>
                    </Box>
                )}

                {formData.name && formData.model && formData.year && formData.price && (
                    <MotionBox
                        w="full"
                        p={6}
                        bg="gray.900"
                        borderRadius="xl"
                        border="2px solid"
                        borderColor="red.500"
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <Text fontSize="md" fontWeight="bold" color="red.400" mb={3}>
                            Resumen del vehículo:
                        </Text>
                        <VStack align="start" spacing={2}>
                            <Text fontSize="lg" fontWeight="bold" color="white">
                                {formData.name} {formData.model} {formData.year}
                            </Text>
                            <Text fontSize="xl" fontWeight="bold" color="red.400">
                                Q{Number(formData.price)}
                            </Text>
                            {formData.descripcion && (
                                <Text fontSize="sm" color="gray.300" noOfLines={2}>
                                    {formData.description}
                                </Text>
                            )}
                        </VStack>
                    </MotionBox>
                )}
            </VStack>
        </MotionBox>
    );

    const renderStepContent = () => {
        switch (currentStep) {
            case 1: return renderStep1();
            case 2: return renderStep2();
            default: return renderStep1();
        }
    };

    return (
        <>
            <AnimatePresence>
                {isOpen && (
                    <Modal isOpen={isOpen} onClose={onClose} size="2xl" closeOnOverlayClick={false}>
                        <ModalOverlay
                            bg="blackAlpha.800"
                            backdropFilter="blur(10px)"
                        />
                        <ModalContent
                            as={motion.div}
                            variants={modalVariants}
                            initial="hidden"
                            animate="visible"
                            exit="exit"
                            maxW="700px"
                            mx={4}
                            bg="gray.900"
                            borderRadius="2xl"
                            border="3px solid"
                            borderColor="red.500"
                            overflow="hidden"
                        >
                            <ModalHeader bg="black" borderBottom="2px solid" borderBottomColor="red.500">
                                <VStack spacing={4} align="start">
                                    <Text fontSize="2xl" fontWeight="bold" color="white">
                                        Agregar Nuevo Vehículo
                                    </Text>
                                    <HStack spacing={3}>
                                        {[1, 2].map((step) => (
                                            <MotionBox
                                                key={step}
                                                w="60px"
                                                h="4px"
                                                bg={currentStep >= step ? "red.500" : "gray.700"}
                                                borderRadius="full"
                                                initial={{ scaleX: 0 }}
                                                animate={{
                                                    scaleX: 1,
                                                    backgroundColor: currentStep >= step ? "#dc2626" : "#374151"
                                                }}
                                                transition={{ duration: 0.5, delay: step * 0.1 }}
                                                boxShadow={currentStep >= step ? "0 0 15px rgba(220, 38, 38, 0.6)" : "none"}
                                            />
                                        ))}
                                    </HStack>
                                    <Text fontSize="sm" color="gray.400" fontWeight="medium">
                                        Paso {currentStep} de 2
                                    </Text>
                                </VStack>
                            </ModalHeader>

                            <ModalCloseButton
                                color="gray.400"
                                _hover={{ color: 'red.400', bg: 'red.900' }}
                                size="lg"
                            />

                            <ModalBody pb={6} pt={8}>
                                <Box minH="450px">
                                    <AnimatePresence mode="wait">
                                        {renderStepContent()}
                                    </AnimatePresence>
                                </Box>
                            </ModalBody>

                            <ModalFooter bg="black" borderTop="2px solid" borderTopColor="red.500">
                                <HStack spacing={4} w="full" justifyContent="space-between">
                                    <MotionButton
                                        variant="outline"
                                        onClick={prevStep}
                                        isDisabled={currentStep === 1}
                                        borderColor="gray.600"
                                        borderWidth="2px"
                                        color="white"
                                        bg="transparent"
                                        _hover={{
                                            borderColor: currentStep === 1 ? 'gray.600' : 'red.400',
                                            color: currentStep === 1 ? 'gray.500' : 'red.400',
                                            bg: currentStep === 1 ? 'transparent' : 'red.900'
                                        }}
                                        _disabled={{
                                            opacity: 0.4,
                                            cursor: 'not-allowed'
                                        }}
                                        whileHover={{ scale: currentStep === 1 ? 1 : 1.05 }}
                                        whileTap={{ scale: currentStep === 1 ? 1 : 0.95 }}
                                        size="lg"
                                    >
                                        Anterior
                                    </MotionButton>

                                    <HStack spacing={3}>
                                        <MotionButton
                                            variant="outline"
                                            onClick={onClose}
                                            borderColor="gray.600"
                                            borderWidth="2px"
                                            color="gray.400"
                                            bg="transparent"
                                            _hover={{
                                                color: 'white',
                                                borderColor: 'gray.400',
                                                bg: 'gray.800'
                                            }}
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            size="lg"
                                        >
                                            Cancelar
                                        </MotionButton>

                                        {currentStep < 2 ? (
                                            <MotionButton
                                                bg="red.600"
                                                color="white"
                                                onClick={nextStep}
                                                _hover={{ bg: 'red.700' }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                size="lg"
                                                px={8}
                                                boxShadow="0 0 20px rgba(220, 38, 38, 0.4)"
                                            >
                                                Siguiente
                                            </MotionButton>
                                        ) : (
                                            <MotionButton
                                                bg="red.600"
                                                color="white"
                                                onClick={handleSubmit}
                                                isLoading={isSubmitting}
                                                loadingText="Guardando..."
                                                leftIcon={<Check size={20} />}
                                                _hover={{ bg: 'red.700' }}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                                size="lg"
                                                px={8}
                                                boxShadow="0 0 25px rgba(220, 38, 38, 0.6)"
                                            >
                                                Guardar Vehículo
                                            </MotionButton>
                                        )}
                                    </HStack>
                                </HStack>
                            </ModalFooter>
                        </ModalContent>
                    </Modal>
                )}
            </AnimatePresence>
        </>
    );
};

export default ModalAddVehicle;