import Image from "next/image";
import React, { useEffect, useState } from "react";
import ProductCard from "./ProductCard";


const fetchCategories = async (callback) => {
    const res = await fetch('https://dummyjson.com/products/category-list')
    const data = await res.json()
    callback(data)
}

const fetchProduct = async (cat, callback) => {
    const res = await fetch(`https://dummyjson.com/products/category/${cat}`)
    const data = await res.json()
    callback(data.products)
}



const Category = () => {
    const [categories, setCategories] = useState([])
    const [ifSelected, setIfSelected] = useState()
    const [products, setProduct] = useState([])


    useEffect(() => {
        fetchCategories(data => setCategories(data))

    }, [])

    useEffect(() => {
        fetchProduct(ifSelected, setProduct)

    }, [ifSelected])

    return (
        <>
            <div className="relative w-full">
                <h2 className="text-xl font-bold mb-3">Categories</h2>

                <ul className="space-y-2 overflow-x-auto flex flex-row gap-7">
                    {categories.map(cat => (
                        <button
                            key={cat}
                            onClick={() => setIfSelected(cat)}
                            className="cursor-pointer h-fit p-2 min-w-[150px] flex rounded-lg bg-gray-100 hover:bg-gray-200"
                        >
                            <p className="">
                                {cat}
                            </p>
                        </button>
                    ))
                    }
                </ul>
            </div>

            {ifSelected && (
                <div>
                    <h2 className="text-xl font-bold mb-3">{ifSelected}</h2>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-6 pb-14 w-full">
                        {
                            products.map((product, index) => <ProductCard key={index} product={product} />
                            )}
                    </div>

                </div>
            )}

        </>
    );
};

export default Category;
