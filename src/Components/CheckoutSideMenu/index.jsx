import "./Style.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import OrderCard from "../OrderCard";
import { totalPrice } from "../Utils/index";

const CheckoutSideMenu = () => {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };
  const handleCheckout = () => {
    const orderToAdd = {
      data: "01/01/2022",
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: totalPrice(context.cartProducts),
    };
    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
  };

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } checkout-side-menu flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">My Order</h2>
        <XMarkIcon
          onClick={context.closeCheckoutSideMenu}
          className="h-6 w-6 text-black cursor-pointer"
        />
      </div>
      <div className="px-6 overflow-y-scroll flex-1">
        {context.cartProducts.length > 0 ? (
          context.cartProducts.map((product) => (
            <OrderCard
              key={product.id}
              title={product.title}
              imageUrl={product.images}
              price={product.price}
              handleDelete={() => handleDelete(product.id)}
            />
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">Your cart is empty</p>
        )}
      </div>
      <div className="px-6">
        <p className="flex justify-between items-center mb-5">
          <span className="font-medium">Total:</span>{" "}
          <span className="font-bold text-2xl">
            ${totalPrice(context.cartProducts)}
          </span>
        </p>
        <Link to="/my-orders/last">
          <button
            onClick={() => handleCheckout()}
            className="w-full bg-black px-5 text-white py-2 mb-3 rounded-lg"
          >
            Checkout
          </button>
        </Link>
      </div>
    </aside>
  );
};

export default CheckoutSideMenu;
