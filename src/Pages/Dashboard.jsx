import { useState } from 'react'
import { Box } from '@chakra-ui/react'
import Carrousel from '../components/Carrousel'
import PremiumNavbar from '../components/NavBar'
import ContactFooter from '../components/Footer'

function Dashboard() {

  return (
    <>
      <Box mt='10' >
        <PremiumNavbar />
      </Box>
      <Box mt='20' >
        <Carrousel />
      </Box>
      <Box>
        <ContactFooter />
      </Box>
    </>
  )
}

export default Dashboard
