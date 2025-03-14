import { useEffect, useState } from "react";
import ReactStripeCheckout from "react-stripe-checkout";
import config from "next/config";
import useRequest from "../../hooks/use-request";

const OrderShow = ({ order, currentUser }) => {
  const { publicRuntimeConfig } = config();
  const [timeLeft, setTimeLeft] = useState(60);
  const stripePublicKey = publicRuntimeConfig.NEXT_PUBLIC_STRIPE_KEY;
  const { doRequest, errors } = useRequest({
    url: "/api/payments",
    method: "post",
    body: {
      orderId: order.id,
    },
    onSuccess: (payment) => {
      console.log(payment);
    },
  });

  useEffect(() => {
    const findTimeLeft = () => {
      const msLeft = new Date(order.expiresAt) - new Date();
      setTimeLeft(Math.round(msLeft / 1000));
    };

    const timerId = setInterval(findTimeLeft, 1000);

    return () => {
      clearInterval(timerId);
    };
  }, []);

  if (timeLeft < 0) {
    return (
      <div>
        <h1>{order.ticket.title}</h1>
        <span className="d-block">Order Expired!</span>
      </div>
    );
  }

  return (
    <div>
      <h1>{order.ticket.title}</h1>
      <span className="d-block">Time left to pay: {timeLeft} seconds</span>
      <ReactStripeCheckout
        token={({ id }) => doRequest({ token: id })}
        stripeKey={stripePublicKey}
        amount={order.ticket.price * 100}
        currency="BRL"
        email={currentUser.email}
      />
      {errors}
    </div>
  );
};

OrderShow.getInitialProps = async (context, client) => {
  const { orderId } = context.query;
  const { data } = await client.get(`/api/orders/${orderId}`);

  return { order: data };
};

export default OrderShow;
