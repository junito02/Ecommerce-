import "./Style.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { TrashIcon } from "@heroicons/react/24/solid";

function CheckoutSideMenu() {
  const context = useContext(ShoppingCartContext);

  const handleDelete = (id) => {
    const filteredProducts = context.cartProducts.filter(
      (product) => product.id !== id
    );
    context.setCartProducts(filteredProducts);
  };

  const handleCheckout = () => {
    const orderToAdd = {
      date: new Date().toLocaleDateString(),
      products: context.cartProducts,
      totalProducts: context.cartProducts.length,
      totalPrice: total,
    };

    context.setOrder([...context.order, orderToAdd]);
    context.setCartProducts([]);
    context.setCount(0);
    context.setTotal(0);
    context.closeCheckoutSideMenu();
  };

  const total = context.cartProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <aside
      className={`${
        context.isCheckoutSideMenuOpen ? "flex" : "hidden"
      } flex-col fixed right-0 border border-black bg-white/95 backdrop-blur-sm w-[360px] h-[calc(100vh-68px)] top-[68px] rounded-l-2xl overflow-y-auto transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-6 border-b border-gray-200">
        <h2 className="font-medium text-xl">Mi Carrito</h2>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100 transition-colors duration-300"
          onClick={() => context.closeCheckoutSideMenu()}
        >
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
      <div className="px-6 py-4">
        {context.cartProducts.length > 0 ? (
          context.cartProducts.map((product) => (
            <div key={product.id} className="flex items-center mb-4">
              <figure className="w-20 h-20">
                <img
                  className="w-full h-full object-cover rounded-lg"
                  src={product.images}
                  alt={product.title}
                />
              </figure>
              <div className="ml-4 flex-1">
                <p className="text-sm font-medium text-gray-800 line-clamp-1">
                  {product.title}
                </p>
                <p className="text-lg font-bold text-black">${product.price}</p>
              </div>
              <div
                className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-red-50 transition-colors duration-300"
                onClick={() => handleDelete(product.id)}
              >
                <TrashIcon className="w-5 h-5 text-red-500" />
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500 mt-4">
            Tu carrito está vacío
          </p>
        )}
      </div>
      {context.cartProducts.length > 0 && (
        <div className="px-6 py-4 border-t border-gray-200 mt-auto">
          <div className="flex justify-between items-center mb-4">
            <p className="text-lg font-medium text-gray-800">Total:</p>
            <p className="text-2xl font-bold text-black">${total}</p>
          </div>
          <Link to="/my-orders/last">
            <button
              className="w-full bg-black text-white py-3 rounded-lg font-medium hover:bg-gray-800 transition-colors duration-300"
              onClick={() => handleCheckout()}
            >
              Checkout
            </button>
          </Link>
        </div>
      )}
    </aside>
  );
}

export default CheckoutSideMenu;
