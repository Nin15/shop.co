import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";
import "../App.css";
import Header from "../components/Header";
import { motion } from "framer-motion";
import Product from "../components/AllProduct";
import SortedProducts from "../components/SortedProducts";
import Review from "../components/Review";
import { useEffect, useState } from "react";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";

export default function Homepage() {
  const navigate = useNavigate();
  return (
    <div className=" w-[100%] flex-col  flex items-center justify-center ">
      {" "}
      <div className="w-[100%] flex-col flex items-center justify-center gap-[34px]">
        <div className="flex justify-center items-center text-center h-[38px] w-[100%] bg-black text-white text-[14px]">
          Sign up and get 20% off to your first order.{" "}
          <span
            onClick={() => navigate("Sign-up")}
            className="cursor-pointer underline"
          >
            Sign Up Now
          </span>
          <FontAwesomeIcon className="absolute right-[40px] " icon={faXmark} />
        </div>
        <Header />
        <img src="/Rectangle 2.png" alt="sakjdsahd" />
        <div className="absolute flex flex-col gap-[10px] top-[237px] left-[100px]">
          <h1 className=" leading-none text-[64px]  font-bold ">
            FIND CLOTHES <br />
            THAT MATCHES <br />
            YOUR STYLE
          </h1>
          <p className="text-[16px]">
            Browse through our diverse range of meticulously crafted garments,
            designed <br /> to bring out your individuality and cater to your
            sense of style.
          </p>
          <button className="rounded-full text-white h-[52px] bg-black w-[210px]">
            Shop Now
          </button>
          <div className="flex gap-2">
            <span>
              <h1 className="text-[40px]">200+</h1>
              <p className="text-[16px] "> International Brands</p>
            </span>
            <span>
              <h1 className="text-[40px]">2,000+</h1>
              <p className="text-[16px] ">High-Quality Products </p>
            </span>
            <span>
              <h1 className="text-[40px] ">30,000+</h1>
              <p className="text-[16px]">Happy Customers</p>
            </span>
          </div>
        </div>
      </div>
      <div className="flex bg-black h-[70px] items-center justify-center  gap-15 w-[100%]">
        <motion.div
          className="flex items-center justify-center  gap-15 w-[100%]"
          initial={{ opacity: 0.5, x: -240 }}
          whileInView={{ opacity: 1, x: 0, transition: { duration: 0.5 } }}
        >
          <img className="w-[180px] h-[50px]" src="/Group (1).png" alt="" />
          <img className="w-[150px] h-[50px]" src="Vector (1).png" alt="" />
          <img
            className="w-[150px] h-[50px]"
            src="/gucci-logo-1 1.png"
            alt=""
          />
          <img
            className="w-[150px] h-[50px]"
            src="/prada-logo-1 1.png"
            alt=""
          />
          <img className="w-[250px] h-[50px] " src="/Group.png" alt="" />
        </motion.div>
        {/* Products */}
      </div>
      <div className="flex flex-col items-center w-full gap-10 mt-12">
        <h1 className="text-[50px] font-bold">New Arrivals</h1>
        <div>
          <Product />
        </div>
        <button
          onClick={() => navigate("/Category-Page")}
          className="bg-white  border-gray-400 cursor-pointer rounded-full border-[1px] h-[52px] w-[218px]"
        >
          View All
        </button>
        <hr className="mt-[10px] bg-gray-400 w-[100%]" />
        <h1 className="text-[50px] font-bold">Top Selling</h1>
        <div>
          {" "}
          <SortedProducts />
        </div>
        <button
          onClick={() => navigate("/Category-Page")}
          className="bg-white  border-gray-400 cursor-pointer rounded-full border-[1px] h-[52px] w-[218px]"
        >
          View All
        </button>{" "}
        {/* Browsing by the dress style */}
        <div className="w-[100%] flex  justify-center items-center">
          <div className="bg-[#F0F0F0] justify-center items-center flex-wrap flex w-[1139px] h-[766px] rounded-[40px]">
            <h1 className="text-[40px] font-bold ">BROWSE BY DRESS STYLE</h1>
            <div className="justify-center items-center  w-[100%] gap-[20px] flex-wrap flex ">
              <img
                className="cursor-pointer transition-transform h-[289px] hover:scale-[1.033] duration-150 "
                src="Frame 61.png"
                alt="Frame61"
              />
              <img
                className=" cursor-pointer transition-transform h-[289px] hover:scale-[1.033] duration-150  "
                src="Frame 62.png"
                alt="Frame62"
              />{" "}
              <img
                className=" cursor-pointer transition-transform h-[289px] hover:scale-[1.033] duration-150  "
                src="Frame 64.png"
                alt="Frame64"
              />
              <img
                className=" cursor-pointer transition-transform h-[289px] hover:scale-[1.033] duration-150  "
                src="Frame 63.png"
                alt="Frame63"
              />
            </div>
          </div>
        </div>{" "}
        <h1 className="text-[40px] ml-[-700px] font-bold ">
          Our Happy Customers
        </h1>
        <Review />
        <Footer />
      </div>
    </div>
  );
}
