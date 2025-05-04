import { useParams } from "react-router";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllProduct from "../components/AllProduct";
import { useQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { motion } from "framer-motion";
import ReviewForm from "../components/ReviewForm";
import useReviewStore from "../components/OtherStores";

export default function ProductDetailPage() {
  const { productId } = useParams();
  const [tick, setTick] = useState(false);
  const [tick1, setTick1] = useState(false);
  const [tick2, setTick2] = useState(false);
  const [count, setCount] = useState(1);
  const [activeTab, setActiveTab] = useState("details");
  const [activeButton, setActiveButton] = useState(null);
  const setStoredProductId = useReviewStore(
    (state) => state.setStoredProductId
  );

  const storedreview = useReviewStore((state) => state.storedreview);
  const setstoredreview = useReviewStore((state) => state.setstoredreview);

  const reviewData = useReviewStore((state) => state.reviewData);
  async function FetchingFeedback({}) {
    const url = new URL("https://680f9e9e67c5abddd1960608.mockapi.io/feedback");

    return fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  }
  const {
    data: feedback = [],
    isLoading: isFeedbackLoading,
    error: feedbackError,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: FetchingFeedback,
  });
  const shortFeedback = feedback.filter((el) => el.content.length < 100);

  async function Fetching(productId) {
    const url = new URL(
      `https://680f9e9e67c5abddd1960608.mockapi.io/product/${productId}`
    );
    return fetch(url, {
      method: "GET",
      headers: { "content-type": "application/json" },
    }).then((res) => {
      return res.json();
    });
  }

  const {
    data: product = {},
    isLoading: isProductsLoading,
    error: isProductsError,
  } = useQuery({
    queryKey: ["products", productId],
    queryFn: () => Fetching(productId),
  });

  useEffect(() => {
    setStoredProductId(productId);
  }, [productId]);

  const updatedFeedback =
    reviewData.length > 0 ? [...shortFeedback, ...reviewData] : shortFeedback;

  const filteredFeedback = updatedFeedback.filter(
    (el) => el.productId === productId
  );
  return (
    <div className="flex flex-col gap-[40px] justify-center py px items-center">
      {" "}
      <div className="mt-[40px]">
        {" "}
        <Header />
      </div>
      {isProductsError && <div>Error loading products!</div>}
      {isProductsLoading && <div className="text-gray-400">Loading...</div>}
      {isProductsLoading && (
        <div className="text-gray-400">Error loading Product!</div>
      )}
      {product && (
        <div className="flex gap-[20px] justify-center items-center">
          <div className="flex gap-[20px] ">
            <section className="flex flex-col gap-[20px]">
              {" "}
              <img src="/image 2.png" alt="" />
              <img src="/image 5.png" alt="" />
              <img src="/image 6.png" alt="" />{" "}
            </section>{" "}
            <img className="" src="/image 1.png" alt="" />
          </div>
          <section className="flex flex-col justify-center  gap-[20px]">
            <h1 className="font-bold text-[40px]">{product.product}</h1>
            <p className=" text-2xl">⭐⭐⭐⭐⭐ {product.rating}/5</p>
            <section className="flex gap-[20px]">
              <h1 className="font-bold text-2xl">${product.price}</h1>{" "}
              {product.discount > product.price && (
                <section className="flex gap-[20px]">
                  {" "}
                  <h1 className="text-gray-400 text-2xl line-through">
                    ${product.discount}
                  </h1>
                  <h1 className="bg-red-100 text-[20px] text-center rounded-full w-[72px] text-red-400">
                    {Math.round(
                      -1 *
                        (((product.discount - product.price) /
                          product.discount) *
                          100)
                    )}
                    %
                  </h1>
                </section>
              )}
            </section>{" "}
            <p className="text-gray-400">{product.description}</p>
            <hr className="w-[550px] border-gray-300" />
            <p className="text-gray-400">Select Colors</p>
            <section className="flex gap-[20px]">
              {" "}
              <button
                onClick={() => {
                  setTick1(true);
                  setTick2(false);
                  setTick(false);
                }}
                className="rounded-full w-[37px] cursor-pointer h-[37px] bg-[#4F4631]"
              >
                {" "}
                {tick1 && (
                  <p>
                    <FontAwesomeIcon className="text-white" icon={faCheck} />
                  </p>
                )}
              </button>
              <button
                onClick={() => {
                  setTick2(true);
                  setTick1(false);
                  setTick(false);
                }}
                className="rounded-full w-[37px] cursor-pointer h-[37px] bg-[#314F4A]"
              >
                {tick2 && (
                  <p>
                    <FontAwesomeIcon className="text-white" icon={faCheck} />
                  </p>
                )}
              </button>
              <button
                onClick={() => {
                  setTick(true);
                  setTick2(false);
                  setTick1(false);
                }}
                className="rounded-full w-[37px] cursor-pointer h-[37px] bg-[#31344F]"
              >
                {" "}
                {tick && (
                  <p>
                    <FontAwesomeIcon className="text-white" icon={faCheck} />
                  </p>
                )}
              </button>
            </section>
            <hr className="w-[550px] border-gray-300" />
            <p className="text-gray-400">Choose Size</p>
            <section className=" w-[420px] gap-[12px] h-[46px] rounded-full">
              <button
                className={
                  activeButton === "small"
                    ? "bg-black w-[86px] cursor-pointer text-white h-[46px] rounded-full"
                    : "w-[86px] cursor-pointer h-[46px] rounded-full bg-[#F0F0F0]"
                }
                onClick={() => setActiveButton("small")}
              >
                Small
              </button>{" "}
              <button
                className={
                  activeButton === "Medium"
                    ? "bg-black w-[86px] cursor-pointer text-white h-[46px] rounded-full"
                    : "w-[86px] cursor-pointer h-[46px] rounded-full bg-[#F0F0F0]"
                }
                onClick={() => setActiveButton("Medium")}
              >
                Medium
              </button>
              <button
                className={
                  activeButton === "Large"
                    ? "bg-black w-[86px] cursor-pointer text-white h-[46px] rounded-full"
                    : "w-[86px] cursor-pointer h-[46px] rounded-full bg-[#F0F0F0]"
                }
                onClick={() => setActiveButton("Large")}
              >
                Large
              </button>
              <button
                className={
                  activeButton === "X-Large"
                    ? "bg-black w-[86px] cursor-pointer text-white h-[46px] rounded-full"
                    : "w-[86px] cursor-pointer h-[46px] rounded-full bg-[#F0F0F0]"
                }
                onClick={() => setActiveButton("X-Large")}
              >
                X-Large
              </button>
            </section>
            <hr className="w-[550px] border-gray-300" />
            <section className="flex gap-[20px]">
              <section className="w-[170px] flex justify-around items-baseline text-[20px] py px h-[52px] rounded-full bg-[#F0F0F0]">
                <button
                  className="text-[30px] cursor-pointer "
                  onClick={() =>
                    count > 1 ? setCount(count - 1) : setCount(count)
                  }
                >
                  -
                </button>
                {count}
                <button
                  className="text-[30px] cursor-pointer "
                  onClick={() => setCount(count + 1)}
                >
                  +
                </button>
              </section>
              <button className="w-[300px] h-[52px] cursor-pointer rounded-full text-white bg-black">
                Add To Cart
              </button>
            </section>
          </section>
        </div>
      )}
      <section className="flex flex-col relative gap-[10px]">
        <section className=" w-[1050px] flex justify-around items-baseline">
          <p onClick={() => setActiveTab("details")}>Product Details</p>
          <p onClick={() => setActiveTab("reviews")}>Rating & Reviews</p>
          <p onClick={() => setActiveTab("faq")}>FAQs</p>
        </section>
        <hr className="w-[1050px] border-gray-300" />
        <motion.div
          layout
          transition={{
            type: "tween",
            stiffness: 500,
            damping: 30,
            duration: 0.2,
          }}
          className="absolute w-[350px] h-[2px] bg-black mt-[35px]"
          style={{
            left:
              activeTab === "details"
                ? "0"
                : activeTab === "reviews"
                ? "380px"
                : activeTab === "faq"
                ? "760px"
                : "0",
          }}
        />
      </section>
      {isFeedbackLoading && <p>Loading...</p>}
      {feedbackError && <p>Error loading feedback!</p>}
      <section className="flex w-[100%] justify-around items-center">
        {" "}
        <h1 className="font-bold text-[30px]">
          All Reviews{" "}
          <span className="text-[14px]">({filteredFeedback.length})</span>
        </h1>
        <button
          onClick={() => setstoredreview(true)}
          className="w-[300px] h-[52px] cursor-pointer rounded-full text-white bg-black"
        >
          Write A Review
        </button>
      </section>
      {storedreview && (
        <div>
          <ReviewForm />
        </div>
      )}
      {filteredFeedback && (
        <div className="px py w-[1100px]  gap-[20px] flex flex-wrap justify-center items-center">
          {filteredFeedback.map((el) => (
            <div
              key={el.id}
              className={`block border-1 rounded-[10px] border-gray-400 py-2 px-2 w-[500px] h-[240px] m-0`}
            >
              {el.rating ? (
                <p> {"⭐".repeat(el.rating)} </p>
              ) : (
                <p>⭐⭐⭐⭐⭐</p>
              )}
              <h1 className="font-bold text-[20px]">{el.name}</h1>
              <div>{el.content}</div>
            </div>
          ))}
        </div>
      )}
      <h1 className=" text-[40px] font-bold">You might also like</h1>
      <AllProduct />
      <Footer />
    </div>
  );
}
