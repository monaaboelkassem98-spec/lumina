import { Heart, Home, Plus, Search, User } from 'lucide-react'
import Link from 'next/link'

const items = [
  { label: 'Home', icon: Home, href: '/' },
  { label: 'Search', icon: Search, href: '/explore' },
  { label: 'Create', icon: Plus, primary: true },
  { label: 'Activity', icon: Heart, href: '/notifications' },
  { label: 'Profile', icon: User, href: '/profile' },
]

export function BottomNav({ activeItem = 'home' }) {
  return (
    <nav
      aria-label="Main"
      className="fixed inset-x-0 bottom-0 z-30 mx-auto max-w-md border-t border-border/60 bg-background/90 backdrop-blur-md"
    >
      <ul className="flex items-center justify-around px-4 py-2.5">
        {items.map(({ label, icon: Icon, href, primary }) => {
          const active = activeItem === label.toLowerCase()

          return (
          <li key={label}>
            {primary ? (
              <button
                type="button"
                aria-label={label}
                className="flex size-11 items-center justify-center rounded-full bg-gradient-to-br from-brand-violet to-brand-pink shadow-lg shadow-brand-pink/40 transition-transform hover:scale-105"
              >
                <Icon className="size-5 text-white" strokeWidth={2.5} />
              </button>
            ) : href ? (
              <Link
                href={href}
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className={`relative flex size-11 items-center justify-center transition-colors ${active ? 'text-brand-lavender' : 'text-foreground/80 hover:text-foreground'}`}
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
                {active && <span className="absolute -bottom-1 h-0.5 w-7 rounded-full bg-gradient-to-r from-brand-violet to-brand-pink" />}
              </Link>
            ) : (
              <button
                type="button"
                aria-label={label}
                aria-current={active ? 'page' : undefined}
                className="flex size-11 items-center justify-center text-foreground/80 hover:text-foreground"
              >
                <Icon className="size-5" strokeWidth={active ? 2.5 : 2} />
              </button>
            )}
          </li>
          )
        })}
      </ul>
    </nav>
  )
}
