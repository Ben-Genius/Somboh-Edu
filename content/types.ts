export type Source = {
  id: string;
  citation: string;
};

export type SourceRef = {
  sourceId: string;
  marker: string;
};

export type Stat = {
  id: string;
  value: string;
  unit?: string;
  label: string;
  detail?: string;
  sourceId: string;
  emphasis?: boolean;
};

export type Program = {
  slug: string;
  number: string;
  title: string;
  shortLabel: string;
  menuDescription: string;
  summary: string;
  studentsGet: string;
  detail: string[];
  bullets: string[];
};

export type Link = {
  label: string;
  href: string;
};

export type AudiencePath = {
  label: string;
  title: string;
  body: string;
  linkLabel: string;
  href: string;
};

export type Step = {
  title: string;
  body: string;
};

export type TabId = "students" | "partners" | "donors";
