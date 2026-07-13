import { notFound } from "next/navigation";
import Reveal from "@/components/Reveal";
import ToolCheckout from "@/components/ToolCheckout";
import { tools } from "@/lib/tools";

export function generateStaticParams() {
  return tools.map((tool) => ({ slug: tool.slug }));
}

export default async function ToolPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const tool = tools.find((t) => t.slug === slug);
  if (!tool) notFound();

  return (
    <div className="mx-auto max-w-3xl px-6 py-20">
      <Reveal>
        <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
          Store
        </p>
        <h1 className="mt-3 text-3xl font-semibold text-balance sm:text-4xl">
          {tool.name}
        </h1>
        <p className="mt-3 text-muted">{tool.tagline}</p>
        <p className="mt-4 max-w-xl text-sm text-muted">{tool.description}</p>
      </Reveal>

      <Reveal delay={0.1} className="mt-10">
        {tool.pricingModel === "pay-what-you-want" ? (
          <ToolCheckout toolSlug={tool.slug} toolName={tool.name} />
        ) : (
          <div className="rounded-2xl border border-dashed border-border p-8 text-center text-sm text-muted">
            Not available yet — check back soon.
          </div>
        )}
      </Reveal>
    </div>
  );
}
