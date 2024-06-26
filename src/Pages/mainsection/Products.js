import axios from 'axios';
import React, { Fragment, useEffect, useState } from 'react';
import SingleProductCard from '../ProductPage/SingleProductCard';
//import SingleProductCard from './SingleProductCard';
import "../styles/ProductPage.css";

const Products = () => {
    const [products, setProducts] = useState([]);
    const[loading,setLoading]=useState(true);

    const fetchData = async () => {
        try {
            const {data} = await axios.get("http://localhost:8000/api/v1/product/search");
            console.log(data);
            setProducts(data.products);
            setLoading(false);
        } catch (error) {
            console.error("Error fetching products:", error);
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchData();
    }, []);
  return (
    <Fragment>
                {loading?<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 300 150'>
                <path fill='none' stroke='#FF156D' stroke-width='15' 
                stroke-linecap='round' stroke-dasharray='300 385' 
                stroke-dashoffset='0' d='M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z'>
                    <animate attributeName='stroke-dashoffset'
                 calcMode='spline' dur='2' values='685;-685' keySplines='0 0 1 1' repeatCount='indefinite'></animate></path></svg>
                 :
                <div>
        <div className="product-page">
                {products.map((product, index) => (
                    <SingleProductCard product={product} key={index} />
                ))}
        </div>
                </div>
}
            </Fragment>
  )
}

export default Products