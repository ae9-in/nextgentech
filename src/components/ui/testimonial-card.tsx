import { cn } from "@/lib/utils"
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar"
import { Star } from "lucide-react"

export interface TestimonialAuthor {
  name: string
  handle: string
  avatar: string
}

export interface TestimonialCardProps {
  author: TestimonialAuthor
  text: string
  href?: string
  className?: string
}

export function TestimonialCard({ 
  author,
  text,
  href,
  className
}: TestimonialCardProps) {
  const Card = href ? 'a' : 'div'
  
  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-2xl border backdrop-blur-md",
        "bg-white/[0.04] border-white/10 hover:bg-white/[0.08] hover:border-[#0E8C93]/40",
        "p-6 text-start",
        "w-[340px] sm:w-[380px] shrink-0",
        "transition-all duration-300 shadow-xl shadow-black/20 group relative overflow-hidden",
        className
      )}
    >
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#0E8C93]/40 to-transparent group-hover:via-[#0E8C93]" />
      
      <div className="flex items-center gap-3.5">
        <Avatar className="h-12 w-12 border-2 border-[#0E8C93]/30 shadow-md">
          <AvatarImage src={author.avatar} alt={author.name} className="object-cover" />
          <AvatarFallback className="bg-[#0E8C93]/20 text-[#0E8C93] font-bold text-sm">
            {author.name.substring(0, 2).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div className="flex flex-col items-start min-w-0">
          <h3 className="text-base font-display font-semibold text-white group-hover:text-[#0E8C93] transition-colors truncate">
            {author.name}
          </h3>
          <p className="text-xs font-sans text-[#8FA3B8] truncate">
            {author.handle}
          </p>
        </div>
        <div className="ml-auto flex items-center gap-0.5 text-amber-400">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
          ))}
        </div>
      </div>
      <p className="mt-4 text-sm sm:text-[15px] font-sans leading-relaxed text-[#C8D6E0]">
        &ldquo;{text}&rdquo;
      </p>
    </Card>
  )
}
