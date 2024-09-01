import { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: "https://still.astreak.in/",
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    },
    {
      url: "https://still.astreak.in/pdf",
      lastModified: new Date(),
      changeFrequency: "yearly",
      priority: 1,
    },
    
    
  ];
}
