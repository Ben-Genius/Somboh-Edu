"use client";

import { Command } from "cmdk";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { Drawer } from "vaul";
import { commandEntries, commandGroups } from "@/content/command";
import { ui } from "@/content/ui";
import { useFocusRestore, useOverlayHistory } from "@/lib/hooks";
import { ArrowUpRight, CloseIcon, SearchIcon } from "./icons";

function useIsMobile() {
  const [mobile, setMobile] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(max-width: 767px)");
    const update = () => setMobile(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return mobile;
}

function Results({ onSelect }: { onSelect: (href: string) => void }) {
  return (
    <Command.List
      label={ui.searchLabel}
      className="max-h-[min(58dvh,26rem)] overflow-y-auto overscroll-contain p-2"
    >
      <Command.Empty className="px-4 py-10 text-center text-sm text-ink-soft">
        {ui.command.noResults}
      </Command.Empty>

      {commandGroups.map((group) => {
        const entries = commandEntries.filter((entry) => entry.group === group.key);
        if (entries.length === 0) return null;

        return (
          <Command.Group
            key={group.key}
            heading={group.label}
            className="[&_[cmdk-group-heading]]:px-3 [&_[cmdk-group-heading]]:pb-1 [&_[cmdk-group-heading]]:pt-3 [&_[cmdk-group-heading]]:text-[0.65rem] [&_[cmdk-group-heading]]:font-semibold [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-[0.16em] [&_[cmdk-group-heading]]:text-ink-soft"
          >
            {entries.map((entry) => (
              <Command.Item
                key={entry.id}
                value={entry.id}
                keywords={[
                  entry.label,
                  entry.description ?? "",
                  ...(entry.keywords ?? []),
                ]}
                onSelect={() => onSelect(entry.href)}
                className="group flex cursor-pointer items-center gap-3 rounded-xl px-3 py-2.5 text-left data-[selected=true]:bg-clay"
              >
                <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full border border-line text-ink-soft">
                  <SearchIcon className="h-3.5 w-3.5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-ink">
                    {entry.label}
                  </span>
                  {entry.description ? (
                    <span className="block truncate text-xs leading-snug text-ink-soft">
                      {entry.description}
                    </span>
                  ) : null}
                </span>
                <ArrowUpRight className="h-4 w-4 shrink-0 text-ink-soft opacity-0 transition-opacity group-data-[selected=true]:opacity-100" />
              </Command.Item>
            ))}
          </Command.Group>
        );
      })}
    </Command.List>
  );
}

function SearchField({
  query,
  setQuery,
}: {
  query: string;
  setQuery: (value: string) => void;
}) {
  const inputRef = useRef<HTMLInputElement>(null);

  // The palette mounts its contents when it opens, so focusing on mount puts
  // the caret in the search field without an autoFocus attribute.
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  return (
    <div className="flex items-center gap-3 border-b border-line px-4">
      <SearchIcon className="h-5 w-5 shrink-0 text-ink-soft" />
      <Command.Input
        ref={inputRef}
        value={query}
        onValueChange={setQuery}
        placeholder={ui.command.placeholder}
        aria-label={ui.searchLabel}
        className="h-14 w-full bg-transparent text-[0.9375rem] text-ink outline-none placeholder:text-ink-soft"
      />
      {query ? (
        <button
          type="button"
          onClick={() => setQuery("")}
          className="tap inline-flex min-h-[44px] items-center text-xs font-medium text-ink-soft underline underline-offset-2"
        >
          {ui.command.clear}
        </button>
      ) : null}
    </div>
  );
}

function ShortcutHints() {
  return (
    <div className="hover-only items-center gap-4 border-t border-line px-4 py-2.5 text-[0.6875rem] text-ink-soft">
      <span className="inline-flex items-center gap-1">
        <kbd className="kbd">↑</kbd>
        <kbd className="kbd">↓</kbd>
        {ui.command.footerHint}
      </span>
      <span className="inline-flex items-center gap-1">
        <kbd className="kbd">↵</kbd>
        {ui.command.footerSelect}
      </span>
      <span className="inline-flex items-center gap-1">
        <kbd className="kbd">esc</kbd>
        {ui.command.footerClose}
      </span>
    </div>
  );
}

export function CommandMenu({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const isMobile = useIsMobile();
  const [query, setQuery] = useState("");
  const previousPath = useRef(pathname);

  const { skipHistoryOnClose } = useOverlayHistory(open, () => onOpenChange(false));
  useFocusRestore(open);

  useEffect(() => {
    if (open) setQuery("");
  }, [open]);

  useEffect(() => {
    if (previousPath.current !== pathname) {
      previousPath.current = pathname;
      if (open) onOpenChange(false);
    }
  }, [pathname, open, onOpenChange]);

  const go = (href: string) => {
    skipHistoryOnClose();
    onOpenChange(false);
    router.push(href);
  };

  return (
    <>
      <Command.Dialog
        open={open && !isMobile}
        onOpenChange={onOpenChange}
        label={ui.command.dialogLabel}
        overlayClassName="fixed inset-0 z-[70] bg-[#06101f]/45"
        contentClassName="fixed left-1/2 top-[10dvh] z-[80] w-[min(92vw,42rem)] -translate-x-1/2 overflow-hidden rounded-2xl border border-line bg-paper shadow-[var(--shadow-float)] outline-none"
      >
        <SearchField query={query} setQuery={setQuery} />
        <Results onSelect={go} />
        <ShortcutHints />
      </Command.Dialog>

      {isMobile ? (
        <Drawer.Root
          open={open}
          onOpenChange={onOpenChange}
          direction="bottom"
          shouldScaleBackground={false}
          setBackgroundColorOnScale={false}
        >
          <Drawer.Portal>
            <Drawer.Overlay className="fixed inset-0 z-[70] bg-[#06101f]/45" />
            <Drawer.Content
              className="fixed inset-x-0 bottom-0 z-[90] flex max-h-[90dvh] flex-col rounded-t-[1.75rem] border-t border-line bg-paper outline-none"
              aria-describedby="command-description"
            >
              <Drawer.Handle className="mx-auto mb-1 mt-3 h-1.5 w-11 shrink-0 rounded-full bg-line-strong" />
              <Drawer.Title className="sr-only">{ui.command.dialogLabel}</Drawer.Title>
              <Drawer.Description id="command-description" className="sr-only">
                {ui.searchLabel}
              </Drawer.Description>

              <div className="flex items-center justify-between px-5 pb-1 pt-2">
                <p className="text-[0.65rem] font-semibold uppercase tracking-[0.16em] text-ink-soft">
                  {ui.search}
                </p>
                <button
                  type="button"
                  className="icon-btn tap"
                  onClick={() => onOpenChange(false)}
                  aria-label={ui.closeSearch}
                >
                  <CloseIcon />
                </button>
              </div>

              <Command
                label={ui.command.dialogLabel}
                className="flex min-h-0 flex-1 flex-col"
              >
                <SearchField query={query} setQuery={setQuery} />
                <Results onSelect={go} />
                <div className="safe-bottom">
                  <ShortcutHints />
                </div>
              </Command>
            </Drawer.Content>
          </Drawer.Portal>
        </Drawer.Root>
      ) : null}
    </>
  );
}
