'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  BarChart3,
  Bookmark,
  Copy,
  Heart,
  MapPin,
  MessageSquare,
  MoreHorizontal,
  Music,
  Quote,
  Send,
  Sparkles,
} from 'lucide-react'
import { cn } from '../lib/utils'

export function PostCard({ post }) {
  const [liked, setLiked] = useState(false)
  const [saved, setSaved] = useState(false)
  const [slide, setSlide] = useState(0)

  return (
    <article className="overflow-hidden rounded-3xl bg-card">
      <header className="flex items-center gap-3 px-4 py-3">
        <span className="rounded-full bg-gradient-to-tr from-brand-violet to-brand-pink p-[2px]">
          <span className="relative block size-9 overflow-hidden rounded-full ring-2 ring-card">
            <Image src={post.avatar} alt="" fill sizes="36px" className="object-cover" />
          </span>
        </span>
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 text-sm font-semibold text-foreground">
            {post.username}
            {post.verified && <BadgeCheck className="size-4 text-foreground/80" aria-label="Verified" />}
            {post.sparkle && <Sparkles className="size-3.5 text-brand-pink" aria-hidden="true" />}
          </p>
          <p className="flex items-center gap-1 text-xs text-muted-foreground">
            {post.subtitleType === 'location' && <MapPin className="size-3 text-brand-pink" aria-hidden="true" />}
            {post.subtitle}
          </p>
        </div>
        <button type="button" aria-label="More options" className="text-foreground/80 hover:text-foreground">
          <MoreHorizontal className="size-5" />
        </button>
      </header>

      <div className="relative aspect-[0.96] w-full bg-muted">
        <Image src={post.image} alt={post.imageAlt} fill sizes="(max-width: 448px) 100vw, 448px" className="object-cover" />

        {post.slides && (
          <>
            <span className="absolute right-3 top-3 flex items-center gap-1 rounded-full bg-black/50 px-2 py-0.5 text-[11px] font-medium text-white backdrop-blur-sm">
              <Copy className="size-3" aria-hidden="true" />
              {slide + 1}/{post.slides}
            </span>
            <div className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5 rounded-full bg-black/40 px-2.5 py-1.5 backdrop-blur-sm">
              {Array.from({ length: post.slides }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={slide === i}
                  onClick={() => setSlide(i)}
                  className={cn('size-1.5 rounded-full transition-colors', slide === i ? 'bg-white' : 'bg-white/40')}
                />
              ))}
            </div>
          </>
        )}

        {post.badge && (
          <span className="absolute left-3 top-3 flex items-center gap-1.5 rounded-full bg-black/50 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            <span className="size-2 rounded-full bg-brand-orange" aria-hidden="true" />
            {post.badge}
          </span>
        )}

        {post.audio && (
          <span className="absolute bottom-3 left-3 flex items-center gap-2 rounded-full bg-black/55 px-3 py-1.5 text-[11px] font-semibold text-white backdrop-blur-sm">
            <Music className="size-3.5 text-brand-orange" aria-hidden="true" />
            {post.audio}
            <BarChart3 className="size-3.5" aria-hidden="true" />
          </span>
        )}
      </div>

      <div className="flex flex-col gap-2 px-4 pb-4 pt-3">
        <div className="flex items-center gap-5">
          <button
            type="button"
            onClick={() => setLiked((v) => !v)}
            aria-pressed={liked}
            aria-label={liked ? 'Unlike' : 'Like'}
            className="flex items-center gap-1.5 text-sm font-semibold text-foreground"
          >
            <Heart className={cn('size-6 transition-colors', liked && 'fill-brand-pink text-brand-pink')} />
            {post.likes}
          </button>
          <button type="button" aria-label="Comment" className="flex items-center gap-1.5 text-sm font-semibold text-foreground">
            <MessageSquare className="size-6" />
            {post.comments}
          </button>
          <button type="button" aria-label="Share" className="text-foreground">
            <Send className="size-5" />
          </button>
          <button
            type="button"
            onClick={() => setSaved((v) => !v)}
            aria-pressed={saved}
            aria-label={saved ? 'Remove from saved' : 'Save'}
            className="ml-auto text-foreground"
          >
            <Bookmark className={cn('size-5', saved && 'fill-foreground')} />
          </button>
        </div>

        <p className="text-sm leading-relaxed text-foreground/90">
          <span className="mr-1.5 font-semibold text-foreground">{post.username}</span>
          {post.caption}{' '}
          {post.hashtags.map((tag) => (
            <a key={tag} href="#" className="mr-1 text-brand-lavender hover:underline">
              #{tag}
            </a>
          ))}
        </p>

        {post.topComment && (
          <p className="flex items-center gap-2 truncate rounded-xl bg-secondary px-3 py-2 text-xs text-foreground/80">
            <Quote className="size-3 shrink-0 fill-brand-orange text-brand-orange" aria-hidden="true" />
            <span className="font-semibold text-foreground">{post.topComment.username}</span>
            <span className="truncate">{post.topComment.text}</span>
          </p>
        )}

        <button type="button" className="self-start text-xs text-muted-foreground hover:text-foreground">
          View all {post.comments} comments
        </button>
        <time className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground/80">{post.timeAgo}</time>
      </div>
    </article>
  )
}
