import { AppHeader } from '../components/app-header'
import { StoriesBar } from '../components/stories-bar'
import { PostCard } from '../components/post-card'
import { BottomNav } from '../components/bottom-nav'
import { posts, stories } from '../lib/feed-data'

export default function Page() {
  return (
    <div className="min-h-dvh bg-background">
      <div className="relative mx-auto min-h-dvh max-w-md bg-background pb-24">
        <AppHeader />
        <StoriesBar stories={stories} />
        <main className="flex flex-col gap-5 px-2 pt-3">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </main>
        <BottomNav activeItem="home" />
      </div>
    </div>
  )
}
