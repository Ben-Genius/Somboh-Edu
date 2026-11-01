import { programs } from "./programs";

export type CommandGroup = "Pages" | "Programs" | "Sections" | "Actions";

export type CommandEntry = {
  id: string;
  label: string;
  description?: string;
  href: string;
  group: CommandGroup;
  keywords?: string[];
};

export const commandEntries: CommandEntry[] = [
  {
    id: "page-mission",
    label: "Mission",
    description: "Why SEF exists and what we do",
    href: "/mission",
    group: "Pages",
    keywords: ["about", "purpose", "statement"],
  },
  {
    id: "page-vision",
    label: "Vision",
    description: "The Ghana we are working toward",
    href: "/vision",
    group: "Pages",
    keywords: ["future", "pillars", "ghana"],
  },
  {
    id: "page-programs",
    label: "Programs",
    description: "All five programs",
    href: "/programs",
    group: "Pages",
    keywords: ["sat", "mentorship", "aid", "skills"],
  },
  {
    id: "page-involved",
    label: "Get involved",
    description: "Students, partners, and donors",
    href: "/get-involved",
    group: "Pages",
    keywords: ["apply", "partner", "donate", "support"],
  },
  {
    id: "page-contact",
    label: "Contact",
    description: "Send a message",
    href: "/contact",
    group: "Pages",
    keywords: ["email", "phone", "address", "write"],
  },

  ...programs.map<CommandEntry>((program) => ({
    id: `program-${program.slug}`,
    label: program.title,
    description: program.summary,
    href: `/programs#${program.slug}`,
    group: "Programs",
    keywords: [program.shortLabel, program.menuDescription],
  })),

  {
    id: "section-gap",
    label: "The gap",
    description: "The verified numbers behind the work",
    href: "/#the-gap",
    group: "Sections",
    keywords: ["stats", "wassce", "free shs", "tertiary", "open doors"],
  },
  {
    id: "section-what-we-do",
    label: "What we do",
    description: "The five programs at a glance",
    href: "/#programs",
    group: "Sections",
    keywords: ["programs", "support"],
  },
  {
    id: "section-serve",
    label: "Who we serve",
    description: "Promise, not privilege",
    href: "/mission#who-we-serve",
    group: "Sections",
    keywords: ["students", "eligibility", "first generation"],
  },
  {
    id: "section-commitment",
    label: "Our commitment to Ghana",
    description: "Prepare, admit and fund, return, reach back",
    href: "/mission#commitment",
    group: "Sections",
    keywords: ["return", "reach back", "community"],
  },
  {
    id: "section-founder",
    label: "Founder's message",
    description: "Ekow's conviction and promise",
    href: "/mission#founder",
    group: "Sections",
    keywords: ["ekow", "promise", "letter"],
  },
  {
    id: "section-sources",
    label: "Data sources",
    description: "Citations for every statistic",
    href: "/#sources",
    group: "Sections",
    keywords: ["citations", "evidence", "research"],
  },
  {
    id: "section-vision-pillars",
    label: "What transformation looks like",
    description: "Four changes families can see",
    href: "/vision#what-transformation-looks-like",
    group: "Sections",
    keywords: ["pillars", "transformation"],
  },
  {
    id: "action-student",
    label: "Apply for support",
    description: "Student interest form",
    href: "/get-involved#students",
    group: "Actions",
    keywords: ["student", "application", "interest"],
  },
  {
    id: "action-partner",
    label: "Partner with SEF",
    description: "School, university, or organisation inquiry",
    href: "/get-involved#partners",
    group: "Actions",
    keywords: ["partnership", "university", "school"],
  },
  {
    id: "action-donor",
    label: "Support a scholar",
    description: "Donor inquiry",
    href: "/get-involved#donors",
    group: "Actions",
    keywords: ["donate", "give", "fund", "foundation"],
  },
];

export const commandGroups: Array<{ key: CommandGroup; label: string }> = [
  { key: "Pages", label: "Pages" },
  { key: "Programs", label: "Programs" },
  { key: "Sections", label: "Sections" },
  { key: "Actions", label: "Actions" },
];
