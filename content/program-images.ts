import type { imageBlur } from "@/lib/blur";

type ProgramImage = {
  src: string;
  alt: string;
  blur: keyof typeof imageBlur;
  /** Shown under the picture. Photography is placeholder until SEF supplies its own. */
  credit: string;
};

/**
 * One Wikimedia Commons photograph per program, chosen for what the program
 * does. Each licence requires the credit line, so it is shown with the image.
 */
export const programImages: Record<string, ProgramImage> = {
  "academic-excellence": {
    src: "/images/programs/academic-excellence.jpg",
    alt: "Students in school uniform reading books together in a library in Ghana.",
    blur: "programAcademic",
    credit:
      "Placeholder photograph: students reading in a library in Ghana. Photo by Amuzujoe, CC BY-SA 4.0. Not an SEF program image.",
  },
  "application-mentorship": {
    src: "/images/programs/application-mentorship.jpg",
    alt: "A teacher sitting beside a student at a desk, guiding her work page by page.",
    blur: "programMentorship",
    credit:
      "Placeholder photograph: a teacher working one to one with a student, Savelugu, Northern Ghana. Photo by Alhassan Musah Amk, CC BY-SA 4.0. Not an SEF program image.",
  },
  "financial-aid": {
    src: "/images/programs/financial-aid.jpg",
    alt: "Two university graduates in blue gowns holding their caps on graduation day in Ghana.",
    blur: "programAid",
    credit:
      "Placeholder photograph: university graduates in Ghana. Photo by Tahiru Rajab, CC BY-SA 4.0. Not an SEF program image.",
  },
  "skills-development": {
    src: "/images/programs/skills-development.jpg",
    alt: "Two students presenting from a lectern beside a screen at a University of Ghana workshop.",
    blur: "programSkills",
    credit:
      "Placeholder photograph: students presenting at a workshop, University of Ghana. Photo by Zapsmedia25, CC BY 4.0. Not an SEF program image.",
  },
  "community-engagement": {
    src: "/images/programs/community-engagement.jpg",
    alt: "Students in a school compound digging and planting a young tree together.",
    blur: "programCommunity",
    credit:
      "Placeholder photograph: students planting a tree at their school in Ghana. Photo by Antorsu10, CC BY-SA 4.0. Not an SEF program image.",
  },
};
