import Image from 'next/image'
import { Plus } from 'lucide-react'
import { cn } from '../lib/utils'

export function StoriesBar({ stories }) {
  return (
    <section aria-label="Stories" className="border-b border-border/60 pb-4 pt-1">
      <ul className="flex gap-4 overflow-x-auto px-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
        {stories.map((story) => (
          <li key={story.id} className="shrink-0">
            <button type="button" className="flex w-16 flex-col items-center gap-1.5">
              <span
                className={cn(
                  'relative rounded-full p-[2.5px]',
                  story.isOwn
                    ? 'bg-border'
                    : story.seen
                      ? 'bg-muted-foreground/40'
                      : 'bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange',
                )}
              >
                <span className="block rounded-full bg-background p-[2px]">
                  <span className="relative block size-14 overflow-hidden rounded-full">
                    <Image src={story.avatar} alt="" fill sizes="56px" className="object-cover" />
                  </span>
                </span>
                {story.isOwn && (
                  <span className="absolute bottom-0 right-0 flex size-5 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-pink ring-2 ring-background">
                    <Plus className="size-3 text-white" strokeWidth={3} aria-hidden="true" />
                  </span>
                )}
              </span>
              <span className="w-full truncate text-center text-[11px] font-medium text-foreground/90">
                {story.username}
              </span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  )
}
