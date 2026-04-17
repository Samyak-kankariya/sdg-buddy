export interface SDGGoal {
  id: number;
  name: string;
  description: string;
  logo: string;
}

export const SDG_GOALS: SDGGoal[] = [
  {
    id: 1,
    name: "No Poverty",
    description: "End poverty in all its forms everywhere.",
    logo: "/src/assets/sdg-goals/1.png"
  },
  {
    id: 2,
    name: "Zero Hunger",
    description: "End hunger, achieve food security and improved nutrition, and promote sustainable agriculture.",
    logo: "/src/assets/sdg-goals/2.png"
  },
  {
    id: 3,
    name: "Good Health and Well-being",
    description: "Ensure healthy lives and promote well-being for all at all ages.",
    logo: "/src/assets/sdg-goals/3.png"
  },
  {
    id: 4,
    name: "Quality Education",
    description: "Ensure inclusive and equitable quality education and promote lifelong learning opportunities for all.",
    logo: "/src/assets/sdg-goals/4.png"
  },
  {
    id: 5,
    name: "Gender Equality",
    description: "Achieve gender equality and empower all women and girls.",
    logo: "/src/assets/sdg-goals/5.png"
  },
  {
    id: 6,
    name: "Clean Water and Sanitation",
    description: "Ensure availability and sustainable management of water and sanitation for all.",
    logo: "/src/assets/sdg-goals/6.png"
  },
  {
    id: 7,
    name: "Affordable and Clean Energy",
    description: "Ensure access to affordable, reliable, sustainable and modern energy for all.",
    logo: "/src/assets/sdg-goals/7.png"
  },
  {
    id: 8,
    name: "Decent Work and Economic Growth",
    description: "Promote sustained, inclusive and sustainable economic growth, full and productive employment and decent work for all.",
    logo: "/src/assets/sdg-goals/8.png"
  },
  {
    id: 9,
    name: "Industry, Innovation and Infrastructure",
    description: "Build resilient infrastructure, promote inclusive and sustainable industrialization and foster innovation.",
    logo: "/src/assets/sdg-goals/9.png"
  },
  {
    id: 10,
    name: "Reduced Inequality",
    description: "Reduce inequality within and among countries.",
    logo: "/src/assets/sdg-goals/10.png"
  },
  {
    id: 11,
    name: "Sustainable Cities and Communities",
    description: "Make cities and human settlements inclusive, safe, resilient and sustainable.",
    logo: "/src/assets/sdg-goals/11.png"
  },
  {
    id: 12,
    name: "Responsible Consumption and Production",
    description: "Ensure sustainable consumption and production patterns.",
    logo: "/src/assets/sdg-goals/12.png"
  },
  {
    id: 13,
    name: "Climate Action",
    description: "Take urgent action to combat climate change and its impacts.",
    logo: "/src/assets/sdg-goals/13.png"
  },
  {
    id: 14,
    name: "Life Below Water",
    description: "Conserve and sustainably use the oceans, seas and marine resources for sustainable development.",
    logo: "/src/assets/sdg-goals/14.png"
  },
  {
    id: 15,
    name: "Life on Land",
    description: "Protect, restore and promote sustainable use of terrestrial ecosystems, manage forests sustainably, combat desertification, and halt biodiversity loss.",
    logo: "/src/assets/sdg-goals/15.png"
  },
  {
    id: 16,
    name: "Peace, Justice and Strong Institutions",
    description: "Promote peaceful and inclusive societies, provide access to justice for all, and build effective, accountable institutions.",
    logo: "/src/assets/sdg-goals/16.png"
  },
  {
    id: 17,
    name: "Partnerships for the Goals",
    description: "Strengthen the means of implementation and revitalize the global partnership for sustainable development.",
    logo: "/src/assets/sdg-goals/17.png"
  }
];

// Helper function to get logo by goal ID
export const getSDGLogo = (id: number): string => {
  const goal = SDG_GOALS.find(g => g.id === id);
  return goal ? goal.logo : "";
};

// Helper function to get goal name by ID
export const getSDGName = (id: number): string => {
  const goal = SDG_GOALS.find(g => g.id === id);
  return goal ? goal.name : "Unknown Goal";
};

// Helper function to get goal description by ID
export const getSDGDescription = (id: number): string => {
  const goal = SDG_GOALS.find(g => g.id === id);
  return goal ? goal.description : "";
};
