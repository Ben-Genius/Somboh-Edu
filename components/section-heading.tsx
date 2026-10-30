export function SectionHeading({
  eyebrow,
  heading,
  intro,
  id,
  align = "default",
}: {
  eyebrow: string;
  heading: string;
  intro?: string;
  id?: string;
  align?: "default" | "center";
}) {
  if (align === "center") {
    return (
      <div className="mx-auto max-w-3xl text-center">
        <p className="eyebrow justify-center">{eyebrow}</p>
        <h2 id={id} className="display-2 mt-6">
          {heading}
        </h2>
        {intro ? <p className="lede mx-auto mt-6">{intro}</p> : null}
      </div>
    );
  }

  return (
    <div className="grid gap-6 md:grid-cols-12 md:gap-8">
      <div className="md:col-span-3">
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <div className="md:col-span-8 md:col-start-5">
        <h2 id={id} className="display-2 max-w-[20ch]">
          {heading}
        </h2>
        {intro ? <p className="lede mt-6">{intro}</p> : null}
      </div>
    </div>
  );
}
