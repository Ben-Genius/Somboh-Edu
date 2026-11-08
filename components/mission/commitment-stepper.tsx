"use client";

import Image from "next/image";
import Link from "next/link";
import { useState, type KeyboardEvent } from "react";
import { ArrowRight } from "@/components/icons";
import { homePage } from "@/content/home";
import { missionPage } from "@/content/mission";
import { imageBlur } from "@/lib/blur";

/**
 * The scholarship cycle as a stepper: the steps listed down the left, the
 * chosen one shown as a photograph and a panel with the pages that cover it.
 * Built as tabs: arrow keys, Home and End move between steps.
 */
export function CommitmentStepper() {
  const { commitment } = missionPage;
  const steps = homePage.commitment.steps.map((step, index) => ({
    ...step,
    ...commitment.steps[index]!,
    id: `step-${index + 1}`,
    number: String(index + 1).padStart(2, "0"),
  }));
  const [active, setActive] = useState(0);

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    const last = steps.length - 1;
    let next: number | undefined;
    if (event.key === "ArrowDown" || event.key === "ArrowRight") next = active === last ? 0 : active + 1;
    else if (event.key === "ArrowUp" || event.key === "ArrowLeft") next = active === 0 ? last : active - 1;
    else if (event.key === "Home") next = 0;
    else if (event.key === "End") next = last;
    if (next === undefined) return;
    event.preventDefault();
    setActive(next);
    document.getElementById(`${steps[next]!.id}-tab`)?.focus();
  };

  return (
    <div className="grid gap-6 lg:grid-cols-12 lg:gap-8">
      {/* Step list: a sideways row on phones, a column on large screens. */}
      <div className="min-w-0 lg:col-span-3">
        <div className="no-scrollbar -mx-[clamp(1.25rem,3.8vw,3.5rem)] overflow-x-auto px-[clamp(1.25rem,3.8vw,3.5rem)] lg:mx-0 lg:overflow-visible lg:px-0">
          <div
            role="tablist"
            aria-label={commitment.listLabel}
            aria-orientation="vertical"
            className="flex min-w-max gap-2 lg:min-w-0 lg:flex-col lg:gap-0"
          >
            {steps.map((step, index) => {
              const selected = index === active;
              return (
                <button
                  key={step.id}
                  id={`${step.id}-tab`}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls={step.id}
                  tabIndex={selected ? 0 : -1}
                  onClick={() => setActive(index)}
                  onKeyDown={onKeyDown}
                  className={`tap flex min-h-[48px] items-center gap-3 rounded-full border px-4 text-left text-[0.9375rem] font-semibold transition-colors lg:rounded-none lg:border-0 lg:border-t-2 lg:px-0 lg:py-5 lg:text-[1.05rem] ${
                    selected
                      ? "border-ink bg-ink text-[var(--paper)] lg:border-ink lg:bg-transparent lg:text-ink"
                      : "border-line text-ink-soft hover:text-ink lg:border-line"
                  }`}
                >
                  <span
                    aria-hidden="true"
                    className={`tnum grid h-8 w-8 shrink-0 place-items-center rounded-full border font-display text-[0.75rem] ${
                      selected
                        ? "border-gold bg-gold text-[#0c1b33]"
                        : "border-line-strong"
                    }`}
                  >
                    {step.number}
                  </span>
                  {step.title}
                </button>
              );
            })}
          </div>
        </div>
        <p className="mt-5 hidden items-center gap-2 border-t border-line pt-5 text-[0.75rem] font-semibold uppercase tracking-[0.14em] text-ink-soft lg:flex">
          <span aria-hidden="true" className="text-[1rem] text-gold-ink">↻</span>
          {commitment.loopNote}
        </p>
      </div>

      {steps.map((step, index) => (
        <div
          key={step.id}
          id={step.id}
          role="tabpanel"
          aria-labelledby={`${step.id}-tab`}
          hidden={index !== active}
          className="grid gap-5 lg:col-span-9 lg:grid-cols-9 lg:gap-6"
        >
          <figure className="relative aspect-[4/3] overflow-hidden rounded-[1.5rem] bg-ink/10 shadow-[var(--shadow-float)] sm:aspect-[16/10] lg:col-span-4 lg:aspect-auto lg:min-h-[30rem]">
            <Image
              src={step.image.src}
              alt={step.image.alt}
              fill
              placeholder="blur"
              blurDataURL={imageBlur[step.image.blur]}
              sizes="(min-width: 1024px) 28vw, 100vw"
              className="animate-[fade-in_400ms_ease] object-cover object-[50%_25%] motion-reduce:animate-none"
            />
            <span
              aria-hidden="true"
              className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"
            />
            <figcaption className="absolute inset-x-0 bottom-0 p-5 text-[0.8125rem] leading-snug text-white">
              {step.image.caption}
            </figcaption>
          </figure>

          <div className="flex flex-col rounded-[1.5rem] bg-blue-wash p-7 sm:p-9 lg:col-span-5">
            <p className="tnum font-display text-[0.875rem] font-semibold text-gold-ink">
              {step.number} / {String(steps.length).padStart(2, "0")}
            </p>
            <h3 className="display-3 mt-4 text-ink">{step.title}</h3>
            <p className="mt-4 max-w-[34ch] text-[1.0625rem] leading-relaxed text-ink-soft">
              {step.body}
            </p>

            <div className="mt-10 lg:mt-auto lg:pt-10">
              <p className="text-[0.6875rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                {commitment.helpLabel}
              </p>
              <ul className="mt-3">
                {step.links.map((link) => (
                  <li key={link.href} className="border-t border-line first:border-t-0">
                    <Link
                      href={link.href}
                      prefetch
                      className="group flex min-h-[48px] items-center gap-3 py-2 text-[0.9375rem] text-ink"
                    >
                      <span aria-hidden="true" className="h-2 w-2 shrink-0 rounded-full bg-gold-ink" />
                      <span className="flex-1 underline-offset-4 group-hover:underline">{link.label}</span>
                      <ArrowRight className="h-4 w-4 text-ink-soft transition-transform group-hover:translate-x-0.5" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
