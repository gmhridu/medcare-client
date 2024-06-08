import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { useEffect, useState, forwardRef, useImperativeHandle } from "react";
import useAxiosCommon from "@/Hooks/useAxiosCommon";
import "./CheckoutForm.css";

const CheckoutForm = forwardRef(({ campInfo }, ref) => {
  const stripe = useStripe();
  const elements = useElements();
  const axiosCommon = useAxiosCommon();
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    if (campInfo?.fees && campInfo?.fees > 1) {
      getClientSecret({ price: campInfo?.fees });
    }
  }, [campInfo?.fees]);

  const getClientSecret = async (fees) => {
    const { data } = await axiosCommon.post(`/create-payment-intent`, fees);
    setClientSecret(data?.clientSecret);
  };

  useImperativeHandle(ref, () => ({
    handleStripePayment: async () => {
      if (!stripe || !elements) {
        return { error: { message: "Stripe.js has not loaded yet." } };
      }

      const card = elements.getElement(CardElement);
      if (!card) {
        return { error: { message: "CardElement is not found." } };
      }

      const { error, paymentMethod } = await stripe.createPaymentMethod({
        type: "card",
        card,
      });

      if (error) {
        return { error };
      }

      const { paymentIntent, error: confirmError } =
        await stripe.confirmCardPayment(clientSecret, {
          payment_method: paymentMethod.id,
        });

      if (confirmError) {
        return { error: confirmError };
      }

      return { paymentIntent };
    },
  }));

  return (
    <form className="my-2 pt-2 max-w-lg">
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
    </form>
  );
});

export default CheckoutForm;
