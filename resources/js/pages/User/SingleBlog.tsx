// src/components/SingleBlogPage.jsx
import React from "react";
import { Link } from "@inertiajs/react";
import WebLayout from "@/layouts/web-layout";

const dummyPosts = [
  {
    id: "1",
    title: "Top 10 Ways to Save on Groceries in 2025",
    imageUrl: "https://picsum.photos/id/1015/800/450",
    content: `
      <p class="mb-4" style="color: var(--text-default);">Saving money on groceries is a goal for many households, and with a few smart strategies, you can significantly reduce your weekly or monthly food budget without sacrificing quality or nutrition. Here are our top 10 tested ways to save:</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">1. Plan Your Meals in Advance</h3>
      <p class="mb-4" style="color: var(--text-default);">One of the most effective ways to save is to create a weekly meal plan. This helps you buy only what you need, reducing impulse purchases and food waste. Check your pantry and fridge first to incorporate ingredients you already have.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">2. Make a Shopping List and Stick to It</h3>
      <p class="mb-4" style="color: var(--text-default);">Once your meal plan is set, create a detailed shopping list. Avoid Browse aisles aimlessly, as this often leads to buying unnecessary items. Stick strictly to your list to stay within budget.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">3. Shop with a Full Stomach</h3>
      <p class="mb-4" style="color: var(--text-default);">Never go grocery shopping when you're hungry. Studies show that people tend to buy more, and often unhealthy, food when their stomach is empty. Eat a snack or a meal before heading to the store.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">4. Compare Prices and Buy in Bulk (Wisely)</h3>
      <p class="mb-4" style="color: var(--text-default);">Don't be afraid to compare prices between different brands and even different stores. For non-perishable items or those you use frequently, buying in bulk can save money, but only if you have space to store them and will use them before they expire.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">5. Use Coupons and Loyalty Programs</h3>
      <p class="mb-4" style="color: var(--text-default);">Embrace coupons, whether they are digital or paper. Sign up for your favorite grocery store's loyalty program to get exclusive discounts and personalized offers. Many stores have apps that make this process seamless.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">6. Cook More at Home</h3>
      <p class="mb-4" style="color: var(--text-default);">Eating out or ordering takeout frequently can quickly deplete your budget. Cooking meals at home is almost always cheaper and often healthier. Meal prepping on weekends can save time during busy weekdays.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">7. Reduce Food Waste</h3>
      <p class="mb-4" style="color: var(--text-default);">Food waste is money waste. Learn how to properly store fresh produce, repurpose leftovers, and understand "best by" dates. Composting can also reduce waste and benefit your garden.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">8. Buy Generic or Store Brands</h3>
      <p class="mb-4" style="color: var(--text-default);">Often, store brands are produced by the same manufacturers as their name-brand counterparts but are sold at a lower price. Give them a try for staples like sugar, flour, spices, and cereals.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">9. Shop Seasonal Produce</h3>
      <p class="mb-4" style="color: var(--text-default);">Fruits and vegetables are typically cheaper and taste better when they are in season. Check local farmers' markets for even better deals on fresh, seasonal produce.</p>

      <h3 class="text-xl font-bold mb-3 mt-6" style="color: var(--primary-orange);">10. Track Your Spending</h3>
      <p class="mb-4" style="color: var(--text-default);">Keep a record of your grocery expenses for a few weeks to identify areas where you might be overspending. This awareness can help you make more informed decisions and stick to your budget.</p>

      <p class="mb-4" style="color: var(--text-default);">By implementing these strategies, you'll be well on your way to becoming a grocery-saving expert! Happy shopping!</p>
    `,
    date: "June 20, 2025",
    author: "Admin",
    category: "Shopping Tips",
    tags: ["Groceries", "Saving", "Budgeting", "Food", "Tips"],
  },
  {
    id: "2",
    title: "Seasonal Sales You Cannot Miss This Summer",
    imageUrl: "https://picsum.photos/id/1016/800/450",
    content: `<p style="color: var(--text-default);">Content for seasonal sales...</p>`,
    date: "June 15, 2025",
    author: "Admin",
    category: "Sales & Deals",
    tags: ["Sales", "Summer", "Deals"],
  },
  {
    id: "3",
    title: "Decoding Coupon Terms & Conditions: A Simple Guide",
    imageUrl: "https://picsum.photos/id/1018/800/450",
    content: `<p style="color: var(--text-default);">Content for coupon terms...</p>`,
    date: "June 10, 2025",
    author: "Admin",
    category: "Coupon Guide",
    tags: ["Coupons", "Guide", "Terms"],
  },
  // Add more dummy posts as needed for related posts
];

