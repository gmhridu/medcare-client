import React, { Fragment, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { RiLoader3Fill } from "react-icons/ri";
import { Dialog, Transition } from "@headlessui/react";
import { RxCross2 } from "react-icons/rx";
import toast from "react-hot-toast";
import { useMutation } from "@tanstack/react-query";
import useAxiosSecure from "@/Hooks/useAxiosSecure";

import { format } from "date-fns";
import { categories } from "../CategoryBox/CategoryData";

const UpdateCampModal = ({ isOpen, setIsOpen, selectedCamp, onUpdate }) => {
  const axiosSecure = useAxiosSecure();
  const { register, handleSubmit, setValue } = useForm();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedCamp) {
      setValue("name", selectedCamp.name);
      setValue("location", selectedCamp.location);
      setValue("fees", selectedCamp.fees);
      setValue("healthcareProfessional", selectedCamp.healthcareProfessional);
      setValue("dateTime", format(new Date(selectedCamp?.dateTime), "PP"));
      setValue("category", selectedCamp.category); 
      setValue("rating", selectedCamp.rating); 
      setValue("description", selectedCamp.description); 
    }
  }, [selectedCamp, setValue]);

  const { mutateAsync } = useMutation({
    mutationFn: async (data) => {
      await axiosSecure.put(`/camp/update/${selectedCamp?._id}`, data);
    },
    onSuccess: () => {
      toast.success("Camp updated successfully");
      setIsOpen(false);
      onUpdate();
    },
    onError: (error) => {
      console.error(error);
      toast.error("Failed to update camp");
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      await mutateAsync(data);
    } catch (error) {
      console.error(error);
      toast.error("Failed to update camp");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog
        as="div"
        className="relative z-10"
        onClose={() => setIsOpen(false)}
      >
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </Transition.Child>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex items-center justify-center min-h-full p-4 text-center">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <Dialog.Panel className="w-full max-w-3xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <Dialog.Title
                  as="h3"
                  className="flex justify-between text-lg font-medium leading-6 text-gray-900"
                >
                  Update Camp
                </Dialog.Title>
                <div
                  className="relative cursor-pointer -top-6"
                  onClick={() => setIsOpen(false)}
                >
                  <div className="flex items-end justify-end">
                    <RxCross2 className="text-2xl" />
                  </div>
                </div>
                <div className="mt-2">
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
                      <div className="space-y-6">
                        <div className="space-y-1 text-sm">
                          <label htmlFor="name" className="block text-gray-600">
                            Name
                          </label>
                          <input
                            {...register("name", { required: true })}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                            name="name"
                            id="name"
                            type="text"
                            placeholder="Name"
                            required
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="category"
                            className="block text-gray-600"
                          >
                            Category
                          </label>
                          <select
                            {...register("category", { required: true })}
                            className="w-full px-4 py-3 border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                            name="category"
                            required
                          >
                            {categories?.map((category) => (
                              <option
                                value={category.label}
                                key={category.label}
                              >
                                {category.title}
                              </option>
                            ))}
                          </select>
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="location"
                            className="block text-gray-600"
                          >
                            Location
                          </label>
                          <input
                            {...register("location", { required: true })}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                            name="location"
                            id="location"
                            type="text"
                            placeholder="Location"
                            required
                          />
                        </div>
                      </div>

                      <div className="space-y-6">
                        <div className="flex justify-between gap-2">
                          <div className="space-y-1 text-sm">
                            <label
                              htmlFor="fees"
                              className="block text-gray-600"
                            >
                              Fees
                            </label>
                            <input
                              {...register("fees", { required: true })}
                              className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                              name="fees"
                              id="fees"
                              type="number"
                              placeholder="Fees"
                              required
                            />
                          </div>

                          <div className="space-y-1 text-sm">
                            <label
                              htmlFor="healthcareProfessional"
                              className="block text-gray-600"
                            >
                              Healthcare Professional
                            </label>
                            <input
                              {...register("healthcareProfessional", {
                                required: true,
                              })}
                              className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                              name="healthcareProfessional"
                              id="healthcareProfessional"
                              type="text"
                              placeholder="Healthcare Professional"
                              required
                            />
                          </div>
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="rating"
                            className="block text-gray-600"
                          >
                            Rating
                          </label>
                          <input
                            {...register("rating")}
                            className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                            name="rating"
                            id="rating"
                            type="number"
                            placeholder="4.5"
                            step="0.1"
                            min="0"
                            max="5"
                          />
                        </div>

                        <div className="space-y-1 text-sm">
                          <label
                            htmlFor="description"
                            className="block text-gray-600"
                          >
                            Description
                          </label>
                          <textarea
                            {...register("description")}
                            className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9]"
                            name="description"
                            id="description"
                          ></textarea>
                        </div>
                      </div>
                    </div>

                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${
                          loading ? "bg-[#0e4058]" : "bg-[#0EA5E9]"
                        }`}
                        disabled={loading}
                      >
                        {loading ? (
                          <RiLoader3Fill className="animate-spin m-auto" />
                        ) : (
                          "Update Camp"
                        )}
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default UpdateCampModal;
