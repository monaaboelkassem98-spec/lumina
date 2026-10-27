'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  ChevronRight,
  Flame,
  Heart,
  Image as ImageIcon,
  Play,
  Search,
  SlidersHorizontal,
  TrendingUp,
  Volume2,
  X,
} from 'lucide-react'
import { AppHeader } from './app-header'
import { BottomNav } from './bottom-nav'

const image = (id, width = 720) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const categories = ['Trending', 'Visual Art', 'Photography', 'Motion', 'Architecture']

const spotlights = [
  {
    id: 'zephyr',
    creator: '@zephyr_motion',
    image: image('photo-1508700115892-45ecd05ae2ad'),
    alt: 'Dancer moving through a dramatic stage light',
    likes: 48200,
    category: 'Motion',
    format: 'video',
    audio: 'Lush Waveforms',
    aspect: 'aspect-[0.68]',
    verified: true,
  },
  {
    id: 'arch-form',
    creator: '@arch_form',
    image: image('photo-1600607687939-ce8a6c25118c'),
    alt: 'Modern glass house overlooking a mountain landscape',
    likes: 18900,
    category: 'Architecture',
    format: 'photo',
    aspect: 'aspect-[1.08]',
  },
  {
    id: 'nova',
    creator: '@nova_sculpts',
    image: image('photo-1618005182384-a83a8bd57fbe'),
    alt: 'Iridescent abstract sculpture with vivid reflections',
    likes: 12400,
    category: 'Visual Art',
    format: 'photo',
    aspect: 'aspect-square',
  },
  {
    id: 'synth-spatial',
    creator: '@synth_spatial',
    image: image('photo-1519608487953-e999c86e7455'),
    alt: 'Neon-lit city scene in vivid pink and violet tones',
    likes: 35700,
    category: 'Visual Art',
    format: 'video',
    audio: 'Modular Dreams',
    aspect: 'aspect-[0.82]',
  },
  {
    id: 'atelier',
    creator: '@atelier_vogue',
    image: image('photo-1519608487953-e999c86e7455'),
    alt: 'Colorful street scene after dark',
    likes: 29100,
    category: 'Photography',
    format: 'photo',
    aspect: 'aspect-[0.82]',
  },
  {
    id: 'aurora',
    creator: '@aurora_nomad',
    image: image('photo-1531366936337-7c912a4589a7'),
    alt: 'Aurora borealis reflected across a still lake',
    likes: 61400,
    category: 'Photography',
    format: 'photo',
    aspect: 'aspect-[0.9]',
  },
]

const discussions = [
  { tag: 'DigitalRenaissance', count: '124K posts created this week', badge: 'TOP 1', category: 'Visual Art' },
  { tag: 'NeonAesthetics', count: '89K posts and remixes', badge: 'RISING', category: 'Visual Art' },
  { tag: 'MinimalStudio', count: '45K design inspirations', badge: 'DESIGN', category: 'Architecture' },
  { tag: 'MotionCulture', count: '32K loops shared today', badge: 'LIVE', category: 'Motion' },
  { tag: 'LightChasers', count: '28K new photographs', badge: 'HOT', category: 'Photography' },
]

function SpotlightCard({ post, liked, onLike }) {
  return (
    <article className={`group relative mb-2.5 isolate overflow-hidden rounded-2xl bg-card ${post.aspect}`}>
      <Image src={post.image} alt={post.alt} fill sizes="(max-width: 448px) 48vw, 210px" className="object-cover transition-transform duration-500 group-hover:scale-[1.04]" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/20" />

      <button type="button" onClick={onLike} aria-label={liked ? 'Unlike post' : 'Like post'} aria-pressed={liked} className="absolute left-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-black/40 text-white backdrop-blur-sm transition hover:bg-black/65">
        <Heart className={`size-[17px] ${liked ? 'fill-brand-pink text-brand-pink' : ''}`} />
      </button>

      {post.format === 'video' ? (
        <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"><Play className="ml-0.5 size-4 fill-current" /></span>
      ) : post.id === 'atelier' || post.id === 'aurora' ? (
        <span className="absolute right-2.5 top-2.5 grid size-8 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm"><ImageIcon className="size-4" /></span>
      ) : null}

      <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-2 px-2.5 pb-2.5 pt-8 text-white">
        <div className="min-w-0">
          <p className="flex items-center gap-1 truncate text-[11px] font-semibold drop-shadow">
            {post.creator}{post.verified && <BadgeCheck className="size-3.5 shrink-0 text-brand-lavender" />}
          </p>
          {post.audio && <p className="mt-1 flex items-center gap-1 truncate text-[10px] text-white/85"><Volume2 className="size-3 shrink-0" />{post.audio}</p>}
        </div>
        <span className="flex shrink-0 items-center gap-1 text-[11px] text-white/90"><Heart className={`size-3.5 ${liked ? 'fill-brand-pink text-brand-pink' : ''}`} />{formatCount(post.likes + (liked ? 1 : 0))}</span>
      </div>
    </article>
  )
}

