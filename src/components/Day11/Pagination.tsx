"use client"
import Image from "next/image"
import React, { useEffect, useState } from "react";

export interface Product {
    id: number;
    title: string,
    price: number,
    description: string,
    rating: number,
    thumbnail: string,
    discountPercentage: number
}

const ProductItem: React.FC<Product> = ({ id, title, price, description, rating, thumbnail, discountPercentage }) => {
    return <div data-testid="card" className="border-2 rounded-lg w-64">
        <div className="w-full rounded-t-lg">
            <Image src={thumbnail} width={'400'} height={'200'} alt={title} />
        </div>
        <div className="flex">
            <div className="p-2">{id}-{title}</div> <div className="p-2">{price}({discountPercentage}%) rating:{rating}</div>
        </div>
        <p className="p-2">{description}</p>
    </div>
}

const LIMIT = 10;

export const Pagination = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [currentPage, setCurrentPage] = useState<number>(0)
    const [totalPages, setTotalPages] = useState<number>(0)


    const fetchData = async () => {
        const data = await fetch(`https://dummyjson.com/products?limit=${LIMIT}&skip=${LIMIT * currentPage}&select=title,price,description,rating,thumbnail,discountPercentage`);
        const jsn = await data.json()
        setProducts(jsn?.products)
        const totalPage = Math.ceil(jsn?.total / LIMIT)
        setTotalPages(totalPage)
    }

    useEffect(() => {
        fetchData();
    }, [currentPage])


    return <div>
        <div className="flex space-x-4 mb-8">
            {currentPage > 0 && <button onClick={() => setCurrentPage((curr) => curr - 1)}>Prev</button>}
            {[...Array(totalPages).keys()].map((_, pN) => <div key={pN} className={(pN === currentPage ? "font-bold underline" : "") + " cursor-pointer"} onClick={() => setCurrentPage(pN)}>{pN + 1}</div>)}
            {currentPage < totalPages - 1 && <button onClick={() => setCurrentPage((curr) => curr + 1)}>Next</button>}
        </div>
        <div className="flex flex-wrap">
            {
                products && products?.map((product) => <ProductItem key={product?.id} {...product} />)
            }
        </div>
    </div>
}