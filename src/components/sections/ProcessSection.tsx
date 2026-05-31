import { copy } from "@/content/copy";

const stepNumbers = ["01", "02", "03"] as const;

export function ProcessSection() {
  return (
    <section
      id="process"
      className="relative border-gallery-black/8 border-t bg-gallery-offwhite/95 px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-7xl">
        <header className="mb-16 md:mb-24">
          <p className="text-gallery-black/45 mb-3 text-xs tracking-[0.3em] uppercase">
            {copy.process.eyebrow}
          </p>
          <h2 className="font-heading text-gallery-black max-w-3xl text-4xl leading-tight md:text-5xl">
            {copy.process.title}
          </h2>
        </header>

        <ol className="grid gap-12 md:grid-cols-3 md:gap-8">
          {copy.process.steps.map((item, index) => (
            <li
              key={stepNumbers[index]}
              className="border-gallery-black/10 relative border-t pt-8"
            >
              <span className="font-heading text-gallery-black/20 text-6xl leading-none">
                {stepNumbers[index]}
              </span>
              <h3 className="font-heading text-gallery-black mt-6 text-2xl">
                {item.title}
              </h3>
              <p className="text-gallery-black/55 mt-4 text-sm leading-relaxed">
                {item.description}
              </p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
