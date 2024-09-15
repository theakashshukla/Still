import { useState } from "react";
import { Icons } from "../icons";

export default function CopyToClipboard({ text }: { text: any }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
      })
      .catch((err) => {
        console.error("Failed to copy text:", err);
      });
  };

  return (
    <button
      onClick={handleCopy}
      // className="ml-2 px-4 py-2 text-white rounded bg-zinc-700 "
    >
      {copied ? (
        <Icons.check className="h-5 w-5 text-green-400" />
      ) : (
        <Icons.clipboard className="h-5 w-5 text-zinc-400" />
      )}
    </button>
  );
}
