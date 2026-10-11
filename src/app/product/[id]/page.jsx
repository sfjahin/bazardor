import Link from 'next/link';
import React from 'react';

const page = async ({ params }) => {
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

    const { id } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/products/${id}`);
    const data = await res.json();


    console.log('test sort', data.markets.sort((a, b) => a.min - b.min).slice(0, 1));
    return (
        <div>
            <div className='flex gap-2 max-w-7xl container mx-auto py-6 text-sm'>
                <Link href={'/'}><p>হোম</p></Link><p className='text-gray-400'>{">"}</p>
                <Link href={`/category/${data.category}`}>{data.categoryNameBn}</Link><p className='text-gray-400'>{">"}</p>
                <p>{data.nameBn}</p>
            </div>
            <div className='rounded-2xl px-6 py-10 bg-white border border-gray-200 max-w-7xl mx-auto mb-8 flex justify-between items-center'>
                <div className='flex gap-4'>
                    <div>
                        <div className='text-5xl p-4 bg-[#F0F5F0] rounded-xl'>{data.image}</div>
                    </div>
                    <div className='flex flex-col'>
                        <h1 className='text-3xl font-bold'>{data.nameBn}</h1>
                        <p className='text-sm text-gray-500'>প্রতি {unitBn[data.unit] || data.unit} • {data.categoryNameBn} </p>
                        <p className='text-sm text-gray-500'>গতকালের তুলনায় আজ দাম <span className='font-bold'>{data.change.dir === 'up' ? 'বেড়েছে' : 'কমেছে'}</span> {Math.abs(data.change.pct).toLocaleString('bn-BD')}%</p>
                    </div>
                </div>

                <div className='text-gray-500 bg-[#F0F5F0] p-4 rounded-xl flex flex-col items-center'>
                    <h2>আজকের দাম</h2>
                    <h1 className='text-3xl font-bold text-black'>{data.today.toLocaleString('bn-BD')}</h1>
                    <h2>টাকা / {unitBn[data.unit] || data.unit}</h2>
                    <p className='text-green-700 font-bold'>{data.change.dir === 'up' ? '↑' : '↓'} {Math.abs(data.change.pct).toLocaleString('bn-BD')}%</p>
                </div>
            </div>
            <div className='rounded-2xl p-6 bg-white border border-gray-200 max-w-7xl mx-auto mb-8 flex flex-col gap-5'>
                <div><h1 className='text-xl font-bold'>দামের সারসংক্ষেপ</h1></div>
                <div className='grid grid-cols-3 gap-3'>
                    <div className='p-4 border border-gray-200 rounded-xl text-sm text-gray-500'>
                        <p>সর্বনিম্ন দাম</p>
                        <span className='text-xl font-bold text-green-700'>{Math.min(...data.markets.map(price => price.min)).toLocaleString('bn-BD')} <span className='text-sm font-light'>টাকা</span></span>
                        <p>সবচেয়ে কম দামের বাজার</p>
                    </div>
                    <div className='p-4 border border-gray-200 rounded-xl text-sm text-gray-500'>
                        <p>সর্বাধিক দাম</p>
                        <span className='text-xl font-bold text-red-700'>{Math.max(...data.markets.map(price => price.max)).toLocaleString('bn-BD')} <span className='text-sm font-light'>টাকা</span></span>
                        <p>সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                    <div className='p-4 border border-gray-200 rounded-xl text-sm text-gray-500'>
                        <p>সর্বাধিক দাম</p>
                        <span className='text-xl font-bold text-green-700'>{Math.round((Math.max(...data.markets.map(price => price.max)) + Math.min(...data.markets.map(price => price.min))) / 2).toLocaleString('bn-BD')}<span className='text-sm font-light'> টাকা</span></span>
                        <p>সবচেয়ে বেশি দামের বাজার</p>
                    </div>
                </div>
                <div><h1 className='text-xl font-bold'>বাজারভিত্তিক আজকের দাম</h1></div>
                <div className='border border-gray-200 rounded-2xl'>
                    <div className='grid grid-cols-5 place-items-center justify-between font-bold text-gray-500 text-sm p-4'>
                        <p>বাজার</p>
                        <p>বিভাগ</p>
                        <p>সর্বনিম্ন</p>
                        <p>সর্বাধিক</p>
                        <p>গড়</p>
                    </div>
                    <div>
                        {data.markets.map(((market, i) => <div key={i} className={`grid grid-cols-5 place-items-center text-sm border-t border-gray-200 p-4 ${i % 2 === 0 ? 'bg-[#F0F5F0]' : ''}`}>
                            <p>{market.market}</p>
                            <p>{market.division}</p>
                            <p>{market.min}</p>
                            <p>{market.max}</p>
                            <p>{((market.max + market.min) / 2).toFixed(2)}</p>
                        </div>))}
                    </div>
                </div>
            </div>
            <div className='max-w-7xl mx-auto mb-16'>
                <Link href={`/category/${data.category}`} className='py-2 px-4 hover:bg-gray-300 rounded-md font-bold text-md'>{data.categoryIcon} সব {data.categoryNameBn}</Link>
            </div>
        </div>
    );
};

export default page;