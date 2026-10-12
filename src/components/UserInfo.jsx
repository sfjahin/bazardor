'use client'

import { authClient } from '../lib/auth-client';
import Link from 'next/link';
import React from 'react';
import toast from 'react-hot-toast';

const UserInfo = () => {

    const { data: session } = authClient.useSession();
    const user = session?.user;

    const handleSignOut = async() => {
        await authClient.signOut();
        toast.success('সফলভাবে সাইন আউট হয়েছে।')
    }


    return (
        <div>
            {
                user ? (<div>
                    <div className='rounded-md flex gap-2 items-center bg-white'>
                        <div className="dropdown dropdown-start bg-none border-none shadow-none relative hover:bg-gray-200 rounded-md">
                            <div tabIndex={0} role="button" className="btn m-1 bg-transparent text-black border-none shadow-none ">
                                <div className='rounded-full flex justify-center items-center px-3 py-2 bg-green-700 text-white font-bold text-xs'>
                                    {user.name?.[0]?.toUpperCase() ?? "U"}
                                </div>
                                <div className='flex gap-2 items-center text-gray-700'>
                                    <p className='font-bold'>{user.name}</p>
                                    <p className='text-xs'>▼</p>
                                </div>
                            </div>
                            <ul tabIndex={-1} className="bg-white absolute right-0 origin-top-right dropdown-content menu  rounded-box z-1 w-52 p-2 shadow-xl border border-gray-200 flex flex-col gap-2 p-4">
                                <p className='text-sm text-gray-400'>{user.name}</p>
                                <p className='text-sm text-gray-400'>{user.email}</p>
                                <Link href={'/profile'} className='text-md'>👤 আমার প্রোফাইল</Link>
                                <Link onClick={handleSignOut} href={'/'} className='text-red-700 text-md'>↩সাইন আউট</Link>
                            </ul>
                        </div>
                    </div>
                </div>)
                    : (<div className="flex items-center gap-2">
                        <Link href={'/sign-in'}><button className="text-black px-4 py-2 rounded-xl hover:bg-gray-300 font-bold">সাইন ইন</button></Link>
                        <Link href={'/sign-up'}><button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 w-fit font-bold shadow-md shadow-green-200">সাইন আপ</button></Link>
                    </div>)
            }

        </div>
    );
};

export default UserInfo;