const testimonials = [
  {
    name: "Leah & Morgan",
    role: "Miami • Spring 2024",
    quote:
      "DateSave Studio was our planning anchor. We saved every event, matched the perfect designs, and our guests were blown away by the cohesive reveal.",
  },
  {
    name: "Kaito & Ren",
    role: "Tokyo • Winter 2023",
    quote:
      "The concierge team customized our bilingual suite in two days. Having our timeline synced with the designs kept everything effortlessly organized.",
  },
  {
    name: "Priya & Ezra",
    role: "Lisbon • Summer 2025",
    quote:
      "We loved the dynamic previews and local reminders. It felt like a luxe studio experience without the endless email back-and-forth.",
  },
];

export function Testimonials() {
  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {testimonials.map((item) => (
        <blockquote
          key={item.name}
          className="relative rounded-3xl border border-white/5 bg-gradient-to-br from-white/10 via-white/5 to-white/0 p-8 text-white shadow-lg shadow-indigo-500/10 before:absolute before:left-6 before:top-6 before:text-5xl before:text-white/20 before:content-['“']"
        >
          <p className="text-sm leading-relaxed text-white/80">{item.quote}</p>
          <footer className="mt-6 flex flex-col text-sm font-semibold text-white">
            {item.name}
            <span className="text-xs font-normal uppercase tracking-[0.3em] text-white/50">
              {item.role}
            </span>
          </footer>
        </blockquote>
      ))}
    </div>
  );
}
