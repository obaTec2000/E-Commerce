'use client'
import ProductCard from "@/components/ProductCard";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useAppContext } from "@/context/AppContext";
import Loading from "@/components/Loading";
import { useEffect, useState } from "react";

const fetchCategories = async (callback) => {
    const res = await fetch('https://dummyjson.com/products/category-list')
    const data = await res.json()
    callback(data)
}

const fetchProductByCategory = async (cat, callback) => {
    const res = await fetch(`https://dummyjson.com/products/category/${cat}`)
    const data = await res.json()
    callback(data.products)
}

// const fetchAllProducts = async (callback) => {
//     const res = await fetch("https://dummyjson.com/products");
//     const data = await res.json();
//     callback(data.products);
// };


const AllProducts = () => {
    const [categories, setCategories] = useState([])
    const [ifSelected, setIfSelected] = useState()
    const { products, loading, error, updateProduct } = useAppContext();

    useEffect(() => {
        fetchCategories(data =>setCategories(data))
    }, [])

    useEffect(() => {
        if (ifSelected) {
            fetchProductByCategory(ifSelected, updateProduct);
        }
    }, [ifSelected])
    return (
        <>
            <Navbar />
            <div className="flex flex-col items-start px-6 md:px-16 lg:px-32">
                <div className="flex flex-col items-end pt-12">
                    <p className="text-2xl font-medium">All products</p>
                    <div className="w-16 h-0.5 bg-orange-600 rounded-full"></div>
                </div>

                <div className="relative w-full">
                    <div className="flex flex-col items-center">
                        <p className="text-2xl font-medium">Category</p>
                                  Selected Category: {ifSelected || "None"}

                        <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
                    </div>
                    <ul className="overflow-scroll flex flex-row gap-4 flex-wrap">
                        {categories.map((cat) => (
                            <li
                                key={cat}
                                onClick={() => setIfSelected(cat)}
                                className={`cursor-pointer p-2 rounded-lg hover:bg-gray-200 ${ifSelected === cat ? "bg-blue-300 hover:bg-blue-300" : "bg-gray-100"}`}
                            >
                                {cat}
                            </li>
                            
                        ))}
                        {/* <button
                        onClick={()=>fetchAllProducts(updateProduct)}
                        className="text-red-600">all</button> */}

                    </ul>
                </div>

                {loading && <p className="mt-8"><Loading /></p>}
                {error && <p className="mt-8 text-red-600">{error}</p>}

                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 flex-col items-center gap-6 mt-12 pb-14 w-full">
                    {!loading && !error && products.map((product, index) => <ProductCard key={index} product={product} />)}
                </div>
            </div>
            <Footer />
        </>
    );
};

export default AllProducts;
