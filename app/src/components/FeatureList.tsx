const features = [
  {
    title: "Design concierge",
    description:
      "Pair with a designer to finesse typography, foil stamping, and print specs within 48 hours.",
    icon: "🎨",
  },
  {
    title: "Timeline toolkit",
    description:
      "Auto-generate reminders for RSVPs, venue walk-throughs, and travel announcements.",
    icon: "🗓️",
  },
  {
    title: "Guest-ready delivery",
    description:
      "Export print-ready PDFs, animated reveals, or sharable micro-sites tailored to your guest list.",
    icon: "🚀",
  },
];

export function FeatureList() {
  return (
    <div className="grid gap-6 md:grid-cols-3">
      {features.map((feature) => (
        <article
          key={feature.title}
          className="rounded-3xl border border-white/10 bg-white/5 p-6 shadow-xl shadow-indigo-500/10 transition hover:-translate-y-1 hover:border-white/20 hover:shadow-indigo-500/20"
        >
          <span className="text-3xl">{feature.icon}</span>
          <h3 className="mt-4 text-lg font-semibold text-white">
            {feature.title}
          </h3>
          <p className="mt-2 text-sm text-white/70">{feature.description}</p>
        </article>
      ))}
    </div>
  );
}
