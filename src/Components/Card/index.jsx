import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

const Card = ({ data }) => {
  const context = useContext(ShoppingCartContext);

  const showProduct = (productDetail) => {
    context.setProductToShow(productDetail);
    context.openProductDetail();
  };

  const addProductToCart = (event, productData) => {
    event.stopPropagation();
    context.setCount(context.count + 1);
    context.setCartProducts([...context.cartProducts, productData]);
    context.openCheckoutSideMenu();
  };

  const renderIcon = (id) => {
    const isIncart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isIncart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-black/80 w-8 h-8 rounded-full m-2 p-1.5 transition-all duration-300 hover:scale-110">
          <CheckIcon className="w-5 h-5 text-green-400" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white/90 w-8 h-8 rounded-full m-2 p-1.5 transition-all duration-300 hover:scale-110 group"
          onClick={(event) => addProductToCart(event, data)}
        >
          <PlusIcon className="w-5 h-5 text-black group-hover:text-gray-600 transition-colors duration-300" />
        </div>
      );
    }
  };

  return (
    <div
      className="cursor-pointer w-64 h-72 rounded-lg overflow-hidden group hover:shadow-lg transition-all duration-300"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <span className="absolute bottom-0 left-0 bg-white/80 backdrop-blur-sm rounded-lg text-black m-2 text-xs font-medium px-3 py-1">
          {data.category.name}
        </span>
        <img
          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          src={data.images}
          alt={data.title}
        />
        {renderIcon(data.id)}
      </figure>
      <div className="px-2">
        <p className="flex justify-between items-center">
          <span className="text-sm font-medium text-gray-800 line-clamp-1 group-hover:text-black transition-colors duration-300">
            {data.title}
          </span>
          <span className="text-lg font-semibold text-black">
            ${data.price}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Card;
