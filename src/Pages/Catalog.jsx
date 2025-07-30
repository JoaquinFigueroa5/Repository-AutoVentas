import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import CarListing from '../components/Catalog'
import PremiumNavbar from '../components/NavBar'
import ContactFooter from '../components/Footer'

const Catalog = () => {
  return (
    <>
    <Box>
        <PremiumNavbar />
    </Box>
    <Box mt='10' >
        <CarListing />
    </Box>
    <Box>
        <ContactFooter />
    </Box>
    </>
  )
}

export default Catalog