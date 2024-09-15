"use client";
import { Icons } from "@/components/icons";
import { siteConfig } from "@/config/site";
import { products } from "@/config/tools/product";
import { tools } from "@/config/tools/tools";
import { ToolCardProps } from "@/types/tool";
import { useState } from "react";

export function ToolCard({ searchQuery }: ToolCardProps) {
  const [selectedCategory, setSelectedCategory] = useState<string | any>(null);

  const combinedList = [...tools, ...products];

  const categories = Array.from(
    new Set(combinedList.map((item) => item?.category).filter(Boolean))
  );
  const filteredItems = combinedList.filter(
    (item) =>
      item.isActive &&
      (item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (item?.tags &&
          item?.tags?.some((tag) =>
            tag.toLowerCase().includes(searchQuery.toLowerCase())
          )) ||
        (item.category &&
          item.category.toLowerCase().includes(searchQuery.toLowerCase()))) &&
      (selectedCategory ? item.category === selectedCategory : true)
  );

  return (
    <>
      <div className="flex space-x-4 mb-10 justify-center">
        <button
          onClick={() => setSelectedCategory(null)}
          className={`px-4 py-2 rounded-full ${
            !selectedCategory
              ? "bg-gray-200 dark:bg-gray-900"
              : "border bg-background/95 text-white backdrop:blur supports-[backdrop-filter]:bg-background/20"
          }`}
        >
          All
        </button>
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full ${
              selectedCategory === category
                ? "bg-gray-200 dark:bg-gray-900 "
                : "border bg-background/95 text-white backdrop:blur supports-[backdrop-filter]:bg-background/20"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
      <section className="p-4 mx-14 min-h-screen">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {filteredItems?.map((tool) => (
            <a
              key={tool.name}
              href={tool.slug ? `${siteConfig.url}/${tool.slug}` : tool.url}
              className="flex-col flex items-start justify-between border-2 border-gray-500 rounded-lg dark:border-gray-400  p-8 h-50 transition transform hover:scale-105 "
            >
              <div className="flex-row flex w-full items-center justify-between">
                <h5 className="text-xl font-bold">{tool.name}</h5>
                <Icons.arrowUpRight className="h-5 w-5" />
              </div>
              <div className="pt-1">
                <p>{tool.description}</p>
              </div>
              <div className="flex flex-wrap mt-4">
                {tool.tags?.map((tag) => (<>
                  <span key={tag} className="bg-gray-200 dark:bg-gray-800 text-gray-900 dark:text-gray-200 px-2 py-1 rounded-full text-xs mr-2">
                    {tag}
                  </span>
                </>) )}
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
