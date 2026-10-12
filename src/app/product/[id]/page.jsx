import Link from 'next/link';
import { notFound } from 'next/navigation';

const unitBn = {
    kg: 'কেজি',
    gram: 'গ্রাম',
    litre: 'লিটার',
    ml: 'মিলিলিটার',
    dozen: 'ডজন',
    piece: 'পিস',
    packet: 'প্যাকেট',
    pound: 'পাউন্ড',
};

const formatBn = (value) =>
    Number.isFinite(Number(value))
        ? Number(value).toLocaleString('bn-BD')
        : '—';

const Page = async ({ params }) => {
    const { id } = await params;

    let data;

    try {
        const res = await fetch(
            `https://openapi.programming-hero.com/api/bazardor/products/${encodeURIComponent(id)}`,
            {
                next: { revalidate: 3600 },
            }
        );

        if (res.status === 404) notFound();

        if (!res.ok) {
            throw new Error(`Failed to fetch product: ${res.status}`);
        }

        const result = await res.json();

        // Adjust this line if your API returns a different response structure.
        data = result?.data ?? result;
    } catch (error) {
        if (error?.digest?.startsWith('NEXT_HTTP_ERROR_FALLBACK;404')) {
            throw error;
        }
        throw error;
    }

    if (!data || !data.nameBn) {
        notFound();
    }

    const markets = Array.isArray(data.markets) ? data.markets : [];
    const validMarkets = markets.filter(
        (market) =>
            Number.isFinite(Number(market.min)) &&
            Number.isFinite(Number(market.max))
    );

    const mins = validMarkets.map((market) => Number(market.min));
    const maxes = validMarkets.map((market) => Number(market.max));

    const minPrice = mins.length ? Math.min(...mins) : null;
    const maxPrice = maxes.length ? Math.max(...maxes) : null;

    const averagePrice =
        minPrice !== null && maxPrice !== null
            ? (minPrice + maxPrice) / 2
            : null;

    const unit = unitBn[data.unit] || data.unit || 'পিস';
    const changePct = Number(data.change?.pct);
    const hasChange = Number.isFinite(changePct);
    const isUp = data.change?.dir === 'up';

    return (
        <main>
            <div className="flex flex-wrap gap-2 max-w-7xl container mx-auto py-6 text-sm">
                <Link href="/">হোম</Link>
                <span className="text-gray-400">{'>'}</span>
                <Link href={`/category/${data.category}`}>
                    {data.categoryNameBn}
                </Link>
                <span className="text-gray-400">{'>'}</span>
                <p>{data.nameBn}</p>
            </div>

            <section className="rounded-2xl px-6 py-10 bg-white border border-gray-200 max-w-7xl mx-auto mb-8 flex flex-col md:flex-row gap-6 justify-between items-center">
                <div className="flex gap-4 items-center">
                    <div className="text-5xl p-4 bg-[#F0F5F0] rounded-xl">
                        {data.image}
                    </div>

                    <div className="flex flex-col gap-1">
                        <h1 className="text-3xl font-bold">{data.nameBn}</h1>
                        <p className="text-sm text-gray-500">
                            প্রতি {unit} • {data.categoryNameBn}
                        </p>

                        <p className="text-sm text-gray-500">
                            গতকালের তুলনায় আজ দাম{' '}
                            <span className="font-bold">
                                {hasChange
                                    ? isUp
                                        ? 'বেড়েছে'
                                        : 'কমেছে'
                                    : 'পরিবর্তন'}
                            </span>
                            {hasChange && ` ${formatBn(Math.abs(changePct))}%`}
                        </p>
                    </div>
                </div>

                <div className="text-gray-500 bg-[#F0F5F0] p-4 rounded-xl flex flex-col items-center">
                    <h2>আজকের দাম</h2>
                    <h2 className="text-3xl font-bold text-black">
                        {formatBn(data.today)}
                    </h2>
                    <p>টাকা / {unit}</p>

                    {hasChange && (
                        <p className={isUp ? 'text-red-700 font-bold' : 'text-green-700 font-bold'}>
                            {isUp ? '▲' : '▼'} {formatBn(Math.abs(changePct))}%
                        </p>
                    )}
                </div>
            </section>

            <section className="rounded-2xl p-6 bg-white border border-gray-200 max-w-7xl mx-auto mb-8 flex flex-col gap-5">
                <h2 className="text-xl font-bold">দামের সারসংক্ষেপ</h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 border border-gray-200 rounded-xl text-sm text-gray-500">
                        <p>সর্বনিম্ন দাম</p>
                        <p className="text-xl font-bold text-green-700">
                            {formatBn(minPrice)}
                            <span className="text-sm font-light"> টাকা</span>
                        </p>
                        <p>বাজারগুলোর মধ্যে সর্বনিম্ন</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-xl text-sm text-gray-500">
                        <p>সর্বাধিক দাম</p>
                        <p className="text-xl font-bold text-red-700">
                            {formatBn(maxPrice)}
                            <span className="text-sm font-light"> টাকা</span>
                        </p>
                        <p>বাজারগুলোর মধ্যে সর্বাধিক</p>
                    </div>

                    <div className="p-4 border border-gray-200 rounded-xl text-sm text-gray-500">
                        <p>সর্বনিম্ন ও সর্বাধিক দামের মধ্যবর্তী মান</p>
                        <p className="text-xl font-bold text-green-700">
                            {formatBn(averagePrice)}
                            <span className="text-sm font-light"> টাকা</span>
                        </p>
                        <p>সর্বনিম্ন ও সর্বাধিক দামের গড়</p>
                    </div>
                </div>

                <h2 className="text-xl font-bold">বাজারভিত্তিক আজকের দাম</h2>

                <div className="border border-gray-200 rounded-2xl overflow-x-auto">
                    <div className="min-w-[600px]">
                        <div className="grid grid-cols-5 place-items-center font-bold text-gray-500 text-sm p-4">
                            <p>বাজার</p>
                            <p>বিভাগ</p>
                            <p>সর্বনিম্ন</p>
                            <p>সর্বাধিক</p>
                            <p>গড়</p>
                        </div>

                        {validMarkets.map((market, i) => (
                            <div
                                key={`${market.market}-${market.division}-${i}`}
                                className={`grid grid-cols-5 place-items-center text-sm border-t border-gray-200 p-4 ${
                                    i % 2 === 0 ? 'bg-[#F0F5F0]' : ''
                                }`}
                            >
                                <p>{market.market}</p>
                                <p>{market.division}</p>
                                <p>{formatBn(market.min)}</p>
                                <p>{formatBn(market.max)}</p>
                                <p>
                                    {formatBn(
                                        (Number(market.min) + Number(market.max)) / 2
                                    )}
                                </p>
                            </div>
                        ))}

                        {validMarkets.length === 0 && (
                            <p className="p-4 text-center text-gray-500">
                                বাজারের দামের তথ্য পাওয়া যায়নি।
                            </p>
                        )}
                    </div>
                </div>
            </section>

            <div className="max-w-7xl mx-auto mb-16">
                <Link
                    href={`/category/${data.category}`}
                    className="py-2 px-3 hover:bg-gray-300 rounded-md font-bold text-md"
                >
                    {data.categoryIcon} সব {data.categoryNameBn}
                </Link>
            </div>
        </main>
    );
};

export default Page;