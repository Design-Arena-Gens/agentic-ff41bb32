'use client';

import {
  useEffect,
  useMemo,
  useState,
  type ChangeEvent,
  type FormEvent,
} from "react";
import type { Product } from "@/data/products";

type SavedDate = {
  id: string;
  label: string;
  eventType: string;
  date: string;
  location: string;
  productId: string | null;
  note: string;
  createdAt: number;
};

const STORAGE_KEY = "datesave-saved-dates";

const emptyForm: Omit<SavedDate, "id" | "createdAt"> = {
  label: "",
  eventType: "",
  date: "",
  location: "",
  productId: null,
  note: "",
};

type DateSaverProps = {
  products: Product[];
};

export function DateSaver({ products }: DateSaverProps) {
  const [form, setForm] = useState(emptyForm);
  const [savedDates, setSavedDates] = useState<SavedDate[]>(() => {
    if (typeof window === "undefined") {
      return [];
    }
    try {
      const payload = window.localStorage.getItem(STORAGE_KEY);
      if (!payload) return [];
      return JSON.parse(payload) as SavedDate[];
    } catch {
      return [];
    }
  });
  const [status, setStatus] = useState<"idle" | "saved" | "error">("idle");

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(savedDates));
  }, [savedDates]);

  const chosenProduct = useMemo(
    () => products.find((p) => p.id === form.productId) ?? null,
    [products, form.productId],
  );

  const handleChange = (field: keyof typeof form) => {
    return (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
      setForm((prev) => ({ ...prev, [field]: event.target.value }));
      setStatus("idle");
    };
  };

  const handleSelect = (value: string | null) => {
    setForm((prev) => ({ ...prev, productId: value }));
    setStatus("idle");
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!form.label || !form.date) {
      setStatus("error");
      return;
    }

    const payload: SavedDate = {
      ...form,
      id: crypto.randomUUID(),
      createdAt: Date.now(),
    };
    setSavedDates((prev) => [payload, ...prev]);
    setForm(emptyForm);
    setStatus("saved");
  };

  const handleDelete = (id: string) => {
    setSavedDates((prev) => prev.filter((item) => item.id !== id));
  };

  return (
    <div className="glass-panel relative overflow-hidden rounded-4xl p-8 sm:p-12">
      <div className="absolute inset-0 -z-10 opacity-30">
        <div className="grid-pattern h-full w-full" />
      </div>
      <div className="flex flex-col gap-8 lg:flex-row lg:items-start">
        <form
          onSubmit={handleSubmit}
          className="flex w-full flex-1 flex-col gap-6 rounded-3xl bg-slate-900/60 p-6 shadow-inner shadow-black/30"
        >
          <header className="flex flex-col gap-2">
            <h2 className="text-2xl font-semibold text-white">
              Save a celebration date
            </h2>
            <p className="text-sm text-white/70">
              Capture the headline details, pair it with a design, and we will
              keep it ready for your next visit.
            </p>
          </header>

          <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
            Event title
            <input
              type="text"
              required
              value={form.label}
              onChange={handleChange("label")}
              placeholder="Alex & Jordan — Sunset Welcome Party"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </label>

          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              Occasion
              <input
                type="text"
                value={form.eventType}
                onChange={handleChange("eventType")}
                placeholder="Rehearsal Dinner"
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </label>

            <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
              Date
              <input
                type="date"
                required
                value={form.date}
                onChange={handleChange("date")}
                className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
              />
            </label>
          </div>

          <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
            Location
            <input
              type="text"
              value={form.location}
              onChange={handleChange("location")}
              placeholder="Maui, Hawaii"
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </label>

          <label className="flex flex-col gap-2 text-sm font-medium text-white/80">
            Notes for the designer
            <textarea
              rows={4}
              value={form.note}
              onChange={handleChange("note")}
              placeholder="Include our monogram and a seaside motif."
              className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-base text-white placeholder:text-white/40 focus:border-primary-500 focus:outline-none focus:ring-2 focus:ring-primary-500/50"
            />
          </label>

          <div className="space-y-3 rounded-3xl bg-black/40 p-4">
            <p className="text-sm font-semibold uppercase tracking-widest text-white/50">
              Bundle with a design
            </p>
            <div className="flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                  form.productId === null
                    ? "bg-primary-500 text-white"
                    : "bg-white/5 text-white/70 hover:bg-white/10"
                }`}
              >
                Decide later
              </button>
              {products.map((product) => (
                <button
                  key={product.id}
                  type="button"
                  onClick={() => handleSelect(product.id)}
                  className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                    form.productId === product.id
                      ? "bg-primary-500 text-white"
                      : "bg-white/5 text-white/70 hover:bg-white/10"
                  }`}
                >
                  {product.name}
                </button>
              ))}
            </div>
            {chosenProduct && (
              <p className="text-xs text-white/60">
                Selected bundle: <span className="font-semibold text-white">{chosenProduct.name}</span>{" "}
                — {chosenProduct.price}
              </p>
            )}
          </div>

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              className="flex-1 rounded-full bg-primary-500 px-6 py-3 text-base font-semibold text-white shadow-lg shadow-primary-500/30 transition hover:bg-primary-600 hover:shadow-xl hover:shadow-primary-500/40"
            >
              Save the date
            </button>
            <button
              type="button"
              onClick={() => {
                setForm(emptyForm);
                setStatus("idle");
              }}
              className="rounded-full border border-white/10 px-6 py-3 text-sm font-medium text-white/70 transition hover:border-white/30 hover:text-white"
            >
              Clear form
            </button>
          </div>
          {status === "saved" && (
            <p className="text-sm font-medium text-emerald-300">
              Date saved! We&apos;ll remember this when you return.
            </p>
          )}
          {status === "error" && (
            <p className="text-sm font-medium text-rose-300">
              Add an event title and date before saving.
            </p>
          )}
        </form>

        <aside className="flex w-full flex-1 flex-col gap-4 rounded-3xl border border-white/5 bg-white/5 p-6">
          <header className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-white">
                Saved itineraries
              </h3>
              <p className="text-sm text-white/60">
                Synced locally • Bring them back anytime
              </p>
            </div>
            <span className="rounded-full bg-primary-500/20 px-3 py-1 text-xs font-semibold text-primary-100">
              {savedDates.length}
            </span>
          </header>

          <div className="flex flex-col gap-4 overflow-y-auto pr-1">
            {savedDates.length === 0 && (
              <div className="rounded-2xl border border-white/10 bg-black/30 p-6 text-sm text-white/60">
                Your saved celebrations will appear here. Create your first one
                to unlock timeline reminders and handoff files.
              </div>
            )}

            {savedDates.map((item) => {
              const product = products.find((product) => product.id === item.productId);
              return (
                <article
                  key={item.id}
                  className="group rounded-2xl border border-white/10 bg-black/40 p-5 transition hover:border-primary-500/40 hover:bg-black/30"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col">
                      <h4 className="text-base font-semibold text-white">
                        {item.label || "New celebration"}
                      </h4>
                      <span className="text-sm text-white/50">
                        {item.date
                          ? new Date(item.date).toLocaleDateString(undefined, {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })
                          : "Date TBC"}
                      </span>
                    </div>
                    <button
                      onClick={() => handleDelete(item.id)}
                      className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60 transition hover:bg-rose-500/20 hover:text-white"
                    >
                      Remove
                    </button>
                  </div>
                  <dl className="grid gap-2 pt-3 text-xs text-white/60 sm:grid-cols-2">
                    {item.eventType && (
                      <div>
                        <dt className="uppercase tracking-[0.2em] text-white/30">
                          Occasion
                        </dt>
                        <dd className="text-sm text-white/70">
                          {item.eventType}
                        </dd>
                      </div>
                    )}
                    {item.location && (
                      <div>
                        <dt className="uppercase tracking-[0.2em] text-white/30">
                          Location
                        </dt>
                        <dd className="text-sm text-white/70">
                          {item.location}
                        </dd>
                      </div>
                    )}
                    {product && (
                      <div className="sm:col-span-2">
                        <dt className="uppercase tracking-[0.2em] text-white/30">
                          Bundle
                        </dt>
                        <dd className="text-sm text-white/70">
                          {product.name} &mdash; {product.price}
                        </dd>
                      </div>
                    )}
                    {item.note && (
                      <div className="sm:col-span-2">
                        <dt className="uppercase tracking-[0.2em] text-white/30">
                          Notes
                        </dt>
                        <dd className="text-sm text-white/70">{item.note}</dd>
                      </div>
                    )}
                  </dl>
                  <p className="pt-3 text-xs text-white/40">
                    Added{" "}
                    {new Date(item.createdAt).toLocaleString(undefined, {
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </article>
              );
            })}
          </div>
        </aside>
      </div>
    </div>
  );
}
