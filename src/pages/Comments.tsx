export default function Comments() {
  const comments = [
    {
      id: 1,
      user: "John Doe",
      comment: "Great post!",
      post: "Getting Started with React",
    },
    {
      id: 2,
      user: "Jane Smith",
      comment: "Very helpful tips!",
      post: "Tailwind CSS Tips",
    },
    {
      id: 3,
      user: "Bob Johnson",
      comment: "Looking forward to more!",
      post: "TypeScript Best Practices",
    },
    {
      id: 4,
      user: "Alice Brown",
      comment: "Thanks for sharing!",
      post: "Vite vs Webpack",
    },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">Comments</h1>
      <div className="space-y-4">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white rounded-lg shadow p-6">
            <div className="flex items-start space-x-4">
              <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center">
                <span className="font-semibold">{comment.user.charAt(0)}</span>
              </div>
              <div className="flex-1">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{comment.user}</h3>
                  <span className="text-gray-500 text-sm">
                    on "{comment.post}"
                  </span>
                </div>
                <p className="mt-2 text-gray-700">{comment.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
