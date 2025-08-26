import React, { useEffect, useState } from "react";

// const categories = ["Beauty", "Perfume", "Fragrancess", "Skincare", "Makeup"]

const fetchCategories = async (callback) => {
    const res = await fetch('https://dummyjson.com/products/category-list')
    const data = await res.json()
    callback(data)
}



const Category = () => {
    const [categories, setCategories] = useState([])


    
    useEffect(() => {
        fetchCategories(setCategories)
    }, [])

    return (
        <div className="p-4 ">
            <h2 className="text-xl font-bold mb-3">Categories</h2>

            <ul className="space-y-2 flex flex-row gap-7">
                {categories.map(cat => (
                    <li key={cat}
                        className="cursor-pointer p-2 rounded-lg bg-gray-100 hover:bg-gray-200">
                        {cat}
                    </li>
                ))
                }
            </ul>
        </div>
    );
};

export default Category;
