/**
 * Student guide: what a student does, and when, on the road to a full
 * scholarship. Written from the vision's "information as a right, not a
 * privilege" (SEF_Ghana_Vision.pdf): free to read whether or not a student
 * applies to SEF.
 *
 * It describes the student's own steps. What SEF does at each step lives on
 * the program pages and is linked, never restated here.
 *
 * Dates are the typical ones each system publishes. Re-check them every
 * August: update `reviewed` and the dates below. See TODO.md.
 */

export type GuideStage = {
  id: string;
  number: string;
  /** Short name for the route in the hero. */
  short: string;
  when: string;
  title: string;
  lede: string;
  steps: string[];
  /** Shown behind "Read more", for students who want the detail. */
  more?: string[];
  /** The program that helps with this stage. */
  helpSlug: string;
  helpLabel: string;
};

export const guidePage = {
  meta: {
    title: "Student guide",
    description:
      "A free, step-by-step guide for Ghanaian students aiming for full scholarships at home and abroad: what to do in each year of senior high school, which documents to gather, and the key deadlines.",
    path: "/guide",
  },
  hero: {
    eyebrow: "Student guide",
    title: "The road to a full scholarship.",
    lede: "What to do, and when, from your first year of senior high school to the day you leave. Free for every student, whether or not you apply to SEF.",
    reviewed: "Dates reviewed November 2026",
  },
  stagesHeading: "Four stages, in order",
  helpPrefix: "SEF can help:",
  moreLabel: "Read more",
  lessLabel: "Show less",
} as const;

export const guideStages: GuideStage[] = [
  {
    id: "build",
    number: "01",
    short: "Build",
    when: "SHS 1 and SHS 2",
    title: "Build the record you will apply with.",
    lede: "Universities read your whole senior high school record, not only your final exams.",
    steps: [
      "Keep your grades strong from the first term: every year appears on your transcript.",
      "Choose one or two activities and go deep, rather than joining everything.",
      "Start something useful in your own community, however small.",
      "Keep a running list of awards, roles and projects, with dates, as they happen.",
    ],
    more: [
      "Depth reads better than a long list. Two years of leading one club, tutoring younger students, or running a project at home says more than ten memberships.",
      "Your running list becomes your activity list and resume later. Writing things down when they happen saves you from forgetting them in SHS 3.",
    ],
    helpSlug: "community-engagement",
    helpLabel: "Community engagement",
  },
  {
    id: "prepare",
    number: "02",
    short: "Prepare",
    when: "About a year before applying",
    title: "Choose where to apply, and get ready to.",
    lede: "Most of the work that decides the outcome happens before any form is opened.",
    steps: [
      "Make a balanced list of universities in Ghana and abroad.",
      "For each university abroad, check whether it meets full need for international students.",
      "Check each one's testing policy, and plan an SAT or ACT date if any require it.",
      "Apply for your passport now: it can take weeks.",
      "Ask two teachers who know your work well to write recommendations.",
      "Draft your personal statement during the long vacation.",
    ],
    more: [
      "Many US universities are test-optional, but a growing number require the SAT or ACT again. Register early: test dates in Ghana fill up.",
      "Many universities accept English-medium schooling or a strong WASSCE English grade in place of TOEFL, IELTS or Duolingo. Some do not, so check each one.",
      "Ask for recommendations at least two months before your first deadline, and give each teacher a short note on what you have done in their class.",
    ],
    helpSlug: "academic-excellence",
    helpLabel: "Academic excellence",
  },
  {
    id: "apply",
    number: "03",
    short: "Apply",
    when: "August to January of SHS 3",
    title: "Submit the applications and the aid forms.",
    lede: "An application without its financial aid forms is only half finished.",
    steps: [
      "1 August: the Common App opens for US universities.",
      "1 October: the CSS Profile opens for financial aid.",
      "15 October: UCAS deadline for Oxford, Cambridge and medicine in the UK.",
      "1 or 15 November: most US early deadlines.",
      "Early January: most US regular deadlines.",
      "Late January: the main UCAS deadline.",
    ],
    more: [
      "Each university abroad asks for its own aid forms. Many use the CSS Profile; others have an international aid form of their own. File them by the same deadline as the application.",
      "If the application fee is a barrier, ask each university for a fee waiver before you pay. Many grant one on request.",
      "Ghanaian universities admit on WASSCE results. Watch each university's admissions portal for its own dates.",
    ],
    helpSlug: "application-mentorship",
    helpLabel: "Application mentorship",
  },
  {
    id: "decide",
    number: "04",
    short: "Decide",
    when: "March to August",
    title: "Compare offers, accept one, and get ready to go.",
    lede: "The best offer is the one your family can actually afford, not the most famous name.",
    steps: [
      "Most US decisions arrive by about 1 April. Early decisions arrive in December.",
      "Compare aid offers line by line: tuition, housing, food, travel and health insurance.",
      "If an offer falls short, ask the aid office to review it. Explain what has changed and send proof.",
      "1 May: the usual date to accept one US offer.",
      "WASSCE results usually come out around August. Send them to your university.",
      "For the US, your student visa comes after the university sends your I-20.",
    ],
    more: [
      "Read every award letter for what is a grant and what is a loan. Grants and scholarships do not have to be repaid; loans do, often in another currency.",
      "Book your visa interview as soon as you can. Wait times change through the year.",
    ],
    helpSlug: "financial-aid",
    helpLabel: "Financial aid and scholarships",
  },
];

