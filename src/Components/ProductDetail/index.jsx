import "./Style.css";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";

const ProductDetail = () => {
  const context = useContext(ShoppingCartContext);

  return (
    <div>
      <aside
        className={`${
          context.isproductDetailOpen ? "flex" : "hidden"
        } ProductDetail flex flex-col fixed right-0 border border-black bg-white rounded-lg`}
      >
        <div className="flex justify-between items-center p-6">
          <h2 className="font-medium text-xl">Detail</h2>
          <div>
            <XMarkIcon
              onClick={context.closeProductDetail}
              className="h-6 w-6 text-black cursor-pointer"
            />
          </div>
        </div>
        <figure className="px-6">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={context.productToShow.images}
            alt={context.productToShow.title}
          />
        </figure>
        <p className="p-6 flex flex-col">
          <span className="font-bold text-lg mb-2">
            ${context.productToShow.price}
          </span>
          <span className="font-medium text-md">
            {context.productToShow.title}
          </span>
          <span className="font-medium text-sm">
            {context.productToShow.description}
          </span>
        </p>
      </aside>
    </div>
  );
};

export default ProductDetail;
