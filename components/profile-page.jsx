'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  BadgeCheck,
  Bookmark,
  Brush,
  ChartNoAxesCombined,
  ChevronRight,
  Clapperboard,
  Contact,
  FolderHeart,
  Grid3X3,
  Link2,
  Monitor,
  Pencil,
  Plane,
  Plus,
  Share2,
  Sparkles,
  Video,
  X,
} from 'lucide-react'
import { AppHeader } from './app-header'
import { BottomNav } from './bottom-nav'

const image = (id, width = 720) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

const posts = [
  { id: 'aurora', image: image('photo-1558655146-9f40138edfeb'), title: 'Aurora interface study', likes: '2.4k', comments: 84, saved: true, tagged: true },
  { id: 'dashboard', image: image('photo-1550745165-9bc0b252726f'), title: 'Neon dashboard concept', likes: '1.8k', comments: 62, saved: true, video: true },
  { id: 'studio', image: image('photo-1498050108023-c5249f4df085'), title: 'Studio setup', likes: '3.1k', comments: 106, tagged: true },
  { id: 'core', image: image('photo-1518770660439-4636190af475'), title: 'Core visual identity', likes: '4.6k', comments: 120, saved: true },
  { id: 'prism', image: image('photo-1634017839464-5c339ebe3cb4'), title: 'Prismatic object study', likes: '5.2k', comments: 217, video: true },
  { id: 'berlin', image: image('photo-1519608487953-e999c86e7455'), title: 'Berlin after dark', likes: '1.2k', comments: 48, tagged: true },
  { id: 'spheres', image: image('photo-1618005182384-a83a8bd57fbe'), title: 'Floating forms', likes: '3.8k', comments: 92, saved: true, video: true },
  { id: 'portrait', image: image('photo-1534528741775-53994a69daeb'), title: 'Future self', likes: '6.1k', comments: 303, video: true },
  { id: 'portfolio', image: image('photo-1460925895917-afdab827c52f'), title: 'Portfolio refresh', likes: '2.7k', comments: 76, tagged: true },
]

const highlights = [
  { label: 'Artworks', icon: Brush, color: 'text-brand-lavender' },
  { label: 'Travel', icon: Plane, color: 'text-brand-pink' },
  { label: 'Setups', icon: Monitor, color: 'text-brand-orange' },
  { label: 'Freebies', icon: FolderHeart, color: 'text-brand-lavender' },
  { label: 'BTS', icon: Video, color: 'text-brand-pink' },
]

const tabs = [
  { id: 'posts', label: 'Posts', icon: Grid3X3 },
  { id: 'reels', label: 'Reels', icon: Clapperboard },
  { id: 'saved', label: 'Saved', icon: Bookmark },
  { id: 'tagged', label: 'Tagged', icon: Contact },
]

