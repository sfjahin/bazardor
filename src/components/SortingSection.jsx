'use client'
import React, { useState } from 'react';
import ProductCard from './ProductCard';

const SortingSection = ({ data }) => {
    const [sortBy, setSortBy] = useState('default');

    const sortedProducts = [...data].sort((a, b) => {
        if (sortBy === 'price-low') {
            return a.today - b.today;
        }
        else if (sortBy === 'price-high') {
            return b.today - a.today;
        }
        return a.id - b.id;
    });

    return (
        <section>
            <div className='max-w-7xl mx-auto flex pb-16 flex-col gap-2'>
                
                <div className="flex justify-between items-center ">
                    <p className="text-sm text-gray-500">মোট {data.length.toLocaleString('bn-BD')}টি পণ্য দেখানো হচ্ছে</p>
                    <div className="flex items-center gap-3">
                        <label htmlFor="sort" className="text-sm text-gray-500">
                            সাজান:
                        </label>

                        <select
                            id='sort'
                            value={sortBy}
                            onChange={(e) => setSortBy(e.target.value)}
                            className="border border-gray-200 rounded-lg px-3 py-2 text-sm bg-white text-gray-700 outline-none focus:ring-2 focus:ring-green-100 cursor-pointer">
                            <option value={"default"}>ডিফল্ট</option>
                            <option value={"price-low"}>কম থেকে বেশি</option>
                            <option value={"price-high"}>বেশি থেকে কম</option>
                        </select>
                    </div>
                </div>
                <div className='grid grid-cols-3 gap-4'>
                    {sortedProducts.map((product, i) =>
                        <ProductCard key={i} product={product} />
                    )}
                </div>
            </div>
        </section>
    );
};

export default SortingSection;