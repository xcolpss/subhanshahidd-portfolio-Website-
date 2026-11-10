'use client';

import ShowcaseSection, { ShowcaseItem } from './ShowcaseSection';

// Permanent showcase items linked directly to your repository's public assets and videos
const DEFAULT_ITEMS: ShowcaseItem[] = [
  // --- Horizontal Videos / VFX ---
  {
    id: 'intro-reel-2025',
    title: 'Intro Reel 2025',
    category: 'Videos',
    youtube_id: 'QLIgdqbA7rc',
    thumbnail_url: 'https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg',
  },
  {
    id: 'vfx-breakdown',
    title: 'CGI & VFX Breakdown',
    category: 'Videos',
    youtube_id: 'QLIgdqbA7rc',
    thumbnail_url: 'https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg',
  },

  // --- Vertical Reels (9:16) ---
  {
    id: 'social-reel-01',
    title: 'Motion Design Showcase Reel',
    category: 'Reels',
    youtube_id: 'QLIgdqbA7rc',
    thumbnail_url: 'https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg',
  },
  {
    id: 'social-reel-02',
    title: 'Commercial Editing Reel',
    category: 'Reels',
    youtube_id: 'QLIgdqbA7rc',
    thumbnail_url: 'https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg',
  },

  // --- 3D / Unreal Engine Stills ---
  {
    id: '3d-render-01',
    title: 'Sci-Fi Environment Design',
    category: '3D / Unreal',
    youtube_id: null,
    thumbnail_url: '/photos/p01.jpg',
  },
  {
    id: '3d-render-02',
    title: 'Hard Surface Asset Visualization',
    category: '3D / Unreal',
    youtube_id: null,
    thumbnail_url: '/photos/p02.jpg',
  },
  {
    id: '3d-render-03',
    title: 'Cinematic Lighting Study',
    category: '3D / Unreal',
    youtube_id: null,
    thumbnail_url: '/photos/p03.jpg',
  },
  {
    id: '3d-render-04',
    title: 'Unreal Engine Scene Concept',
    category: '3D / Unreal',
    youtube_id: null,
    thumbnail_url: '/photos/p04.jpg',
  },

  // --- Photos / Brand Identity ---
  {
    id: 'photo-artwork-01',
    title: 'Digital Composition Art I',
    category: 'Photos',
    youtube_id: null,
    thumbnail_url: '/photos/p05.jpg',
  },
  {
    id: 'photo-artwork-02',
    title: 'Digital Composition Art II',
    category: 'Photos',
    youtube_id: null,
    thumbnail_url: '/photos/p06.jpg',
  },
  {
    id: 'photo-artwork-03',
    title: 'Visual Identity Still',
    category: 'Photos',
    youtube_id: null,
    thumbnail_url: '/photos/p07.jpg',
  },
  {
    id: 'photo-artwork-04',
    title: 'Key Art Poster Concept',
    category: 'Photos',
    youtube_id: null,
    thumbnail_url: '/photos/p08.jpg',
  },
  {
    id: 'photo-artwork-05',
    title: 'Editorial Visual Concept',
    category: 'Photos',
    youtube_id: null,
    thumbnail_url: '/photos/p09.jpg',
  },
];

interface ShowcaseViewProps {
  items?: ShowcaseItem[];
}

export default function ShowcaseView({ items }: ShowcaseViewProps) {
  const displayItems = items && items.length > 0 ? items : DEFAULT_ITEMS;
  return <ShowcaseSection items={displayItems} />;
}
