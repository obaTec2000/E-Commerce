import Product from '@/app/product/[id]/page'
import React, { useEffect, useState } from 'react'


const addProductData = async (callback) => {
    const res = await fetch('https://dummyjson.com/products/add', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
            {
                id: 7,
                title: "BMW Pencil",
                description: "BMW Pencil is the best pencil",
                price: 1.99,
                brand: "BMW",
                category: "stationery",
                thumbnail: 'https://i.dummyjson.com/data/products/1/thumbnail.jpg'
            }
        )
    })
    const data = await res.json()
    callback(data)
}


const AddProduct = () => {
    const [product, setProduct] = useState()

    useEffect(() => {
        addProductData(data => setProduct(data))
    }, [])

    return (
        <div className="p-4">
            <h1 className="text-2xl font-bold">Add Product</h1>

            {product && (
                <div className="mt-6 border p-4 rounded-lg shadow-md">
                    <h2 className="text-xl font-semibold">{product.title}</h2>
                    <p className="text-gray-600">{product.description}</p>
                    <p className="mt-2 font-bold">Price: ${product.price}</p>
                    <p className="text-sm text-gray-500">Brand: {product.brand}</p>
                    <img
                        src={product.thumbnail}
                        alt={product.title}
                        className="mt-4 w-32 rounded"
                    />
                </div>
            )}
        </div>
    )
}

export default AddProduct
