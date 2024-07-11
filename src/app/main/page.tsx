import React from 'react'
import EventForm from '../components/EventForm'
import Sidebar from '../components/Sidebar'

type Props = {}

const Main = (props: Props) => {
    return (
        <>
        <div className='inline-flex'>
            <Sidebar />
            <EventForm />
            </div>
        </>
    )
}

export default Main

