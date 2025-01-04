import { createContext, useState, useEffect } from "react";

export const ShoppingCartContext = createContext();

export const ShoppingCartProvider = ({ children }) => {
  //shopping cart  Incrementar y disminuir la cantidad de productos
  const [count, setCount] = useState(0);

  //abrir y cerrar el modal productDetail
  const [isproductDetailOpen, setIsProductDetailOpen] = useState(false);
  const openProductDetail = () => setIsProductDetailOpen(true);
  const closeProductDetail = () => setIsProductDetailOpen(false);

  //---------------------------------------------
  //checkout side menu //abrir y cerrar el modal
  const [isCheckoutSideMenuOpen, setIsCheckoutSideMenuOpen] = useState(false);
  const openCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(true);
  const closeCheckoutSideMenu = () => setIsCheckoutSideMenuOpen(false);

  //prodcutDetail show product
  const [productToShow, setProductToShow] = useState({});

  //shopping cart.  Add product to cart
  const [cartProducts, setCartProducts] = useState([]);

  //shopping cart.order
  const [order, setOrder] = useState([]);

  //Get products
  const [items, setItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);

  //search by title
  const [searchByTitle, setSearchByTitle] = useState("");

  //search by category
  const [searchByCategory, setSearchByCategory] = useState("");

  useEffect(() => {
    fetch("https://api.escuelajs.co/api/v1/products")
      .then((response) => response.json())
      .then((data) => {
        setItems(data);
      });
  }, []);

  const filteredItemsByTitle = (items = [], searchByTitle = "") => {
    return items.filter((item) =>
      item.title.toLowerCase().includes(searchByTitle.toLowerCase())
    );
  };

  const filteredItemsByCategory = (items = [], searchByCategory = "") => {
    return items.filter((item) =>
      item.category?.name
        ?.toLowerCase()
        .includes(searchByCategory.toLowerCase())
    );
  };

  const filterBy = (searchType, items, searchByTitle, searchByCategory) => {
    switch (searchType) {
      case "BY_TITLE":
        return filteredItemsByTitle(items, searchByTitle);
      case "BY_CATEGORY":
        return filteredItemsByCategory(items, searchByCategory);
      case "BY_TITLE_AND_CATEGORY":
        return filteredItemsByCategory(items, searchByCategory).filter((item) =>
          item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        );
      default:
        return items;
    }
  };

  useEffect(() => {
    const searchType =
      searchByTitle && searchByCategory
        ? "BY_TITLE_AND_CATEGORY"
        : searchByTitle
        ? "BY_TITLE"
        : searchByCategory
        ? "BY_CATEGORY"
        : null;

    setFilteredItems(
      filterBy(searchType, items, searchByTitle, searchByCategory)
    );
  }, [items, searchByTitle, searchByCategory]);

  return (
    <ShoppingCartContext.Provider
      value={{
        count,
        setCount,
        openProductDetail,
        closeProductDetail,
        isproductDetailOpen,
        productToShow,
        setProductToShow,
        cartProducts,
        setCartProducts,
        openCheckoutSideMenu,
        closeCheckoutSideMenu,
        isCheckoutSideMenuOpen,
        order,
        setOrder,
        items,
        setItems,
        searchByTitle,
        setSearchByTitle,
        filteredItems,
        searchByCategory,
        setSearchByCategory,
      }}
    >
      {children}
    </ShoppingCartContext.Provider>
  );
};
