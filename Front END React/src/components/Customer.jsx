import React from 'react'
import Header from './Header'
import CustomerForm from './CustomerForm'
import LoadCustomer from './LoadCustomer'

const Customer = () => {
  return (
    <div className='md:grid md:grid-cols-12 md:gap-6'>
        <Header />
        <div className='md:col-span-12 lg:col-span-6 w-11/12 mx-auto my-4'>
            <CustomerForm />
        </div>
        <div className='md:col-span-12 lg:col-span-6 w-11/12 mx-auto my-4'>
            <LoadCustomer />
        </div>
    </div>
  )
}

export default Customer