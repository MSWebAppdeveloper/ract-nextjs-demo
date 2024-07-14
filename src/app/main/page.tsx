import React from 'react'
import EventForm from '../components/EventForm'
import Sidebar from '../components/Sidebar'
import { Box } from '@radix-ui/themes'

type Props = {}

const Main = (props: Props) => {
    return (
        <>
        <Box width='1512px' >
            <Sidebar />
            <EventForm />
            </Box>
        </>
    )
}

export default Main

