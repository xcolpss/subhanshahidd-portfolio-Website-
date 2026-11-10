"use client";

import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

// Default showcase projects (always visible even if CMS/storage is empty)
const DEFAULT_ITEMS: ShowcaseItem[] = [
  {
    id: "intro-reel",
    title: "Intro Reel 2025",
    category: "Videos",
    youtube_id: "QLIgdqbA7rc",
    thumbnail_url: "https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg",
  },
  {
    id: "vfx-3d-showcase",
    title: "3D Simulation & VFX Breakdown",
    category: "3D / Unreal",
    youtube_id: "QLIgdqbA7rc",
    thumbnail_url: "https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg",
  },
  {
    id: "commercial-edit",
    title: "Commercial Motion & Video Edit",
    category: "Videos",
    youtube_id: "QLIgdqbA7rc",
    thumbnail_url: "https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg",
  },
  {
    id: "motion-reel-1",
    title: "Dynamic Social Motion Reel",
    category: "Reels",
    youtube_id: "QLIgdqbA7rc",
    thumbnail_url: "https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg",
  },
  {
    id: "brand-visuals",
    title: "Brand Visual Identity & Art",
    category: "Photos",
    youtube_id: null,
    thumbnail_url:
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=1200&q=80",
  },
];

interface ShowcaseViewProps {
  items?: ShowcaseItem[];
}

export default function ShowcaseView({ items }: ShowcaseViewProps) {
  // Use passed items if available and non-empty, otherwise use default items
  const displayItems = items && items.length > 0 ? items : DEFAULT_ITEMS;

  return <ShowcaseSection items={displayItems} />;
}
