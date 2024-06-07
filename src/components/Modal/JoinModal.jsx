import useAuth from '@/Hooks/useAuth';
import { Dialog, DialogPanel, DialogTitle, Transition, TransitionChild } from '@headlessui/react';
import { Elements } from '@stripe/react-stripe-js';
import { format } from 'date-fns';
import React, { Fragment } from 'react';
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from '../Forms/CheckoutForm/CheckoutForm';



const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

const JoinModal = ({ closeModal, isOpen, campInfo }) => {
  const {user} = useAuth()
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
              <form>
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
                          required
                        />
                      </div>
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
                          type="number"
                          placeholder="Phone Number"
                          required
                        />
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
                          placeholder="Male or Female"
                          required
                        />
                      </div>
                      <div className="space-y-1 text-sm w-1/2">
                        <label
                          htmlFor="emergency"
                          className="block text-gray-600"
                        >
                          Emergency Contact
                        </label>
                        <input
                          className="w-full px-4 py-3 text-gray-800 border border-[#4CBDF8] focus:outline-[#0EA5E9] rounded-md"
                          name="emergency"
                          id="emergency"
                          type="number"
                          placeholder="Emergency Contact"
                          required
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </form>

              <Elements stripe={stripePromise}>
                <CheckoutForm closeModal={closeModal} campInfo={campInfo} />
              </Elements>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </Transition>
);
};

export default JoinModal;