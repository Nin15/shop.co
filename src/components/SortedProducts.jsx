import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate, useParams } from "react-router-dom";

export default function SortedProducts() {
  const productId = useParams();
  const navigate = useNavigate();
  async function Fetching() {
    const url = new URL("https://680f9e9e67c5abddd1960608.mockapi.io/product");
    return fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  }

  const {
    data: products = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products"],
    queryFn: Fetching,
  });

  const sortedProducts = [...products].sort((a, b) => b.rating - a.rating);

  return (
    <div className="flex flex-wrap w-[100%] justify-center items-center">
      {isLoading && (
        <p className="text-center text-gray-500">Loading products...</p>
      )}
      {error && (
        <div className="text-center">
          <img alt="Error" className="w-32 mx-auto" />
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      <div className="flex w-[100%] px-16 justify-center items-center gap-6">
        {sortedProducts.map((el) => (
          <div
            onClick={() => navigate(`/ProductDetailPage/${el.id}`)}
            key={el.id}
          >
            <img
              className="w-[295px] rounded-2xl h-[298px] object-cover cursor-pointer"
              src={el.avatar}
              alt="ProductIMG"
            />
            <p>{el.product}</p>
            <p className="text-sm">⭐⭐⭐⭐ {el.rating}</p>
            <div className="flex gap-[20px]">
              {" "}
              <h1 className="font-bold text-2xl">${el.price}</h1>{" "}
              {el.discount > el.price && (
                <div className="flex gap-[20px]">
                  <h1 className="text-gray-400 text-2xl line-through">
                    ${el.discount}
                  </h1>
                  <h1 className="bg-red-100 text-[20px] text-center rounded-full w-[72px] text-red-400">
                    {Math.round(
                      -1 * (((el.discount - el.price) / el.discount) * 100)
                    )}
                    %
                  </h1>{" "}
                </div>
              )}
            </div>{" "}
          </div>
        ))}
      </div>
    </div>
  );
}
