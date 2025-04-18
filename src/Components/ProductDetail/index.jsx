import "./Style.css";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { PlusIcon, CheckIcon } from "@heroicons/react/24/solid";

function ProductDetail() {
  const context = useContext(ShoppingCartContext);

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
        <div className="flex justify-center items-center bg-gradient-to-r from-green-500 to-emerald-600 w-12 h-12 rounded-full p-2.5 shadow-lg transition-all duration-300 hover:scale-110">
          <CheckIcon className="w-7 h-7 text-white" />
        </div>
      );
    } else {
      return (
        <div
          className="flex justify-center items-center bg-white w-12 h-12 rounded-full p-2.5 shadow-lg transition-all duration-300 hover:scale-110 group"
          onClick={(event) => addProductToCart(event, context.productToShow)}
        >
          <PlusIcon className="w-7 h-7 text-black group-hover:text-gray-600 transition-colors duration-300" />
        </div>
      );
    }
  };

  return (
    <aside
      className={`${
        context.isProductDetailOpen ? "flex" : "hidden"
      } flex-col fixed right-0 border border-black bg-white/95 backdrop-blur-sm w-[360px] h-[calc(100vh-68px)] top-[68px] rounded-l-2xl overflow-y-auto transition-all duration-300`}
    >
      <div className="flex justify-between items-center p-6">
        <h2 className="font-medium text-xl">Detalle del Producto</h2>
        <div
          className="cursor-pointer w-8 h-8 flex justify-center items-center rounded-full hover:bg-gray-100 transition-colors duration-300"
          onClick={() => context.closeProductDetail()}
        >
          <XMarkIcon className="w-6 h-6 text-gray-600" />
        </div>
      </div>
      <figure className="px-6">
        <img
          className="w-full h-full object-cover rounded-lg"
          src={context.productToShow?.images}
          alt={context.productToShow?.title}
        />
      </figure>
      <div className="flex flex-col flex-1 p-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <p className="text-sm font-medium text-gray-500 mb-1">
              {context.productToShow?.category?.name}
            </p>
            <h3 className="text-2xl font-bold text-gray-800">
              {context.productToShow?.title}
            </h3>
          </div>
          <span className="text-2xl font-bold text-black">
            ${context.productToShow?.price}
          </span>
        </div>
        <div className="mb-6">
          <h4 className="text-sm font-medium text-gray-500 mb-2">
            Descripción:
          </h4>
          <p className="text-gray-600 leading-relaxed">
            {context.productToShow?.description}
          </p>
        </div>
        <div className="mt-auto">{renderIcon(context.productToShow?.id)}</div>
      </div>
    </aside>
  );
}

export default ProductDetail;
