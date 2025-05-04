import React from "react";
import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
export default function Review() {
  const [property, setProperty] = useState(0);
  async function Fetching({}) {
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
    isLoading,
    error,
  } = useQuery({
    queryKey: ["feedback"],
    queryFn: Fetching,
  });
  const shortFeedback = feedback.filter((el) => el.content.length < 100);
  const maxProperty = ((shortFeedback.length - 3.5) * 320) / 2 + 100;


  return (
    <div className="flex flex-col">
      {isLoading && (
        <p className="text-center text-gray-500">Loading reviews...</p>
      )}
      {error && (
        <div className="text-center">
          <p className="text-red-500">{error.message}</p>
        </div>
      )}
      <button
        onClick={() => {
          if (property < maxProperty) {
            setProperty(property + 320);
          }
        }}
      >
        🡨
      </button>{" "}
      <button
        className=""
        onClick={() => {
          if (property > -maxProperty) {
            setProperty(property - 320);
          }
        }}
      >
        ➜
      </button>
      <div className="flex gap-[20px] w-[100%]">
        {shortFeedback.map((el) => (
          <motion.div
            key={el.id}
            initial={{ opacity: 1, x: 0 }}
            animate={{ opacity: 1, x: property }}
            className={`block border-1 rounded-[10px] border-gray-400 py-2 px-2 w-[300px] h-[240px] m-0`}
          >
            <p>⭐⭐⭐⭐⭐</p>
            <h1 className="font-bold text-[20px]">{el.name}</h1>
            <div>{el.content}</div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
