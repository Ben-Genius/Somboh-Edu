import type { imageBlur } from "@/lib/blur";

type ProgramImage = {
  src: string;
  alt: string;
  blur: keyof typeof imageBlur;
  /** Shown under the picture. Photography is placeholder until SEF supplies its own. */
  credit: string;
};

/**
 * One photograph per program: SEF's own where one fits, otherwise a Wikimedia
 * Commons photograph whose licence requires the credit line shown with it.
 */
export const programImages: Record<string, ProgramImage> = {
  "academic-excellence": {
    // Was the Commons library photo (/images/programs/academic-excellence.jpg).
    src: "/images/sef/classroom.jpg",
    alt: "Somboh Educational Foundation students working at their desks during a session.",
    blur: "sefClassroom",
    credit: "An SEF study session.",
  },
  "application-mentorship": {
    // Was /images/programs/application-mentorship.jpg: a primary-school photo
    // and too blurry. This one is clearer and closer in age.
    src: "/images/programs/application-mentorship-workshop.jpg",
    alt: "University students working on laptops while a facilitator helps them at a workshop in Accra.",
    blur: "programMentorshipWorkshop",
    credit:
      "Stock photograph: a student workshop, University of Ghana. Photo by Zapsmedia25, CC BY 4.0. Not an SEF program image.",
  },
  "financial-aid": {
    src: "/images/programs/financial-aid.jpg",
    alt: "Two university graduates in blue gowns holding their caps on graduation day in Ghana.",
    blur: "programAid",
    credit:
      "Stock photograph: university graduates in Ghana. Photo by Tahiru Rajab, CC BY-SA 4.0. Not an SEF program image.",
  },
  "skills-development": {
    src: "/images/programs/skills-development.jpg",
    alt: "Two students presenting from a lectern beside a screen at a University of Ghana workshop.",
    blur: "programSkills",
    credit:
      "Stock photograph: students presenting at a workshop, University of Ghana. Photo by Zapsmedia25, CC BY 4.0. Not an SEF program image.",
  },
  "community-engagement": {
    src: "/images/programs/community-engagement.jpg",
    alt: "Students in a school compound digging and planting a young tree together.",
    blur: "programCommunity",
    credit:
      "Stock photograph: students planting a tree at their school in Ghana. Photo by Antorsu10, CC BY-SA 4.0. Not an SEF program image.",
  },
};
