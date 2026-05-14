import { Fragment } from "react";
import { cn } from "@/lib/utils";

interface SegmentedToggleProps<T extends string> {
  items: readonly T[];
  value: T;
  onChange: (item: T) => void;
  getLabel: (item: T) => string;
  ariaLabel: string;
}

export function SegmentedToggle<T extends string>({
  items,
  value,
  onChange,
  getLabel,
  ariaLabel,
}: SegmentedToggleProps<T>) {
  return (
    <div className="flex items-center gap-1" role="group" aria-label={ariaLabel}>
      {items.map((item, idx) => (
        <Fragment key={item}>
          {idx > 0 && <span className="text-border select-none text-sm px-0.5">|</span>}
          <button
            type="button"
            onClick={() => onChange(item)}
            aria-pressed={value === item}
            className={cn(
              "px-3 py-1.5 rounded-md text-label-lg transition-all duration-fast",
              value === item
                ? "bg-primary text-primary-foreground font-medium"
                : "text-muted-foreground hover:text-foreground hover:bg-muted"
            )}
          >
            {getLabel(item)}
          </button>
        </Fragment>
      ))}
    </div>
  );
}
