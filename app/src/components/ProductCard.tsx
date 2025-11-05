import type { Product } from "@/data/products";

type ProductCardProps = {
  product: Product;
};

export function ProductCard({ product }: ProductCardProps) {
  return (
    <article className="group relative flex flex-col gap-4 rounded-3xl border border-white/10 bg-white/5 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-white/25 hover:bg-white/10 hover:shadow-2xl hover:shadow-indigo-500/20">
      <span
        className={`h-32 w-full rounded-2xl bg-gradient-to-br ${product.accent} opacity-90 transition-opacity group-hover:opacity-100`}
      />
      <div className="flex items-center justify-between gap-2">
        <h3 className="text-lg font-semibold text-white">{product.name}</h3>
        <span className="rounded-full bg-white/10 px-3 py-1 text-sm font-medium text-white/80">
          {product.price}
        </span>
      </div>
      <p className="text-sm text-white/70">{product.description}</p>
      <div className="flex flex-wrap gap-2">
        {product.tags.map((tag) => (
          <span
            key={tag}
            className="rounded-full bg-white/5 px-3 py-1 text-xs font-medium text-white/60"
          >
            {tag}
          </span>
        ))}
      </div>
      <span className="absolute inset-x-6 bottom-6 hidden items-center justify-center gap-2 text-sm font-semibold text-primary-100 transition-opacity group-hover:flex">
        Preview &amp; customize →
      </span>
    </article>
  );
}
