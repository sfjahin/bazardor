import Image from 'next/image';
import React from 'react';
import NavLinks from './NavLinks';
import NavDate from './NavDate';
import Link from 'next/link';
import UserInfo from './UserInfo';

const Nav = () => {

    return (
        <div className='sticky top-0 bg-white z-50'>
            <div className="flex items-center justify-center border-b border-gray-200 bg-white">
                <div className='max-w-7xl flex items-center justify-between container mx-auto py-4'>
                    <Link href={'/'}>
                        <div className='flex items-center gap-2'>
                            <Image className='flex items-center p-2 bg-green-700 rounded-xl' src="/logo-icon.png" alt="Logo" width={50} height={50} />
                            <div className="flex flex-col justify-center">
                                <h1 className="text-xl font-bold">বাজার দর</h1>
                                <NavDate></NavDate>
                            </div>
                        </div></Link>
                    <UserInfo></UserInfo>
                </div>
            </div>
            <NavLinks></NavLinks>
        </div>
    );
};

export default Nav;