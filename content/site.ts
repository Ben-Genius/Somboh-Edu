import type { Link } from "./types";

type NavItem = {
  label: string;
  href?: string;
  menu?: "about" | "programs";
};

export const navigation = {
  primary: [
    { label: "Home", href: "/" },
    { label: "About Us", menu: "about" },
    { label: "Programs", href: "/programs", menu: "programs" },
    { label: "Get involved", href: "/get-involved" },
    { label: "Contact", href: "/contact" },
  ] satisfies NavItem[] as NavItem[],
  about: [
    {
      label: "Mission",
      href: "/mission",
      description: "Why we exist and the students we serve",
    },
    {
      label: "Vision",
      href: "/vision",
      description: "The Ghana we are working toward",
    },
    {
      label: "FAQ",
      href: "/faq",
      description: "Answers about applying, costs, and next steps",
    },
  ],
  cta: {
    label: "Apply for support",
    href: "/get-involved#students",
  } satisfies Link,
  footer: [
    { label: "Mission", href: "/mission" },
    { label: "Vision", href: "/vision" },
    { label: "Programs", href: "/programs" },
    { label: "FAQ", href: "/faq" },
    { label: "Get involved", href: "/get-involved" },
    { label: "Contact", href: "/contact" },
  ] satisfies Link[],
} as const;

export const footer = {
  statement:
    "A Ghanaian nonprofit helping brilliant students from any background win admission and full funding to top universities at home and abroad.",
  exploreHeading: "Explore",
  contactHeading: "Contact",
  sourcesHeading: "Data sources",
  newsletter: {
    heading: "Stay close to the work.",
    body: "Leave your email and we will add you to SEF's occasional updates.",
    label: "Email address",
    placeholder: "you@example.com",
    button: "Join the list",
    success: "You're on the list.",
    privacy: "We will only use your email for SEF updates.",
  },
  copyright: "Somboh Educational Foundation (SEF Ghana).",
  registrationLabel: "Registration",
  backToTop: "Back to top",
} as const;
