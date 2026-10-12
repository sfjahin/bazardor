
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '../../lib/auth-client';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SignUpPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);

    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());

            if (user.password !== user.confirmPassword) {
                toast.error('দুটি পাসওয়ার্ড মিলছে না।');
                return;
            }

            const { data, error } = await authClient.signUp.email({
                name: user.name,
                email: user.email,
                password: user.password,
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'অ্যাকাউন্ট তৈরি করা যায়নি।');
                console.error(error);
                return;
            }

            if (data) {
                toast.success('অ্যাকাউন্ট সফলভাবে তৈরি হয়েছে!');
                router.push('/');
                router.refresh();
            }
        } catch (error) {
            console.error(error);
            toast.error('একটি সমস্যা হয়েছে। আবার চেষ্টা করুন।');
        } finally {
            setLoading(false);
        }
    };

    const handleGoogleSignIn = async () => {
        setSocialLoading(true);

        try {
            const { error } = await authClient.signIn.social({
                provider: 'google',
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'Google দিয়ে চালিয়ে যাওয়া যায়নি।');
            }
        } catch (error) {
            console.error(error);
            toast.error('Google দিয়ে চালিয়ে যেতে সমস্যা হয়েছে।');
        } finally {
            setSocialLoading(false);
        }
    };

    const handleGithubSignIn = async () => {
        try {
            const { error } = await authClient.signIn.social({
                provider: 'github',
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'GitHub দিয়ে চালিয়ে যাওয়া যায়নি।');
            }
        } catch (error) {
            console.error(error);
            toast.error('GitHub দিয়ে চালিয়ে যেতে সমস্যা হয়েছে।');
        }
    };

    return (
        <div>
            <div className="max-w-7xl container mx-auto text-center mt-8">
                <h1 className="font-bold text-2xl">অ্যাকাউন্ট তৈরি করুন</h1>
                <p className="text-gray-500">
                    বিনা খরচে সাইন আপ করে সব বিস্তারিত দাম দেখুন।
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-white border border-gray-300 rounded-box w-sm p-4 max-w-7xl container mx-auto my-8">
                    <label className="label text-black">নাম</label>
                    <input
                        name="name"
                        type="text"
                        required
                        autoComplete="name"
                        className="input bg-white border-gray-300 rounded-lg w-full"
                        placeholder="যেমন: রহিম উদ্দিন"
                    />

                    <label className="label text-black">ইমেইল</label>
                    <input
                        name="email"
                        type="email"
                        required
                        autoComplete="email"
                        className="input bg-white border-gray-300 rounded-lg w-full"
                        placeholder="you@example.com"
                    />

                    <label className="label text-black">পাসওয়ার্ড</label>
                    <input
                        name="password"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="input bg-white border-gray-300 rounded-lg w-full"
                        placeholder="কমপক্ষে ৮ অক্ষর"
                    />

                    <label className="label text-black">পাসওয়ার্ড নিশ্চিত করুন</label>
                    <input
                        name="confirmPassword"
                        type="password"
                        required
                        minLength={8}
                        autoComplete="new-password"
                        className="input bg-white border-gray-300 rounded-lg w-full"
                        placeholder="আবার লিখুন"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-neutral mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 font-bold shadow-md shadow-green-200"
                    >
                        {loading ? 'অ্যাকাউন্ট তৈরি হচ্ছে...' : 'অ্যাকাউন্ট তৈরি করুন'}
                    </button>

                    <div className="flex items-center justify-between mt-4">
                        <hr className="w-[40%] border-gray-200 border-t-2" />
                        অথবা
                        <hr className="w-[40%] border-gray-200 border-t-2" />
                    </div>

                    <div className="flex justify-between gap-2">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            disabled={socialLoading}
                            className="btn bg-white text-gray-800 flex-1"
                        >
                            <FaGoogle />
                            {socialLoading ? 'অপেক্ষা করুন...' : 'Google দিয়ে চালিয়ে যান'}
                        </button>

                        <button
                            type="button"
                            onClick={handleGithubSignIn}
                            className="btn bg-white text-gray-800 flex-1"
                        >
                            <FaGithub />
                            GitHub দিয়ে চালিয়ে যান
                        </button>
                    </div>

                    <p className="text-center text-gray-500 mt-4">
                        অ্যাকাউন্ট আছে?{' '}
                        <Link href="/sign-in" className="underline">
                            সাইন ইন করুন
                        </Link>
                    </p>
                </fieldset>

                <div className="max-w-7xl container mx-auto text-center mb-16">
                    <Link href="/" className="underline">
                        ← হোম পেজে ফিরে যান
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default SignUpPage;
