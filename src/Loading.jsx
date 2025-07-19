import { Flex, Box } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

const spinnerStyles = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  @keyframes pulse {
    0%, 100% { transform: scale(1); }
    50% { transform: scale(1.05); }
  }
  
  .spinner-ring {
    animation: spin 1.5s linear infinite;
  }
  
  .spinner-pulse {
    animation: pulse 2s ease-in-out infinite;
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
        bg="linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%)"
        position="relative"
      >
        <Box
          position="absolute"
          width="200px"
          height="200px"
          bg="radial-gradient(circle, rgba(255, 215, 0, 0.05) 0%, transparent 70%)"
          borderRadius="full"
          pointerEvents="none"
          className="spinner-pulse"
        />

        <MotionBox
          initial={{ scale: 0.5, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          position="relative"
        >
          <Box
            width="60px"
            height="60px"
            border="2px solid"
            borderColor="whiteAlpha.100"
            borderTopColor="#FFD700"
            borderRadius="full"
            className="spinner-ring"
            position="relative"
          >
            <Box
              position="absolute"
              top="-3px"
              left="50%"
              transform="translateX(-50%)"
              width="6px"
              height="6px"
              bg="#FFD700"
              borderRadius="full"
              boxShadow="0 0 10px rgba(255, 215, 0, 0.8)"
            />
          </Box>
        </MotionBox>
      </Flex>
    </>
  );
}

export default Loading;