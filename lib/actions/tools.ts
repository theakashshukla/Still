

export const toolsData = [
  {
    name: "Check Email",
    description: "Validate an email address.",
    inputs: [{ label: "Email", type: "email", key: "email" }],
    action: async (inputValues: { email: string }) => {
      return isEmail(inputValues.email) ? "Valid Email" : "Invalid Email";
    },
  },
  {
    name: "Hash Password",
    description: "Hash your password.",
    inputs: [{ label: "Password", type: "password", key: "password" }],
    action: async (inputValues: { password: string }) => {
      return `Hashed Password: ${await (inputValues.password)}`;
    },
  },

];
