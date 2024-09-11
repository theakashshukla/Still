import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import { toolsData } from "../../lib/actions/tools";

export default function ToolPage() {
  const router = useRouter();
  const { toolName } = router.query;
  const [selectedTool, setSelectedTool] = useState(null);
  const [inputValues, setInputValues] = useState<Record<string, any>>({});
  const [result, setResult] = useState<string>("");

  useEffect(() => {
    if (toolName) {
      const tool = toolsData.find((t) => t.name.toLowerCase() === toolName.toLowerCase());
      if (tool) {
        setSelectedTool(tool);
      }
    }
  }, [toolName]);

  const handleChange = (e: any, key: string) => {
    setInputValues((prev) => ({ ...prev, [key]: e.target.value }));
  };

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    if (selectedTool && selectedTool.action) {
      const output = await selectedTool.action(inputValues);
      setResult(output);
    }
  };

  if (!selectedTool) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>{selectedTool.name}</h1>
      <p>{selectedTool.description}</p>
      <form onSubmit={handleSubmit}>
        {selectedTool.inputs.map((input) => (
          <div key={input.key}>
            <label>{input.label}</label>
            <input
              type={input.type}
              value={inputValues[input.key] || ""}
              onChange={(e) => handleChange(e, input.key)}
            />
          </div>
        ))}
        <button type="submit">Submit</button>
      </form>

      {result && (
        <div>
          <h2>Result:</h2>
          <p>{result}</p>
        </div>
      )}
    </div>
  );
}
