"use client"
import { Icons } from "@/components/icons";
import { tools } from "@/config/tools";

interface ToolCardProps {
    searchQuery: string; // Assuming searchQuery is a string, update the type accordingly
  }
  
export function ToolCard({ searchQuery }: ToolCardProps) {
    const filteredTools = tools.filter((tool) => tool.isActive &&
    tool.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <section className="p-4 mx-10 h-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          {filteredTools?.map((tool) => (
            <a
              key={tool.name}
              href={tool.url}
              className="flex-col flex items-start justify-between border-2 border-gray-500 rounded-lg dark:border-gray-400  p-10 h-50 transition transform hover:scale-105"
            >
              <div className="flex-row flex w-full items-center justify-between">
                <h5 className="text-xl font-bold">{tool.name}</h5>
                <Icons.arrowUpRight className="h-6 w-6" />
              </div>
              <div className="pt-2">
                <p>{tool.description}</p>
              </div>
            </a>
          ))}
        </div>
      </section>
    </>
  );
}