// Dummy comments for demonstration
const dummyComments = [
  {
    id: 1,
    author: "Jane Doe",
    date: "June 22, 2025",
    content: "This is a great article! Very helpful tips.",
  },
  {
    id: 2,
    author: "John Smith",
    date: "June 21, 2025",
    content: "I've tried some of these, and they really work. Thanks!",
  },
];
interface Post {
    title : string | null,
    content : string | null,

}
interface Props {
    post : Post[]
}
const SingleBlog = ({post}:Props) => {


  return (
    <WebLayout>
          <div
              className="pb-12 font-sans"
              style={{ backgroundColor: "var(--page-bg)" }}
          >
              <div className="container mx-auto px-4 md:px-6 lg:px-8 py-8">
                  {/* Breadcrumbs */}
                  <nav className="text-sm mb-6">
                      <Link
                          href="/"
                          className="transition-colors duration-300"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "var(--text-accent-hover)")
                          }
                          onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "var(--text-muted)")
                          }
                      >
                          Home
                      </Link>
                      <span
                          className="mx-2"
                          style={{ color: "var(--breadcrumb-separator-color)" }}
                      >
                          &gt;
                      </span>
                      <Link
                          href='/all/blogs'

                          className="transition-colors duration-300"
                          style={{ color: "var(--text-muted)" }}
                          onMouseEnter={(e) =>
                              (e.currentTarget.style.color = "var(--text-accent-hover)")
                          }
                          onMouseLeave={(e) =>
                              (e.currentTarget.style.color = "var(--text-muted)")
                          }
                      >
                          Blogs
                      </Link>
                      <span
                          className="mx-2"
                          style={{ color: "var(--breadcrumb-separator-color)" }}
                      >
                          &gt;
                      </span>
                      <span
                          className="font-semibold line-clamp-1"
                          style={{ color: "var(--main-heading-color)" }}
                      >
                          {post.title}
                      </span>
                  </nav>

                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                      {/* Main Blog Content */}
                      <div
                          className="lg:col-span-2 p-6 sm:p-8 rounded-lg shadow-lg border"
                          style={{
                              backgroundColor: "var(--card-bg)",
                              borderColor: "var(--card-border)",
                          }}
                      >
                          <h1
                              className="text-3xl sm:text-4xl font-extrabold mb-4 leading-tight"
                              style={{ color: "var(--main-heading-color)" }}
                          >
                              {post.title}
                          </h1>
                          <div
                              className="flex items-center text-sm mb-6 space-x-4"
                              style={{ color: "var(--text-muted)" }}
                          >
                              <span>
                                  By{" "}
                                  <span
                                      className="font-semibold"
                                      style={{ color: "var(--primary-orange)" }}
                                  >
                                      {post.author}
                                  </span>
                              </span>
                              <span>•</span>
                              <span>{post.date}</span>
                              <span>•</span>
                              <span>
                                  Category:
                                  <Link
                                      href={`/blogs/category/${post.category.slug}`}
                                      className="hover:underline"
                                      style={{ color: "var(--primary-orange)" }}
                                  >
                                      {post.category.name}
                                  </Link>
                              </span>
                          </div>

                          <img
                              src={'/'}
                              alt={post.title}
                              className="w-full h-auto rounded-lg mb-8 shadow-md"
                          />

                          {/* The dangerouslySetInnerHTML content will directly use the inline styles defined in dummyPosts */}
                          <div
                              className="prose max-w-none leading-relaxed"
                              style={{ color: "var(--text-default)" }}
                              dangerouslySetInnerHTML={{ __html: post.content }}
                          >
                              {/* Blog content will be injected here */}
                          </div>

                          {/* Comments Section - ADDED HERE */}

                          {/* End Comments Section */}
                      </div>

                      {/* Sidebar */}
                      <div className="lg:col-span-1 space-y-8 mt-8 lg:mt-0">
                          {/* Search Blog */}
                          <div
                              className="p-6 rounded-lg shadow-lg border"
                              style={{
                                  backgroundColor: "var(--card-bg)",
                                  borderColor: "var(--card-border)",
                              }}
                          >
                              <h3
                                  className="text-xl font-bold mb-4"
                                  style={{ color: "var(--heading-color)" }}
                              >
                                  Search Blog
                              </h3>
                              <div className="relative">
                                  <input
                                      type="text"
                                      placeholder="Search posts..."
                                      className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:border-transparent"
                                      style={{
                                          backgroundColor: "var(--form-input-bg)",
                                          color: "var(--form-input-text)",
                                          borderColor: "var(--form-input-border)",
                                          "--tw-ring-color": "var(--primary-orange)", // Tailwind ring color
                                      }}
                                  />
                                  <button
                                      className="absolute right-0 top-0 mt-2 mr-3 transition-colors duration-200"
                                      style={{ color: "var(--search-icon-color)" }}
                                      onMouseEnter={(e) =>
                                          (e.currentTarget.style.color = "var(--primary-orange)")
                                      }
                                      onMouseLeave={(e) =>
                                          (e.currentTarget.style.color = "var(--search-icon-color)")
                                      }
                                  >
                                      <svg
                                          xmlns="http://www.w3.org/2000/svg"
                                          className="h-5 w-5"
                                          viewBox="0 0 20 20"
                                          fill="currentColor"
                                      >
                                          <path
                                              fillRule="evenodd"
                                              d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                                              clipRule="evenodd"
                                          />
                                      </svg>
                                  </button>
                              </div>
                          </div>

                          {/* Recent Posts */}
                          <div
                              className="p-6 rounded-lg shadow-lg border"
                              style={{
                                  backgroundColor: "var(--card-bg)",
                                  borderColor: "var(--card-border)",
                              }}
                          >
                              <h3
                                  className="text-xl font-bold mb-4"
                                  style={{ color: "var(--heading-color)" }}
                              >
                                  Recent Posts
                              </h3>
                              <ul className="space-y-3">
                                  {dummyPosts.slice(0, 5).map(
                                      (
                                          p,
                                          index // Show top 5 recent posts
                                      ) => (
                                          <li key={index}>
                                              <Link
                                                  href={`/blog/${p.id}`}
                                                  className="text-sm transition-colors duration-300"
                                                  style={{ color: "var(--text-muted)" }}
                                                  onMouseEnter={(e) =>
                                                  (e.currentTarget.style.color =
                                                      "var(--text-accent-hover)")
                                                  }
                                                  onMouseLeave={(e) =>
                                                      (e.currentTarget.style.color = "var(--text-muted)")
                                                  }
                                              >
                                                  {p.title}
                                              </Link>
                                              <p
                                                  className="text-xs mt-1"
                                                  style={{ color: "var(--text-muted)" }}
                                              >
                                                  {p.date}
                                              </p>
                                          </li>
                                      )
                                  )}
                              </ul>
                          </div>

                          {/* Blog Categories */}
                          <div
                              className="p-6 rounded-lg shadow-lg border"
                              style={{
                                  backgroundColor: "var(--card-bg)",
                                  borderColor: "var(--card-border)",
                              }}
                          >
                              <h3
                                  className="text-xl font-bold mb-4"
                                  style={{ color: "var(--heading-color)" }}
                              >
                                  Blog Categories
                              </h3>
                              <ul className="space-y-3">
                                  {Array.from(new Set(dummyPosts.map((p) => p.category))).map(
                                      (category, index) => (
                                          <li key={index}>
                                              <Link
                                                  href={`/blog/category/${category
                                                      .toLowerCase()
                                                      .replace(/\s/g, "-")}`}
                                                  className="text-sm transition-colors duration-300"
                                                  style={{ color: "var(--text-muted)" }}
                                                  onMouseEnter={(e) =>
                                                  (e.currentTarget.style.color =
                                                      "var(--text-accent-hover)")
                                                  }
                                                  onMouseLeave={(e) =>
                                                      (e.currentTarget.style.color = "var(--text-muted)")
                                                  }
                                              >
                                                  {category}
                                              </Link>
                                          </li>
                                      )
                                  )}
                              </ul>
                          </div>
                      </div>
                  </div>
              </div>
          </div>
    </WebLayout>
  );
};

export default SingleBlog;
