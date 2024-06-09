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
import React, { Fragment, useRef, useState } from "react";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutForm from "../Forms/CheckoutForm/CheckoutForm";
import { useForm } from "react-hook-form";
import useAxiosCommon from "@/Hooks/useAxiosCommon";
import toast from "react-hot-toast";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import InformationForm from "../Forms/CheckoutForm/InformationForm";


const stripePromise = loadStripe(
  `${import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY}`
);

const JoinModal = ({ closeModal, isOpen, campInfo }) => {
  const { user } = useAuth();
  const [activeStep, setActiveStep] = useState(0);
  const [joinCampData, setJoinCampData] = useState({});

  const handleBackStep = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleNextStep = (data) => {
    console.log(data);
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    setJoinCampData(data);
  };

  const FormRender = () => {
    if (activeStep === 0) {
      return (
        <InformationForm
          Next={handleNextStep}
          Back={handleBackStep}
          campInfo={campInfo}
          user={user}
          closeModal={closeModal}
          isOpen={isOpen}
        />
      )
    }
    else {
      return (
        <Elements stripe={stripePromise}>
          <CheckoutForm
            Next={handleNextStep}
            Back={handleBackStep}
            joinCampData={joinCampData}
            campInfo={campInfo}
            user={user}
            closeModal={closeModal}
          />
        </Elements>

      );
    }
  }
    




  return (
    <>
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
                  <FormRender />
                </DialogPanel>
              </TransitionChild>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default JoinModal;
