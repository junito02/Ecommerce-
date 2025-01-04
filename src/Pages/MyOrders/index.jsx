import Layout from "../../Components/Layout";
import OrdersCard from "../../Components/OrdersCard";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { Link } from "react-router-dom";

function MyOrders() {
  const context = useContext(ShoppingCartContext);

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <h1 className="font-medium text-xl">My Orders</h1>
      </div>
      <div className="flex flex-col gap-4">
        {context.order.map((order, index) => (
          <Link
            key={index}
            to={`/my-orders/${index}`}
            className="hover:shadow-lg transition-shadow duration-300"
          >
            <OrdersCard
              totalPrice={order.totalPrice}
              totalProducts={order.totalProducts}
            />
          </Link>
        ))}
      </div>
    </Layout>
  );
}

export default MyOrders;
