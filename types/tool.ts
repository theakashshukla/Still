// export type Tool = {
//   name: string;
//   description: string;
//   inputs: { label: string; type: string; key: string }[];
//   action: keyof typeof toolActions;
// };

import { toolActions } from "@/lib/actions/tools";


// types/tool.ts

// types/tool.ts


export type Tool = {
  slug: string;
  name: string;
  description: string;
  icon: string;
  category?: string;
  tags?: string[];
  isActive: boolean;
  action: keyof typeof toolActions;  // Ensure this matches keys in toolActions
  inputs: { label: string; type: string; name:string,  key: string; placeholder?: string; required?: boolean }[];
};
// types/inputValues.ts
// types/inputValues.ts
export type InputValues = {
  [key: string]: string | number | undefined;
};


export interface ToolCardProps {
  searchQuery: string; // Assuming searchQuery is a string, update the type accordingly
}
