export type Tool = {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  status: "available" | "coming-soon";
  pricingModel: "pay-what-you-want" | "fixed" | "tbd";
  minPrice?: number;
};

export const tools: Tool[] = [
  {
    slug: "mkrhub",
    name: "mkrHub",
    tagline: "A free tool shelf for Maya artists",
    description:
      "Organize, launch and share your Maya tools and scripts from one hub. Free — pay what you want, including $0.",
    status: "available",
    pricingModel: "pay-what-you-want",
    minPrice: 0,
  },
  {
    slug: "renamer",
    name: "Renamer",
    tagline: "Batch rename with naming-convention presets",
    description: "Coming soon — individual mkrHub tool.",
    status: "coming-soon",
    pricingModel: "tbd",
  },
  {
    slug: "modeling-pack",
    name: "Modeling Pack",
    tagline: "A bundle of modeling-focused mkrHub tools",
    description: "Coming soon — category pack for mkrHub.",
    status: "coming-soon",
    pricingModel: "tbd",
  },
];
