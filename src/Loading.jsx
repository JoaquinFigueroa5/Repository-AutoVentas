import { Flex, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const spinnerStyles = `
  @keyframes rotate {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes fadeInOut {
    0%, 100% { opacity: 0.4; }
    50% { opacity: 1; }
  }
  
  .spinner-rotate {
    animation: rotate 1.5s linear infinite;
  }
  
  .fade-pulse {
    animation: fadeInOut 2s ease-in-out infinite;
  }
`;

function Loading() {
  return (
    <>
      <style>{spinnerStyles}</style>

      <Flex
        align="center"
        justify="center"
        height="100vh"
        bg="#000000"
        position="relative"
        flexDirection="column"
        gap={8}
      >
        {/* Spinner principal */}
        <MotionBox
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 0.6,
            ease: "easeOut"
          }}
          position="relative"
        >
          {/* Círculo principal con borde rojo */}
          <Box
            width="60px"
            height="60px"
            border="2px solid transparent"
            borderTopColor="#DC2626"
            borderRightColor="#DC2626"
            borderRadius="full"
            className="spinner-rotate"
            position="relative"
          >
            {/* Punto indicador en el spinner */}
            <Box
              position="absolute"
              top="-3px"
              right="-3px"
              width="6px"
              height="6px"
              bg="#DC2626"
              borderRadius="full"
              boxShadow="0 0 8px rgba(220, 38, 38, 0.8)"
            />
          </Box>

          {/* Círculo interior sutil */}
          <Box
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            width="20px"
            height="20px"
            border="1px solid rgba(255, 255, 255, 0.2)"
            borderRadius="full"
            className="fade-pulse"
          />
        </MotionBox>

        {/* Texto de carga minimalista */}
        <MotionText
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.3,
            duration: 0.5
          }}
          color="rgba(255, 255, 255, 0.7)"
          fontSize="sm"
          fontWeight="400"
          letterSpacing="1px"
        >
          Cargando
        </MotionText>

        {/* Tres puntos animados debajo del texto */}
        <Flex gap={2} position="absolute" bottom="35%">
          {[0, 1, 2].map((index) => (
            <MotionBox
              key={index}
              width="4px"
              height="4px"
              bg="rgba(220, 38, 38, 0.8)"
              borderRadius="full"
              animate={{
                opacity: [0.3, 1, 0.3],
                scale: [1, 1.2, 1]
              }}
              transition={{
                duration: 1.2,
                repeat: Infinity,
                delay: index * 0.2,
                ease: "easeInOut"
              }}
            />
          ))}
        </Flex>

        {/* Elemento decorativo sutil en la esquina */}
        <Box
          position="absolute"
          top="20px"
          right="20px"
          width="2px"
          height="20px"
          bg="linear-gradient(to bottom, rgba(220, 38, 38, 0.5), transparent)"
          className="fade-pulse"
        />

        <Box
          position="absolute"
          bottom="20px"
          left="20px"
          width="20px"
          height="2px"
          bg="linear-gradient(to right, rgba(255, 255, 255, 0.2), transparent)"
          className="fade-pulse"
        />
      </Flex>
    </>
  );
}

export default Loading;