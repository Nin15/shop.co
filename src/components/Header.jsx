import React from "react";
import { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useNavigate } from "react-router-dom";
import {
  faCartShopping,
  faUser,
  faChevronDown,
} from "@fortawesome/free-solid-svg-icons";
import useUserStore from "./store";
export default function Header() {
  const token = useUserStore((state) => state.token)
  
  const navigate = useNavigate();
  return (
    <div>
      <header className="h-[40px] flex items-center justify-center gap-[15px]">
        <h1
          className="font-bold text-[32px] cursor-pointer"
          onClick={() => navigate("/")}
        >
          SHOP.CO
        </h1>
        <div className="flex items-center justify-center gap-[10px]">
          <p className="text-[16px] ">
            {" "}
            Shop <FontAwesomeIcon icon={faChevronDown} />
          </p>
          <p className="text-[16px] ">On Sale</p>
          <p className="text-[16px] ">Feedback</p>
          <p className="text-[16px] ">Brand</p>
        </div>

        <input
          type="text"
          className="w-[577px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-[#F0F0F0] border-0 rounded-full"
          placeholder="Search for products..."
        />
        <span className=" flex items-center justify-center gap-[10px]">
          <FontAwesomeIcon
            onClick={() => {
              if (token) {
                navigate("/Cart");
              }
            }}
            icon={faCartShopping}
          />
          <FontAwesomeIcon icon={faUser} />
        </span>
      </header>
    </div>
  );
}
