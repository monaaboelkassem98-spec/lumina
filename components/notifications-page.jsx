'use client'

import { useState } from 'react'
import Image from 'next/image'
import {
  AtSign,
  BadgeCheck,
  CheckCheck,
  ChevronRight,
  Heart,
  MessageCircle,
  Repeat2,
  UserPlus,
  Users,
  Video,
  X,
} from 'lucide-react'
import { AppHeader } from './app-header'
import { BottomNav } from './bottom-nav'

const image = (id, width = 128) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&h=${width}&q=80`

const suggestions = [
  {
    id: 'kai',
    name: 'Kai Rivera',
    handle: '@kairivera.art',
    avatar: image('photo-1500648767791-00dcc994a43e', 192),
    reason: 'Followed by maya_art + 14 others',
    verified: true,
  },
  {
    id: 'elena-vance',
    name: 'Elena Vance',
    handle: '@elenavance',
    avatar: image('photo-1534528741775-53994a69daeb', 192),
    reason: 'Popular in Visual FX',
  },
]

const initialNotifications = [
  {
    id: 'like-dax',
    group: 'today',
    kind: 'like',
    names: ['dax.light'],
    text: 'liked your post.',
    time: '12m ago',
    avatar: image('photo-1535713875002-d1d0cf377fde'),
    preview: image('photo-1618005182384-a83a8bd57fbe', 160),
    unread: true,
  },
  {
    id: 'comment-zara',
    group: 'today',
    kind: 'comment',
    names: ['zara_sol'],
    text: 'commented: "The chromatic lighting is unreal!"',
    time: '34m ago',
    avatar: image('photo-1534528741775-53994a69daeb'),
    preview: image('photo-1519608487953-e999c86e7455', 160),
    unread: true,
    verified: true,
  },
  {
    id: 'follow-milo',
    group: 'today',
    kind: 'follow',
    names: ['milo.render'],
    text: 'started following you',
    time: '2h ago',
    avatar: image('photo-1506794778202-cad84cf45f1d'),
    unread: true,
  },
  {
    id: 'mention-elena',
    group: 'today',
    kind: 'mention',
    names: ['elena.creative'],
    text: 'mentioned you in a reel: "@you check this out"',
    time: '4h ago',
    avatar: image('photo-1517841905240-472988babdf9'),
    preview: image('photo-1550745165-9bc0b252726f', 160),
    unread: true,
    verified: true,
    reel: true,
  },
  {
    id: 'likes-astrid',
    group: 'week',
    kind: 'like',
    names: ['astrid_w', 'orion_flux'],
    text: 'and 48 others liked your reel.',
    time: '2d ago',
    avatar: image('photo-1544005313-94ddf0286df2'),
    preview: image('photo-1634017839464-5c339ebe3cb4', 160),
    unread: false,
  },
  {
    id: 'share-vector',
    group: 'week',
    kind: 'share',
    names: ['vector_lab'],
    text: 'shared your post to their story.',
    time: '4d ago',
    avatar: image('photo-1521737711867-e3b97375f902'),
    preview: image('photo-1558655146-9f40138edfeb', 160),
    unread: false,
  },
]

const filters = ['All', 'Mentions', 'Followers', 'Verified']

const notificationIcons = {
  like: Heart,
  comment: MessageCircle,
  follow: UserPlus,
  mention: AtSign,
  share: Repeat2,
}

const notificationColors = {
  like: 'bg-brand-pink text-white',
  comment: 'bg-brand-violet text-white',
  follow: 'bg-brand-orange text-[#101629]',
  mention: 'bg-violet-600 text-white',
  share: 'bg-brand-lavender text-[#101629]',
}

function NotificationRow({ notification, read, onRead, onFollowBack, following }) {
  const Icon = notificationIcons[notification.kind]

  return (
    <article className="relative flex items-center gap-3 rounded-2xl bg-card/90 px-3 py-3.5">
      {!read && <span className="absolute left-2.5 top-5 size-2.5 rounded-full bg-brand-pink shadow-[0_0_10px_rgba(240,76,166,0.6)]" />}
      <button type="button" onClick={onRead} aria-label="Mark notification as read" className="relative ml-2 size-[58px] shrink-0 overflow-visible rounded-full">
        <span className="relative block size-full overflow-hidden rounded-full">
          <Image src={notification.avatar} alt="" fill sizes="58px" className="object-cover" />
        </span>
        <span className={`absolute -bottom-1 -right-1 grid size-7 place-items-center rounded-full ring-[3px] ring-card ${notificationColors[notification.kind]}`}>
          <Icon className="size-3.5" strokeWidth={2.5} />
        </span>
      </button>

      <div className="min-w-0 flex-1 self-center">
        <p className="text-[14px] leading-[1.4] text-foreground/90">
          {notification.names.map((name, index) => (
            <span key={name}>
              {index > 0 && <span className="font-normal">, </span>}
              <span className="font-bold text-foreground">{name}</span>
              {notification.verified && index === 0 && <BadgeCheck className="ml-1 inline size-3.5 align-[-2px] text-brand-lavender" />}
            </span>
          ))}{' '}
          {notification.text}
        </p>
        <div className="mt-1 flex items-center gap-2 text-xs text-foreground/65">
          <span>{notification.time}</span>
          {notification.kind === 'comment' && <button type="button" className="font-semibold text-brand-lavender hover:text-white">Reply</button>}
        </div>
        {notification.kind === 'follow' && (
          <button type="button" onClick={onFollowBack} className={`mt-2 rounded-full px-4 py-1.5 text-xs font-bold transition-colors ${following ? 'bg-secondary text-foreground' : 'bg-secondary text-brand-lavender hover:bg-brand-violet hover:text-white'}`}>
            {following ? 'Following' : 'Follow Back'}
          </button>
        )}
      </div>

      {notification.preview && (
        <button type="button" onClick={onRead} aria-label="View related post" className="relative size-[58px] shrink-0 overflow-hidden rounded-xl bg-secondary">
          <Image src={notification.preview} alt="Related post" fill sizes="58px" className="object-cover" />
          {notification.reel && <Video className="absolute right-1 top-1 size-4 text-white drop-shadow" />}
        </button>
      )}
    </article>
  )
}

export function NotificationsPage() {
  const [activeFilter, setActiveFilter] = useState('All')
  const [notifications, setNotifications] = useState(initialNotifications)
  const [dismissedSuggestions, setDismissedSuggestions] = useState([])
  const [following, setFollowing] = useState([])

  const visibleNotifications = notifications.filter((notification) => {
    if (activeFilter === 'Mentions') return notification.kind === 'mention'
    if (activeFilter === 'Followers') return notification.kind === 'follow'
    if (activeFilter === 'Verified') return notification.verified
    return true
  })

  function markAllAsRead() {
    setNotifications((current) => current.map((notification) => ({ ...notification, unread: false })))
  }

  function markAsRead(id) {
    setNotifications((current) => current.map((notification) => notification.id === id ? { ...notification, unread: false } : notification))
  }

  function toggleFollow(id) {
    setFollowing((current) => current.includes(id) ? current.filter((entry) => entry !== id) : [...current, id])
  }

  return (
    <div className="min-h-dvh bg-background">
      <div className="relative mx-auto min-h-dvh max-w-md bg-background pb-28 text-foreground">
        <AppHeader />

        <main className="px-4 pt-3">
          <div role="tablist" aria-label="Notification filters" className="flex gap-2 overflow-x-auto pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            {filters.map((filter) => (
              <button key={filter} type="button" role="tab" aria-selected={activeFilter === filter} onClick={() => setActiveFilter(filter)} className={`shrink-0 rounded-full px-5 py-2 text-sm font-semibold transition-colors ${activeFilter === filter ? 'bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange text-[#101629]' : 'bg-secondary/70 text-foreground/85 hover:bg-secondary'}`}>
                {filter}
              </button>
            ))}
          </div>

          <button type="button" onClick={() => setActiveFilter('Followers')} className="mt-3 flex w-full items-center gap-3 rounded-2xl bg-card px-4 py-4 text-left transition-colors hover:bg-secondary/80">
            <span className="relative grid size-[60px] shrink-0 place-items-center rounded-full bg-secondary text-brand-lavender">
              <Users className="size-8" />
              <span className="absolute -right-0.5 -top-1 grid size-5 place-items-center rounded-full bg-brand-pink text-[11px] font-bold text-white">3</span>
            </span>
            <span className="min-w-0 flex-1">
              <span className="block text-[20px] font-bold leading-tight">Follow Requests</span>
              <span className="mt-1 block truncate text-sm text-foreground/75">Kaelen, Mara, and 1 other</span>
            </span>
            <span className="flex shrink-0 items-center -space-x-3">
              {['photo-1506794778202-cad84cf45f1d', 'photo-1534528741775-53994a69daeb', 'photo-1544005313-94ddf0286df2'].map((avatar) => (
                <span key={avatar} className="relative size-9 overflow-hidden rounded-full border-2 border-card">
                  <Image src={image(avatar)} alt="" fill sizes="36px" className="object-cover" />
                </span>
              ))}
            </span>
            <ChevronRight className="size-5 shrink-0 text-brand-lavender" />
          </button>

          {activeFilter === 'All' && (
            <section aria-label="Suggested creators" className="mt-6">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-[20px] font-bold">Suggested for You<span className="ml-1 text-brand-orange">.</span></h2>
                <button type="button" onClick={() => setDismissedSuggestions([])} className="text-sm font-semibold text-brand-lavender hover:text-white">See all</button>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {suggestions.filter((suggestion) => !dismissedSuggestions.includes(suggestion.id)).map((suggestion) => (
                  <article key={suggestion.id} className="relative flex min-h-[296px] flex-col items-center rounded-[22px] bg-card px-3 pb-4 pt-5 text-center">
                    <button type="button" onClick={() => setDismissedSuggestions((current) => [...current, suggestion.id])} aria-label={`Dismiss ${suggestion.name}`} className="absolute right-3 top-3 text-foreground/70 hover:text-foreground"><X className="size-4" /></button>
                    <span className="rounded-full bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[2.5px] shadow-[0_0_16px_rgba(163,62,255,0.28)]">
                      <span className="relative block size-[82px] overflow-hidden rounded-full border-[3px] border-card">
                        <Image src={suggestion.avatar} alt={suggestion.name} fill sizes="82px" className="object-cover" />
                      </span>
                    </span>
                    <h3 className="mt-3 flex min-h-7 items-center gap-1 text-[19px] font-bold leading-6">{suggestion.name}{suggestion.verified && <BadgeCheck className="size-4 shrink-0 text-brand-lavender" />}</h3>
                    <p className="text-sm text-foreground/70">{suggestion.handle}</p>
                    <p className={`mt-2 flex min-h-9 items-center justify-center text-xs font-semibold ${suggestion.id === 'elena-vance' ? 'text-brand-pink' : 'text-foreground/75'}`}>{suggestion.reason}</p>
                    <button type="button" onClick={() => toggleFollow(suggestion.id)} className={`mt-auto h-10 w-full rounded-full text-sm font-bold text-white transition-colors ${following.includes(suggestion.id) ? 'bg-secondary text-foreground' : 'bg-gradient-to-r from-brand-violet to-[#c90073] hover:brightness-110'}`}>
                      {following.includes(suggestion.id) ? 'Following' : 'Follow'}
                    </button>
                  </article>
                ))}
              </div>
            </section>
          )}

          <section aria-label="Notifications" className="mt-7">
            <div className="mb-2 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/90">Today</h2>
              <button type="button" onClick={markAllAsRead} className="text-xs font-semibold text-brand-lavender hover:text-white">Mark all as read</button>
            </div>
            <div className="space-y-1.5">
              {visibleNotifications.filter((item) => item.group === 'today').map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  read={!notification.unread}
                  onRead={() => markAsRead(notification.id)}
                  onFollowBack={() => toggleFollow(notification.id)}
                  following={following.includes(notification.id)}
                />
              ))}
            </div>
            {visibleNotifications.filter((item) => item.group === 'today').length === 0 && <p className="rounded-2xl bg-card px-4 py-7 text-center text-sm text-muted-foreground">No notifications in this filter.</p>}

            <div className="mb-2 mt-6 flex items-center justify-between">
              <h2 className="text-sm font-bold uppercase tracking-wide text-foreground/90">This Week</h2>
              <button type="button" onClick={() => setActiveFilter('All')} className="text-sm text-foreground/70 hover:text-foreground">Earlier</button>
            </div>
            <div className="space-y-1.5">
              {visibleNotifications.filter((item) => item.group === 'week').map((notification) => (
                <NotificationRow
                  key={notification.id}
                  notification={notification}
                  read={!notification.unread}
                  onRead={() => markAsRead(notification.id)}
                  onFollowBack={() => toggleFollow(notification.id)}
                  following={following.includes(notification.id)}
                />
              ))}
            </div>
          </section>
        </main>

        <BottomNav activeItem="activity" />
      </div>
    </div>
  )
}