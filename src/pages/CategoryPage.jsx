import React, { useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { useQuery } from "@tanstack/react-query";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
export default function CategoryPage() {
  const [page, setPage] = useState(1);
  const [minPrice, setMinPrice] = useState(50);
  const [maxPrice, setMaxPrice] = useState(1000);
  const width = ((500 - minPrice) / 500) * 100;
  const width2 = ((maxPrice - minPrice) / (1000 - minPrice)) * 100;
  const navigate = useNavigate();
  async function Fetching({ queryKey }) {
    const [, page] = queryKey;
    const url = new URL("https://680f9e9e67c5abddd1960608.mockapi.io/product");
    url.searchParams.append("page", page);
    url.searchParams.append("limit", 9);
    return fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  }

  const {
    data: paginatedProducts = [],
    isLoading,
    error,
  } = useQuery({
    queryKey: ["products", page],
    queryFn: Fetching,
  });
  const [activeButton, setActiveButton] = useState(null);
  const [filteredProducts, setFilteredProducts] = useState([]);

  async function FetchAllProducts() {
    const url = new URL("https://680f9e9e67c5abddd1960608.mockapi.io/product");
    return fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => res.json());
  }

  const { data: allProducts = [] } = useQuery({
    queryKey: ["allProducts"],
    queryFn: FetchAllProducts,
  });

  const productsToDisplay =
    filteredProducts.length > 0
      ? filteredProducts.slice((page - 1) * 9, page * 9)
      : paginatedProducts;

  return (
    <div className="flex mt-7 relative flex-col justify-center gap-[10px] items-center ">
      <Header />
      {/* Filters! */}{" "}
      <div className="w-[100%] flex  p-[20px] gap-[60px] items-center">
        <div className="flex p-[20px] flex-col w-[295px] gap-[10px]  border rounded-2xl ">
          <h1 className="font-bold text-[20px]">Filters</h1>
          <hr className="bg-gray-400 w-[247px]" />
          <div className="flex-col flex justify-center  gap-3">
            {["Shorts", "Shirts", "Hoodie", "Jeans"].map((el) => (
              <div
                key={el}
                className="flex cursor-pointer hover:font-bold transition-all justify-between items-center"
              >
                <p>{el}</p>
                <span>{">"}</span>
              </div>
            ))}
          </div>
          <hr className="bg-gray-400 w-[247px]" />
          <h1 className="font-bold text-[20px]">Filters</h1>
          <hr className="bg-gray-400 w-[247px]" />{" "}
          <h1 className="font-bold text-[20px]">Price</h1>
          <div className="flex relative justify-center items-center">
            <div className="relative flex items-center ">
              <div
                className={`absolute  pointer-events-none h-[9px] top-0 left-0 bg-black`}
                style={{
                  left: `${(minPrice / 500) * 100}%`,
                  width: `${width}%`,
                }}
              ></div>
              <input
                type="range"
                min="0"
                max="500"
                value={`${minPrice}`}
                onChange={(e) => {
                  setMinPrice(Number(e.target.value));
                  return maxPrice;
                }}
                className="rounded-l-full "
              />
            </div>
            <div className="relative flex items-center ">
              <div
                className={`absolute pointer-events-none h-[9px] top-0 left-0 bg-black`}
                style={{
                  width: `${width2}%`,
                }}
              ></div>
              <input
                type="range"
                min={`${minPrice}`}
                max="1000"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
                className="rounded-r-full "
              />{" "}
            </div>
          </div>{" "}
          <section className="flex mt-[10px] justify-around">
            <p className="font-bold ">${minPrice}</p>{" "}
            <p className="font-bold ">${maxPrice}</p>
          </section>
          <hr className="bg-gray-400 w-[247px]" />
          {/* colors */}
          <h1 className="font-bold text-[20px]">Colors</h1>
          <section className="flex justify-center items-center flex-col gap-[20px]">
            <div className="flex gap-[15px]">
              <button
                onClick={() => setActiveButton("green")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#00C12B]"
              >
                {activeButton === "green" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("red")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#F50606]"
              >
                {" "}
                {activeButton === "red" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("yellow")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#F5DD06]"
              >
                {activeButton === "yellow" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("orange")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#F57906]"
              >
                {activeButton === "orange" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("cyan")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#06CAF5]"
              >
                {activeButton === "cyan" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
            </div>
            <div className="flex gap-[15px]">
              {" "}
              <button
                onClick={() => setActiveButton("blue")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[blue]"
              >
                {activeButton === "blue" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("purple")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#7D06F5]"
              >
                {activeButton === "purple" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("pink")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#F506A4]"
              >
                {activeButton === "pink" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("white")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#FFFFFF]"
              >
                {activeButton === "white" ? (
                  <FontAwesomeIcon icon={faCheck} />
                ) : null}
              </button>
              <button
                onClick={() => setActiveButton("black")}
                className="w-[37px] h-[37px] rounded-full border-1 cursor-pointer bg-[#000000]"
              >
                {activeButton === "black" ? (
                  <FontAwesomeIcon className="text-white" icon={faCheck} />
                ) : null}
              </button>
            </div>
          </section>
          {/* Size */}
          <hr className="bg-gray-400 w-[247px]" />
          <h1 className="font-bold text-[20px]">Size</h1>
          <section className="flex flex-wrap justify-center gap-[10px] mt-[10px]">
            {[
              "XX-Small",
              "X-Small",
              "Small",
              "Medium",
              "Large",
              "X-Large",
              "XX-Large",
              "3X-Large",
              "4X-Large",
            ].map((size) => (
              <button
                key={size}
                className="px-3 py-1 rounded-full bg-gray-100 text-gray-700 hover:bg-black hover:text-white transition-all"
              >
                {size}
              </button>
            ))}
          </section>
          {/* Dress Style */}
          <hr className="my-[10px]" />
          <h1 className="font-bold text-[20px]">Dress Style</h1>
          <section className="flex flex-col gap-[10px] p-[10px]">
            {["Casual", "Formal", "Party", "Gym"].map((style) => (
              <div
                key={style}
                className="flex justify-between items-center cursor-pointer hover:font-bold transition-all"
              >
                <p>{style}</p>
                <span>{">"}</span>
              </div>
            ))}
          </section>
          {/* Apply Filter Button */}
          <div className="flex justify-center p-[20px]">
            <button
              onClick={() => {
                const filtered = allProducts.filter((product) => {
                  return (
                    product.price >= minPrice &&
                    product.price <= maxPrice &&
                    (activeButton ? product.color === activeButton : true)
                  );
                });

                setFilteredProducts(filtered);
                setPage(1);
              }}
              className="w-full h-[50px] bg-black text-white rounded-full hover:opacity-80 transition-all"
            >
              Apply Filter
            </button>
          </div>
        </div>

        {/* Products! */}
        {isLoading && (
          <p className="text-center text-gray-500">Loading products...</p>
        )}
        {error && (
          <div className="text-center">
            <img alt="Error" className="w-32 mx-auto" />
            <p className="text-red-500">{error.message}</p>
          </div>
        )}
        <div className="flex flex-wrap gap-[20px]">
          {productsToDisplay.length > 0
            ? productsToDisplay.map((el) => (
                <div key={el.id}>
                  {" "}
                  <div
                    onClick={() => navigate(`/ProductDetailPage/${el.id}`)}
                    key={el.id}
                  >
                    <img
                      className="w-[255px] rounded-2xl h-[278px] object-cover cursor-pointer "
                      src={el.avatar}
                      alt="ProductIMG"
                    />
                    <p>{el.product}</p>
                    <p className="text-sm">⭐⭐⭐⭐ {el.rating}</p>
                    <div className="flex gap-[20px]">
                      <h1 className="font-bold text-2xl">${el.price}</h1>{" "}
                      {el.discount > el.price && (
                        <div className="flex gap-[20px]">
                          <h1 className="text-gray-400 text-2xl line-through">
                            ${el.discount}
                          </h1>
                          <h1 className="bg-red-100 text-[20px] text-center rounded-full w-[72px] text-red-400">
                            {Math.round(
                              -1 *
                                (((el.discount - el.price) / el.discount) * 100)
                            )}
                            %
                          </h1>{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))
            : allProducts.map((el) => (
                <div key={el.id}>
                  {" "}
                  <div
                    onClick={() => navigate(`/ProductDetailPage/${el.id}`)}
                    key={el.id}
                  >
                    <img
                      className="w-[255px] rounded-2xl h-[278px] object-cover cursor-pointer "
                      src={el.avatar}
                      alt="ProductIMG"
                    />
                    <p>{el.product}</p>
                    <p className="text-sm">⭐⭐⭐⭐ {el.rating}</p>
                    <div className="flex gap-[20px]">
                      <h1 className="font-bold text-2xl">${el.price}</h1>{" "}
                      {el.discount > el.price && (
                        <div className="flex gap-[20px]">
                          <h1 className="text-gray-400 text-2xl line-through">
                            ${el.discount}
                          </h1>
                          <h1 className="bg-red-100 text-[20px] text-center rounded-full w-[72px] text-red-400">
                            {Math.round(
                              -1 *
                                (((el.discount - el.price) / el.discount) * 100)
                            )}
                            %
                          </h1>{" "}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/* Pagination */}
      <div className="flex justify-center items-center mt-10 gap-2">
        <button
          disabled={page <= 1}
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        >
          ← Previous
        </button>

        {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
          <button
            key={num}
            onClick={() => {
              setPage(num);
            }}
            className={`w-8 h-8 rounded-lg text-sm ${
              page === num ? "bg-gray-200 font-bold" : ""
            }`}
          >
            {num}
          </button>
        ))}

        <button onClick={() => setPage(page + 1)}>Next →</button>
      </div>
      <Footer />
    </div>
  );
}
