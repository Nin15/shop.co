import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faApple } from "@fortawesome/free-brands-svg-icons";
import useUserStore from "../components/Store";

export default function SignIn() {
  const [Error, setError] = useState(false);
  const setToken = useUserStore((state) => state.setToken);
  const setUserInfo = useUserStore((state) => state.setUserInfo);

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    const savedData = JSON.parse(localStorage.getItem("userData"));
    if (
      !savedData ||
      savedData.state.userInfo.email !== data.email ||
      savedData.state.userInfo.password !== data.password
    ) {
      setError(true);

      return;
    } else {
      const freshToken =
        Math.random().toString(36).substring(2) + Date.now().toString(36);
      setToken(freshToken);
      setUserInfo(savedData.state.userInfo);
      navigate("/");
    }
  };
  return (
    <div className="w-[100%] gap-[40px] flex flex-col items-center justify-center ">
      {" "}
      <div className="w-[100%] gap-[40px] flex flex-col items-center justify-center ">
        <section className="mt-[20px]">
          {" "}
          <Header />
        </section>
        <section>
          <h1 className="font-bold text-[30px]">Welcome Back</h1>
          <p>
            Don’t have an account?{" "}
            <span
              className="cursor-pointer "
              onClick={() => {
                navigate("/Sign-up");
              }}
            >
              Sign Up
            </span>
          </p>
        </section>
        <form
          className="flex gap-[20px] flex-col items-center justify-center"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex flex-col">
            <input
              className="w-[450px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-white border-1 rounded-2xl"
              {...register("email", { required: true })}
              type="email"
              placeholder="Email"
            />
            {errors.email && (
              <span className="text-[16px] text-red-500  ">
                This field is required
              </span>
            )}
          </div>
          <div className="flex flex-col">
            <input
              className="w-[450px] h-[48px] placeholder:text-[16px] px-[20px] py-0 text-[16px] focus:outline-none bg-white border-1 rounded-2xl"
              {...register("password", { required: true })}
              placeholder="Password"
              type="password"
            />{" "}
            {errors.password && (
              <span className="text-[16px] text-red-500  ">
                This field is required
              </span>
            )}{" "}
            {Error && (
              <span className="text-[16px] text-red-500  ">
                Email or Password Incorrect
              </span>
            )}
          </div>

          <button
            className="rounded-2xl cursor-pointer text-white h-[52px] bg-black w-[450px]"
            type="submit"
          >
            Sign in
          </button>
        </form>{" "}
        <section className="flex justify-center gap-[5px] items-center ">
          <hr className="w-[205px] border-solid" /> <p>or</p>{" "}
          <hr className="w-[205px] border-solid" />
        </section>
        <section className="flex flex-col gap-[10px]">
          <button className="w-[450px] h-[48px] text-[16px] bg-white border-1 rounded-1.5xl">
            <FontAwesomeIcon icon={faGoogle} /> Continue With Google
          </button>
          <button className="w-[450px] h-[48px] text-[16px] bg-white  border-1 rounded-1.5xl">
            <FontAwesomeIcon icon={faApple} /> Continue with Apple
          </button>
        </section>
        <Footer />
      </div>
    </div>
  );
}
