import { Switch } from '@radix-ui/themes'
import React from 'react'

type Props = {}

const Sidebar = (props: Props) => {
    return (
        <>
            <div id='sidebar'>
                <div id='top'>
                    <div className='logo'></div>
                    <div className='navigationMenu'></div>
                    <div className='events'></div>
                </div>
                <div id='bottom'>
                    <div className='tertiaryLinks'>
                    <Switch   defaultChecked />
                    </div>

                </div>
            </div>
        </>
    )
}

export default Sidebar