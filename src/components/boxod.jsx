'use client';

import { useState } from 'react';

const products = [
    { id: 1, name: 'T-Shirt', price: 500 },
    { id: 2, name: 'Shoes', price: 1500 },
    { id: 3, name: 'Watch', price: 1000 },
    { id: 4, name: 'Bag', price: 800 },
];

const Sorting = () => {
    const [sortBy, setSortBy] = useState('default');

    const sortedProducts = [...products].sort((a, b) => {
        if (sortBy === 'price-low') {
            return a.price - b.price;
        }

        if (sortBy === 'price-high') {
            return b.price - a.price;
        }
        

        return a.id - b.id;
    });

    return (
        <div className="space-y-5">
            {/* Sorting Dropdown */}
            <div className="flex items-center gap-3">
                <label
                    htmlFor="sort"
                    className="text-sm text-gray-500"
                >
                    সাজান:
                </label>

                <select
                    id="sort"
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="cursor-pointer rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-green-100"
                >
                    <option value="default">ডিফল্ট</option>
                    <option value="price-low">
                        দাম: কম থেকে বেশি
                    </option>
                    <option value="price-high">
                        দাম: বেশি থেকে কম
                    </option>
                </select>
            </div>

            {/* Product List */}
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {sortedProducts.map((product) => (
                    <div
                        key={product.id}
                        className="rounded-lg border p-4"
                    >
                        <h3 className="font-semibold">
                            {product.name}
                        </h3>

                        <p className="mt-2 text-green-600">
                            ৳{product.price}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Sorting;