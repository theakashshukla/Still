import {
  isEmail,
  isPhoneNumber,
  parseQueryString,
  buildQueryString,
  wordCounter,
  wordToNumber,
  spaceRemover,
  lineRemover,
  numberToWord,
  binaryConverter,
  hexConverter,
  capitalize,
  reverseString,
  passwordHasher,
  sha256,
  md5,
  base64Decode,
  base64Encode,
  randomNumberGenerator,
} from "@astreak/unity";

// Your npm package

// Define the tool actions object
export const toolActions = {
  emailCheck: ({ email }: { email: string }) => isEmail(email),

  // Phone number validation
  phoneCheck: ({ phone }: { phone: string }) => isPhoneNumber(phone),

  // Query string parsing
  parseQueryString: ({ query }: { query: string }) => parseQueryString(query),

  // Building query string
  buildQueryString: ({ params }: { params: Record<string, string> }) => buildQueryString(params),

  // Word count
  wordCounter: ({ text }: { text: string }) => wordCounter(text),

  // Password hashing
  hashPassword: ({ password }: { password: string }) => passwordHasher(password),


  // Base64 Encoding
  base64Encode: ({ text }: { text: string }) => base64Encode(text),

  // Base64 Decoding
  base64Decode: ({ encoded }: { encoded: string }) => base64Decode(encoded),

  wordToNumber: ({ word }: { word: string }) => wordToNumber(word),
  spaceRemover: ({ text }: { text: string }) => spaceRemover(text),
  lineRemover: ({ text }: { text: string }) => lineRemover(text),
  numberToWord: ({ number }: { number: number }) => numberToWord([number]),
  binaryConverter: ({ number }: { number: string }) => binaryConverter(number),
  hexConverter: ({ number }: { number: string }) => hexConverter(number),
  capitalize: ({ text }: { text: string }) => capitalize(text),
  reverseString: ({ text }: { text: string }) => reverseString(text),
  sha256: ({ text }: { text: string }) => sha256(text),
  md5: ({ text }: { text: string }) => md5(text),
  randomNumberGenerator: ({ min, max }: { min: number; max: number }) => randomNumberGenerator(min, max),
};
