import React from 'react'
import EventForm from '../components/EventForm'
import Sidebar from '../components/Sidebar'
import { Box } from '@radix-ui/themes'

type Props = {}

const Main = (props: Props) => {
    return (
        <>
            <Box>
                <Sidebar />
                <EventForm width={{ initial: "100%", md: "1166px" }} />
            </Box>
        </>
    )
}

export default Main

