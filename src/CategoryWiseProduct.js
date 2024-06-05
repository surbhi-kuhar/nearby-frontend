import axios from "axios";
import React, { Fragment, useEffect, useState } from "react";
import './Pages/styles/Product.css'
import { useSelector } from "react-redux";
import SingleProductCard from "./Pages/ProductPage/SingleProductCard";
import { useParams } from "react-router-dom";
import MultiVendorWebsite from "./Pages/CategoryHeader";

const CategoryWiseProduct = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { category } = useParams();
  console.log(category);
  const fetchData = async () => {
    try {
      const {data} = await axios.get(
        "http://localhost:8000/api/v1/product/search",{
            params:{
                category:category
            }
        }
      );
      setProducts(data.products);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <Fragment>
        <MultiVendorWebsite/>
      
        <details open className="m-10  max-w-md w-screen overflow-hidden rounded-lg border border-gray-200 open:shadow-lg text-gray-700">
      <summary className="flex cursor-pointer select-none items-center justify-between bg-gray-100 px-5 py-3 lg:hidden">
        <span className="text-sm font-medium"> Toggle Filters </span>
        <svg
          className="h-5 w-5"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </summary>

      <form action="" className="flex border-t border-gray-200 lg:border-t-0">
        <fieldset className="w-full">
          <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Type</legend>

          <div className="space-y-2 px-5 py-6">
            <div className="flex items-center">
              <input
                id="New"
                type="checkbox"
                name="type[New]"
                className="h-5 w-5 rounded border-gray-300"
                defaultChecked
              />
              <label htmlFor="New" className="ml-3 text-sm font-medium"> New </label>
            </div>

            <div className="flex items-center">
              <input id="Used" type="checkbox" name="type[Used]" className="h-5 w-5 rounded border-gray-300" />
              <label htmlFor="Used" className="ml-3 text-sm font-medium"> Used </label>
            </div>

            <div className="flex items-center">
              <input
                id="Branded"
                type="checkbox"
                name="type[Branded]"
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="Branded" className="ml-3 text-sm font-medium"> Branded </label>
            </div>

            <div className="pt-2">
              <button type="button" className="text-xs text-gray-500 underline">Reset Type</button>
            </div>
          </div>
        </fieldset>

        <fieldset className="w-full">
          <legend className="block w-full bg-gray-50 px-5 py-3 text-xs font-medium">Price</legend>

          <div className="space-y-2 px-5 py-6">
            <div className="flex items-center">
              <input
                id="300+"
                type="radio"
                name="Price"
                value="300+"
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="300+" className="ml-3 text-sm font-medium"> 300+ </label>
            </div>

            <div className="flex items-center">
              <input
                id="600+"
                type="radio"
                name="Price"
                value="600+"
                className="h-5 w-5 rounded border-gray-300"
              />
              <label htmlFor="600+" className="ml-3 text-sm font-medium"> 600+ </label>
            </div>

            <div className="flex items-center">
              <input
                id="1500+"
                type="radio"
                name="Price"
                value="1500+"
                className="h-5 w-5 rounded border-gray-300"
                defaultChecked
              />
              <label htmlFor="1500+" className="ml-3 text-sm font-medium"> 1500+ </label>
            </div>

            <div className="pt-2">
              <button type="button" className="text-xs text-gray-500 underline">Reset Price</button>
            </div>
          </div>
        </fieldset>
      </form>

      <div className="">
        <div className="flex justify-between border-t border-gray-200 px-5 py-3">
          <button name="reset" type="button" className="rounded text-xs font-medium text-gray-600 underline">
            Reset All
          </button>
          <button
            name="commit"
            type="button"
            className="rounded bg-blue-600 px-5 py-3 text-xs font-medium text-white active:scale-95"
          >
            Apply Filters
          </button>
        </div>
      </div>
    </details> 
      {loading ? (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 300 150">
          <path
            fill="none"
            stroke="#FF156D"
            stroke-width="15"
            stroke-linecap="round"
            stroke-dasharray="300 385"
            stroke-dashoffset="0"
            d="M275 75c0 31-27 50-50 50-58 0-92-100-150-100-28 0-50 22-50 50s23 50 50 50c58 0 92-100 150-100 24 0 50 19 50 50Z"
          >
            <animate
              attributeName="stroke-dashoffset"
              calcMode="spline"
              dur="2"
              values="685;-685"
              keySplines="0 0 1 1"
              repeatCount="indefinite"
            ></animate>
          </path>
        </svg>
      ) : (
        <div>
          <h1 className="productpageHeading">All Products</h1>
          <div className="product-page">
            {products&&products.length>0&&products.map((product, index) => (
              <SingleProductCard product={product} key={index} />
            ))}
          </div>
        </div>
      )}
    </Fragment>
  );
};
export default CategoryWiseProduct;