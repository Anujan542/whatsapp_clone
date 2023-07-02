import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { PulseLoader } from "react-spinners";

import { signUpSchema } from "../../utils/validations";
import AuthInput from "./AuthInput";
import { changeStatus, registerUser } from "../../features/userSlice";
import Picture from "./Picture";
import axios from "axios";

const RegisterForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [picture, setPicture] = useState("");
  const [readablePicture, setReadablePicture] = useState("");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(signUpSchema),
  });

  const onsubmit = async (data) => {
    dispatch(changeStatus("loading"));
    if (picture) {
      // upload cloudinary
      await uploadPicture().then(async (url) => {
        let res = await dispatch(
          registerUser({ ...data, picture: url.secure_url })
        );
        if (res?.payload?.user) {
          navigate("/");
        }
      });
    } else {
      let res = await dispatch(registerUser({ ...data, picture: "" }));
      if (res?.payload?.user) {
        navigate("/");
      }
    }
  };

  const uploadPicture = async () => {
    const formData = new FormData();
    formData.append("upload_preset", process.env.REACT_APP_CLOUD_SECRET);
    formData.append("file", picture);

    const { data } = await axios.post(
      `https://api.cloudinary.com/v1_1/anujan/image/upload`,
      // config,
      formData
    );
    return data;
  };

  const { user } = useSelector((state) => ({ ...state }));
  console.log(user.status);
  return (
    <div className="min-h-screen w-full flex items-center justify-center overflow-hidden">
      {/* container */}
      <div className="w-full max-w-md space-y-8 p-10 dark:bg-dark_bg_2 rounded-xl">
        {/* heading */}
        <div className="text-center dark:text-dark_text_1">
          <h2 className="mt-6 text-3xl font-bold">Welcome</h2>
          <p className="mt-2 text-sm">Sign Up</p>
        </div>
        {/* forom */}
        <form onSubmit={handleSubmit(onsubmit)} className="mt-6 space-y-6">
          <AuthInput
            name="name"
            type="text"
            placeholder="Name"
            register={register}
            error={errors?.name?.message}
          />
          <AuthInput
            name="email"
            type="email"
            placeholder="Email Address"
            register={register}
            error={errors?.email?.message}
          />
          <AuthInput
            name="status"
            type="text"
            placeholder="Status (Optional)"
            register={register}
            error={errors?.status?.message}
          />
          <AuthInput
            name="password"
            type="password"
            placeholder="Password"
            register={register}
            error={errors?.password?.message}
          />
          {/* picture */}
          <Picture
            readablePicture={readablePicture}
            setPicture={setPicture}
            setReadablePicture={setReadablePicture}
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
              "Signup"
            )}
          </button>
          <p className="flex flex-col items-center justify-center mt-10 text-center text-md dark:text-dark_text_1">
            <span>have an account?</span>
            <Link
              to="/login"
              className="hover:underline cursor-pointer transition ease duration-300"
            >
              Sign in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterForm;
