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
    src: "/images/programs/academic-excellence-prep.jpg",
    alt: "Students at a study desk with an open textbook and materials during an academic preparation session.",
    blur: "programAcademicPrep",
    credit: "SEF scholars in academic preparation and college counseling.",
  },
  "application-mentorship": {
    src: "/images/programs/medium-shot-students-desks.jpg",
    alt: "A mentor guiding a student through essay and application notes beside a chalkboard highlighting teamwork and progress.",
    blur: "programMentorshipTeamwork",
    credit: "One-on-one mentorship and application guidance.",
  },
  "financial-aid": {
    src: "/images/programs/financial-aid-options.jpg",
    alt: "An illustrated signpost directing students toward financial aid, scholarships, grants, loans, FAFSA, and work-study.",
    blur: "programFinancialAidOptions",
    credit: "Financial aid, grants, and scholarship pathways guidance.",
  },
  "skills-development": {
    src: "/images/programs/excellence.jpg",
    alt: "Students engaged in skills development, research, and workshop activities in a classroom.",
    blur: "programExcellence",
    credit: "Digital literacy, research, and skills workshops.",
  },
  "community-engagement": {
    src: "/images/programs/images3744-643d2c4705ea0.jpg",
    alt: "Students and community members participating in an educational and community development initiative in Ghana.",
    blur: "programCommunityGhana",
    credit: "Community outreach and civic engagement in Ghana.",
  },
  /* Previous stock photographs, replaced on 2026-11-08 with sharper ones:
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
  */
};
