export const missionPage = {
  meta: {
    title: "Mission",
    description:
      "Our mission is equitable college preparation, academic excellence, and civic responsibility for students across Ghana, whatever their family background.",
    path: "/mission",
  },
  hero: {
    eyebrow: "Our mission",
    title: "Ability should decide the future.",
    lede: "Our mission is to make sure it does — through preparation, information, and support that meet students where they are.",
  },
  statement: {
    eyebrow: "The mission, in full",
    heading: "What we exist to do.",
    body: [
      "Empower students to achieve academic excellence, personal growth, and civic responsibility through innovative, inclusive, and comprehensive educational programs.",
      "We are committed to providing equitable access to college preparatory resources, skills development, and community engagement opportunities, fostering a generation of leaders and changemakers.",
    ],
  },
  gap: {
    eyebrow: "The gap we exist to close",
    heading: "A free secondary education is not a university place.",
    body: "Ghana has made real progress in opening the doors of secondary education. But the path beyond it remains steep, and the barrier is rarely ability.",
  },
  programs: {
    eyebrow: "What we do",
    heading: "Five programs, built around one student at a time.",
    intro:
      "Support begins with where a student is and what they need next. These five programs are designed to work together, not in isolation.",
  },
  serve: {
    eyebrow: "Who we serve",
    heading: "Promise, not privilege.",
    body: "We serve students from public and private schools, from cities and rural districts, from every region and background across Ghana and West Africa. Many are the first in their families to apply to university abroad.",
  },
  commitment: {
    eyebrow: "Our commitment to Ghana",
    heading: "Return, and reach back.",
    body: "Our goal is not simply to send students away. It is to raise leaders who will return their knowledge, networks, and energy to Ghana and Africa, and to the students coming behind them.",
    listLabel: "The scholarship cycle",
    helpLabel: "Where SEF helps",
    loopNote: "Reach back feeds Prepare. The cycle continues.",
    /**
     * One entry per step in homePage.commitment.steps, in the same order:
     * the photograph shown beside the step and the pages that cover it.
     */
    steps: [
      {
        image: {
          src: "/images/sef/student-prepare.jpg",
          alt: "A smiling SEF student in a cream foundation T-shirt.",
          blur: "sefStudentPrepare",
          caption: "A student in SEF's current cohort.",
        },
        links: [
          { label: "Academic excellence", href: "/programs/academic-excellence" },
          { label: "Application mentorship", href: "/programs/application-mentorship" },
          { label: "Skills development", href: "/programs/skills-development" },
        ],
      },
      {
        image: {
          src: "/images/sef/student-admit.jpg",
          alt: "An SEF student in a red foundation T-shirt, looking at the camera.",
          blur: "sefStudentAdmit",
          caption: "A student in SEF's current cohort.",
        },
        links: [
          { label: "Financial aid and scholarships", href: "/programs/financial-aid" },
          { label: "What it costs, and what we guarantee", href: "/faq#cost" },
        ],
      },
      {
        image: {
          src: "/images/vision/partners-abroad.jpg",
          alt: "Two young professionals talk and laugh over coffee at a leadership conference.",
          blur: "visionPartners",
          caption:
            "Stock photograph: delegates at a Young African Leaders Initiative conference. Photo by USAID in Africa, public domain.",
        },
        links: [
          { label: "Our vision for Ghana", href: "/vision" },
          { label: "Community engagement", href: "/programs/community-engagement" },
        ],
      },
      {
        image: {
          src: "/images/sef/cohort-reach.jpg",
          alt: "An SEF cohort standing together at the front of a classroom.",
          blur: "sefCohortReach",
          caption: "An SEF cohort, together in class.",
        },
        links: [
          { label: "The free student guide", href: "/guide" },
          { label: "Partner with SEF", href: "/get-involved#partners" },
        ],
      },
    ],
  },
  serveImages: {
    caption: "Somboh Educational Foundation students.",
    wide: {
      src: "/images/sef/serve-group.jpg",
      alt: "A group of SEF students in foundation T-shirts standing together.",
      blur: "sefServeGroup",
    },
    portraits: [
      {
        src: "/images/sef/serve-student-a.jpg",
        alt: "A smiling SEF student in a cream foundation T-shirt.",
        blur: "sefServeA",
      },
      {
        src: "/images/sef/serve-student-b.jpg",
        alt: "An SEF student in a grey foundation T-shirt.",
        blur: "sefServeB",
      },
      {
        src: "/images/sef/serve-student-c.jpg",
        alt: "An SEF student in glasses and a cream foundation T-shirt.",
        blur: "sefServeC",
      },
    ],
  },
  programRail: {
    linkLabel: "All programs",
    previousLabel: "Previous programs",
    nextLabel: "Next programs",
    creditsLabel: "Photo credits",
  },
  gapChart: {
    caption: "Each dot is one in every hundred WASSCE candidates. Filled dots entered tertiary education the next year.",
  },
  // Banner for the old founder link (hidden on the mission page, kept for reuse).
  founder: {
    eyebrow: "The founder's promise",
    heading: "A promise worth signing.",
    note: "The founder's message is published in full on the home page.",
    linkLabel: "Read the founder's message",
    href: "/#founder",
  },
} as const;
