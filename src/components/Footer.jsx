import React, { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

export default function Footer() {
  const [popUp, setPopUp] = useState(false);
  return (
    <div className="w-[100%] flex-col flex justify-center items-center">
      <div className="w-[1000px] z-[0] flex bg-black h-[180px] justify-around items-center rounded-4xl">
        <h1 className="font-bold  text-white text-[40px]">
          STAY UPTO DATE ABOUT <br /> OUR LATEST OFFERS
        </h1>
        <div className="flex flex-col justify-center items-center gap-[20px]">
          <input
            type="text"
            className="w-[349px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-[#F0F0F0] border-0 rounded-full"
            placeholder="Search for products..."
          />
          <div
            onClick={() => {
              setPopUp(true);

              setTimeout(() => {
                setPopUp(false);
              }, 1100);
            }}
            className="w-[349px] h-[48px] px-[20px] py-[10px] cursor-pointer text-[16px] border-0 rounded-full  bg-white"
          >
            Subscribe to Newsletter
          </div>
        </div>{" "}
      </div>{" "}
      <div className="bg-[#F0F0F0] relative mt-[-100px] z-[-1] w-[100%] h-[500px]">
        <AnimatePresence>
          {popUp && (
            <motion.div
              initial={{ opacity: 0, y: 0 }}
              animate={{ opacity: 1, y: -20 }}
              exit={{ opacity: 0, y: 20 }}
              className="bg-green-400 fixed bottom-0 right-5 font-bold text-[17px] flex justify-center z-[1] items-center rounded-full w-[200px] h-[50px] text-white"
            >
              Subscribed ✅
            </motion.div>
          )}{" "}
        </AnimatePresence>
      </div>
    </div>
  );
}
