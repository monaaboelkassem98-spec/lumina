'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import {
  ArrowLeft,
  Aperture,
  BadgeCheck,
  Camera,
  CheckCheck,
  Image as ImageIcon,
  LockKeyhole,
  MessageCircle,
  Phone,
  Plus,
  Search,
  Send,
  SlidersHorizontal,
  Smile,
  SquarePen,
  Video,
  X,
} from 'lucide-react'

const image = (id, size = 160) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${size}&h=${size}&q=80`

const creators = [
  { id: 'you', name: 'Your note', avatar: image('photo-1534528741775-53994a69daeb'), own: true, note: '+ Note' },
  { id: 'liam', name: 'Liam V.', avatar: image('photo-1500648767791-00dcc994a43e'), online: true, note: 'Coffee & sketches' },
  { id: 'maya', name: 'Maya', avatar: image('photo-1531123897727-8f129e1688ce'), online: true, note: 'Editing session' },
  { id: 'jordan', name: 'Jordan', avatar: image('photo-1506794778202-cad84cf45f1d'), online: true, note: 'Listening now' },
  { id: 'elena', name: 'Elena', avatar: image('photo-1517841905240-472988babdf9'), note: 'Tokyo ✈' },
]

const initialConversations = [
  {
    id: 'liam', name: 'Liam Vance', avatar: creators[1].avatar, online: true, verified: true,
    preview: 'Sent you a photo', time: '5m', unread: true, type: 'primary', photo: true,
  },
  {
    id: 'studio', name: 'Studio Neon', avatar: image('photo-1519608487953-e999c86e7455'),
    preview: 'Can we use this for the showcase?', time: '12m', type: 'primary',
  },
  {
    id: 'sophia', name: 'Sophia Chen', avatar: image('photo-1544005313-94ddf0286df2'), online: true,
    preview: 'Loved your latest reel! 💜', time: '1h', type: 'primary',
  },
  {
    id: 'alex', name: 'Alex Rivera', avatar: image('photo-1506794778202-cad84cf45f1d'),
    preview: 'Reacted ❤️ to your story', time: '3h', type: 'primary',
  },
  {
    id: 'creative-circle', name: 'Creative Circle', avatar: image('photo-1521737711867-e3b97375f902'),
    preview: 'Alex: Who is joining the design sprint?', time: 'Yesterday', type: 'general', group: true,
  },
  {
    id: 'aria', name: 'Aria Kim', avatar: image('photo-1534528741775-53994a69daeb'),
    preview: 'Hi! I loved your work and wanted to connect.', time: '2d', type: 'request',
  },
]

const initialThreads = {
  liam: [{ from: 'them', text: 'Just finished the set from last night. Sending you my favorite.', time: '9:42 AM', photo: true }],
  studio: [{ from: 'them', text: 'Can we use this for the showcase?', time: '9:18 AM' }],
  sophia: [{ from: 'them', text: 'Loved your latest reel! 💜', time: 'Yesterday' }],
}

function Avatar({ src, alt, online, size = 'size-14', ring = false }) {
  return (
    <span className={`relative block shrink-0 ${size}`}>
      <span className={`relative block size-full overflow-hidden rounded-full ${ring ? 'bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange p-[2px]' : ''}`}>
        <span className={`relative block size-full overflow-hidden rounded-full ${ring ? 'border-2 border-background' : ''}`}>
          <Image src={src} alt={alt} fill sizes="56px" className="object-cover" />
        </span>
      </span>
      {online && <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-background bg-emerald-400" />}
    </span>
  )
}

function ConversationThread({ conversation, onBack, onSend, messages }) {
  const [draft, setDraft] = useState('')

  function submitMessage(event) {
    event.preventDefault()
    const text = draft.trim()
    if (!text) return
    onSend(text)
    setDraft('')
  }

  return (
    <section className="flex min-h-dvh flex-col">
      <header className="sticky top-0 z-20 flex h-[68px] items-center gap-3 border-b border-white/5 bg-background/95 px-4 backdrop-blur-md">
        <button type="button" onClick={onBack} aria-label="Back to messages" className="grid size-9 place-items-center text-foreground/90 hover:text-white">
          <ArrowLeft className="size-5" />
        </button>
        <Avatar src={conversation.avatar} alt={conversation.name} online={conversation.online} size="size-10" />
        <div className="min-w-0 flex-1">
          <p className="flex items-center gap-1 truncate text-sm font-semibold text-foreground">
            {conversation.name}{conversation.verified && <BadgeCheck className="size-4 text-brand-lavender" />}
          </p>
          <p className="text-xs text-muted-foreground">{conversation.online ? 'Active now' : 'Lumina member'}</p>
        </div>
        <button type="button" aria-label="Voice call" className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"><Phone className="size-5" /></button>
        <button type="button" aria-label="Video call" className="grid size-9 place-items-center text-muted-foreground hover:text-foreground"><Video className="size-5" /></button>
      </header>

      <div className="flex flex-1 flex-col justify-end gap-4 px-4 pb-5 pt-8">
        <div className="mb-5 flex flex-col items-center gap-2 text-center">
          <Avatar src={conversation.avatar} alt={conversation.name} online={conversation.online} size="size-20" ring />
          <h1 className="mt-1 text-lg font-semibold text-foreground">{conversation.name}</h1>
          <p className="text-xs text-muted-foreground">You are connected on Lumina</p>
        </div>
        <p className="mb-2 text-center text-[11px] font-medium text-muted-foreground">TODAY</p>
        {messages.map((message, index) => (
          <div key={`${message.time}-${index}`} className={`flex ${message.from === 'you' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[82%] rounded-2xl px-4 py-3 text-sm leading-relaxed ${message.from === 'you' ? 'rounded-br-sm bg-gradient-to-br from-brand-violet to-brand-pink text-white' : 'rounded-bl-sm bg-secondary text-foreground'}`}>
              {message.photo && <div className="mb-2 flex items-center gap-2 text-xs text-current/80"><ImageIcon className="size-4" /> Photo</div>}
              {message.text}
              <p className={`mt-1 text-right text-[10px] ${message.from === 'you' ? 'text-white/70' : 'text-muted-foreground'}`}>{message.time}</p>
            </div>
          </div>
        ))}
      </div>

      <form onSubmit={submitMessage} className="sticky bottom-0 flex items-center gap-2 border-t border-white/5 bg-background/95 px-3 py-3 backdrop-blur-md">
        <button type="button" aria-label="Add attachment" className="grid size-9 shrink-0 place-items-center text-brand-lavender"><Plus className="size-5" /></button>
        <label className="flex min-w-0 flex-1 items-center rounded-full bg-secondary px-4">
          <span className="sr-only">Write a message</span>
          <input value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Message..." className="h-11 min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          <button type="button" aria-label="Add emoji" className="ml-2 text-muted-foreground"><Smile className="size-5" /></button>
        </label>
        <button type="submit" aria-label="Send message" disabled={!draft.trim()} className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-violet text-white transition-opacity disabled:opacity-40"><Send className="size-4" /></button>
      </form>
    </section>
  )
}

export function MessageInbox() {
  const [conversations, setConversations] = useState(initialConversations)
  const [activeTab, setActiveTab] = useState('primary')
  const [query, setQuery] = useState('')
  const [selectedId, setSelectedId] = useState(null)
  const [showNewChat, setShowNewChat] = useState(false)
  const [showNote, setShowNote] = useState(false)
  const [note, setNote] = useState('')
  const [noteDraft, setNoteDraft] = useState('')
  const [threads, setThreads] = useState(initialThreads)
  const selectedConversation = conversations.find((conversation) => conversation.id === selectedId)
  const normalizedQuery = query.trim().toLowerCase()
  const visibleCreators = creators.filter((creator) => creator.name.toLowerCase().includes(normalizedQuery))
  const visibleConversations = conversations.filter((conversation) => {
    const matchesTab = activeTab === 'requests' ? conversation.type === 'request' : conversation.type === activeTab
    const matchesQuery = `${conversation.name} ${conversation.preview}`.toLowerCase().includes(normalizedQuery)
    return matchesTab && matchesQuery
  })

  function sendMessage(text) {
    const time = new Intl.DateTimeFormat('en', { hour: 'numeric', minute: '2-digit' }).format(new Date())
    setThreads((current) => ({
      ...current,
      [selectedId]: [...(current[selectedId] ?? []), { from: 'you', text, time }],
    }))
    setConversations((current) => current.map((conversation) => conversation.id === selectedId
      ? { ...conversation, preview: text, time: 'now', unread: false }
      : conversation))
  }

  function startConversation(creator) {
    const existing = conversations.find((conversation) => conversation.id === creator.id)
    if (!existing) {
      setConversations((current) => [{
        id: creator.id,
        name: creator.name,
        avatar: creator.avatar,
        online: creator.online,
        preview: 'Start a conversation',
        time: 'now',
        type: 'primary',
      }, ...current])
    }
    setSelectedId(creator.id)
    setShowNewChat(false)
    setQuery('')
  }

  if (selectedConversation) {
    return (
      <main className="mx-auto min-h-dvh max-w-md bg-background text-foreground">
        <ConversationThread
          conversation={selectedConversation}
          messages={threads[selectedId] ?? []}
          onBack={() => setSelectedId(null)}
          onSend={sendMessage}
        />
      </main>
    )
  }

  return (
    <main className="relative mx-auto min-h-dvh max-w-md bg-background pb-32 text-foreground">
      <header className="flex h-[76px] items-center gap-3 px-4">
        <Link href="/" aria-label="Back to feed" className="grid size-9 shrink-0 place-items-center text-foreground hover:text-brand-lavender">
          <ArrowLeft className="size-6" />
        </Link>
        <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-brand-violet via-brand-pink to-sky-400 p-[2px]">
          <span className="flex size-full items-center justify-center rounded-[10px] bg-background"><Aperture className="size-6 text-brand-pink" /></span>
        </span>
        <h1 className="min-w-0 flex-1 truncate text-[21px] font-bold tracking-tight">Direct Messages</h1>
        <button type="button" aria-label="Your profile" className="relative size-9 shrink-0 overflow-hidden rounded-full ring-2 ring-border">
          <Image src={creators[0].avatar} alt="Your profile" fill sizes="36px" className="object-cover" />
        </button>
      </header>

      <div className="px-4 pt-3">
        <label className="flex h-12 items-center gap-3 rounded-2xl bg-secondary px-4 text-muted-foreground">
          <Search className="size-5 shrink-0" />
          <span className="sr-only">Search messages, creators or tags</span>
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search messages, creators or tags..." className="min-w-0 flex-1 bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
          <button type="button" aria-label="Search filters" className="shrink-0 hover:text-foreground"><SlidersHorizontal className="size-5" /></button>
        </label>
      </div>

      <section aria-label="Active creators" className="pt-6">
        <div className="flex items-center justify-between px-4">
          <h2 className="flex items-center gap-2 text-xs font-bold uppercase tracking-[0.12em] text-foreground/90">
            Active creators <span className="size-1.5 rounded-full bg-brand-pink" />
          </h2>
          <button type="button" onClick={() => { setNoteDraft(note); setShowNote(true) }} className="text-sm font-semibold text-brand-lavender hover:text-white">Leave Note</button>
        </div>
        <ul className="mt-3 flex gap-3 overflow-x-auto px-4 pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          {visibleCreators.map((creator) => (
            <li key={creator.id} className="w-[68px] shrink-0">
              <button type="button" onClick={() => creator.own ? (setNoteDraft(note), setShowNote(true)) : startConversation(creator)} className="flex w-full flex-col items-center gap-2 text-center">
                <span className="relative mt-5">
                  <span className={`block rounded-full p-[2px] ${creator.own || creator.online ? 'bg-gradient-to-tr from-brand-violet via-brand-pink to-brand-orange' : 'bg-secondary'}`}>
                    <span className="relative block size-[58px] overflow-hidden rounded-full border-2 border-background">
                      <Image src={creator.avatar} alt="" fill sizes="58px" className="object-cover" />
                    </span>
                  </span>
                  {creator.own ? (
                    <span className="absolute -bottom-0.5 -right-0.5 grid size-6 place-items-center rounded-full bg-brand-lavender text-background ring-2 ring-background"><Plus className="size-4" strokeWidth={3} /></span>
                  ) : creator.online ? <span className="absolute bottom-0 right-0 size-3.5 rounded-full border-2 border-background bg-emerald-400" /> : null}
                  <span className="absolute -top-5 left-1/2 max-w-[86px] -translate-x-1/2 truncate rounded-full bg-secondary px-2 py-1 text-[9px] font-semibold text-foreground/90">{creator.own ? (note || creator.note) : creator.note}</span>
                </span>
                <span className="w-full truncate text-xs font-semibold text-foreground/90">{creator.name}</span>
              </button>
            </li>
          ))}
        </ul>
      </section>

      <section aria-label="Message inbox" className="pt-5">
        <div className="flex items-center gap-2 px-4">
          <div role="tablist" aria-label="Inbox categories" className="flex min-w-0 flex-1 items-center rounded-2xl bg-secondary/60 p-1">
            {[
              { id: 'primary', label: 'Primary' },
              { id: 'general', label: 'General 3' },
              { id: 'requests', label: 'Requests' },
            ].map((tab) => (
              <button key={tab.id} type="button" role="tab" aria-selected={activeTab === tab.id} onClick={() => setActiveTab(tab.id)} className={`flex-1 whitespace-nowrap rounded-xl px-2.5 py-2 text-xs font-semibold transition-colors ${activeTab === tab.id ? 'bg-[#2a344b] text-foreground' : 'text-muted-foreground hover:text-foreground'}`}>
                {tab.label}{tab.id === 'primary' && activeTab === 'primary' && <span className="ml-1.5 inline-block size-1.5 rounded-full bg-brand-violet align-middle" />}
              </button>
            ))}
          </div>
          <button type="button" aria-label="Mark all as read" onClick={() => setConversations((current) => current.map((conversation) => ({ ...conversation, unread: false })))} className="grid size-9 shrink-0 place-items-center text-muted-foreground hover:text-brand-lavender"><CheckCheck className="size-5" /></button>
        </div>

        <ul className="mt-3 divide-y divide-white/[0.035]">
          {visibleConversations.map((conversation) => (
            <li key={conversation.id}>
              <button type="button" onClick={() => setSelectedId(conversation.id)} className="flex w-full items-center gap-3 px-4 py-[17px] text-left transition-colors hover:bg-white/[0.025]">
                {conversation.group ? (
                  <span className="relative flex size-[58px] shrink-0 items-end">
                    <Avatar src={image('photo-1521737711867-e3b97375f902')} alt="" size="size-10" />
                    <span className="absolute bottom-0 right-0 rounded-full border-2 border-background"><Avatar src={creators[2].avatar} alt="" size="size-9" /></span>
                  </span>
                ) : <Avatar src={conversation.avatar} alt="" online={conversation.online} size="size-[58px]" ring={conversation.unread} />}
                <span className="min-w-0 flex-1">
                  <span className="flex min-w-0 items-center gap-1.5">
                    <span className="truncate text-[15px] font-semibold text-foreground">{conversation.name}</span>
                    {conversation.verified && <BadgeCheck className="size-4 shrink-0 text-brand-lavender" />}
                    {conversation.group && <span className="rounded bg-secondary px-1.5 py-0.5 text-[9px] font-bold text-muted-foreground">GROUP</span>}
                  </span>
                  <span className={`mt-1 block truncate text-sm ${conversation.unread ? 'font-semibold text-foreground' : 'text-muted-foreground'}`}>
                    {conversation.photo && <ImageIcon className="mr-1.5 inline size-4 align-[-3px] text-brand-lavender" />}
                    {conversation.preview}
                  </span>
                </span>
                <span className="flex h-12 shrink-0 flex-col items-end justify-between py-0.5">
                  <span className={`text-[11px] font-semibold ${conversation.unread ? 'text-foreground' : 'text-muted-foreground'}`}>{conversation.time}</span>
                  {conversation.unread ? <span className="size-2.5 rounded-full bg-brand-violet shadow-[0_0_12px_#a33eff]" /> : <Camera className="size-5 text-muted-foreground" />}
                </span>
              </button>
            </li>
          ))}
          {visibleConversations.length === 0 && <li className="px-5 py-12 text-center text-sm text-muted-foreground">No conversations found.</li>}
        </ul>
      </section>

      <footer className="flex flex-col items-center px-5 pt-10 text-center text-xs leading-relaxed text-muted-foreground">
        <span className="mb-3 grid size-12 place-items-center rounded-full bg-secondary text-muted-foreground"><LockKeyhole className="size-5" /></span>
        <p>End-to-end encrypted direct conversations<br />powered by Lumina</p>
      </footer>

      <button type="button" onClick={() => { setQuery(''); setShowNewChat(true) }} className="fixed bottom-5 z-30 flex h-12 items-center gap-2 rounded-full bg-gradient-to-r from-brand-violet via-brand-pink to-brand-orange px-5 font-semibold text-[#20113e] shadow-lg shadow-brand-pink/20 transition-transform hover:scale-[1.02]" style={{ right: 'max(1rem, calc((100vw - 28rem) / 2 + 1rem))' }}>
        <SquarePen className="size-5" /> New Chat
      </button>

      {showNote && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={(event) => event.target === event.currentTarget && setShowNote(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="note-title" className="w-full max-w-sm rounded-2xl border border-white/10 bg-card p-5 shadow-2xl">
            <div className="flex items-center justify-between">
              <h2 id="note-title" className="font-semibold">Leave a note</h2>
              <button type="button" aria-label="Close" onClick={() => setShowNote(false)} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
            </div>
            <input autoFocus maxLength={60} value={noteDraft} onChange={(event) => setNoteDraft(event.target.value)} placeholder="What are you up to?" className="mt-4 h-11 w-full rounded-lg bg-secondary px-3 text-sm outline-none placeholder:text-muted-foreground focus:ring-1 focus:ring-brand-violet" />
            <button type="button" onClick={() => { setNote(noteDraft.trim()); setShowNote(false) }} className="mt-4 h-10 w-full rounded-lg bg-gradient-to-r from-brand-violet to-brand-pink text-sm font-semibold text-white">Share note</button>
          </section>
        </div>
      )}

      {showNewChat && (
        <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-4 sm:items-center" onClick={(event) => event.target === event.currentTarget && setShowNewChat(false)}>
          <section role="dialog" aria-modal="true" aria-labelledby="new-chat-title" className="max-h-[80dvh] w-full max-w-sm overflow-hidden rounded-2xl border border-white/10 bg-card shadow-2xl">
            <div className="flex items-center justify-between border-b border-white/5 px-4 py-4">
              <h2 id="new-chat-title" className="font-semibold">New message</h2>
              <button type="button" aria-label="Close" onClick={() => setShowNewChat(false)} className="text-muted-foreground hover:text-foreground"><X className="size-5" /></button>
            </div>
            <label className="flex items-center gap-2 border-b border-white/5 px-4 py-3 text-muted-foreground">
              <Search className="size-4" />
              <span className="sr-only">Search people</span>
              <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search people" className="w-full bg-transparent text-sm text-foreground outline-none placeholder:text-muted-foreground" />
            </label>
            <ul className="max-h-[55dvh] overflow-y-auto p-2">
              {creators.filter((creator) => !creator.own && creator.name.toLowerCase().includes(normalizedQuery)).map((creator) => (
                <li key={creator.id}>
                  <button type="button" onClick={() => startConversation(creator)} className="flex w-full items-center gap-3 rounded-xl px-3 py-3 text-left hover:bg-secondary">
                    <Avatar src={creator.avatar} alt="" online={creator.online} size="size-11" />
                    <span className="text-sm font-semibold">{creator.name}</span>
                    <MessageCircle className="ml-auto size-4 text-muted-foreground" />
                  </button>
                </li>
              ))}
            </ul>
          </section>
        </div>
      )}
    </main>
  )
}