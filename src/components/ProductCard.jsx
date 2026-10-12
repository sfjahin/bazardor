import Link from 'next/link';
import React from 'react';

const ProductCard = ({ product }) => {
    const unitBn = {
        kg: "কেজি",
        gram: "গ্রাম",
        litre: "লিটার",
        ml: "মিলিলিটার",
        dozen: "ডজন",
        piece: "পিস",
        packet: "প্যাকেট",
        pound: "পাউন্ড",
    };

    const pct = product.change.pct;
    const positivePct = pct * (-1);

    return (
        <Link href={`/product/${product.id}`}>
            <div className='flex flex-col gap-4 rounded-2xl p-4 bg-white border border-gray-200 '>
                <div className='flex gap-2'>
                    <div className='p-2 bg-[#F0F5F0] h-fit w-fit rounded-xl text-2xl'>
                        {product.image}
                    </div>
                    <div>
                        <h4 className='font-bold text-lg'>{product.nameBn}</h4>
                        <p className='text-sm text-gray-500'>প্রতি {unitBn[product.unit] || data.unit}</p>
                    </div>
                </div>
                <div className='flex flex-col'>
                    <p className='text-sm text-gray-500'>আজকের দাম</p>
                    <div className='flex justify-between items-center'>
                        <p><span className='font-bold text-xl'>{product.today.toLocaleString('bn-BD')}</span> টাকা</p>
                        <div className='bg-[#F0F5F0] px-2 rounded-xl flex gap-1'>
                            <p className={`text-sm ${product.change.dir === 'up' ? 'text-red-600' : 'text-green-700'} font-bold`}>{product.change.dir === 'up' ? '▲' : '▼'} {pct > 0 ? pct.toLocaleString('bn-BD') : positivePct.toLocaleString('bn-BD')}%</p>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;