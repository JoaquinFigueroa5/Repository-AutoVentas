import { Flex, Box, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);
const MotionText = motion(Text);

const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes reverseSpin {
    0% { transform: rotate(360deg); }
    100% { transform: rotate(0deg); }
  }
  
  @keyframes pulse {
    0%, 100% { 
      transform: scale(1);
      opacity: 0.8;
    }
    50% { 
      transform: scale(1.1);
      opacity: 1;
    }
  }
  
  @keyframes glow {
    0%, 100% { 
      box-shadow: 0 0 20px rgba(220, 38, 38, 0.3);
    }
    50% { 
      box-shadow: 0 0 40px rgba(220, 38, 38, 0.8), 0 0 60px rgba(220, 38, 38, 0.4);
    }
  }
  
  @keyframes float {
    0%, 100% { transform: translateY(0px); }
    50% { transform: translateY(-10px); }
  }
  
  .spinner-ring {
    animation: spin 2s linear infinite;
  }
  
  .spinner-ring-reverse {
    animation: reverseSpin 3s linear infinite;
  }
  
  .spinner-pulse {
    animation: pulse 2s ease-in-out infinite;
  }
  
  .glow-effect {
    animation: glow 2s ease-in-out infinite;
  }
  
  .float-effect {
    animation: float 3s ease-in-out infinite;
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
        bg="linear-gradient(135deg, #0a0a0a 0%, #1a0a0a 50%, #000000 100%)"
        position="relative"
        overflow="hidden"
      >
        {/* Elementos de fondo decorativos */}
        <Box
          position="absolute"
          width="400px"
          height="400px"
          bg="radial-gradient(circle, rgba(220, 38, 38, 0.05) 0%, transparent 70%)"
          borderRadius="full"
          pointerEvents="none"
          className="spinner-pulse"
          top="20%"
          left="10%"
        />

        <Box
          position="absolute"
          width="300px"
          height="300px"
          bg="radial-gradient(circle, rgba(255, 255, 255, 0.03) 0%, transparent 70%)"
          borderRadius="full"
          pointerEvents="none"
          className="float-effect"
          bottom="20%"
          right="15%"
        />

        {/* Contenedor principal del spinner */}
        <MotionBox
          initial={{ scale: 0.3, opacity: 0, rotate: -180 }}
          animate={{ scale: 1, opacity: 1, rotate: 0 }}
          transition={{
            duration: 1.2,
            ease: "easeOut",
            type: "spring",
            stiffness: 100
          }}
          position="relative"
        >
          {/* Anillo exterior */}
          <Box
            width="120px"
            height="120px"
            border="1px solid"
            borderColor="whiteAlpha.200"
            borderRadius="full"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            className="spinner-ring-reverse"
          />

          {/* Anillo principal */}
          <Box
            width="80px"
            height="80px"
            border="3px solid"
            borderColor="whiteAlpha.100"
            borderTopColor="#DC2626"
            borderRightColor="#DC2626"
            borderRadius="full"
            className="spinner-ring glow-effect"
            position="relative"
          >
            {/* Punto brillante en el anillo */}
            <Box
              position="absolute"
              top="-4px"
              left="50%"
              transform="translateX(-50%)"
              width="8px"
              height="8px"
              bg="#DC2626"
              borderRadius="full"
              boxShadow="0 0 15px rgba(220, 38, 38, 0.9), 0 0 25px rgba(220, 38, 38, 0.5)"
            />

            {/* Centro del spinner */}
            <Box
              position="absolute"
              top="50%"
              left="50%"
              transform="translate(-50%, -50%)"
              width="20px"
              height="20px"
              bg="linear-gradient(45deg, #FFFFFF 0%, #DC2626 100%)"
              borderRadius="full"
              boxShadow="0 0 10px rgba(255, 255, 255, 0.5)"
              className="spinner-pulse"
            />
          </Box>

          {/* Anillo interior decorativo */}
          <Box
            width="40px"
            height="40px"
            border="1px solid"
            borderColor="rgba(255, 255, 255, 0.3)"
            borderRadius="full"
            position="absolute"
            top="50%"
            left="50%"
            transform="translate(-50%, -50%)"
            className="spinner-ring"
          />
        </MotionBox>

        {/* Texto de carga */}
        <MotionText
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            delay: 0.8,
            duration: 0.8,
            repeat: Infinity,
            repeatType: "reverse",
            repeatDelay: 1
          }}
          position="absolute"
          bottom="30%"
          color="whiteAlpha.800"
          fontSize="sm"
          fontWeight="medium"
          letterSpacing="2px"
          textTransform="uppercase"
        >
          Cargando...
        </MotionText>

        {/* Partículas decorativas */}
        {[...Array(6)].map((_, i) => (
          <MotionBox
            key={i}
            position="absolute"
            width="4px"
            height="4px"
            bg="rgba(220, 38, 38, 0.6)"
            borderRadius="full"
            initial={{
              scale: 0,
              x: 0,
              y: 0,
              opacity: 0
            }}
            animate={{
              scale: [0, 1, 0],
              x: [0, (i % 2 === 0 ? 100 : -100)],
              y: [0, (i % 3 === 0 ? -80 : 80)],
              opacity: [0, 1, 0]
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              delay: i * 0.5,
              ease: "easeOut"
            }}
            style={{
              filter: "blur(0.5px)"
            }}
          />
        ))}

        {/* Efectos de luz en las esquinas */}
        <Box
          position="absolute"
          top="0"
          left="0"
          width="200px"
          height="200px"
          bg="radial-gradient(circle at center, rgba(220, 38, 38, 0.1) 0%, transparent 50%)"
          pointerEvents="none"
          className="spinner-pulse"
        />

        <Box
          position="absolute"
          bottom="0"
          right="0"
          width="150px"
          height="150px"
          bg="radial-gradient(circle at center, rgba(255, 255, 255, 0.05) 0%, transparent 50%)"
          pointerEvents="none"
          className="float-effect"
        />
      </Flex>
    </>
  );
}

export default Loading;