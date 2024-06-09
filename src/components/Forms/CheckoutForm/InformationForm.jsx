import React from "react";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { useForm } from "react-hook-form";
import { format } from "date-fns";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { Link } from "react-router-dom";

const InformationForm = ({ campInfo, user, isOpen, closeModal, Next, Back }) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // const onSubmit = async (data) => {
  //   const joinData = {
  //     ...data,
  //     campId: campInfo?._id,
  //     userId: user?.uid,
  //     joinDate: format(new Date(), "PP"),
  //   };

  //   try {
  //     const { data } = await axiosSecure.post("/join-camp", joinData);
  //     return data;
  //   } catch (err) {
  //     console.log(err);
  //   }
  // };

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const submitData = {
          ...data,
          campId: campInfo?._id,
          userId: user?.uid,
          joinDate: format(new Date(), "PP"),
          name: campInfo?.name,
          location: campInfo?.location,
          fees: campInfo?.fees,
          healthcareProfessional: campInfo?.healthcareProfessional,
          participantName: user?.displayName,
          participantEmail: user?.email,
        };
        Next(submitData);
      })}
    >
      <div className="mt-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="space-y-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="name" className="block text-gray-600">
              Camp Name
            </label>
            <input
              className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
              name="name"
              id="name"
              type="text"
              placeholder="Name"
              defaultValue={campInfo?.name}
              {...register("name")}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-1 text-sm">
            <label htmlFor="location" className="block text-gray-600">
              Location
            </label>
            <input
              className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
              name="location"
              id="location"
              type="text"
              placeholder="Location"
              defaultValue={campInfo?.location}
              {...register("location")}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="space-y-4">
          <div className="space-y-1 text-sm">
            <label htmlFor="fees" className="block text-gray-600">
              Fees
            </label>
            <input
              className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
              name="fees"
              id="fees"
              type="number"
              placeholder="Fees"
              defaultValue={campInfo?.fees}
              {...register("fees")}
              readOnly
              disabled
            />
          </div>
          <div className="space-y-1 text-sm">
            <label
              htmlFor="healthcareProfessional"
              className="block text-gray-600"
            >
              Healthcare Professional Name
            </label>
            <input
              className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
              name="healthcareProfessional"
              id="healthcareProfessional"
              type="text"
              placeholder="Professor Name"
              defaultValue={campInfo?.healthcareProfessional}
              {...register("healthcareProfessional")}
              readOnly
              disabled
            />
          </div>
        </div>

        <div className="space-y-4 lg:col-span-2">
          <div className="flex justify-between gap-4">
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="participantName" className="block text-gray-600">
                Participant Name
              </label>
              <input
                className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
                name="participantName"
                id="participantName"
                type="text"
                placeholder="Participant Name"
                defaultValue={user?.displayName}
                {...register("participantName")}
                readOnly
                disabled
              />
            </div>
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="participantEmail" className="block text-gray-600">
                Participant Email
              </label>
              <input
                className="w-full px-4 py-3 text-[#CBCCCF] border border-gray-100 rounded-md bg-[#f2f2f2]"
                name="participantEmail"
                id="participantEmail"
                type="email"
                placeholder="Participant Email"
                defaultValue={user?.email}
                {...register("participantEmail")}
                readOnly
                disabled
              />
            </div>
          </div>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="flex justify-between gap-4">
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="age" className="block text-gray-600">
                Age
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="age"
                id="age"
                type="number"
                placeholder="Your Age"
                {...register("age", { required: true })}
                required
              />
            </div>
            {errors.age && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Age is required!
              </span>
            )}
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="phoneNumber" className="block text-gray-600">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="phoneNumber"
                id="phoneNumber"
                {...register("phoneNumber", {
                  required: true,
                  maxLength: 11,
                })}
                type="number"
                placeholder="Phone Number"
                required
              />
            </div>
            {errors.phoneNumber && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Phone Number is required!
              </span>
            )}
          </div>
        </div>
        <div className="space-y-4 lg:col-span-2">
          <div className="flex justify-between gap-4">
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="gender" className="block text-gray-600">
                Gender
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="gender"
                id="gender"
                type="text"
                placeholder="Male or Female"
                {...register("gender", {
                  required: true,
                })}
                required
              />
            </div>
            {errors.gender && (
              <span className="text-red-600 text-sm font-semibold pt-1">
                Gender is required!
              </span>
            )}
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="emergency" className="block text-gray-600">
                Emergency Contact(Optional)
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="emergency"
                id="emergency"
                type="number"
                placeholder="Emergency Contact"
                {...register("emergency")}
              />
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center my-3">
        <button
          onClick={closeModal}
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
        >
          Back to Camp
        </button>
        <button
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
          type="submit"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default InformationForm;
