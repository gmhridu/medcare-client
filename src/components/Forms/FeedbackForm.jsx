import React, { Fragment, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Rating } from "@mui/material";
import { Dialog, Transition } from "@headlessui/react";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import { RiLoader3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import useAuth from "@/Hooks/useAuth";
import toast from "react-hot-toast";

const FeedbackForm = ({ camp, onClose, isOpen, setIsOpen }) => {
  const { user, loading } = useAuth();
  const [rating, setRating] = useState(camp.rating || 0);
  const [description, setDescription] = useState(camp.description || "");
  const axiosSecure = useAxiosSecure();
  const queryClient = useQueryClient();

  const rateCampMutation = useMutation({
    mutationFn: async ({ campId, rating, description }) => {
      const { data } = await axiosSecure.patch(`/join-camp/rate/${campId}`, {
        rating,
        description,
      });
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["camps", camp?.participantEmail]);
    },
  });

  const handleRatingSubmit = async (e) => {
    e.preventDefault();
    try {
      await rateCampMutation.mutateAsync({
        campId: camp._id,
        rating,
        description,
      });
      toast.success("Rated Successfully");
      onClose();
    } catch (error) {
      toast.error(error.message);
      console.error("Error submitting rating:", error);
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
                  Rating Us
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
                  <form onSubmit={handleRatingSubmit}>
                    <Rating
                      name="camp-rating"
                      value={rating}
                      defaultChecked={0}
                      onChange={(event, newValue) => setRating(newValue)}
                    />
                    <div className="mt-4">
                      <div className="space-y-1 text-sm">
                        <label
                          htmlFor="description"
                          className="block text-gray-600"
                        >
                          Description
                        </label>

                        <textarea
                          id="description"
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          className="block rounded-md focus:rose-300 w-full h-32 px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9]"
                          name="description"
                        ></textarea>
                      </div>
                    </div>
                    <div className="flex justify-center mt-6">
                      <button
                        type="submit"
                        className={`w-full px-4 py-2 text-white rounded-md focus:outline-none ${
                          loading ? "bg-[#0EA5E9]" : "bg-[#0EA5E9]"
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

export default FeedbackForm;
