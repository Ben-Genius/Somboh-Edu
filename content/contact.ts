export const contactPage = {
  meta: {
    title: "Contact",
    description:
      "Contact Somboh Educational Foundation (SEF Ghana) to ask about applying for support, partnering with SEF, donating, media enquiries, or any other question.",
    path: "/contact",
  },
  hero: {
    eyebrow: "Contact",
    title: "Start a conversation.",
    lede: "Questions about applying, partnering, or supporting the work? Send a note.",
  },
  channels: {
    heading: "Reach us",
    emailLabel: "Email",
    phoneLabel: "Phone",
    addressLabel: "Address",
    registrationLabel: "Registration",
    socialLabel: "Social",
    placeholderNote:
      "These details are placeholders. They are not live contact routes yet.",
  },
  form: {
    heading: "Send a message",
    intro:
      "Use this form for general enquiries. For applications, the student interest form has the questions we actually need.",
  },
  response: {
    heading: "What happens next",
    body: "A real person reads the message. If it needs an answer, we will reply to the email address you provide. We do not publish a response-time promise we cannot keep.",
  },
} as const;
