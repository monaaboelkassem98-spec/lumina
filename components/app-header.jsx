import Image from 'next/image'
import Link from 'next/link'
import { Aperture, Bell, MessageSquare } from 'lucide-react'

export function AppHeader() {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur-md">
      <div className="flex items-center gap-2">
        <span className="flex size-8 items-center justify-center rounded-lg bg-gradient-to-br from-brand-violet to-brand-pink p-[2px]">
          <span className="flex size-full items-center justify-center rounded-[6px] bg-background">
            <Aperture className="size-4 text-brand-pink" aria-hidden="true" />
          </span>
        </span>
        <h1 className="text-xl font-semibold tracking-tight text-foreground">Lumina</h1>
      </div>

      <nav aria-label="Header actions" className="flex items-center gap-5">
        <Link href="/notifications" aria-label="Notifications" className="text-foreground transition-opacity hover:opacity-70">
          <Bell className="size-5" />
        </Link>
        <Link href="/messages" aria-label="Messages, 1 unread" className="relative text-foreground transition-opacity hover:opacity-70">
          <MessageSquare className="size-5" />
          <span className="absolute -right-1 -top-1 size-2.5 rounded-full bg-brand-pink ring-2 ring-background" />
        </Link>
        <Link href="/profile" aria-label="Your profile" className="relative size-8 overflow-hidden rounded-full ring-2 ring-border">
          <Image src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=96&h=96&q=80" alt="" fill sizes="32px" className="object-cover" />
        </Link>
      </nav>
    </header>
  )
}
