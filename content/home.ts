import type { AudiencePath, Link, Stat, Step } from "./types";

export const homePage = {
  meta: {
    title: "SEF Ghana — Brilliant minds. Equal chances.",
    description:
      "SEF Ghana helps brilliant students in Ghana win admission and full funding to top universities through SAT prep, essay mentorship, and financial aid guidance.",
    path: "/",
  },
  hero: {
    eyebrow: "Somboh Educational Foundation · Ghana",
    title: "Your grades got you this far. We help you get in and get funded.",
    subline:
      "SAT coaching, essay mentorship, and full-scholarship guidance for Ghanaian students aiming at top universities, at home and abroad.",
    primary: {
      label: "Explore our programs",
      href: "#programs",
    } satisfies Link,
    secondary: { label: "Get involved", href: "/get-involved" } satisfies Link,
    asideLabel: "Who we serve",
    asideBody:
      "Students from public and private schools, cities and rural districts, every region of Ghana and West Africa.",
    asideLink: { label: "Read our mission", href: "/mission" } satisfies Link,
  },
  gap: {
    eyebrow: "The gap",
    heading: "Free school was step one. University is still out of reach.",
    paragraphs: [
      "Free SHS removed the cost of secondary school, not the cost of what comes next. Educators name financing as a major barrier for students from modest homes.",
      "Studying abroad is a way through, but few of those students go as undergraduates.",
      "The cause is rarely ability. It is information, guidance, and money.",
    ],
    stats: [
      {
        id: "transition",
        value: "36",
        unit: "%",
        label:
          "of WASSCE candidates entered tertiary education the following year",
        detail: "Roughly 446,000 candidates completed WASSCE in 2021.",
        sourceId: "wasce-tertiary",
        emphasis: true,
      },
      {
        id: "free-shs",
        value: "2018",
        label: "Free SHS introduced",
        detail: "Free tuition at all public secondary schools.",
        sourceId: "free-shs",
      },
      {
        id: "rank",
        value: "14th",
        label: "Ghana's rank for students in the US",
        detail:
          "A record 12,825 in 2024/25. Only about one in five is an undergraduate.",
        sourceId: "open-doors",
      },
      {
        id: "goal",
        value: "40",
        unit: "%",
        label: "gross tertiary enrollment goal",
        detail: "Ghana's national target for 2030.",
        sourceId: "tertiary-goal",
      },
    ] satisfies Stat[],
    sourcesLabel: "Sources",
    sourcesNote:
      "Every figure on this page is published by the organisations listed in the sources.",
  },
  programs: {
    eyebrow: "What we do",
    heading: "Five kinds of support. One throughline: the student decides.",
    intro:
      "Each program is built around the same belief: a student's future should be shaped by ability and effort, not the accident of where they were born.",
    studentsGetLabel: "What students get",
    linkLabel: "Explore this program",
  },
  serve: {
    eyebrow: "Who we serve",
    heading: "Talent is everywhere. Access is not.",
    paragraphs: [
      "We serve students from public and private schools, from cities and rural districts, from every region and background across Ghana and West Africa.",
      "Many are the first in their families to apply to university abroad. They are strong students with curiosity, resilience, and a desire to make a difference.",
      "What they need is not sympathy. It is information, preparation, and someone who answers the email.",
    ],
    quote: "We look for promise, not privilege.",
    quoteNote:
      "Strong academics, curiosity, resilience, and a desire to make a difference.",
    quoteAttribution: "The SEF principle",
    link: { label: "Read the full mission", href: "/mission" } satisfies Link,
  },
  commitment: {
    eyebrow: "Our commitment to Ghana",
    heading: "The scholarship is the beginning.",
    body: "Our goal is not simply to send students away. It is to raise leaders who will return their knowledge, networks, and energy to Ghana and Africa — as engineers, physicians, entrepreneurs, policymakers, scientists, artists, and educators.",
    steps: [
      {
        title: "Prepare",
        body: "Rigorous academic and application support, built around the student.",
      },
      {
        title: "Admit and fund",
        body: "Guidance to universities that meet full demonstrated need, and to the aid that makes attendance possible.",
      },
      {
        title: "Return",
        body: "Scholars carry knowledge, networks, and energy back to Ghana and Africa.",
      },
      {
        title: "Reach back",
        body: "Every scholar helps the students coming behind them.",
      },
    ] satisfies Step[],
    closing:
      "Every SEF scholar carries a responsibility to the students coming behind them, so that each scholarship becomes the beginning of a cycle of opportunity.",
  },
  founder: {
    eyebrow: "A message from the founder",
    heading: "One conviction.",
    quote:
      "A brilliant young Ghanaian's future should be decided by their ability, effort, and character, and never by the size of their family's bank account.",
    paragraphs: [
      "I founded Somboh Educational Foundation (SEF Ghana) with that conviction. Our mission is to empower students to achieve academic excellence, personal growth, and civic responsibility through innovative, inclusive, and comprehensive educational programs.",
      "We are committed to equitable access to college-preparatory resources, skills development, and community engagement, fostering a generation of leaders and changemakers.",
    ],
    promiseHeading: "My Promise",
    promise: [
      "To every brilliant student who has been told that the world's best universities are not meant for someone like them: they are.",
      "To every family that has sacrificed to keep a child in school: you are not alone. And to our partners, donors, and universities around the world: Ghana's young people are ready. With the right preparation and support, they will not only earn their place, they will lead.",
    ],
    signature: "Ekow",
    role: "Founder",
    imageAlt:
      "Abstract placeholder composition for a portrait of Ekow, Founder. No photograph has been supplied.",
    imageCaption: "Portrait placeholder",
  },
  // Pointer to /guide. Only the stage names and timing appear here; the
  // steps themselves live on the guide page.
  guide: {
    eyebrow: "Free student guide",
    heading: "Not ready to apply yet? Start on the road.",
    linkLabel: "Read the student guide",
    href: "/guide",
  },
  cta: {
    eyebrow: "Get involved",
    heading: "Find your place in the work.",
    intro: "The same door, approached from three directions.",
    paths: [
      {
        label: "Students and families",
        title: "Aim higher than you have been told to.",
        body: "If you are aiming for a university that feels out of reach, start with us.",
        linkLabel: "Apply for support",
        href: "/get-involved#students",
        // The two things families ask first; the full answers live in the FAQ.
        note: {
          text: "Free to apply. We prepare and advocate; universities make the decisions.",
          linkLabel: "Costs and guarantees",
          href: "/faq#cost",
        },
      },
      {
        label: "Partners and universities",
        title: "Help us find the next cohort.",
        body: "Schools, universities, and organisations can help us reach students early and prepare them well.",
        linkLabel: "Partner with SEF",
        href: "/get-involved#partners",
      },
      {
        label: "Donors",
        title: "Fund preparation, not just a place.",
        body: "Your support pays for the coaching, guidance, and paperwork that make an offer possible.",
        linkLabel: "Support a scholar",
        href: "/get-involved#donors",
      },
    ] satisfies AudiencePath[],
  },
} as const;
