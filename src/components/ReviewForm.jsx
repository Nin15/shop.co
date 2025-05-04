import { faStar } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useReviewStore from "./OtherStores";

export default function ReviewForm() {
  const [selectedStars, setSelectedStars] = useState([]);
  const setReviewData = useReviewStore((state) => state.setReviewData);
  const reviewData = useReviewStore((state) => state.reviewData);
  const storedProductId = useReviewStore((state) => state.storedProductId);
  const setstoredreview = useReviewStore((state) => state.setstoredreview);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const fullReviewData = {
      ...data,
      name: data.Name,
      productId: storedProductId,
      rating: selectedStars,
      content: data.comment,
    };
    setstoredreview(false)

    const updatedReviewData = [...reviewData, fullReviewData];
    setReviewData(updatedReviewData);

    console.log(reviewData);
  };
  return (
    <div className="relative shadow-md">
      <form
        className="flex absolute shadow-xl/20 bg-white gap-[20px] flex-col border-black border-1 p-[20px] rounded-4xl items-center justify-center"
        onSubmit={handleSubmit(onSubmit)}
      >
        <div></div>
        <div className="flex  flex-col">
          <label className="font-bold " htmlFor="Name">
            Name
          </label>
          <input
            className="w-[350px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-white border-1 rounded-2xl"
            {...register("Name", { required: true })}
            type="text"
            placeholder="Name"
          />
          {errors.Name && (
            <span className="text-[16px] text-red-500  ">
              This field is required
            </span>
          )}{" "}
          <label className="font-bold " htmlFor="cc">
            country/city
          </label>
          <input
            className="w-[350px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-white border-1 rounded-2xl"
            {...register("cc", { required: true })}
            placeholder="country/city"
            type="text"
          />{" "}
          {errors.cc && (
            <span className="text-[16px] text-red-500  ">
              This field is required
            </span>
          )}{" "}
        </div>

        <div className="flex gap-[20px] mr-[100px] flex-col">
          <p>Share your experience in scaling</p>
          <section className="flex  gap-[10px]">
            {[1, 2, 3, 4, 5].map((star) => (
              <FontAwesomeIcon
                key={star}
                onClick={() => setSelectedStars(star)}
                className={
                  star <= selectedStars ? `text-black ` : `text-gray-300 `
                }
                icon={faStar}
              />
            ))}
          </section>
        </div>
        <div className="flex flex-col justify-center">
          <textarea
            type="text"
            placeholder="Add your comments..."
            {...register("comment", { required: true })}
            className="focus:outline-0 border-1  min-h-[150px] p-[20px] text-[16px]   rounded-2xl  w-[350px]  shadow-xl/20 border-gray-400"
          ></textarea>

          {errors.comment && (
            <p className="text-[16px] mr-[70px] text-red-500">
              This field is required!
            </p>
          )}
        </div>
        <section className="ml-[80px] flex gap-[20px]">
          <button
            onClick={() => setstoredreview(false)}
            type="button"
            className="font-bold rounded-2xl cursor-pointer text-black h-[52px] bg-white w-[100px]"
          >
            Cancel
          </button>
          <button
            className="rounded-2xl cursor-pointer text-white h-[52px] bg-black w-[100px]"
            type="submit"
          >
            SUBMIT
          </button>
        </section>
      </form>{" "}
    </div>
  );
}
