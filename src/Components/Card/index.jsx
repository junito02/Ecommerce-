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
    context.closeProductDetail();
  };

  const renderIcon = (id) => {
    const isIncart =
      context.cartProducts.filter((product) => product.id === id).length > 0;

    if (isIncart) {
      return (
        <div className="absolute top-0 right-0 flex justify-center items-center bg-black  w-6 h-6 rounded-full m-2 p-1">
          <CheckIcon className="w-4 h-4 text-green-500" />
        </div>
      );
    } else {
      return (
        <div
          className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
          onClick={(event) => addProductToCart(event, data)}
        >
          <PlusIcon className="w-4 h-4 text-black" />
        </div>
      );
    }

    return (
      <div
        className="absolute top-0 right-0 flex justify-center items-center bg-white w-6 h-6 rounded-full m-2 p-1"
        onClick={(event) => addProductToCart(event, data)}
      >
        <PlusIcon className="w-4 h-4 text-black" />
      </div>
    );
  };

  return (
    <div
      className="bg-white cursor-pointer w-56 h-60"
      onClick={() => showProduct(data)}
    >
      <figure className="relative mb-2 w-full h-4/5">
        <span className="absolute  bottom-0 left-0 bg-white/60 rounded-lg text-black  m-2 text-xs px-3 py-0.5">
          {data.category.name}
        </span>
        <img
          className="w-full h-full object-cover rounded-lg"
          src={data.images}
          alt={data.title}
        />
        {renderIcon(data.id)}
      </figure>
      <p className="flex justify-between">
        <span className="text-sm font-light">{data.title}</span>
        <span className=" text-lg font-medium">${data.price}</span>
      </p>
    </div>
  );
};

export default Card;
