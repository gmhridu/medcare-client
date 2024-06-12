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

const InformationForm = ({
  campInfo,
  user,
  isOpen,
  closeModal,
  Next,
  Back,
}) => {
  const axiosSecure = useAxiosSecure();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  return (
    <form
      onSubmit={handleSubmit((data) => {
        const submitData = {
          ...data,
          campId: campInfo?._id,
          userId: user?.uid,
          email: user?.email,
          joinDate: format(new Date(), "PP"),
          name: campInfo?.name,
          location: campInfo?.location,
          fees: campInfo?.fees,
          healthcareProfessional: campInfo?.healthcareProfessional,
          participantName: user?.displayName,
          participantEmail: user?.email,
          status: "pending",
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
              />
              {errors.age && (
                <span className="text-red-600">Age is required</span>
              )}
            </div>
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="phoneNumber" className="block text-gray-600">
                Phone Number
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="phoneNumber"
                id="phoneNumber"
                type="text"
                placeholder="Phone Number"
                {...register("phoneNumber", { required: true })}
              />
              {errors.phoneNumber && (
                <span className="text-red-600">Phone Number is required</span>
              )}
            </div>
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
                placeholder="Your Gender"
                {...register("gender", { required: true })}
              />
              {errors.gender && (
                <span className="text-red-600">Gender is required</span>
              )}
            </div>
            <div className="space-y-1 text-sm w-1/2">
              <label htmlFor="emergencyContact" className="block text-gray-600">
                Emergency Contact
              </label>
              <input
                className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                name="emergencyContact"
                id="emergencyContact"
                type="text"
                placeholder="Emergency Contact"
                {...register("emergencyContact", { required: true })}
              />
              {errors.emergencyContact && (
                <span className="text-red-600">
                  Emergency Contact is required
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-4">
        <button
          type="button"
          className="px-4 py-2 mr-4 text-sm font-medium text-gray-600 bg-gray-200 rounded-md hover:bg-gray-300"
          onClick={Back}
        >
          Back
        </button>
        <button
          type="submit"
          className="px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-md hover:bg-blue-600"
        >
          Next
        </button>
      </div>
    </form>
  );
};

export default InformationForm;
