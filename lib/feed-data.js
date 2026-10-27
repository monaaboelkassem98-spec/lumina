const photo = (id, width = 900) =>
  `https://images.unsplash.com/${id}?auto=format&fit=crop&w=${width}&q=85`

export const stories = [
  {
    id: 'your-story',
    username: 'Your Story',
    avatar: photo('photo-1534528741775-53994a69daeb', 128),
    isOwn: true,
  },
  {
    id: 'maya-art',
    username: 'maya_art',
    avatar: photo('photo-1531123897727-8f129e1688ce', 128),
    seen: false,
  },
  {
    id: 'lucas-visuals',
    username: 'lucas.vis...',
    avatar: photo('photo-1500648767791-00dcc994a43e', 128),
    seen: false,
  },
  {
    id: 'elena-c',
    username: 'elena_c',
    avatar: photo('photo-1534528741775-53994a69daeb', 128),
    seen: false,
  },
  {
    id: 'neo-tokyo',
    username: 'neo_tokyo',
    avatar: photo('photo-1517841905240-472988babdf9', 128),
    seen: true,
  },
]

export const posts = [
  {
    id: 'tokyo-rain',
    username: 'maya_art',
    avatar: photo('photo-1531123897727-8f129e1688ce', 128),
    verified: true,
    subtitle: 'Tokyo, Japan',
    subtitleType: 'location',
    image: photo('photo-1519608487953-e999c86e7455', 1200),
    imageAlt: 'Neon reflections on a rainy Tokyo street at night',
    slides: 4,
    likes: '14.2k',
    comments: 320,
    caption: 'Midnight rain reflections in the alleyways of Kabukicho. The city never sleeps when the neon hums this loud ✨',
    hashtags: ['cyberpunk', 'urbanvibes', 'streetphotography'],
    timeAgo: '2 hours ago',
  },
  {
    id: 'fluid-resonance',
    username: 'lucas.visuals',
    avatar: photo('photo-1500648767791-00dcc994a43e', 128),
    sparkle: true,
    subtitle: 'Motion & Procedural Art',
    subtitleType: 'creator',
    image: photo('photo-1634017839464-5c339ebe3cb4', 1200),
    imageAlt: 'Iridescent abstract glass sculpture with vivid neon reflections',
    likes: '8.7k',
    comments: 194,
    caption: 'Exploring fluid resonance and chromatic dispersion. Which lighting angle do you prefer? 🎨',
    hashtags: ['3dart', 'generative'],
    topComment: {
      username: 'kai_render:',
      text: 'The subsurface scattering on the violet edge is unreal.',
    },
    badge: 'Octane 4K',
    audio: 'Original Audio — Synthwave Chill',
    timeAgo: '4 hours ago',
  },
]