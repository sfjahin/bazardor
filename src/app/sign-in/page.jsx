
'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { authClient } from '../../lib/auth-client';
import { FaGithub, FaGoogle } from 'react-icons/fa';

const SignInPage = () => {
    const router = useRouter();
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState(false);


    const onSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const formData = new FormData(e.currentTarget);
            const user = Object.fromEntries(formData.entries());

            const { data, error } = await authClient.signIn.email({
                email: user.email,
                password: user.password,
                callbackURL: '/',
            });

            if (error) {
                toast.error(error.message || 'সাইন ইন করা যায়নি।');
                console.error(error);
                return;
            }

            if (data) {
                toast.success('সফলভাবে সাইন ইন হয়েছে।!');
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
                toast.error(error.message || 'Google দিয়ে সাইন ইন করা যায়নি।');
            }
        } catch (error) {
            console.error(error);
            toast.error('Google দিয়ে সাইন ইন করতে সমস্যা হয়েছে।');
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
                toast.error(error.message || 'GitHub দিয়ে সাইন ইন করা যায়নি।');
            }
        } catch (error) {
            console.error(error);
            toast.error('GitHub দিয়ে সাইন ইন করতে সমস্যা হয়েছে।');
        }
    };

    return (
        <div>
            <div className="max-w-7xl container mx-auto text-center mt-8">
                <h1 className="font-bold text-2xl">সাইন ইন</h1>
                <p className="text-gray-500">
                    বিস্তারিত দাম, বাজার তুলনা ও প্রোফাইল দেখতে অ্যাকাউন্টে ঢুকুন।
                </p>
            </div>

            <form onSubmit={onSubmit}>
                <fieldset className="fieldset bg-white border border-gray-300 rounded-box w-sm p-4 max-w-7xl container mx-auto my-8">
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
                        autoComplete="current-password"
                        className="input bg-white border-gray-300 rounded-lg w-full"
                        placeholder="আপনার পাসওয়ার্ড"
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="btn btn-neutral mt-4 bg-green-700 text-white px-4 py-2 rounded-md hover:bg-green-800 font-bold shadow-md shadow-green-200"
                    >
                        {loading ? 'সাইন ইন হচ্ছে...' : 'সাইন ইন'}
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
                            {socialLoading ? 'অপেক্ষা করুন...' : 'Github দিয়ে চালিয়ে যান'}
                        </button>
                    </div>

                    <p className="text-center text-gray-500 mt-4">
                        অ্যাকাউন্ট নেই?{' '}
                        <Link href="/sign-up" className="underline">
                            সাইন আপ করুন
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

export default SignInPage;
