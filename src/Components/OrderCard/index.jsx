import { XMarkIcon } from "@heroicons/react/24/solid";
const OrderCard = (props) => {
  const { id, title, imageUrl, price, handleDelete } = props;
  let renderXMarkIcon;
  if (handleDelete) {
    renderXMarkIcon = (
      <XMarkIcon
        onClick={handleDelete}
        className="h-6 w-6 text-black cursor-pointer"
      />
    );
  }
  return (
    <div className="flex justify-between items-center mb-3 ">
      <div className="flex items-center gap-2">
        <figure className="w-20 h-20">
          <img
            className="w-full h-full object-cover rounded-lg"
            src={imageUrl}
            alt={title}
          />
        </figure>
        <p className="text-lg font-light "> {title}</p>
        <div className="flex items-center gap-2">
          <p className="text-lg font-light ">${price}</p>
          {renderXMarkIcon}
        </div>
      </div>
    </div>
  );
};

export default OrderCard;