function formatCount(count) {
  return count >= 1000 ? `${(count / 1000).toFixed(1)}k` : String(count)
}

export function ExplorePage() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('Trending')
  const [likedPosts, setLikedPosts] = useState([])
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [topOnly, setTopOnly] = useState(false)
  const [showAllDiscussions, setShowAllDiscussions] = useState(false)
  const [activePage, setActivePage] = useState(0)
  const [selectedDiscussion, setSelectedDiscussion] = useState(null)

  const normalizedQuery = query.trim().toLowerCase()
  const filteredPosts = spotlights.filter((post) => {
    const matchesCategory = category === 'Trending' || post.category === category
    const matchesQuery = `${post.creator} ${post.category} ${post.alt}`.toLowerCase().includes(normalizedQuery)
    const matchesTop = !topOnly || post.likes >= 25000
    return matchesCategory && matchesQuery && matchesTop
  })
  const leftPosts = filteredPosts.filter((_, index) => index % 2 === 0)
  const rightPosts = filteredPosts.filter((_, index) => index % 2 === 1)
  const visibleDiscussions = showAllDiscussions ? discussions : discussions.slice(0, 3)

  function toggleLike(id) {
    setLikedPosts((current) => current.includes(id) ? current.filter((postId) => postId !== id) : [...current, id])
  }

  function selectPerspective(index) {
    setActivePage(index)
    setCategory(['Trending', 'Visual Art', 'Photography'][index])
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="relative mx-auto min-h-dvh max-w-md bg-background pb-32 text-foreground">
        <AppHeader />

        <main>
          <section aria-label="Search and categories" className="px-[18px] pt-3">
            <div className="flex gap-2">
              <label className="flex h-12 min-w-0 flex-1 items-center gap-3 rounded-full bg-secondary px-4 text-muted-foreground">
                <Search className="size-[19px] shrink-0" />
                <span className="sr-only">Search tags, creators, sounds</span>
                <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search tags, creators, sounds" className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
                {query && <button type="button" onClick={() => setQuery('')} aria-label="Clear search" className="grid size-6 shrink-0 place-items-center"><X className="size-4" /></button>}
              </label>
              <button type="button" onClick={() => setFiltersOpen((open) => !open)} aria-label="Toggle filters" aria-expanded={filtersOpen} className={`grid size-12 shrink-0 place-items-center rounded-full bg-secondary transition-colors ${filtersOpen ? 'text-brand-lavender' : 'text-foreground'}`}><SlidersHorizontal className="size-5" /></button>
            </div>

            {filtersOpen && (
              <div className="mt-2 flex items-center justify-between rounded-2xl border border-white/5 bg-card px-4 py-3">
                <div><p className="text-sm font-semibold">Popular this week</p><p className="mt-0.5 text-xs text-muted-foreground">Show posts with 25k+ likes</p></div>
                <button type="button" role="switch" aria-checked={topOnly} onClick={() => setTopOnly((value) => !value)} className={`relative h-6 w-11 rounded-full transition-colors ${topOnly ? 'bg-brand-violet' : 'bg-muted'}`}><span className={`absolute top-1 size-4 rounded-full bg-white transition-transform ${topOnly ? 'translate-x-6' : 'translate-x-1'}`} /></button>
              </div>
            )}

            <div className="mt-3 flex gap-1.5 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
              {categories.map((item) => (
                <button key={item} type="button" onClick={() => { setCategory(item); setActivePage(item === 'Photography' ? 2 : item === 'Visual Art' ? 1 : 0) }} aria-pressed={category === item} className={`flex h-8 shrink-0 items-center gap-1.5 rounded-full px-3.5 text-xs font-semibold transition-colors ${category === item ? 'bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange text-[#101326]' : 'bg-secondary text-foreground/85 hover:bg-secondary/80'}`}>
                  {item === 'Trending' && <Flame className="size-3.5" />}{item}
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Spotlight curations" className="mt-5 px-[18px]">
            <div className="mb-3 flex items-center justify-between">
              <h1 className="flex items-center gap-2 text-xs font-bold uppercase tracking-wide"><span className="size-2 rounded-full bg-brand-pink shadow-[0_0_10px_#f04ca6]" /> Spotlight Curations</h1>
              <span className="text-xs text-foreground/75">Updated real-time</span>
            </div>

            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-2 items-start gap-2.5">
                <div>{leftPosts.map((post) => <SpotlightCard key={post.id} post={post} liked={likedPosts.includes(post.id)} onLike={() => toggleLike(post.id)} />)}</div>
                <div>{rightPosts.map((post) => <SpotlightCard key={post.id} post={post} liked={likedPosts.includes(post.id)} onLike={() => toggleLike(post.id)} />)}</div>
              </div>
            ) : (
              <div className="rounded-2xl bg-card px-5 py-12 text-center text-sm text-muted-foreground">No spotlights match your search.</div>
            )}
          </section>

          <section aria-label="Trending discussions" className="mt-5 px-[18px]">
            <div className="mb-3 flex items-center justify-between gap-3">
              <div className="flex min-w-0 items-center gap-2.5">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-violet/20 text-brand-lavender"><TrendingUp className="size-4" /></span>
                <div className="min-w-0"><h2 className="truncate text-[17px] font-bold leading-5">Trending Discussions</h2><p className="mt-0.5 truncate text-xs text-foreground/70">Hot across global creative feeds</p></div>
              </div>
              <button type="button" onClick={() => setShowAllDiscussions((value) => !value)} className="flex shrink-0 items-center gap-0.5 text-xs font-semibold text-brand-lavender hover:text-white">{showAllDiscussions ? 'Show less' : 'Explore All'} <ChevronRight className="size-4" /></button>
            </div>

            <ul className="space-y-1.5">
              {visibleDiscussions.map((discussion) => (
                <li key={discussion.tag}>
                  <button type="button" onClick={() => { setSelectedDiscussion(discussion.tag); setCategory(discussion.category); setActivePage(discussion.category === 'Photography' ? 2 : discussion.category === 'Visual Art' ? 1 : 0) }} aria-pressed={selectedDiscussion === discussion.tag} className={`flex w-full items-center gap-3 rounded-2xl bg-card px-3.5 py-3 text-left transition-colors hover:bg-secondary/80 ${selectedDiscussion === discussion.tag ? 'ring-1 ring-brand-violet/50' : ''}`}>
                    <span className="grid size-10 shrink-0 place-items-center rounded-xl bg-secondary text-base font-bold text-brand-lavender">#</span>
                    <span className="min-w-0 flex-1"><span className="flex flex-wrap items-center gap-2"><span className="truncate text-sm font-bold">{discussion.tag}</span><span className={`rounded px-1.5 py-0.5 text-[9px] font-bold tracking-wide ${discussion.badge === 'TOP 1' ? 'bg-brand-pink/20 text-brand-pink' : 'bg-secondary text-foreground/75'}`}>{discussion.badge}</span></span><span className="mt-0.5 block truncate text-xs text-foreground/70">{discussion.count}</span></span>
                    <ChevronRight className="size-5 shrink-0 text-brand-lavender" />
                  </button>
                </li>
              ))}
            </ul>
          </section>

          <section className="flex flex-col items-center px-5 pb-2 pt-6 text-center">
            <div className="flex items-center gap-1.5" aria-label="Explore perspectives">
              {[0, 1, 2].map((page) => <button key={page} type="button" onClick={() => selectPerspective(page)} aria-label={`Show perspective ${page + 1}`} aria-current={activePage === page ? 'true' : undefined} className={`size-2.5 rounded-full transition-transform ${activePage === page ? 'scale-110 bg-brand-pink' : 'bg-brand-lavender/70'}`} />)}
            </div>
            <p className="mt-2 text-xs text-muted-foreground">Unveiling more perspectives</p>
          </section>
        </main>

        <BottomNav activeItem="search" />
      </div>
    </div>
  )
}