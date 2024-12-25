import React from 'react'
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <div className='bg-black py-2 text-center md:col-span-12'>
        <Link to='/' className='text-md text-white hover:text-blue-400 font-bold mx-2'>Home</Link>
        <Link to='/customer' className='text-md text-white hover:text-blue-400 font-bold mx-2'>Customer</Link>
        <Link to='/generateform' className='text-md text-white hover:text-blue-400 font-bold mx-2'>Generate Form</Link>
    </div>
  )
}

export default Header