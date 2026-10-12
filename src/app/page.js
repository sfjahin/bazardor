import SortingSection from "../components/SortingSection";
import ProductCard from "../components/ProductCard";
import Image from "next/image";
import { connection } from "next/server";

export const instant = false;

export default async function Home() {
  await connection();
  const currentDate = new Date().toLocaleDateString('bn-BD', {
    dateStyle: 'full',
  });

  const res = await fetch('https://openapi.programming-hero.com/api/bazardor/products');
  const data = await res.json();


  const priceUp = data.filter(product => product.change.dir === 'up');
  const priceDown = data.filter(product => product.change.dir === 'down');



  return (
    <div>
      <section className='bg-white border-gray-200 border rounded-2xl max-w-7xl container mx-auto px-8 py-8 my-8'>
        <div className="flex justify-between items-center">
          <div className="flex flex-col gap-5">
            <div className="bg-[#E2F1E7] rounded-full px-4 py-2 text-green-700 text-sm w-fit">
              <p>{currentDate}</p>
            </div>
            <h1 className="text-4xl font-bold">আজকের বাজারের দাম এক <br></br>নজরে</h1>
            <p className="text-gray-500">চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম ও মসলার দাম — বাজারভিত্তিক বিস্তারিত, গড়,<br></br> সর্বনিম্ন-সর্বাধিক এবং দামের পরিবর্তন এক জায়গায়।</p>
            <button className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 w-fit font-bold shadow-md shadow-green-200">
              সব পণ্য দেখুন
            </button>
          </div>
          <Image src="/bazar-hero.png" alt="Placeholder" width={400} height={400} />
        </div>
      </section>

      <section>
        <div className='max-w-7xl mx-auto my-10'>
          <h2 className="font-bold text-xl"><span className="text-red-600 text-2xl">▲</span> আজ দাম বেড়েছে</h2>
          <div className='grid grid-cols-3 gap-4 my-4'>
            {priceUp.sort((a, b) => b.change.pct - a.change.pct).slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      <section>
        <div className='max-w-7xl mx-auto my-10'>
          <h2 className="font-bold text-xl"><span className="text-green-700 text-2xl">▼</span> আজ দাম কমেছে</h2>
          <div className='grid grid-cols-3 gap-4 my-4'>
            {priceDown.sort((a, b) => a.change.pct - b.change.pct).slice(0, 6).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>
      <h2 className="font-bold text-xl max-w-7xl container mx-auto">সব পণ্য</h2>
      <SortingSection data={data}></SortingSection>

    </div>
  );
}
