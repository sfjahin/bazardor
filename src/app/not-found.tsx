import Link from "next/link";

const NotFound = () => {
    return (
        <div className="container mx-auto flex min-h-[70vh] max-w-7xl items-center justify-center px-4">
            <div className="flex flex-col items-center gap-4 text-center">
                <p className="text-7xl" aria-hidden="true">
                    🧺</p>
                <h1 className="text-4xl font-bold">
                    পাতাটি খুঁজে পাওয়া যায়নি</h1>
                <p className="max-w-lg text-gray-600">
                    আপনি যে পণ্য বা পাতাটি খুঁজছেন সেটি সরানো হয়েছে
                    অথবা কখনো ছিল না।</p>
                <Link href="/" className="rounded-lg bg-green-700 px-6 py-3 font-semibold text-white transition hover:bg-green-800">
                    হোম পেজে ফিরে যান</Link>
            </div>
        </div>
    );
};

export default NotFound;