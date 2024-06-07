import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";

import "./CheckoutForm.css";
import { useEffect, useState } from "react";
import useAxiosCommon from "@/Hooks/useAxiosCommon";


const CheckoutForm = ({ closeModal, campInfo }) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosCommon = useAxiosCommon();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    // fetch client secret
    if (campInfo?.fees && campInfo?.fees > 1) {
      getClientSecret({ price: campInfo?.fees });
    }
  }, [campInfo?.fees]);

  // get clientSecret
  const getClientSecret = async (fees) => {
    const { data } = await axiosCommon.post(`/create-payment-intent`, fees);
    console.log(data);
    setClientSecret(data?.clientSecret);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!stripe || !elements) {
      return;
    }

    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="my-2 pt-2 max-w-lg">
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#424770",
              "::placeholder": {
                color: "#aab7c4",
              },
            },
            invalid: {
              color: "#9e2146",
            },
          },
        }}
      />
      <div className="flex mt-2 justify-around">
        <button
          type="button"
          className="inline-flex justify-center rounded-md border border-transparent bg-red-100 px-4 py-2 text-sm font-medium text-red-900 hover:bg-red-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2"
          onClick={closeModal}
        >
          Cancel
        </button>
        <button
          disabled={!stripe}
          type="submit"
          className="inline-flex justify-center rounded-md border border-transparent bg-green-100 px-4 py-2 text-sm font-medium text-green-900 hover:bg-green-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-green-500 focus-visible:ring-offset-2"
        >
          Pay ${campInfo?.fees}
        </button>
      </div>
    </form>
  );
};

export default CheckoutForm;