export const guideDocuments = {
  id: "documents",
  eyebrow: "Documents",
  heading: "Gather these early.",
  intro:
    "Most delays come from a missing paper, not a weak essay. Tick each item off as you collect it.",
  savedNote: "Your ticks are saved on this device only.",
  printLabel: "Print this list",
  groups: [
    {
      title: "From your school",
      items: [
        "Transcripts for every SHS year, signed and stamped",
        "Two teacher recommendations",
        "A counsellor or headteacher letter and a school profile",
        "BECE results, if a university asks",
      ],
    },
    {
      title: "From you",
      items: [
        "A valid passport",
        "Personal statement and any supplemental essays",
        "Activity list, with dates and hours",
        "Test scores, if your universities require them",
      ],
    },
    {
      title: "From your family",
      items: [
        "Proof of income: payslips, or a signed statement for informal work",
        "Recent bank statements",
        "Any letters of support from relatives who will help pay",
      ],
    },
  ],
} as const;

export const guideAudiences = {
  id: "for-families-and-schools",
  heading: "No student does this alone.",
  groups: [
    {
      title: "For parents and guardians",
      points: [
        "Start collecting income records a year early. Informal income counts: write it down.",
        "Aid forms ask hard questions. Answer them honestly; universities check.",
        "A university abroad can cost less than one at home once aid is counted. Read the offer before you rule it out.",
      ],
    },
    {
      title: "For teachers and counsellors",
      points: [
        "A recommendation that tells one specific story beats a page of praise.",
        "A one-page school profile helps a university read a Ghanaian transcript: grading scale, courses, class size.",
        "Spot ambitious students in SHS 1, not SHS 3: the record starts early.",
      ],
    },
  ],
} as const;

export const guideOfficial = {
  heading: "Always check the source.",
  body: "Every university sets its own rules and dates, and they change. Before you rely on a date here, confirm it on the official site.",
  links: [
    { label: "Common App", href: "https://www.commonapp.org" },
    { label: "UCAS", href: "https://www.ucas.com" },
    { label: "CSS Profile", href: "https://cssprofile.collegeboard.org" },
    { label: "WAEC Ghana", href: "https://www.waecgh.org" },
    { label: "EducationUSA", href: "https://educationusa.state.gov" },
  ],
} as const;

export const guideNext = {
  heading: "Want someone beside you on the road?",
  body: "Tell us where you are and what you are aiming for.",
  cta: { label: "Apply for support", href: "/get-involved#students" },
} as const;
