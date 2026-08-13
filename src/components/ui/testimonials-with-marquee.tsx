import { cn } from "@/lib/utils"
import { TestimonialCard, TestimonialAuthor } from "@/components/ui/testimonial-card"

interface TestimonialsSectionProps {
  title: string
  description: string
  testimonials: Array<{
    author: TestimonialAuthor
    text: string
    href?: string
  }>
  className?: string
}

export function TestimonialsSection({ 
  title,
  description,
  testimonials,
  className 
}: TestimonialsSectionProps) {
  return (
    <section className={cn(
      "py-28 relative overflow-hidden text-white",
      "style={{ background: 'linear-gradient(180deg, #071321 0%, #0A1E33 50%, #071321 100%)' }}",
      className
    )}
    style={{ background: 'linear-gradient(180deg, #071321 0%, #0A1E33 50%, #071321 100%)' }}
    >
      {/* Ambient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-[#0E8C93]/8 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-[#F2803A]/6 rounded-full blur-[120px] pointer-events-none" />

      <div className="mx-auto flex max-w-7xl flex-col items-center gap-12 text-center relative z-10">
        <div className="flex flex-col items-center gap-4 px-4 max-w-3xl">
          <span className="text-xs font-sans font-semibold text-[#0E8C93] uppercase tracking-[0.18em] block">
            STUDENT WALL OF FAME
          </span>
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white leading-tight">
            {title}
          </h2>
          <p className="text-base sm:text-lg font-sans text-[#8FA3B8] leading-relaxed">
            {description}
          </p>
        </div>

        <div className="relative flex w-full flex-col items-center justify-center overflow-hidden py-4">
          <div className="group flex overflow-hidden p-2 [--gap:1.25rem] [gap:var(--gap)] flex-row [--duration:45s]">
            <div className="flex shrink-0 justify-around [gap:var(--gap)] animate-marquee flex-row group-hover:[animation-play-state:paused]">
              {[...Array(4)].map((_, setIndex) => (
                testimonials.map((testimonial, i) => (
                  <TestimonialCard 
                    key={`${setIndex}-${i}`}
                    {...testimonial}
                  />
                ))
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
