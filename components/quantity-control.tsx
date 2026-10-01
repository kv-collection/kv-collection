"use client";

import { Minus, Plus } from "lucide-react";

export function QuantityControl({
  value,
  onChange,
  min = 1,
  max,
  label,
  size = "md",
}: {
  value: number;
  onChange: (value: number) => void;
  min?: number;
  max: number;
  label: string;
  size?: "sm" | "md";
}) {
  const btn = size === "sm" ? "size-9" : "size-12";
  return (
    <div className="inline-flex w-fit items-center rounded-full border border-border">
      <button
        type="button"
        onClick={() => onChange(value - 1)}
        disabled={value <= min}
        aria-label={`Decrease quantity of ${label}`}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Minus className="size-4" aria-hidden="true" />
      </button>
      <span className="min-w-8 text-center text-sm tabular-nums" aria-live="polite" aria-label={`Quantity ${value}`}>
        {value}
      </span>
      <button
        type="button"
        onClick={() => onChange(value + 1)}
        disabled={value >= max}
        aria-label={`Increase quantity of ${label}`}
        className={`${btn} flex items-center justify-center rounded-full transition-colors hover:bg-muted disabled:opacity-40 disabled:hover:bg-transparent`}
      >
        <Plus className="size-4" aria-hidden="true" />
      </button>
    </div>
  );
}
