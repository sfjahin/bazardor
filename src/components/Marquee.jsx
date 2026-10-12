import MarqueeText from "react-marquee-text"
import "react-marquee-text/dist/styles.css"

import React from 'react';

const Marquee = async() => {
    const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
    const data = await res.json();


    return (
        <div className="flex items-center justify-center border-b border-gray-200 bg-white">
            <MarqueeText direction="right" duration={10} pauseOnHover={true}>
                {data.map((product, i) => (
                    <div key={i} className="text-black px-2 py-2     border-r-gray-200 border-r text-sm">
                        {product.categoryIcon} {product.nameBn} {product.today.toLocaleString('bn-BD')} টাকা/কেজি  <span className={`font-bold ${product.change.dir === 'up' ? 'text-red-600' : 'text-green-700'}`}>{product.change.dir === 'up' ? '▲' : '▼'} {product.change.pct.toLocaleString('bn-BD')}%</span>
                    </div>
                ))}
            </MarqueeText>
        </div>
    );
};

export default Marquee;