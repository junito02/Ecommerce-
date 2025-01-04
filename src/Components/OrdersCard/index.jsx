import { XMarkIcon } from "@heroicons/react/24/solid";
const OrdersCard = (props) => {
  const { totalPrice, totalProducts } = props;

  return (
    <div className="flex justify-between items-center border border-black w-80 p-4 rounded-lg mb-4 ">
      <p className="flex justify-between w-full">
        <div className="flex flex-col ">
          <span>01.02.2025</span>
          <span> {totalProducts} Articles</span>
          <span className="font-medium text-2xl"> ${totalPrice}</span>
        </div>
      </p>
    </div>
  );
};

export default OrdersCard;
