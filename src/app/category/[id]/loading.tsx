import React from 'react';

const Loading = () => {
    return (
        <main className="min-h-screen bg-gray-50">

            {/* Category Header Skeleton */}
            <section className="flex gap-4 rounded-2xl border border-gray-200 bg-white p-4 max-w-7xl mx-auto my-8">

                {/* Category Icon */}
                <div className="h-14 w-14 shrink-0 rounded-lg bg-gray-200 animate-pulse" />

                {/* Category Information */}
                <div className="flex-1 space-y-3">
                    <div className="h-7 w-48 max-w-full rounded bg-gray-200 animate-pulse" />
                    <div className="h-4 w-64 max-w-full rounded bg-gray-200 animate-pulse" />
                </div>

            </section>

            {/* Products Loading Section */}
            <section className="max-w-7xl mx-auto px-4 pb-8 space-y-4">

                <h2 className="text-xl font-bold text-gray-800">
                    Loading...
                </h2>

                {/* Product Skeleton Grid */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">

                    {[1, 2, 3, 4, 5, 6].map((item) => (
                        <div
                            key={item}
                            className="space-y-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                        >

                            {/* Product Image */}
                            <div className="h-40 w-full rounded-lg bg-gray-200 animate-pulse" />

                            {/* Product Name */}
                            <div className="h-4 w-3/4 rounded bg-gray-200 animate-pulse" />

                            {/* Product Price */}
                            <div className="h-4 w-1/2 rounded bg-gray-200 animate-pulse" />

                            {/* Product Button */}
                            <div className="h-8 w-24 rounded-md bg-gray-200 animate-pulse" />

                        </div>
                    ))}

                </div>
            </section>

        </main>
    );
};

export default Loading;