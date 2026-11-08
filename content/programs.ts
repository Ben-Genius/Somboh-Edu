import type { Program } from "./types";

/**
 * Program copy is drawn from the organisation's own descriptions.
 * Operational details we were not given are deliberately left out.
 */
export const programs: Program[] = [
  {
    slug: "academic-excellence",
    number: "01",
    title: "Academic excellence",
    shortLabel: "Academic excellence",
    menuDescription: "SAT preparation, coaching, and study support",
    summary:
      "SAT preparation, academic coaching, and study support so students can show the full measure of their ability on a global stage.",
    metaDescription:
      "SAT preparation, academic coaching and study support for Ghanaian students aiming at universities in Ghana and abroad.",
    studentsGet: "A study plan, practice tests, and a coach who knows where they are.",
    detail: [
      "SAT preparation is the spine of this work: diagnostic practice, targeted review, and timed sections, so a student walks into test day having already met the format. Academic coaching and study support sit around it — help with schoolwork, a workable weekly plan, and someone who notices when a student is stuck.",
      "The goal is not a higher score in isolation. It is a student who can read a hard question, decide what it is asking, and keep going.",
    ],
    bullets: [
      "SAT preparation, including practice tests and section-by-section review",
      "One-to-one academic coaching and study planning",
      "Support with schoolwork and subject confidence",
      "Feedback that names what is working and what to practise next",
    ],
  },
  {
    slug: "application-mentorship",
    number: "02",
    title: "Application mentorship",
    shortLabel: "Application mentorship",
    menuDescription: "Personal statements, essays, activity lists, and resumes",
    summary:
      "One-on-one help with personal statements, supplemental essays, activity lists, and resumes that tell each student's story with depth and honesty.",
    metaDescription:
      "One-to-one mentorship for personal statements, supplemental essays, activity lists and resumes, from first draft to submission.",
    studentsGet: "An editor and an advocate, from first draft to final submission.",
    detail: [
      "Admissions is a writing and judgment process as much as an academic one. We work one to one through the personal statement, supplemental essays, activity list, and resume, asking the questions that help a student tell their own story with depth and honesty — never a story that sounds like someone else's.",
      "Students learn to choose the detail that only they could write, and to revise without losing their voice.",
    ],
    bullets: [
      "Personal statement and supplemental essay development",
      "Activity list and resume review",
      "One-to-one editing and feedback",
      "Help shaping a coherent, honest application",
    ],
  },
  {
    slug: "financial-aid",
    number: "03",
    title: "Financial aid and scholarship facilitation",
    shortLabel: "Financial aid and scholarships",
    menuDescription: "Need-based aid, documentation, and fee waivers",
    summary:
      "Demystifying need-based aid, preparing financial documentation, identifying universities that meet full demonstrated need for international students, and pursuing fee waivers.",
    metaDescription:
      "Plain-language help with need-based aid, financial documents, fee waivers and universities that meet full demonstrated need.",
    studentsGet: "A clear aid strategy and the paperwork to back it up.",
    detail: [
      "Cost should not be the reason a student does not apply. We explain how need-based aid actually works, prepare the financial documentation universities request, and help families find institutions that meet full demonstrated need for international students.",
      "We also pursue application fee waivers, so that the cost of applying is not a second, quieter barrier.",
    ],
    bullets: [
      "Plain-language explanation of need-based aid",
      "Financial documentation checklists and review",
      "University research focused on full demonstrated need",
      "Application fee-waiver guidance",
    ],
  },
  {
    slug: "skills-development",
    number: "04",
    title: "Skills development",
    shortLabel: "Skills development",
    menuDescription: "Writing, speaking, research, digital literacy, interviews",
    summary:
      "Workshops in writing, public speaking, research, digital literacy, and interviewing, preparing students not only to be admitted but to thrive.",
    metaDescription:
      "Workshops in writing, public speaking, research, digital literacy and interviewing, so students thrive after admission.",
    studentsGet: "Practice, feedback, and the confidence to speak in any room.",
    detail: [
      "Admission is the beginning, not the end. Workshops in writing, public speaking, research, digital literacy, and interviewing prepare students to hold their own in a seminar room, a laboratory, and a first internship.",
      "The setting is low-pressure and practical. Students present, interview, revise, and try again.",
    ],
    bullets: [
      "Writing and research workshops",
      "Public speaking and interview practice",
      "Digital literacy and study tools",
      "Feedback in a low-pressure setting",
    ],
  },
  {
    slug: "community-engagement",
    number: "05",
    title: "Community engagement",
    shortLabel: "Community engagement",
    menuDescription: "Lead and serve at home, before leaving",
    summary:
      "Encouraging every student to lead and serve at home, long before they leave.",
    metaDescription:
      "A service or leadership project in each student's own community, with reflection and peer support that continues after admission.",
    studentsGet: "A project at home, and a habit of reaching back.",
    detail: [
      "Every student is encouraged to lead and serve at home, long before they leave. The habit of reaching back is part of the preparation, not an afterthought.",
      "Students shape a service or leadership project in their own community, then reflect on what it asked of them — and what they will carry with them.",
    ],
    bullets: [
      "A service or leadership project rooted in the student's community",
      "Reflection on what leadership asks of them",
      "Peer support that continues after admission",
      "Connection to scholars who have walked the path",
    ],
  },
];

export function programBySlug(slug: string): Program | undefined {
  return programs.find((program) => program.slug === slug);
}
