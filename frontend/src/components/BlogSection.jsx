import React from "react";

const BlogSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://via.placeholder.com/400x200?text=Graph+Up",
      title: "Ask Yourself These Four Questions To Earn Big Returns On",
      description:
        "Investment in real estate is believed to earn guaranteed returns, that too big ones....",
      author: "Biranchi Narayan Mishra",
      category: "Property Investment",
    },
    {
      id: 2,
      image: "https://via.placeholder.com/400x200?text=Nagpur+Tax",
      title: "Nagpur Property Tax (2024) : nmcnagpur.gov.in How to pay",
      description:
        "Owning a property in the city of Nagpur is a true blessing. But this blessing is...",
      author: "Biranchi Narayan Mishra",
      category: "Property Tax",
    },
    {
      id: 3,
      image: "https://via.placeholder.com/400x200?text=Dwarka+Investment",
      title: "Why Invest in Dwarka, New Delhi? by Realestateindia.com",
      description:
        "Dwarka is a major sub-city that is located in South West Delhi, India. It is developed by...",
      author: "Biranchi Narayan Mishra",
      category: "Property Investment",
    },
    {
      id: 4,
      image: "https://via.placeholder.com/400x200?text=Delhi+NCR",
      title: "Top 5 Real Estate Areas For Property Investment In Delhi NCR",
      description:
        "Delhi, the capital of India, has always magnetized real estate investors with its...",
      author: "Biranchi Narayan Mishra",
      category: "Property Investment",
    },
  ];

  return (
    <div className="py-12 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-semibold text-center mb-8">
        <span className="text-red-600">Explore</span>{" "}
        <span className="text-black">Real Estate Blogs</span>
      </h2>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {blogPosts.map((post) => (
          <div
            key={post.id}
            className="bg-white rounded shadow hover:shadow-lg transition overflow-hidden flex flex-col">
            <img
              src={post.image}
              alt={post.title}
              className="h-40 w-full object-cover hover:scale-105 transition-transform duration-300"
            />
            <div className="p-4 flex flex-col flex-grow">
              <h3 className="text-md font-semibold mb-1">{post.title}</h3>
              <p className="text-sm text-gray-600 flex-grow">
                {post.description}
              </p>
              <div className="mt-3 text-xs text-gray-500">
                by <span className="text-blue-600">{post.author}</span> | in{" "}
                <span className="text-blue-600">{post.category}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center mt-6">
        <a
          href="#"
          className="text-blue-600 text-sm font-medium hover:underline inline-flex items-center gap-1">
          See all Blog →
        </a>
      </div>
    </div>
  );
};

export default BlogSection;
