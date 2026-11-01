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

  // Heading on the left, its intro beside it on large screens, so a
  // section opens in one row instead of a tall stack.
  if (intro) {
    return (
      <div className="grid gap-6 lg:grid-cols-12 lg:items-end lg:gap-10">
        <div className="lg:col-span-7">
          <p className="eyebrow">{eyebrow}</p>
          <h2 id={id} className="display-2 mt-6 max-w-[22ch]">
            {heading}
          </h2>
        </div>
        <p className="lede lg:col-span-5">{intro}</p>
      </div>
    );
  }

  return (
    <div className="max-w-3xl">
      <p className="eyebrow">{eyebrow}</p>
      <h2 id={id} className="display-2 mt-6 max-w-[22ch]">
        {heading}
      </h2>
    </div>
  );
}
