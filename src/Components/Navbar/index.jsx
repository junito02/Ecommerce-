import { NavLink } from "react-router-dom";
import { useContext } from "react";
import { ShoppingCartContext } from "../../Context";
import { ShoppingCartIcon } from "@heroicons/react/24/solid";

const Navbar = () => {
  const context = useContext(ShoppingCartContext);

  return (
    <nav className="navbar flex justify-between items-center fixed z-10 w-full py-5 px-8 text-sm font-light top-0 bg-gray-900 text-white">
      <ul className="flex items-center gap-4">
        <li className="font-semibold text-lg">
          <NavLink to="/" className="no-underline">
            shopi
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/"
            onClick={() => context.setSearchByCategory()}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            All
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/clothes"
            onClick={() => context.setSearchByCategory("clothes")}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Clothes
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/electronics"
            onClick={() => context.setSearchByCategory("electronics")}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Electronics
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/furniture"
            onClick={() => context.setSearchByCategory("furniture")}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Furniture
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/toys"
            onClick={() => context.setSearchByCategory("toys")}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Toys
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/others"
            onClick={() => context.setSearchByCategory("others")}
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Others
          </NavLink>
        </li>
      </ul>
      <ul className="flex items-center gap-4">
        <li>
          <NavLink
            to="/my-orders"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            MyOrders
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/my-account"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            MyAccount
          </NavLink>
        </li>
        <li>
          <NavLink
            to="/sign-in"
            className={({ isActive }) =>
              isActive ? "underline underline-offset-4" : undefined
            }
          >
            Sign In
          </NavLink>
        </li>
        <li className="flex items-center gap-2">
          <ShoppingCartIcon className="w-6 h-6  " />
          {context.cartProducts.length}
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
