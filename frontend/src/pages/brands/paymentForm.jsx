import { useState } from "react";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";

const PaymentForm = ({ plan, yearly }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);
    // Call your backend API to create a Stripe Payment Intent or handle the payment
    try {
      // Here, you should make an API call to your backend to create a Payment Intent
      // and obtain a client secret for the current payment
      const clientSecret = "YOUR_CLIENT_SECRET_FROM_BACKEND";

      const { error, paymentMethod } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: "John Doe", // Replace with the actual name of the user
            email: "john.doe@example.com", // Replace with the actual email of the user
          },
        },
      });

      if (error) {
        // Handle payment failure
        console.error("Payment failed:", error.message);
      } else {
        // Handle payment success
        console.log("Payment succeeded:", paymentMethod);
        // You can redirect the user to a success page or do any other post-payment actions
      }
    } catch (error) {
      console.error("Error processing payment:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white w-[300px] md:w-[400px] rounded-lg p-6 mt-6 md:mt-10 shadow-md">
      <p className="font-bold text-lg md:text-xl mb-4">{plan} Plan</p>
      <CardElement
        options={{
          style: {
            base: {
              fontSize: "16px",
              color: "#000",
              "::placeholder": {
                color: "#a0aec0",
              },
            },
          },
        }}
      />
      <button
        onClick={handlePayment}
        disabled={!stripe || loading}
        className="px-4 py-2 bg-[#10163F] text-white rounded-full mt-4 w-full"
      >
        {loading ? "Processing..." : "Select Plan"}
      </button>
    </div>
  );
};

export default PaymentForm;
