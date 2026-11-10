"use client";

import ShowcaseSection, { ShowcaseItem } from "./ShowcaseSection";

const SHOWCASE_ITEMS: ShowcaseItem[] = [
  // ================= REELS (9:16 Vertical Shorts) =================
  {
    id: "reel-QCaBsba14tE",
    title: "Showcase Reel 01",
    category: "Reels",
    youtube_id: "QCaBsba14tE",
    thumbnail_url: "https://i.ytimg.com/vi/QCaBsba14tE/hqdefault.jpg",
  },
  {
    id: "reel-qFhxB6qVa9Q",
    title: "Showcase Reel 02",
    category: "Reels",
    youtube_id: "qFhxB6qVa9Q",
    thumbnail_url: "https://i.ytimg.com/vi/qFhxB6qVa9Q/hqdefault.jpg",
  },
  {
    id: "reel-6-1_-xQQiyY",
    title: "Showcase Reel 03",
    category: "Reels",
    youtube_id: "6-1_-xQQiyY",
    thumbnail_url: "https://i.ytimg.com/vi/6-1_-xQQiyY/hqdefault.jpg",
  },
  {
    id: "reel-TF-G84gkOPo",
    title: "Showcase Reel 04",
    category: "Reels",
    youtube_id: "TF-G84gkOPo",
    thumbnail_url: "https://i.ytimg.com/vi/TF-G84gkOPo/hqdefault.jpg",
  },
  {
    id: "reel-BKcFi2bFfUY",
    title: "Showcase Reel 05",
    category: "Reels",
    youtube_id: "BKcFi2bFfUY",
    thumbnail_url: "https://i.ytimg.com/vi/BKcFi2bFfUY/hqdefault.jpg",
  },
  {
    id: "reel-sMUKF749JI0",
    title: "Showcase Reel 06",
    category: "Reels",
    youtube_id: "sMUKF749JI0",
    thumbnail_url: "https://i.ytimg.com/vi/sMUKF749JI0/hqdefault.jpg",
  },
  {
    id: "reel-eBQ5VBTdSGA",
    title: "Showcase Reel 07",
    category: "Reels",
    youtube_id: "eBQ5VBTdSGA",
    thumbnail_url: "https://i.ytimg.com/vi/eBQ5VBTdSGA/hqdefault.jpg",
  },
  {
    id: "reel-AxeDCZPChoY",
    title: "Showcase Reel 08",
    category: "Reels",
    youtube_id: "AxeDCZPChoY",
    thumbnail_url: "https://i.ytimg.com/vi/AxeDCZPChoY/hqdefault.jpg",
  },
  {
    id: "reel-0NYecQ7dmII",
    title: "Showcase Reel 09",
    category: "Reels",
    youtube_id: "0NYecQ7dmII",
    thumbnail_url: "https://i.ytimg.com/vi/0NYecQ7dmII/hqdefault.jpg",
  },
  {
    id: "reel-LPEh0u9ZT0M",
    title: "Showcase Reel 10",
    category: "Reels",
    youtube_id: "LPEh0u9ZT0M",
    thumbnail_url: "https://i.ytimg.com/vi/LPEh0u9ZT0M/hqdefault.jpg",
  },
  {
    id: "reel-mvlg9JWy6_0",
    title: "Showcase Reel 11",
    category: "Reels",
    youtube_id: "mvlg9JWy6_0",
    thumbnail_url: "https://i.ytimg.com/vi/mvlg9JWy6_0/hqdefault.jpg",
  },
  {
    id: "reel-IIwu04mMjbM",
    title: "Showcase Reel 12",
    category: "Reels",
    youtube_id: "IIwu04mMjbM",
    thumbnail_url: "https://i.ytimg.com/vi/IIwu04mMjbM/hqdefault.jpg",
  },

  // ================= VIDEOS (Editing / VFX / Commercial) =================
  {
    id: "video-i7FX3JNSqag",
    title: "Motion & Visual Project",
    category: "Videos",
    youtube_id: "i7FX3JNSqag",
    thumbnail_url: "https://i.ytimg.com/vi/i7FX3JNSqag/hqdefault.jpg",
  },
  {
    id: "video-ti2O0LynRwc",
    title: "Visual Edit Showcase",
    category: "Videos",
    youtube_id: "ti2O0LynRwc",
    thumbnail_url: "https://i.ytimg.com/vi/ti2O0LynRwc/hqdefault.jpg",
  },
  {
    id: "video-A0ERK-yU7wg",
    title: "Creative Sequence Cut",
    category: "Videos",
    youtube_id: "A0ERK-yU7wg",
    thumbnail_url: "https://i.ytimg.com/vi/A0ERK-yU7wg/hqdefault.jpg",
  },
  {
    id: "video-qLk8uT0dhas",
    title: "Commercial Production Edit",
    category: "Videos",
    youtube_id: "qLk8uT0dhas",
    thumbnail_url: "https://i.ytimg.com/vi/qLk8uT0dhas/hqdefault.jpg",
  },
  {
    id: "video-BrsYABe8U5U",
    title: "Color Grading & Motion",
    category: "Videos",
    youtube_id: "BrsYABe8U5U",
    thumbnail_url: "https://i.ytimg.com/vi/BrsYABe8U5U/hqdefault.jpg",
  },
  {
    id: "video-QLIgdqbA7rc",
    title: "Intro Reel 2025",
    category: "Videos",
    youtube_id: "QLIgdqbA7rc",
    thumbnail_url: "https://i.ytimg.com/vi/QLIgdqbA7rc/hqdefault.jpg",
  },
  {
    id: "video-ZzmeE2ooYJ8",
    title: "Promo Video Sequence",
    category: "Videos",
    youtube_id: "ZzmeE2ooYJ8",
    thumbnail_url: "https://i.ytimg.com/vi/ZzmeE2ooYJ8/hqdefault.jpg",
  },
  {
    id: "video-TfdC_kuFis0",
    title: "Atmospheric Video Edit",
    category: "Videos",
    youtube_id: "TfdC_kuFis0",
    thumbnail_url: "https://i.ytimg.com/vi/TfdC_kuFis0/hqdefault.jpg",
  },
  {
    id: "video-u13v1uCzgpo",
    title: "Dynamic Cut & Sound Design",
    category: "Videos",
    youtube_id: "u13v1uCzgpo",
    thumbnail_url: "https://i.ytimg.com/vi/u13v1uCzgpo/hqdefault.jpg",
  },
  {
    id: "video-SLD_ja2-L3w",
    title: "Stylized Edit Production",
    category: "Videos",
    youtube_id: "SLD_ja2-L3w",
    thumbnail_url: "https://i.ytimg.com/vi/SLD_ja2-L3w/hqdefault.jpg",
  },
  {
    id: "video-wbJWCOh_QZw",
    title: "Cinematic Reel Cut",
    category: "Videos",
    youtube_id: "wbJWCOh_QZw",
    thumbnail_url: "https://i.ytimg.com/vi/wbJWCOh_QZw/hqdefault.jpg",
  },

  // ================= 3D / UNREAL ENGINE =================
  {
    id: "3d-6eKGS2cD56I",
    title: "3D Simulation & Environment",
    category: "3D / Unreal",
    youtube_id: "6eKGS2cD56I",
    thumbnail_url: "https://i.ytimg.com/vi/6eKGS2cD56I/hqdefault.jpg",
  },
  {
    id: "3d-LGVvrcEQmgk",
    title: "Unreal Engine Realtime Scene",
    category: "3D / Unreal",
    youtube_id: "LGVvrcEQmgk",
    thumbnail_url: "https://i.ytimg.com/vi/LGVvrcEQmgk/hqdefault.jpg",
  },
  {
    id: "3d-PTlP39kfMKA",
    title: "CGI Lighting & Render Study",
    category: "3D / Unreal",
    youtube_id: "PTlP39kfMKA",
    thumbnail_url: "https://i.ytimg.com/vi/PTlP39kfMKA/hqdefault.jpg",
  },
  {
    id: "3d-A27fy5Tyyqk",
    title: "3D Procedural Simulation",
    category: "3D / Unreal",
    youtube_id: "A27fy5Tyyqk",
    thumbnail_url: "https://i.ytimg.com/vi/A27fy5Tyyqk/hqdefault.jpg",
  },
  {
    id: "3d-Zu7g91mpCi4",
    title: "Unreal Cinematics Breakdown",
    category: "3D / Unreal",
    youtube_id: "Zu7g91mpCi4",
    thumbnail_url: "https://i.ytimg.com/vi/Zu7g91mpCi4/hqdefault.jpg",
  },
  {
    id: "3d-kdAyUI5rP74",
    title: "3D Environment Composition",
    category: "3D / Unreal",
    youtube_id: "kdAyUI5rP74",
    thumbnail_url: "https://i.ytimg.com/vi/kdAyUI5rP74/hqdefault.jpg",
  },
  {
    id: "3d-QXPYrHUWuXY",
    title: "Unreal Engine Dynamic Render",
    category: "3D / Unreal",
    youtube_id: "QXPYrHUWuXY",
    thumbnail_url: "https://i.ytimg.com/vi/QXPYrHUWuXY/hqdefault.jpg",
  },

  // ================= PHOTOS / POSTERS (Strictly Photos) =================
  {
    id: "photo-p01",
    title: "Poster Artwork 01",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p01.jpg",
  },
  {
    id: "photo-p02",
    title: "Poster Artwork 02",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p02.jpg",
  },
  {
    id: "photo-p03",
    title: "Poster Artwork 03",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p03.jpg",
  },
  {
    id: "photo-p04",
    title: "Poster Artwork 04",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p04.jpg",
  },
  {
    id: "photo-p05",
    title: "Poster Artwork 05",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p05.jpg",
  },
  {
    id: "photo-p06",
    title: "Poster Artwork 06",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p06.jpg",
  },
  {
    id: "photo-p07",
    title: "Poster Artwork 07",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p07.jpg",
  },
  {
    id: "photo-p08",
    title: "Poster Artwork 08",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p08.jpg",
  },
  {
    id: "photo-p09",
    title: "Poster Artwork 09",
    category: "Photos",
    youtube_id: null,
    thumbnail_url: "/photos/p09.jpg",
  },
];

interface ShowcaseViewProps {
  items?: ShowcaseItem[];
}

export default function ShowcaseView({ items }: ShowcaseViewProps) {
  // Always use our comprehensive items list
  const displayItems = items && items.length > 0 ? items : SHOWCASE_ITEMS;
  return <ShowcaseSection items={displayItems} />;
}
