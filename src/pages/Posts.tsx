export default function Posts() {
  const posts = [
    {
      id: 1,
      title: "Getting Started with React",
      date: "2024-01-15",
      author: "John Doe",
    },
    {
      id: 2,
      title: "Tailwind CSS Tips",
      date: "2024-01-10",
      author: "Jane Smith",
    },
    {
      id: 3,
      title: "TypeScript Best Practices",
      date: "2024-01-05",
      author: "Bob Johnson",
    },
    {
      id: 4,
      title: "Vite vs Webpack",
      date: "2024-01-01",
      author: "Alice Brown",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Posts</h1>
      <div className="space-y-4">
        {posts.map((post) => (
          <div key={post.id} className="bg-white rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
            <div className="flex justify-between text-gray-600">
              <span>By {post.author}</span>
              <span>{post.date}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
