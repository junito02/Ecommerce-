import Card from "../../Components/Card";
import Layout from "../../Components/Layout";
import { useContext } from "react";
import ProductDetail from "../../Components/ProductDetail";
import { ShoppingCartContext } from "../../Context";
function Home() {
  const context = useContext(ShoppingCartContext);

  const renderView = () => {
    const { searchByTitle = "", searchByCategory = "", items = [] } = context;

    // Filtrar por categoría y/o título
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

    // Renderizar los resultados filtrados o mensaje de error
    return filteredItems.length > 0 ? (
      filteredItems.map((item) => <Card key={item.id} data={item} />)
    ) : (
      <p>No se encontraron resultados</p>
    );
  };

  return (
    <Layout>
      <div className="flex items-center justify-center relative w-80 mb-6 ">
        <h1 className="font-medium text-xl">Home</h1>
      </div>
      <input
        type="text"
        placeholder="Search..."
        className="rounded-lg border border-black w-80 p-4 mb-4 focus:outline-none"
        onChange={(event) => context.setSearchByTitle(event.target.value)}
      />
      <div className="flex justify-center items-center min-h-screen">
        <div className="grid gap-4 w-full max-w-screen-lg grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {renderView()}
        </div>
      </div>

      <ProductDetail />
    </Layout>
  );
}

export default Home;
