import React from 'react'

interface EComponentProps {
    text: string;
}

const EComponent = (props:EComponentProps) => {

    return (
        <div className='p-6 m-2 bg-slate-300 rounded-lg'>
            {props.text}
        </div>
    )
}
export default EComponent