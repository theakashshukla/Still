"use client";
import { useState, useEffect } from "react";
import { toolActions } from "@/lib/actions/tools";
import { Icons } from "@/components/icons";
import { InputValues, Tool } from "@/types/tool";
import { tools } from "@/config/tools/tools";

export default function ToolPage({ params }: { params: { tool: string } }) {
  const { tool: toolSlug } = params;
  const [selectedTool, setSelectedTool] = useState<Tool | null>(null); // Fix the type for selectedTool
  const [inputValues, setInputValues] = useState<InputValues | any>({});
  const [result, setResult] = useState<
    string | number | boolean | Record<string, string> | number[]
  >("");
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    if (toolSlug && typeof toolSlug === "string") {
      const tool: any = tools.find(
        (t) => t?.slug?.toLowerCase() === toolSlug.toLowerCase()
      );
      if (tool) {
        setSelectedTool(tool);
      }
    }
  }, [toolSlug]);

  const handleChange = (e: any, key: string) => {
    setInputValues((prev: any) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedTool && selectedTool.action) {
      console.log(selectedTool.action);
      const actionFunc = toolActions[selectedTool.action];
      if (actionFunc) {
        console.log("dnndsnd");
        setLoading(true);
        try {
          const output = await actionFunc(inputValues);
          setResult(output);
        } catch (error) {
          setResult("Error performing action.");
        } finally {
          setLoading(false);
        }
      }
    }
  };

  if (!selectedTool) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container px-8 mx-auto mt-16 lg:mt-32">
      <h1 className="py-4 text-5xl font-bold text-center text-transparent bg-gradient-to-t bg-clip-text from-zinc-800/60 to-black dark:bg-gradient-to-t dark:bg-clip-text dark:from-zinc-100/60 dark:to-white">
        {selectedTool.name}
      </h1>

      <form className="max-w-3xl mx-auto" onSubmit={handleSubmit}>
        {selectedTool.inputs.map((input) => (
          <div key={input.key}>
            <pre className="px-4 py-3 mt-8 font-mono text-left bg-transparent border rounded border-zinc-600 focus:border-zinc-100/80 focus:ring-0 sm:text-sm text-zinc-100">
              <div className="flex items-start px-1 text-sm">
                {" "}
                <input
                  className="w-full p-0 text-base bg-transparent border-0 appearance-none resize-none hover:resize text-zinc-800 dark:text-zinc-100 placeholder-zinc-500 focus:ring-0 sm:text-sm focus:outline-none"
                  type={input.type}
                  name={input.name}
                  value={inputValues[input.key] || ""}
                  placeholder={input.placeholder}
                  onChange={(e) => handleChange(e, input.key)}
                />
              </div>
            </pre>
          </div>
        ))}
        <button
          type="submit"
          disabled={loading || inputValues.length <= 0}
          className={`mt-6 w-full h-12 inline-flex justify-center items-center transition-all rounded px-4 py-1.5 md:py-2 text-base font-semibold leading-7 bg-gray-200 dark:bg-gray-800 ring-1 ring-transparent duration-150 ${
            inputValues.length <= 0
              ? "text-gray-200 dark:text-gray-600 cursor-not-allowed"
              : "text-gray-800 dark:text-gray-400 hover:text-gray-100 hover:ring-gray-600/80  hover:bg-gray-900/20"
          } ${loading ? "animate-pulse" : ""}  `}
        >
          <span>
            {loading ? (
              <Icons.moon className="w-5 h-5 animate-spin" />
            ) : (
              "Submit"
            )}
          </span>
        </button>
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>{JSON.stringify(result)}</p>
        </div>
      )}
    </div>
  );
}
