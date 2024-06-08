
import { ImageBB } from '@/lib/utils';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import useAuth from '@/Hooks/useAuth';
import { RefreshCcw } from 'lucide-react';

const Signup = () => {
 const [showPassword, setShowPassword] = useState(false);
 const navigate = useNavigate();
 const {
   createUser,
   signInWithGoogle,
   updateUserProfile,
   loading,
   setLoading,
   logOut,
 } = useAuth();

 const handleShowPassword = () => {
   setShowPassword(!showPassword);
 };

 const {
   register,
   handleSubmit,
   formState: { errors },
   reset,
 } = useForm();

 const onSubmit = async (data) => {
   const { name, email, password, image } = data;

   try {
     setLoading(true);

     // 1. Upload image and get image URL
     const imageURL = await ImageBB(image[0]);

     // 2. User Registration
     const result = await createUser(email, password);

     // 3. Save username and photo in firebase
     await updateUserProfile(name, imageURL);
     reset();
     toast.success("Signup successfully");
     logOut()
     navigate("/signin");
   } catch (error) {
     console.log(error?.message);
     toast.error(error?.message);
   } finally {
     setLoading(false);
   }
 };
  
  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
      navigate('/')
      toast.success("Sign In Successfully");
    } catch (error) {
      console.log(err?.message);
    }
  }
  return (
    <section className="bg-gray-50 min-h-screen flex items-center justify-center">
      <div className="bg-gray-100 rounded-2xl shadow-lg max-w-3xl p-5 items-center">
        <div className="px-8 md:px-16 border py-4 rounded-lg">
          <h2 className="font-bold text-2xl text-[#002D74]">Signup</h2>
          <p className="text-xs mt-4 text-[#002D74]">
            Register your account from here
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            <input
              className="p-2 mt-8 rounded-xl border cursor-pointer"
              type="text"
              id="name"
              name="name"
              placeholder="Username"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Username is required!
              </span>
            )}
            <input
              className="p-2 rounded-xl border cursor-pointer"
              type="email"
              id="email"
              name="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Email is required!
              </span>
            )}
            <input
              type="file"
              accept="image/*"
              name="image"
              id="image"
              className="p-2 rounded-xl"
              {...register("image", { required: true })}
            />
            {errors.image && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Image is required!
              </span>
            )}
            <div className="relative cursor-pointer">
              <input
                className="p-2 rounded-xl border w-full"
                type={showPassword ? "text" : "password"}
                name="password"
                id="password"
                placeholder="Password"
                {...register("password", {
                  required: true,
                  minLength: 8,
                  maxLength: 20,
                  pattern:
                    /^(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z]).{8,20}$/,
                })}
              />
              <svg
                onClick={handleShowPassword}
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                fill="gray"
                className="bi bi-eye absolute top-1/2 right-3 -translate-y-1/2"
                viewBox="0 0 16 16"
              >
                <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z" />
                <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z" />
              </svg>
            </div>
            {errors.password?.type === "required" && (
              <p className="text-red-600 text-sm font-semibold pt-1">
                Password is required!
              </p>
            )}
            {errors.password?.type === "minLength" && (
              <p className="text-red-600 text-sm font-semibold pt-1">
                Password must contain at least one uppercase letter, one
                lowercase letter, one number, and one special character
              </p>
            )}
            {errors.password?.type === "maxLength" && (
              <p className="text-red-600 text-sm font-semibold pt-1">
                Password must be less than 20 characters
              </p>
            )}
            {errors.password?.type === "pattern" && (
              <p className="text-red-600 text-sm font-semibold pt-1">
                Password must be less than 20 characters
              </p>
            )}
            <button
              disabled={loading}
              type="submit"
              className="bg-[#002D74] rounded-xl text-white py-2 hover:scale-105 duration-300"
            >
              {loading ? (
                <RefreshCcw className="animate-spin m-auto" />
              ) : (
                "Signup"
              )}
            </button>
          </form>

          <div className="mt-6 grid grid-cols-3 items-center text-gray-400">
            <hr className="border-gray-400" />
            <p className="text-center text-sm">OR</p>
            <hr className="border-gray-400" />
          </div>

          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="bg-white border py-2 w-full rounded-xl mt-5 flex justify-center items-center text-sm hover:scale-105 duration-300 text-[#002D74]"
          >
            <svg
              className="mr-3"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 48 48"
              width="25px"
            >
              <path
                fill="#FFC107"
                d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
              />
              <path
                fill="#FF3D00"
                d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
              />
              <path
                fill="#4CAF50"
                d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
              />
              <path
                fill="#1976D2"
                d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
              />
            </svg>
            Signup with Google
          </button>
          <div className="mt-3 text-xs flex justify-between items-center text-[#002D74]">
            <p>Already have an account?</p>
            <Link
              to={"/signin"}
              className="py-2 px-5 bg-white border rounded-xl hover:scale-110 duration-300m"
            >
              Sign In
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Signup;