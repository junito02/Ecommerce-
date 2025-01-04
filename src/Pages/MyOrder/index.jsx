import Layout from "../../Components/Layout";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../../Components/OrderCard";
import { ChevronLeftIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";

function MyOrder() {
  const context = useContext(ShoppingCartContext);
  const currentPath = window.location.pathname;
  let index = currentPath.substring(currentPath.lastIndexOf("/") + 1);

  if (index === "last") index = context.order.length - 1;

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6">
        <Link to="/my-orders" className="absolute left-0">
          <ChevronLeftIcon className="h-6 w-6 text-gray-700 cursor-pointer hover:text-gray-900 transition-colors duration-200" />
        </Link>
        <h1 className="font-bold text-xl text-gray-800">My Order</h1>
      </div>
      <div className="flex flex-col w-80 bg-gray-100 p-4 rounded-lg shadow-md">
        {context.order?.[index]?.products.map((product) => (
          <OrderCard
            key={product.id}
            id={product.id}
            title={product.title}
            imageUrl={product.images}
            price={product.price}
            className="mb-4"
          />
        ))}
      </div>
    </Layout>
  );
}

export default MyOrder;
