import React from 'react';
import { notFound } from 'next/navigation';
import SortingSection from '../../../components/SortingSection';

const CategoryPage = async ({ params }) => {
    const { id } = await params;

    const [categoryRes, productsRes] = await Promise.all([
        fetch(
            `https://openapi.programming-hero.com/api/bazardor/categories/${encodeURIComponent(id)}`,
            {
                next: { revalidate: 3600 },
            }
        ),
        fetch(
            `https://openapi.programming-hero.com/api/bazardor/products?category=${encodeURIComponent(id)}`,
            {
                next: { revalidate: 3600 },
            }
        ),
    ]);

    if (categoryRes.status === 404) notFound();

    if (!categoryRes.ok) {
        throw new Error('Failed to fetch category');
    }

    if (!productsRes.ok) {
        throw new Error('Failed to fetch category products');
    }

    const categoryResult = await categoryRes.json();
    const productsResult = await productsRes.json();

    // Supports APIs returning either an array directly or { data: [...] }.
    const data = categoryResult?.data ?? categoryResult;
    const allProductData = productsResult?.data ?? productsResult;

    if (!data || !data.nameBn) {
        notFound();
    }

    const products = Array.isArray(allProductData)
        ? allProductData
        : [];

    return (
        <main>
            <section className="flex gap-4 rounded-2xl p-4 bg-white border border-gray-200 max-w-7xl mx-auto my-8">
                <div>
                    <div className="text-5xl">{data.icon}</div>
                </div>

                <div>
                    <h1 className="text-2xl font-bold">
                        {data.nameBn}
                    </h1>

                    <p>
                        {products.length.toLocaleString('bn-BD')}
                        টি পণ্যের আজকের দাম ও পরিবর্তন
                    </p>
                </div>
            </section>

            <SortingSection data={products} />
        </main>
    );
};

export default CategoryPage;