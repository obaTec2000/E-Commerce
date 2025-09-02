import React, { useState } from 'react'
import { assets } from '@/assets/assets'
import Image from 'next/image';
import { useAppContext } from '@/context/AppContext';
import { FaHeart } from "react-icons/fa";

const ProductCard = ({ product, }) => {

    const { currency, router } = useAppContext()
    const [like, setLike] = useState(false)


    return (
<div 
className="flex flex-col items-start gap-1 max-w-[220px] sm:max-w-[250px] md:max-w-[280px] w-full cursor-pointer">

            <div className="cursor-pointer group relative bg-gray-500/10 rounded-lg w-full h-52 flex items-center justify-center">
                <Image
                    src={product.images[0]}
                    alt={product.name}
                    className="group-hover:scale-105 transition object-cover w-4/5 h-4/5 md:w-full md:h-full"
                    width={800}
                    height={800}
                />
               <button 
  onClick={() => setLike(!like)}
  className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md"
>
  <Image
    className="h-3 w-3"
    src={like ? assets.heart_love : assets.heart_icon}
    alt="heart_icon"
  />
</button>

            </div>

            <p className="md:text-base font-medium pt-2 w-full truncate">{product.title}</p>
            <p className="w-full text-xs text-gray-500/70 max-sm:hidden truncate">{product.description}</p>
            <div className="flex items-center gap-2">
                <p className="text-xs">{product.rating}</p>
                <div className="flex items-center gap-0.5">
                    {Array.from({ length: 5 }).map((_, index) => (
                        <Image
                            key={index}
                            className="h-3 w-3"
                            src={
                                index < Math.floor(product.rating)
                                    ? assets.star_icon
                                    : assets.star_dull_icon
                            }
                            alt="star_icon"
                        />
                    ))}
                </div>
            </div>

            <div className="flex items-end justify-between w-full mt-1">
                <p className="text-base font-medium">{currency}{product.price}</p>
                <button className=" max-sm:hidden px-4 py-1.5 text-gray-500 border border-gray-500/20 rounded-full text-xs hover:bg-slate-50 transition">
                    Buy now
                </button>
            </div>
        </div>
    )
}

export default ProductCard