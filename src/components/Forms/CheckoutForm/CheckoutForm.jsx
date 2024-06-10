import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";
import "./CheckoutForm.css";
import useAxiosSecure from "@/Hooks/useAxiosSecure";
import { useNavigate } from "react-router-dom";
import { format } from "date-fns";
import toast from "react-hot-toast";

const CheckoutForm = ({ campInfo, user, joinCampData, Back }) => {
  console.log(joinCampData)
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [clientSecret, setClientSecret] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    if (campInfo?.fees && campInfo?.fees > 1) {
      getClientSecret({ price: campInfo?.fees });
    }
  }, [campInfo?.fees]);

  const getClientSecret = async (price) => {
    try {
      const { data } = await axiosSecure.post(`/create-payment-intent`, price);
      setClientSecret(data?.clientSecret);
    } catch (error) {
      console.error("Error fetching client secret:", error);
      toast.error("Error fetching client secret");
    }
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!stripe || !elements) {
      toast.error("Stripe.js has not loaded yet.");
      return;
    }

    const card = elements.getElement(CardElement);
    if (!card) {
      toast.error("CardElement not found.");
      return;
    }

    try {
      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        console.error("[PaymentMethod Error]", error);
        toast.error("Payment method creation failed.");
        return;
      }
     
      const { id: paymentMethodId } = paymentMethod;
      const { data: paymentIntent } = await axiosSecure.post("/payments", {
        ...campInfo,
        participantName: joinCampData?.participantName,
        email: user?.email,
        paymentMethodId,
        amount: campInfo?.fees,
        status: "Paid",
        date: format(new Date(), "PP"),
      });

      if (paymentIntent.error) {
        toast.error(paymentIntent.error.message);
        return;
      }

      toast.success("Payment Successful!");

      // Post join camp data
      const joinCampResponse = await axiosSecure.post(
        "/join-camp",
        {...joinCampData,
          paymentMethodId,
        }
      );
      console.log("Join Camp Response:", joinCampResponse.data);

      if (joinCampResponse.status === 200) {
        toast.success("Joined Camp Successfully!");
        navigate("/dashboard/payment-history");
      } else {
        toast.error("Failed to join camp.");
      }
    } catch (postError) {
      console.error("Error during payment process:", postError);
      toast.error("Error during payment process.");
    }
  };


  return (
    <form onSubmit={handleSubmit} className="my-2 pt-2 max-w-lg">
      <label
        htmlFor="card-element"
        className="block text-sm font-medium text-gray-700"
      >
        Credit or debit card
      </label>
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
          onClick={Back}
        >
          Back
        </button>
        <button
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
