import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";

import { signInSchema } from "../../utils/validations";
import AuthInput from "./AuthInput";
import { PulseLoader } from "react-spinners";
import { loginUser } from "../../features/userSlice";

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { user } = useSelector((state) => ({ ...state }));

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signInSchema),
  });

  const onsubmit = async (data) => {
    let res = await dispatch(loginUser(data));
    if (res?.payload?.user) {
      navigate("/");
    }
  };

  return (
    <div className="h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome back</h2>
          <p className="mt-2 text-sm">Sign In</p>
        </div>
        {/* forom */}
        <form onSubmit={handleSubmit(onsubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />

          {/* error */}
          {user?.error ? (
            <div>
              <p className="text-red-600">{user?.error}</p>
            </div>
          ) : null}
          <button
            className="w-full flex justify-center bg-green_1 text-gray-100 p-4 rounded-full tracking-wide 
            font-semibold focus:outline-none hover:bg-green_2 shadow-lg cursor-pointer transition ease-in duration-75"
            type="submit"
          >
            {user?.status === "loading" ? (
              <PulseLoader color="#ffff" size={16} />
            ) : (
              "Log In"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>Doesn't have an account?</span>
            <Link
              to="/register"
              className="hover:underline cursor-pointer transition ease duration-300"
            >
              Register
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginForm;
