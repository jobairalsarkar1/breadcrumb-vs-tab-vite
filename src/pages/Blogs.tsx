export default function Blogs() {
  const blogs = [
    { id: 1, title: "The Future of Web Development", readTime: "5 min" },
    { id: 2, title: "Building Scalable Applications", readTime: "8 min" },
    { id: 3, title: "UI/UX Design Principles", readTime: "6 min" },
    { id: 4, title: "State Management in 2024", readTime: "10 min" },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-4">{blog.title}</h2>
            <div className="flex justify-between items-center">
              <span className="text-gray-600">Read time: {blog.readTime}</span>
              <button className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700">
                Read More
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
