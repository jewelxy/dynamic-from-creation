import React from 'react'
import Header from './Header'
import GenerateField from './GenerateField/GenerateField';
import GenerateViewField from './GenerateField/GenerateViewField';

const GenerateForm = () => {
   

    return (
        <div className='md:grid md:grid-cols-12 md:gap-6'>
            <Header />
            <div className='md:col-span-12'>
                <div className='md:grid md:grid-cols-12 md:gap-4'>
                    {/* From Field Generation */}
                    <div className='md:col-span-6'>
                    <h1 className='text-2xl font-bold text-center'>Generate Form</h1>
                    <GenerateField />
                    </div>

                    {/* Generated Field */}
                    <div className='md:col-span-6'>
                    <h1 className='text-2xl font-bold text-center'>Generated Form Field</h1>
                    <GenerateViewField />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GenerateForm