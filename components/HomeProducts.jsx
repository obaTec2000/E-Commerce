import React from "react";
import ProductCard from "./ProductCard";
import { useAppContext } from "@/context/AppContext";
import Loading from "./Loading";
import Category from "./Category";

const HomeProducts = () => {

  const { products, router, loading, error } = useAppContext()

  return (
    <>
    <Category/>
    <div className="flex flex-col items-center pt-14">
      <p className="text-2xl font-medium text-left w-full">Popular products</p>

      {loading && <p className="mt-8"><Loading/></p>}
      {error && <p className="mt-8 text-red-600">{error}</p>}

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
        {!loading && !error && products && products.length > 0 &&
          products.map((product, index) => <ProductCard key={index} product={product} />
          )}
      </div>


      <button onClick={() => { router.push('/all-products') }} className="px-12 py-2.5 border rounded text-gray-500/70 hover:bg-slate-50/90 transition">
        See more
      </button>
    </div>
    </>
  );
};

export default HomeProducts;
