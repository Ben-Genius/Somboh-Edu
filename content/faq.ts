export type FaqCategory = "about" | "applying" | "cost" | "partners";

export type FaqItem = {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
};

export const faqCategories: Array<{
  id: FaqCategory;
  label: string;
  description: string;
}> = [
  {
    id: "about",
    label: "About SEF",
    description: "Who we are and the students we serve.",
  },
  {
    id: "applying",
    label: "Applying",
    description: "Who can apply, what support looks like, and what happens next.",
  },
  {
    id: "cost",
    label: "Cost and commitment",
    description: "What it costs to apply, and what we can and cannot promise.",
  },
  {
    id: "partners",
    label: "Partners and donors",
    description: "How schools, universities, and funders can work with us.",
  },
];

/**
 * Answers are drawn only from copy the foundation has already supplied.
 * The privacy answer and any programme cost detail stay out until the
 * foundation confirms them; see TODO.md.
 */
export const faqs: FaqItem[] = [
  {
    id: "what-is-sef",
    category: "about",
    question: "What is Somboh Educational Foundation?",
    answer:
      "Somboh Educational Foundation (SEF Ghana) is a Ghanaian nonprofit that helps students win admission and full funding to universities at home and abroad. Our work combines SAT preparation, application mentorship, financial aid guidance, skills development, and community engagement.",
  },
  {
    id: "who-we-serve",
    category: "about",
    question: "Which students does SEF serve?",
    answer:
      "Students from public and private schools, in cities and rural districts, from every region of Ghana and West Africa. Many are the first in their families to apply to university abroad. We look for promise, not privilege.",
  },
  {
    id: "regions",
    category: "about",
    question: "Which regions do you work in?",
    answer:
      "Every region of Ghana, and West African students beyond Ghana. The student interest form lists all 16 regions and includes an option for students who are outside Ghana.",
  },
  {
    id: "who-can-apply",
    category: "applying",
    question: "Who can apply for support?",
    answer:
      "Students in secondary school, students who have completed secondary school, students already at university, and students between school and university. If you are aiming for a university at home or abroad, start with the student interest form.",
  },
  {
    id: "what-support",
    category: "applying",
    question: "What kind of support does SEF provide?",
    answer:
      "Five kinds of support: SAT preparation and academic coaching; application mentorship for personal statements, essays, activity lists, and resumes; financial aid and scholarship guidance; skills workshops in writing, public speaking, research, digital literacy, and interviewing; and community engagement support.",
  },
  {
    id: "abroad-only",
    category: "applying",
    question: "Does SEF only help students study abroad?",
    answer:
      "No. We support applications to universities at home and abroad. The preparation is similar either way: strong academics, a clear and honest story, and a funding plan that a family can understand.",
  },
  {
    id: "after-submit",
    category: "applying",
    question: "What happens after I submit the interest form?",
    answer:
      "Your submission is an expression of interest, not an offer of a place in a program. A real person reviews every submission and replies to the email address you provide. If SEF is not the right fit, we will say so.",
  },
  {
    id: "guarantee",
    category: "cost",
    question: "Do you guarantee admission or a scholarship?",
    answer:
      "No. SEF provides preparation, guidance, and advocacy. Admission and funding decisions are made by universities and funders, not by SEF.",
  },
  {
    id: "cost-to-apply",
    category: "cost",
    question: "Does it cost anything to apply?",
    answer:
      "Submitting the student interest form is free. SEF does not take payments on this website. If a particular program has costs, ask us directly through the contact form before you commit.",
  },
  {
    id: "partner",
    category: "partners",
    question: "I work at a school or university. How can we partner?",
    answer:
      "Use the partner inquiry on the Get involved page. Tell us what you do and where you think the fit is. We will reply with a real person, not a brochure.",
  },
  {
    id: "donate",
    category: "partners",
    question: "How can I support a scholar?",
    answer:
      "Use the donor inquiry on the Get involved page. SEF does not process payments on this site, so we will follow up with the correct giving details and explain what your support pays for.",
  },
];

export const faqsByCategory = (category: FaqCategory) =>
  faqs.filter((faq) => faq.category === category);
