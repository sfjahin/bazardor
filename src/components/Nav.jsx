import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';

const Nav = () => {
    const currentDate = new Date().toLocaleDateString('bn-BD', {
        dateStyle: 'full',
    });

    return (
        <div className='sticky top-0 bg-white z-50'>
            <div className="flex items-center justify-center border-b border-gray-200 bg-white">
                <div className='max-w-7xl flex items-center justify-between container mx-auto px-2 py-1'>
                    <div className='flex items-center gap-2'>
                        <Image className='flex items-center p-2 bg-green-700 rounded-xl' src="/logo-icon.png" alt="Logo" width={50} height={50} />
                        <div className="flex flex-col justify-center">
                            <h1 className="text-xl font-bold mt-2">বাজার দর</h1>
                            <p className="text-sm text-gray-500 mb-2">{currentDate}</p>
                        </div>
                    </div>
                    <div className="flex items-center gap-2">
                        <button className="text-black px-4 py-2 rounded-xl hover:bg-gray-300 font-bold">সাইন ইন</button>
                        <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 w-fit font-bold shadow-md shadow-green-200">সাইন আপ</button>
                    </div>
                </div>
            </div>
            <NavLinks></NavLinks>
        </div>
    );
};

export default Nav;