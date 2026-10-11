import SortingSection from '../../../components/SortingSection';
import React from 'react';

const CategoryPage = async ({ params }) => {
    const { id } = await params;
    const res = await fetch(`https://openapi.programming-hero.com/api/bazardor/categories/${id}`);
    const data = await res.json();
    
    const allProductRes = await fetch(`https://openapi.programming-hero.com/api/bazardor/products?category=${id}`);
    const allProductData = await allProductRes.json();



    return (
        <div>
            <div className='flex gap-4 rounded-2xl p-4 bg-white border border-gray-200 max-w-7xl mx-auto my-8'>
                <div>
                    <div className='text-5xl'>{data.icon}</div>
                </div>
                <div>
                    <h1 className='text-2xl font-bold'>{data.nameBn}</h1>
                    <p>{allProductData.length.toLocaleString('bn-BD')}টি পণ্যের আজকের দাম ও পরিবর্তন</p>
                </div>
            </div>
            <SortingSection data={allProductData}></SortingSection>
        </div>
    );
};

export default CategoryPage;