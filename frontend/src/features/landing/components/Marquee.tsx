const BLOCKS = [
  { id: "navy-blue", from: "#1a1f6e", to: "#2c3fcd" },
  { id: "midnight", from: "#0f3460", to: "#16213e" },
  { id: "violet", from: "#4776e6", to: "#8e54e9" },
  { id: "teal", from: "#2c5364", to: "#203a43" },
  { id: "periwinkle", from: "#6a82fb", to: "#4458d4" },
  { id: "steel", from: "#1f2127", to: "#3a6fd8" },
  { id: "ocean", from: "#0d1b2a", to: "#1b4f8a" },
  { id: "indigo", from: "#23074d", to: "#3b3ca0" },
  { id: "cobalt", from: "#1c1c5e", to: "#6b8cff" },
  { id: "sapphire", from: "#0a0e2e", to: "#2356c8" },
];

const ITEMS = ["a", "b"].flatMap((prefix) =>
  BLOCKS.map((b) => ({ ...b, id: `${prefix}-${b.id}` }))
);

export function Marquee() {
  return (
    <div
      id="marquee"
      className="overflow-hidden py-10 border-y border-border bg-muted/30"
      aria-hidden="true"
    >
      <div className="marquee-track flex gap-5">
        {ITEMS.map((block) => (
          <div
            key={block.id}
            className="flex-shrink-0 w-56 h-44 rounded-2xl shadow-md"
            style={{
              background: `linear-gradient(135deg, ${block.from} 0%, ${block.to} 100%)`,
            }}
          />
        ))}
      </div>
    </div>
  );
}
