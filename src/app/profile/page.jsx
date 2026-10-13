'use client'

import React, { useState } from 'react';
import { authClient } from "../../lib/auth-client";
import toast from 'react-hot-toast';

const ProfilePage = () => {
    const [loading, setLoading] = useState(false);
    const { data: session } = authClient.useSession();
    const user = session?.user;
    const handleSignOut = async () => {
        await authClient.signOut();
        toast.success('সফলভাবে সাইন আউট হয়েছে।')
    }

    const handleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData(e.target);
            const newUserData = Object.fromEntries(formData.entries());
            await authClient.updateUser({
                ...newUserData,

            });
            toast.success('নাম সফলভাবে হালনাগাদ হয়েছে।')
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }

    }

    return (
        <div className='flex flex-col gap-4 max-w-3xl container mx-auto pt-8 pb-16'>
            <div className='flex flex-col'>
                <h1 className='text-2xl font-bold'>আমার প্রোফাইল</h1>
                <p className='text-gray-500'>আপনার অ্যাকাউন্টের তথ্য এখানে দেখুন।</p>
            </div>
            <div className='flex justify-between items-center p-6 bg-white rounded-2xl border border-gray-200'>
                <div className='flex gap-4 items-center'>
                    <div className='p-4 rounded-full bg-green-700 text-xl text-white font-bold'>{user?.name?.[0]?.toUpperCase() ?? "U"}</div>
                    <div className='flex flex-col'>
                        <p className='font-bold text-xl'>{user?.name ?? "Anonymous User"}</p>
                        <p className='text-gray-500'>{user?.email ?? ""}</p>
                    </div>
                </div>
                <button
                    type="button"
                    onClick={handleSignOut}
                    className={`text-red-700 px-4 py-2 border border-red-700 hover:bg-red-700 hover:text-white rounded-md`}
                >↩ সাইন আউট</button>
            </div>
            <div className='flex flex-col gap-2 justify-start items-center p-6 bg-white rounded-2xl border border-gray-200'>
                <h1 className='font-bold text-xl w-full '>নাম হালনাগাদ করুন</h1>
                <form onSubmit={handleUpdateProfile} className='w-full'>
                    <fieldset className="fieldset rounded-box w-full container mx-auto">
                        <label className="label text-black">নাম</label>
                        <input
                            name="name"
                            type="text"
                            required
                            autoComplete="name"
                            className="input bg-white border-gray-300 rounded-lg w-full"
                            placeholder="যেমন: রহিম উদ্দিন"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className={`btn btn-primary sm:w-fit mt-4 text-white px-4 py-2 rounded-md hover:bg-green-800 font-bold shadow-md shadow-green-200 ${loading ? 'bg-gray-500' : 'bg-green-700'}`}
                        >
                            {loading ? "অপেক্ষা করুন..." : "নাম হালনাগাদ করুন"}
                        </button>
                    </fieldset>
                </form>
            </div>
        </div>
    );
};

export default ProfilePage;