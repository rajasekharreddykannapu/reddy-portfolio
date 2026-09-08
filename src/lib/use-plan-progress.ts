"use client";

import { useCallback, useEffect, useMemo, useState, useSyncExternalStore } from "react";
import type { PlanDayKey } from "@/lib/tmm-plan";
import { planWeeks, sessionsForWeek } from "@/lib/tmm-plan";

const STORAGE_KEY = "tmm-plan-progress-v1";

export type PlanProgress = Record<string, boolean>;

export function sessionKey(week: number, day: PlanDayKey): string {
  return `${week}-${day}`;
}

function readStore(): PlanProgress {
  if (typeof window === "undefined") return {};
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw) as PlanProgress;
    return parsed && typeof parsed === "object" ? parsed : {};
  } catch {
    return {};
  }
}

let memory: PlanProgress = {};
const listeners = new Set<() => void>();

function emit() {
  for (const l of listeners) l();
}

function subscribe(onStoreChange: () => void) {
  listeners.add(onStoreChange);
  return () => listeners.delete(onStoreChange);
}

function getSnapshot(): PlanProgress {
  return memory;
}

function getServerSnapshot(): PlanProgress {
  return {};
}

function writeStore(next: PlanProgress) {
  memory = next;
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    /* quota / private mode — keep in-memory */
  }
  emit();
}

/** Hydrate from localStorage once on the client. */
export function hydratePlanProgress() {
  memory = readStore();
  emit();
}

export function usePlanProgress() {
  const [ready, setReady] = useState(false);
  const progress = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  useEffect(() => {
    hydratePlanProgress();
    setReady(true);

    const onStorage = (e: StorageEvent) => {
      if (e.key !== STORAGE_KEY) return;
      hydratePlanProgress();
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  const isDone = useCallback(
    (week: number, day: PlanDayKey) => Boolean(progress[sessionKey(week, day)]),
    [progress],
  );

  const toggle = useCallback((week: number, day: PlanDayKey) => {
    const key = sessionKey(week, day);
    const next = { ...memory, [key]: !memory[key] };
    if (!next[key]) delete next[key];
    writeStore(next);
  }, []);

  const markWeek = useCallback((week: number, done: boolean) => {
    const planWeek = planWeeks.find((w) => w.week === week);
    if (!planWeek) return;
    const next = { ...memory };
    for (const { day } of sessionsForWeek(planWeek)) {
      const key = sessionKey(week, day);
      if (done) next[key] = true;
      else delete next[key];
    }
    writeStore(next);
  }, []);

  const stats = useMemo(() => {
    let total = 0;
    let done = 0;
    let weeksComplete = 0;
    const perWeek: Record<number, { done: number; total: number }> = {};

    for (const week of planWeeks) {
      const days = sessionsForWeek(week);
      let wDone = 0;
      for (const { day } of days) {
        total += 1;
        if (progress[sessionKey(week.week, day)]) {
          done += 1;
          wDone += 1;
        }
      }
      perWeek[week.week] = { done: wDone, total: days.length };
      if (wDone === days.length) weeksComplete += 1;
    }

    return {
      done,
      total,
      pct: total === 0 ? 0 : Math.round((done / total) * 100),
      weeksComplete,
      weeksTotal: planWeeks.length,
      perWeek,
    };
  }, [progress]);

  return { ready, progress, isDone, toggle, markWeek, stats };
}
