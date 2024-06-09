import useAuth from "@/Hooks/useAuth";
import {
  Dialog,
  DialogPanel,
  DialogTitle,
  Transition,
  TransitionChild,
} from "@headlessui/react";
import { Elements } from "@stripe/react-stripe-js";
import { format } from "date-fns";
import React, { Fragment, useRef } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Forms/CheckoutForm/CheckoutForm";
import { useForm } from "react-hook-form";
import useAxiosCommon from "@/Hooks/useAxiosCommon";
import toast from "react-hot-toast";

const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

const JoinModal = ({ closeModal, isOpen, campInfo }) => {
  const axiosCommon = useAxiosCommon();
  const { user } = useAuth();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const checkoutFormRef = useRef(null);

  const onSubmit = async (data) => {
    const joinData = {
      ...data,
      campId: campInfo?._id,
      userId: user?.uid,
      joinDate: format(new Date(), "PP"),
    };

    try {
      const { data } = await axiosCommon.post("/join-camp", joinData);
      if (data?.success) {
        toast.success("Joined Camp Successfully!");

        if (checkoutFormRef.current) {
          const stripeResponse =
            await checkoutFormRef.current.handleStripePayment();
          if (stripeResponse.error) {
            toast.error("Payment failed: " + stripeResponse.error.message);
          } else {
            toast.success("Payment successful!");
            reset(); 
            closeModal(); 
          }
        }
      } else {
        console.log('Something is wrong');
      }
    } catch (error) {
      console.error(error);
    }
  };



  return (
    <Transition appear show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={closeModal}>
        <TransitionChild
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-black bg-opacity-25" />
        </TransitionChild>

        <div className="fixed inset-0 overflow-y-auto">
          <div className="flex min-h-full items-center justify-center p-4 text-center">
            <TransitionChild
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <DialogPanel className="w-full max-w-xl transform overflow-hidden rounded-2xl bg-white p-6 text-left align-middle shadow-xl transition-all">
                <DialogTitle
                  as="h3"
                  className="text-lg font-medium text-center leading-6 text-gray-900"
                >
                  Review Info Before Join Camping
                </DialogTitle>
                <form onSubmit={handleSubmit(onSubmit)}>
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
                        <label
                          htmlFor="location"
                          className="block text-gray-600"
                        >
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
                          {...register("payment")}
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
                          <label
                            htmlFor="participantName"
                            className="block text-gray-600"
                          >
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
                          <label
                            htmlFor="participantEmail"
                            className="block text-gray-600"
                          >
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
                          <label
                            htmlFor="phoneNumber"
                            className="block text-gray-600"
                          >
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
                          <label
                            htmlFor="gender"
                            className="block text-gray-600"
                          >
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
                          <label
                            htmlFor="emergency"
                            className="block text-gray-600"
                          >
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
                  <Elements stripe={stripePromise}>
                    <CheckoutForm ref={checkoutFormRef} campInfo={campInfo} />
                  </Elements>
                  <div className="flex mt-2 justify-around">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
                      onClick={closeModal}
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
                    >
                      Pay ${campInfo?.fees}
                    </button>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default JoinModal;
