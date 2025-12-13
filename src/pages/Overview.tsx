export default function Overview() {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Overview</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Users</h2>
          <p className="text-4xl font-bold text-blue-600">1,234</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Products</h2>
          <p className="text-4xl font-bold text-green-600">567</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-xl font-semibold mb-4">Total Posts</h2>
          <p className="text-4xl font-bold text-purple-600">890</p>
        </div>
      </div>
    </div>
  );
}