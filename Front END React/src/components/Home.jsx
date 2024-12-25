import React from 'react'
import Header from './Header'

const Home = () => {
    return (
        <div className='md:grid md:grid-cols-12 md:gap-6'>
            <Header />
            <div className='md:col-span-12 h-screen flex items-center justify-center'>
                <h1 className='text-2xl font-bold text-center'>Dynamic HTML Generator</h1>
            </div> 

        </div>
    )
}

export default Home