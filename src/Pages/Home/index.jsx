import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import { useContext } from "react";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    const { searchByTitle = "", searchByCategory = "", items = [] } = context;

    const filteredItems = items.filter((item) => {
      const matchesCategory = searchByCategory
        ? item.category?.name
            .toLowerCase()
            .includes(searchByCategory.toLowerCase())
        : true;
      const matchesTitle = searchByTitle
        ? item.title.toLowerCase().includes(searchByTitle.toLowerCase())
        : true;
      return matchesCategory && matchesTitle;
    });

    return filteredItems.length > 0 ? (
      filteredItems.map((item) => <Card key={item.id} data={item} />)
    ) : (
      <div className="col-span-full flex flex-col items-center justify-center py-12">
        <p className="text-gray-500 text-lg">No se encontraron resultados</p>
        <p className="text-gray-400 text-sm mt-2">
          Intenta con otros términos de búsqueda
        </p>
      </div>
    );
  };

  return (
    <Layout>
      <div className="flex flex-col items-center w-full max-w-screen-xl mx-auto px-4">
        <div className="w-full max-w-2xl mb-8">
          <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
            Productos Destacados
          </h1>
          <div className="relative">
            <input
              type="text"
              placeholder="Buscar productos..."
              className="w-full rounded-xl border border-gray-200 p-4 pl-12 focus:outline-none focus:border-black focus:ring-1 focus:ring-black transition-all duration-300"
              onChange={(event) => context.setSearchByTitle(event.target.value)}
            />
            <MagnifyingGlassIcon className="w-5 h-5 text-gray-400 absolute left-4 top-1/2 transform -translate-y-1/2" />
          </div>
        </div>

        <div className="grid gap-6 w-full grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 place-items-center">
          {renderView()}
        </div>
      </div>

      <ProductDetail />
    </Layout>
  );
}

export default Home;
