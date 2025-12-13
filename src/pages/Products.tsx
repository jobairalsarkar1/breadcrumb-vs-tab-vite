export default function Products() {
  const products = [
    { id: 1, name: "Laptop", price: "$999", category: "Electronics" },
    { id: 2, name: "Desk Chair", price: "$199", category: "Furniture" },
    { id: 3, name: "Coffee Mug", price: "$15", category: "Home" },
    { id: 4, name: "Notebook", price: "$12", category: "Stationery" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
            <p className="text-gray-600 mb-2">Category: {product.category}</p>
            <p className="text-2xl font-bold text-green-600">{product.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