export function ProfilePage() {
  const [activeTab, setActiveTab] = useState('posts')
  const [selectedPost, setSelectedPost] = useState(null)
  const [editing, setEditing] = useState(false)
  const [name, setName] = useState('Elena Rostova')
  const [bio, setBio] = useState('Curating light, neon gradients & digital spaces ✨\nWorking on @lumina_exp')
  const [copied, setCopied] = useState(false)
  const [activeHighlight, setActiveHighlight] = useState(null)

  const visiblePosts = posts.filter((post) => {
    if (activeTab === 'reels') return post.video
    if (activeTab === 'saved') return post.saved
    if (activeTab === 'tagged') return post.tagged
    return true
  })

  async function shareProfile() {
    const url = window.location.href
    try {
      if (navigator.share) {
        await navigator.share({ title: `${name} on Lumina`, url })
      } else {
        await navigator.clipboard.writeText(url)
        setCopied(true)
        window.setTimeout(() => setCopied(false), 1800)
      }
    } catch {
      setCopied(false)
    }
  }

  function saveProfile(event) {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    setName(formData.get('name').trim() || 'Elena Rostova')
    setBio(formData.get('bio').trim())
    setEditing(false)
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="relative mx-auto min-h-dvh max-w-md bg-background pb-28 text-foreground">
        <AppHeader />

        <main>
          <section aria-label="Profile overview" className="px-5 pt-5">
            <div className="flex items-center gap-4">
              <button type="button" onClick={() => setEditing(true)} aria-label="Edit profile photo" className="relative size-[112px] shrink-0 rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[3px] shadow-[0_0_20px_rgba(240,76,166,0.35)]">
                <span className="relative block size-full overflow-hidden rounded-full border-[3px] border-background">
                  <Image src={image('photo-1534528741775-53994a69daeb', 256)} alt="Elena Rostova" fill sizes="112px" className="object-cover" priority />
                </span>
                <span className="absolute -bottom-0.5 -right-0.5 grid size-[30px] place-items-center rounded-full bg-brand-violet text-background ring-2 ring-background"><Plus className="size-5" strokeWidth={2.5} /></span>
              </button>

              <dl className="grid min-w-0 flex-1 grid-cols-3 rounded-2xl bg-card px-2 py-4 text-center">
                <div><dt className="text-[19px] font-bold leading-6">148</dt><dd className="mt-0.5 text-xs font-medium text-foreground/75">Posts</dd></div>
                <div><dt className="text-[19px] font-bold leading-6">54.2K</dt><dd className="mt-0.5 text-xs font-medium text-foreground/75">Followers</dd></div>
                <div><dt className="text-[19px] font-bold leading-6">412</dt><dd className="mt-0.5 text-xs font-medium text-foreground/75">Following</dd></div>
              </dl>
            </div>

            <div className="mt-5">
              <h1 className="flex items-center gap-1.5 text-[25px] font-bold leading-tight">{name}<BadgeCheck className="size-5 text-brand-lavender" aria-label="Verified" /></h1>
              <p className="mt-1 text-[15px] font-semibold text-brand-pink">@elena.creative</p>
              <p className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-foreground/90">
                <Sparkles className="size-3.5 text-brand-lavender" /> Visual Artist &amp; UI Designer <span className="text-brand-pink">•</span> Berlin
              </p>
              <p className="mt-2.5 whitespace-pre-line text-[14px] leading-[1.55] text-foreground/95">{bio}</p>
              <a href="https://elenarostova.design" target="_blank" rel="noreferrer" className="mt-2 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-orange hover:underline">
                <Link2 className="size-4" /> elenarostova.design
              </a>
            </div>

            <div className="mt-5 flex gap-2">
              <button type="button" onClick={() => setEditing(true)} className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-2 text-sm font-semibold hover:bg-secondary/80"><Pencil className="size-4" /> Edit Profile</button>
              <button type="button" onClick={shareProfile} className="flex h-11 min-w-0 flex-1 items-center justify-center gap-2 rounded-2xl bg-secondary px-2 text-sm font-semibold hover:bg-secondary/80"><Share2 className="size-4" /> {copied ? 'Copied' : 'Share Profile'}</button>
              <button type="button" onClick={() => setActiveTab('posts')} aria-label="Profile insights" className="grid size-11 shrink-0 place-items-center rounded-2xl bg-secondary text-foreground hover:bg-secondary/80"><ChartNoAxesCombined className="size-5" /></button>
            </div>
          </section>

          <section aria-label="Highlights" className="mt-7">
            <div className="flex items-center justify-between px-5">
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/80">Highlights</h2>
              <button type="button" onClick={() => setActiveHighlight(activeHighlight === 'Archive' ? null : 'Archive')} className="flex items-center gap-1 text-sm font-semibold text-brand-lavender hover:text-white">Archive <ChevronRight className="size-4" /></button>
            </div>
            <div className="mt-3 flex justify-between gap-2 px-4">
              {highlights.map(({ label, icon: Icon, color }) => (
                <button key={label} type="button" onClick={() => setActiveHighlight(activeHighlight === label ? null : label)} aria-pressed={activeHighlight === label} className="flex min-w-0 flex-1 flex-col items-center gap-1.5">
                  <span className={`grid size-[68px] place-items-center rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[2px] ${activeHighlight === label ? 'shadow-[0_0_18px_rgba(163,62,255,0.4)]' : ''}`}>
                    <span className="grid size-full place-items-center rounded-full border-[3px] border-background bg-card"><Icon className={`size-6 ${color}`} /></span>
                  </span>
                  <span className="max-w-full truncate text-xs font-medium">{label}</span>
                </button>
              ))}
            </div>
          </section>

          <section aria-label="Profile posts" className="mt-7">
            <div role="tablist" aria-label="Profile content" className="grid grid-cols-4 border-b border-white/5">
              {tabs.map(({ id, label, icon: Icon }) => (
                <button key={id} type="button" role="tab" aria-label={label} aria-selected={activeTab === id} onClick={() => setActiveTab(id)} className={`relative grid h-12 place-items-center transition-colors ${activeTab === id ? 'text-brand-lavender' : 'text-foreground/55 hover:text-foreground'}`}>
                  <Icon className="size-[21px]" strokeWidth={activeTab === id ? 2.4 : 2} />
                  {activeTab === id && <span className="absolute bottom-0 h-0.5 w-8 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink" />}
                </button>
              ))}
            </div>

            <div className="grid grid-cols-3 gap-px bg-background">
              {visiblePosts.map((post) => (
                <button key={post.id} type="button" onClick={() => setSelectedPost(post)} aria-label={`View ${post.title}`} className="group relative aspect-square overflow-hidden bg-card">
                  <Image src={post.image} alt={post.title} fill sizes="(max-width: 448px) 33vw, 150px" className="object-cover transition-transform duration-300 group-hover:scale-105" />
                  {post.video && <Clapperboard className="absolute right-2 top-2 size-4 text-white drop-shadow" />}
                  <span className="absolute inset-0 flex items-center justify-center gap-4 bg-black/0 text-sm font-semibold text-white opacity-0 transition group-hover:bg-black/35 group-hover:opacity-100"><span>♥ {post.likes}</span><span>◉ {post.comments}</span></span>
                </button>
              ))}
            </div>
            {visiblePosts.length === 0 && <p className="px-5 py-12 text-center text-sm text-muted-foreground">Nothing here yet.</p>}
          </section>

          <section className="flex min-h-[245px] flex-col items-center justify-center px-5 pb-3 pt-8 text-center">
            <span className="grid size-12 place-items-center rounded-full bg-secondary text-brand-lavender"><Sparkles className="size-6" /></span>
            <h2 className="mt-3 text-lg font-bold">You&apos;re all caught up with Elena</h2>
            <p className="mt-1 text-sm text-foreground/70">New creations drop weekly from Berlin studio</p>
          </section>
        </main>

        <BottomNav activeItem="profile" />
      </div>

      {(editing || selectedPost || activeHighlight) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-5 backdrop-blur-sm" onClick={() => { setEditing(false); setSelectedPost(null); setActiveHighlight(null) }}>
          <section role="dialog" aria-modal="true" aria-label={editing ? 'Edit profile' : selectedPost?.title ?? activeHighlight} onClick={(event) => event.stopPropagation()} className="relative w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-card p-5 shadow-2xl">
            <button type="button" onClick={() => { setEditing(false); setSelectedPost(null); setActiveHighlight(null) }} aria-label="Close" className="absolute right-3 top-3 grid size-8 place-items-center rounded-full bg-secondary text-foreground"><X className="size-4" /></button>
            {editing ? (
              <form onSubmit={saveProfile} className="space-y-4 pt-3">
                <h2 className="text-lg font-bold">Edit profile</h2>
                <label className="block text-sm font-medium">Name<input name="name" defaultValue={name} className="mt-1.5 h-11 w-full rounded-xl border border-white/10 bg-background px-3 outline-none focus:border-brand-violet" /></label>
                <label className="block text-sm font-medium">Bio<textarea name="bio" defaultValue={bio} rows={3} className="mt-1.5 w-full resize-none rounded-xl border border-white/10 bg-background px-3 py-2 outline-none focus:border-brand-violet" /></label>
                <button type="submit" className="h-11 w-full rounded-xl bg-gradient-to-r from-brand-violet to-brand-pink text-sm font-bold text-white">Save changes</button>
              </form>
            ) : selectedPost ? (
              <div className="pt-4">
                <div className="relative aspect-square overflow-hidden rounded-xl"><Image src={selectedPost.image} alt={selectedPost.title} fill sizes="(max-width: 448px) 90vw, 400px" className="object-cover" /></div>
                <h2 className="mt-3 font-semibold">{selectedPost.title}</h2>
                <p className="mt-1 text-sm text-muted-foreground">♥ {selectedPost.likes} · {selectedPost.comments} comments</p>
              </div>
            ) : (
              <div className="px-2 py-8 text-center"><Sparkles className="mx-auto size-8 text-brand-lavender" /><h2 className="mt-3 text-lg font-bold">{activeHighlight}</h2><p className="mt-1 text-sm text-muted-foreground">Elena&apos;s saved moments and stories.</p></div>
            )}
          </section>
        </div>
      )}
    </div>
  )
}