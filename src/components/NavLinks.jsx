import Link from 'next/link';
import React from 'react';

const NavLinks = async () => {

    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/categories');
    if (!res.ok) throw new Error("Failed to fetch products");
    const data = await res.json();


    return (
        <div>
            <div className="flex items-center justify-center border-b border-gray-200 bg-white">
                <div className="flex justify-start gap-1 items-center max-w-7xl container mx-auto px-2 py-2">
                    {data.map((category, i) => (
                        <Link key={i} href={`/category/${category.id}`} className="text-black hover:bg-gray-200 rounded-md px-2 py-1 text-xs font-bold">
                            {category.icon} {category.nameBn}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default NavLinks;