"use client";

import { useState, useEffect } from "react";
import Link from "next/link";

export interface ShowcaseItem {
  id: string;
  title: string;
  category: string;
  thumbnail_url?: string | null;
  youtube_id?: string | null;
  live_url?: string | null;
}

export interface VideoTestimonial {
  id: string;
  client_name: string;
  company?: string;
  youtube_id: string;
}

export interface ReviewItem {
  id: string;
  project_title: string;
  client_name?: string;
  rating: number;
  date_range: string;
  review_text?: string;
  budget?: string;
  rate?: string;
  hours?: string;
  type: "Fixed price" | "Hourly";
  endorsed?: string[];
}

export interface ChannelItem {
  id: string;
  name: string;
  platform: "YouTube" | "Instagram" | string;
  url: string;
  handle: string;
  avatar_url?: string;
}

// 1. DEFAULT 39 SHOWCASE ITEMS
const DEFAULT_SHOWCASE_ITEMS: ShowcaseItem[] = [
  // --- REELS (12) ---
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

  // --- VIDEOS (11) ---
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

  // --- 3D / UNREAL (7) ---
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

  // --- PHOTOS / POSTERS (9) ---
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

// 2. DEFAULT VIDEO TESTIMONIALS (4)
const DEFAULT_TESTIMONIALS: VideoTestimonial[] = [
  {
    id: "vt-hENq6SrrOOk",
    client_name: "Client Endorsement 01",
    company: "Video Production Partner",
    youtube_id: "hENq6SrrOOk",
  },
  {
    id: "vt-6jEXDgYEoaY",
    client_name: "Client Endorsement 02",
    company: "Content Creator Collaboration",
    youtube_id: "6jEXDgYEoaY",
  },
  {
    id: "vt-y3klxSu5wRE",
    client_name: "Client Endorsement 03",
    company: "Digital Media Client",
    youtube_id: "y3klxSu5wRE",
  },
  {
    id: "vt-h3Hl3kv3nOE",
    client_name: "Client Endorsement 04",
    company: "Commercial Brand Partner",
    youtube_id: "h3Hl3kv3nOE",
  },
];

// 3. DEFAULT UPWORK REVIEWS (12)
const DEFAULT_REVIEWS: ReviewItem[] = [
  {
    id: "upwork-1",
    project_title: "Longterm Youtube Podcast editor",
    client_name: "Podcast Host",
    rating: 5.0,
    date_range: "May 7, 2026 - May 9, 2026",
    review_text:
      "Subhan is dedicated to producing good quality work and is very responsive.",
    budget: "$120.00",
    type: "Fixed price",
    endorsed: ["Committed to Quality", "Clear Communicator", "Detail Oriented"],
  },
  {
    id: "upwork-2",
    project_title: "Social Media Manager for Video Editing and Posting",
    client_name: "Local Service Business",
    rating: 5.0,
    date_range: "Oct 31, 2025 - Mar 2, 2026",
    review_text:
      "Subhan manages our social media profiles and creates reels for our local service business. I highly recommend his work!",
    budget: "$3,145.00",
    type: "Fixed price",
    endorsed: ["Committed to Quality", "Clear Communicator"],
  },
  {
    id: "upwork-3",
    project_title: "Video Editor Needed for Digital Advertising Projects",
    client_name: "Digital Agency",
    rating: 5.0,
    date_range: "Mar 12, 2025 - Oct 29, 2025",
    review_text: "Great work!!!! 10/10",
    budget: "$97.00",
    type: "Fixed price",
    endorsed: ["Committed to Quality"],
  },
  {
    id: "upwork-4",
    project_title:
      "Experienced Web Developer/Designer for Go High Level Projects",
    client_name: "Tech Founder",
    rating: 5.0,
    date_range: "Jul 21, 2025 - Jul 24, 2025",
    review_text:
      "I cannot speak highly enough of the amazing service provided by Subhan Shahid. I HIGHLY recommend him to anyone who has big ideas or challenging concepts they need to bring to life.",
    budget: "$60.00",
    type: "Fixed price",
    endorsed: ["Collaborative", "Committed to Quality"],
  },
  {
    id: "upwork-5",
    project_title: "Photoshop Artist for Visuals",
    client_name: "Creative Director",
    rating: 5.0,
    date_range: "Jan 1, 2025 - Jan 14, 2025",
    review_text:
      "Subhan has been a real pleasure to deal with. He works quickly, is open to all sorts of feedback, and he's always got interesting suggestions that I otherwise wouldn't have considered.",
    budget: "$19.50",
    rate: "$4.50 /hr",
    hours: "4 hours",
    type: "Hourly",
    endorsed: ["Collaborative", "Accountable for Outcomes"],
  },
  {
    id: "upwork-6",
    project_title:
      "VFX & Graphics Editor for Children's Educational YouTube Videos",
    client_name: "Channel Producer",
    rating: 5.0,
    date_range: "Nov 4, 2024 - Nov 20, 2024",
    review_text:
      "Subhan does great work and is a great professional. He is constantly trying to find ways to improve and grow my project.",
    budget: "$295.50",
    rate: "$9.00 /hr",
    hours: "33 hours",
    type: "Hourly",
    endorsed: ["Committed to Quality", "Professional"],
  },
  {
    id: "upwork-7",
    project_title:
      "Thumbnail Designer for YouTube channel Hollywood Movie Recaps",
    client_name: "Channel Creator",
    rating: 5.0,
    date_range: "Oct 16, 2024 - Nov 19, 2024",
    review_text: "Good helpful resource. Will work with him again.",
    budget: "$5.00",
    type: "Fixed price",
    endorsed: ["Collaborative"],
  },
  {
    id: "upwork-8",
    project_title: "Screenplay/Script Writing for e-commerce product",
    client_name: "Brand Owner",
    rating: 5.0,
    date_range: "Sep 23, 2024 - Oct 22, 2024",
    review_text: "Love working with Subhan he always does a great job.",
    budget: "$23.00",
    type: "Fixed price",
    endorsed: ["Collaborative", "Committed to Quality"],
  },
  {
    id: "upwork-9",
    project_title:
      "VFX & Graphics Editor for Children's Educational YouTube Videos",
    client_name: "Studio Lead",
    rating: 5.0,
    date_range: "Oct 3, 2024 - Oct 7, 2024",
    review_text:
      "Subhan was pleasure to work with. His attention to details is great, his communication is amazing, and he is the ultimate professional. I will be working with Subhan again.",
    budget: "$134.67",
    rate: "$8.00 /hr",
    hours: "17 hours",
    type: "Hourly",
    endorsed: ["Collaborative", "Detail Oriented", "Professional"],
  },
  {
    id: "upwork-10",
    project_title:
      "Video Editor for High-Quality, Engaging AI/Tech YouTube Content",
    client_name: "Tech Channel",
    rating: 4.8,
    date_range: "Feb 11, 2025 - Feb 16, 2025",
    review_text:
      "High-quality pacing and engaging technical visuals delivered promptly.",
    budget: "$240.00",
    type: "Fixed price",
  },
  {
    id: "upwork-11",
    project_title: "Social Media Reels Editor for Vacation Rentals",
    client_name: "Hospitality Brand",
    rating: 3.0,
    date_range: "May 1, 2026 - Jul 3, 2026",
    review_text:
      "Delivered vacation rental reels with good pacing and transitions.",
    budget: "$75.00",
    type: "Fixed price",
  },
  {
    id: "upwork-12",
    project_title: "Youtube Video Editor + Thumbnail Designer Needed",
    client_name: "Video Producer",
    rating: 5.0,
    date_range: "Apr 29, 2025 - Oct 21, 2026",
    review_text:
      "Fast video editing turnaround with customized thumbnail graphic designs.",
    budget: "$238.50",
    rate: "$9.00 /hr",
    hours: "27 hours",
    type: "Hourly",
  },
];

// 4. DEFAULT CHANNELS (6)
const DEFAULT_CHANNELS: ChannelItem[] = [
  {
    id: "ch-heyitsmr-j",
    name: "Hey Its Mr. J",
    handle: "@heyitsmr.j",
    platform: "YouTube",
    url: "https://www.youtube.com/@heyitsmr.j",
  },
  {
    id: "ch-watchdog-bwc",
    name: "Watchdog BWC",
    handle: "@WatchdogBWC",
    platform: "YouTube",
    url: "https://www.youtube.com/@WatchdogBWC",
  },
  {
    id: "ch-tilt223",
    name: "TILT 223",
    handle: "@TILT223",
    platform: "YouTube",
    url: "https://www.youtube.com/@TILT223",
  },
  {
    id: "ch-roddyhanson",
    name: "Roddy Hanson",
    handle: "@roddyhanson",
    platform: "Instagram",
    url: "https://www.instagram.com/roddyhanson/",
  },
  {
    id: "ch-connectcleaning",
    name: "Connect Cleaning",
    handle: "@connectcleaning",
    platform: "Instagram",
    url: "https://www.instagram.com/connectcleaning/",
  },
  {
    id: "ch-stackd",
    name: "STACKD Inc.",
    handle: "@stackd.inc",
    platform: "Instagram",
    url: "https://www.instagram.com/stackd.inc/",
  },
];

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState<
    "showcase" | "testimonials" | "reviews" | "channels"
  >("showcase");

  // Showcase state
  const [showcaseFilter, setShowcaseFilter] = useState("All");
  const [categories, setCategories] = useState<string[]>([
    "Photos",
    "Videos",
    "3D / Unreal",
    "Reels",
  ]);
  const [newCategory, setNewCategory] = useState("");
  const [projectsList, setProjectsList] = useState<ShowcaseItem[]>([]);
  const [title, setTitle] = useState("");
  const [selectedCat, setSelectedCat] = useState("Videos");
  const [ytUrlOrId, setYtUrlOrId] = useState("");
  const [customThumb, setCustomThumb] = useState("");
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Testimonials state
  const [testimonialsList, setTestimonialsList] = useState<VideoTestimonial[]>(
    [],
  );
  const [vtName, setVtName] = useState("");
  const [vtCompany, setVtCompany] = useState("");
  const [vtYt, setVtYt] = useState("");
  const [editingVtId, setEditingVtId] = useState<string | null>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<ReviewItem[]>([]);
  const [revTitle, setRevTitle] = useState("");
  const [revClient, setRevClient] = useState("");
  const [revRating, setRevRating] = useState("5.0");
  const [revDates, setRevDates] = useState("");
  const [revBudget, setRevBudget] = useState("");
  const [revType, setRevType] = useState<"Fixed price" | "Hourly">(
    "Fixed price",
  );
  const [revText, setRevText] = useState("");
  const [revTags, setRevTags] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Channels state
  const [channelsList, setChannelsList] = useState<ChannelItem[]>([]);
  const [chName, setChName] = useState("");
  const [chHandle, setChHandle] = useState("");
  const [chPlatform, setChPlatform] = useState("YouTube");
  const [chUrl, setChUrl] = useState("");
  const [chAvatar, setChAvatar] = useState("");
  const [editingChId, setEditingChId] = useState<string | null>(null);

  // Load from local storage or set defaults
  useEffect(() => {
    try {
      const savedProjs = localStorage.getItem("portfolio_showcase_items");
      setProjectsList(
        savedProjs ? JSON.parse(savedProjs) : DEFAULT_SHOWCASE_ITEMS,
      );
      if (!savedProjs)
        localStorage.setItem(
          "portfolio_showcase_items",
          JSON.stringify(DEFAULT_SHOWCASE_ITEMS),
        );

      const savedVts = localStorage.getItem("portfolio_testimonials");
      setTestimonialsList(
        savedVts ? JSON.parse(savedVts) : DEFAULT_TESTIMONIALS,
      );
      if (!savedVts)
        localStorage.setItem(
          "portfolio_testimonials",
          JSON.stringify(DEFAULT_TESTIMONIALS),
        );

      const savedRevs = localStorage.getItem("portfolio_reviews");
      setReviewsList(savedRevs ? JSON.parse(savedRevs) : DEFAULT_REVIEWS);
      if (!savedRevs)
        localStorage.setItem(
          "portfolio_reviews",
          JSON.stringify(DEFAULT_REVIEWS),
        );

      const savedChs = localStorage.getItem("portfolio_channels");
      setChannelsList(savedChs ? JSON.parse(savedChs) : DEFAULT_CHANNELS);
      if (!savedChs)
        localStorage.setItem(
          "portfolio_channels",
          JSON.stringify(DEFAULT_CHANNELS),
        );

      const savedCats = localStorage.getItem("portfolio_categories");
      if (savedCats) setCategories(JSON.parse(savedCats));
    } catch (e) {
      setProjectsList(DEFAULT_SHOWCASE_ITEMS);
      setTestimonialsList(DEFAULT_TESTIMONIALS);
      setReviewsList(DEFAULT_REVIEWS);
      setChannelsList(DEFAULT_CHANNELS);
    }
  }, []);

  const extractYouTubeId = (input: string) => {
    if (!input) return null;
    const match = input.match(
      /(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/,
    );
    return match ? match[1] : input.trim();
  };

  // 1. Showcase Handlers
  const handleSaveProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    const cleanYt = extractYouTubeId(ytUrlOrId);
    const thumbUrl =
      customThumb.trim() ||
      (cleanYt
        ? `https://i.ytimg.com/vi/${cleanYt}/hqdefault.jpg`
        : "/photos/p01.jpg");

    let updated: ShowcaseItem[];
    if (editingProjectId) {
      updated = projectsList.map((p) =>
        p.id === editingProjectId
          ? {
              ...p,
              title: title.trim(),
              category: selectedCat,
              youtube_id: cleanYt,
              thumbnail_url: thumbUrl,
            }
          : p,
      );
      setEditingProjectId(null);
    } else {
      const newItem: ShowcaseItem = {
        id: `custom-${Date.now()}`,
        title: title.trim(),
        category: selectedCat,
        youtube_id: cleanYt,
        thumbnail_url: thumbUrl,
      };
      updated = [newItem, ...projectsList];
    }

    setProjectsList(updated);
    localStorage.setItem("portfolio_showcase_items", JSON.stringify(updated));
    setTitle("");
    setYtUrlOrId("");
    setCustomThumb("");
  };

  const startEditProject = (item: ShowcaseItem) => {
    setEditingProjectId(item.id);
    setTitle(item.title);
    setSelectedCat(item.category);
    setYtUrlOrId(item.youtube_id || "");
    setCustomThumb(item.thumbnail_url || "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleDeleteProject = (id: string) => {
    if (!confirm("Are you sure you want to delete this project?")) return;
    const updated = projectsList.filter((p) => p.id !== id);
    setProjectsList(updated);
    localStorage.setItem("portfolio_showcase_items", JSON.stringify(updated));
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    const clean = newCategory.trim();
    if (!clean || categories.includes(clean)) return;
    const updated = [...categories, clean];
    setCategories(updated);
    localStorage.setItem("portfolio_categories", JSON.stringify(updated));
    setNewCategory("");
  };

  // 2. Video Testimonials Handlers
  const handleSaveVideoTestimonial = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanYt = extractYouTubeId(vtYt);
    if (!cleanYt) {
      alert("Please provide a valid YouTube video or Shorts link.");
      return;
    }

    let updated: VideoTestimonial[];
    if (editingVtId) {
      updated = testimonialsList.map((t) =>
        t.id === editingVtId
          ? {
              ...t,
              client_name: vtName.trim(),
              company: vtCompany.trim(),
              youtube_id: cleanYt,
            }
          : t,
      );
      setEditingVtId(null);
    } else {
      updated = [
        {
          id: `vt-${Date.now()}`,
          client_name: vtName.trim(),
          company: vtCompany.trim(),
          youtube_id: cleanYt,
        },
        ...testimonialsList,
      ];
    }

    setTestimonialsList(updated);
    localStorage.setItem("portfolio_testimonials", JSON.stringify(updated));
    setVtName("");
    setVtCompany("");
    setVtYt("");
  };

  const startEditVt = (t: VideoTestimonial) => {
    setEditingVtId(t.id);
    setVtName(t.client_name);
    setVtCompany(t.company || "");
    setVtYt(`https://youtube.com/shorts/${t.youtube_id}`);
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleDeleteVt = (id: string) => {
    if (!confirm("Delete this video testimonial?")) return;
    const updated = testimonialsList.filter((t) => t.id !== id);
    setTestimonialsList(updated);
    localStorage.setItem("portfolio_testimonials", JSON.stringify(updated));
  };

  // 3. Reviews Handlers
  const handleSaveReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!revTitle.trim()) return;

    const parsedTags = revTags
      ? revTags
          .split(",")
          .map((t) => t.trim())
          .filter(Boolean)
      : undefined;

    let updated: ReviewItem[];
    if (editingReviewId) {
      updated = reviewsList.map((r) =>
        r.id === editingReviewId
          ? {
              ...r,
              project_title: revTitle.trim(),
              client_name: revClient.trim() || "Client",
              rating: parseFloat(revRating) || 5.0,
              date_range: revDates.trim() || "Completed",
              budget: revBudget.trim() || "$100.00",
              type: revType,
              review_text: revText.trim() || undefined,
              endorsed: parsedTags,
            }
          : r,
      );
      setEditingReviewId(null);
    } else {
      updated = [
        {
          id: `rev-${Date.now()}`,
          project_title: revTitle.trim(),
          client_name: revClient.trim() || "Client",
          rating: parseFloat(revRating) || 5.0,
          date_range: revDates.trim() || "Completed",
          budget: revBudget.trim() || "$100.00",
          type: revType,
          review_text: revText.trim() || undefined,
          endorsed: parsedTags,
        },
        ...reviewsList,
      ];
    }

    setReviewsList(updated);
    localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
    setRevTitle("");
    setRevClient("");
    setRevRating("5.0");
    setRevDates("");
    setRevBudget("");
    setRevText("");
    setRevTags("");
  };

  const startEditReview = (r: ReviewItem) => {
    setEditingReviewId(r.id);
    setRevTitle(r.project_title);
    setRevClient(r.client_name || "");
    setRevRating(String(r.rating));
    setRevDates(r.date_range);
    setRevBudget(r.budget || "");
    setRevType(r.type);
    setRevText(r.review_text || "");
    setRevTags(r.endorsed ? r.endorsed.join(", ") : "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleDeleteReview = (id: string) => {
    if (!confirm("Delete this client review?")) return;
    const updated = reviewsList.filter((r) => r.id !== id);
    setReviewsList(updated);
    localStorage.setItem("portfolio_reviews", JSON.stringify(updated));
  };

  // 4. Channels Handlers
  const handleSaveChannel = (e: React.FormEvent) => {
    e.preventDefault();
    if (!chName.trim() || !chUrl.trim()) return;

    let updated: ChannelItem[];
    if (editingChId) {
      updated = channelsList.map((c) =>
        c.id === editingChId
          ? {
              ...c,
              name: chName.trim(),
              handle:
                chHandle.trim() ||
                `@${chName.toLowerCase().replace(/\s+/g, "")}`,
              platform: chPlatform,
              url: chUrl.trim(),
              avatar_url: chAvatar.trim() || undefined,
            }
          : c,
      );
      setEditingChId(null);
    } else {
      updated = [
        {
          id: `ch-${Date.now()}`,
          name: chName.trim(),
          handle:
            chHandle.trim() || `@${chName.toLowerCase().replace(/\s+/g, "")}`,
          platform: chPlatform,
          url: chUrl.trim(),
          avatar_url: chAvatar.trim() || undefined,
        },
        ...channelsList,
      ];
    }

    setChannelsList(updated);
    localStorage.setItem("portfolio_channels", JSON.stringify(updated));
    setChName("");
    setChHandle("");
    setChUrl("");
    setChAvatar("");
  };

  const startEditChannel = (c: ChannelItem) => {
    setEditingChId(c.id);
    setChName(c.name);
    setChHandle(c.handle);
    setChPlatform(c.platform);
    setChUrl(c.url);
    setChAvatar(c.avatar_url || "");
    window.scrollTo({ top: 120, behavior: "smooth" });
  };

  const handleDeleteChannel = (id: string) => {
    if (!confirm("Delete this channel?")) return;
    const updated = channelsList.filter((c) => c.id !== id);
    setChannelsList(updated);
    localStorage.setItem("portfolio_channels", JSON.stringify(updated));
  };

  // Reset Everything to Defaults
  const handleResetDefaults = () => {
    if (
      confirm(
        "Reset entire dashboard to permanent defaults (Showcase, Reviews, Testimonials, Channels)?",
      )
    ) {
      setProjectsList(DEFAULT_SHOWCASE_ITEMS);
      localStorage.setItem(
        "portfolio_showcase_items",
        JSON.stringify(DEFAULT_SHOWCASE_ITEMS),
      );
      setTestimonialsList(DEFAULT_TESTIMONIALS);
      localStorage.setItem(
        "portfolio_testimonials",
        JSON.stringify(DEFAULT_TESTIMONIALS),
      );
      setReviewsList(DEFAULT_REVIEWS);
      localStorage.setItem(
        "portfolio_reviews",
        JSON.stringify(DEFAULT_REVIEWS),
      );
      setChannelsList(DEFAULT_CHANNELS);
      localStorage.setItem(
        "portfolio_channels",
        JSON.stringify(DEFAULT_CHANNELS),
      );
      alert("Reset completed successfully!");
    }
  };

  const filteredShowcase =
    showcaseFilter === "All"
      ? projectsList
      : projectsList.filter((p) =>
          p.category.toLowerCase().includes(showcaseFilter.toLowerCase()),
        );

  return (
    <main className="min-h-screen bg-[#0e0e10] text-white pt-28 pb-36 px-4 sm:px-8 max-w-7xl mx-auto font-sans relative z-10 selection:bg-yellow-400 selection:text-neutral-950">
      {/* Top Header Bar */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-6 border-b border-neutral-800 gap-4 mb-8">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-widest text-yellow-400 bg-yellow-400/10 px-2.5 py-1 rounded-md border border-yellow-400/20">
            Control Room
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            Admin Dashboard
          </h1>
          <p className="text-xs text-neutral-400 font-mono mt-0.5">
            Manage, edit, and reorganize all portfolio sections live
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-3">
          <Link
            href="/"
            className="text-xs font-bold text-neutral-200 bg-neutral-900 border border-neutral-800 hover:border-yellow-400 hover:text-yellow-400 px-4 py-2.5 rounded-xl transition-all shadow-md"
          >
            ← View Portfolio
          </Link>
          <button
            onClick={handleResetDefaults}
            className="text-xs font-bold text-neutral-400 hover:text-red-400 px-3.5 py-2.5 bg-neutral-900/60 border border-neutral-800 rounded-xl transition-all"
            title="Reset all sections to defaults"
          >
            Reset All Defaults
          </button>
        </div>
      </div>

      {/* 4 Distinct Section Tabs */}
      <div className="flex overflow-x-auto no-scrollbar gap-2 pb-4 mb-8 border-b border-neutral-800">
        {[
          { key: "showcase", label: `1. Showcase (${projectsList.length})` },
          {
            key: "testimonials",
            label: `2. Video Testimonials (${testimonialsList.length})`,
          },
          {
            key: "reviews",
            label: `3. Client Reviews (${reviewsList.length})`,
          },
          {
            key: "channels",
            label: `4. Channels & Accounts (${channelsList.length})`,
          },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key as any)}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all uppercase tracking-wider ${
              activeTab === tab.key
                ? "bg-yellow-400 text-neutral-950 shadow-md shadow-yellow-400/20"
                : "bg-neutral-900 text-neutral-400 hover:text-white border border-neutral-800"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* ================= TAB 1: SHOWCASE MANAGER ================= */}
      {activeTab === "showcase" && (
        <div className="space-y-10">
          {/* Add / Edit Project Form */}
          <form
            onSubmit={handleSaveProject}
            className="p-5 sm:p-7 rounded-3xl bg-[#141417] border border-neutral-800/90 shadow-xl space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                {editingProjectId
                  ? "Edit Showcase Item"
                  : "Add Item to Showcase"}
              </h3>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setTitle("");
                    setYtUrlOrId("");
                    setCustomThumb("");
                  }}
                  className="text-xs font-bold text-yellow-400 hover:underline"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. 3D Automotive CGI Spot"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-400"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Category
                </label>
                <select
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-400"
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>
                      {c}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  YouTube URL or Video ID (Auto Thumbnail)
                </label>
                <input
                  type="text"
                  placeholder="https://youtu.be/... or ID"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-400"
                  value={ytUrlOrId}
                  onChange={(e) => setYtUrlOrId(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Custom Thumbnail / Image Path (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. /photos/p01.jpg"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700/80 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-400"
                  value={customThumb}
                  onChange={(e) => setCustomThumb(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300 transition-all shadow-md mt-2"
            >
              {editingProjectId
                ? "Update Showcase Item"
                : "Publish to Showcase"}
            </button>
          </form>

          {/* Category Creator */}
          <div className="p-4 sm:p-5 rounded-2xl bg-[#141417] border border-neutral-800 flex flex-col sm:flex-row items-center justify-between gap-4">
            <span className="text-xs font-bold text-neutral-300">
              Create New Category Filter:
            </span>
            <form
              onSubmit={handleAddCategory}
              className="flex w-full sm:w-auto gap-2"
            >
              <input
                type="text"
                placeholder="Category Name..."
                className="flex-1 sm:w-60 p-2.5 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white focus:outline-none focus:border-yellow-400"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
              />
              <button
                type="submit"
                className="px-4 py-2.5 bg-neutral-800 hover:bg-neutral-700 text-yellow-400 font-bold text-xs rounded-xl whitespace-nowrap"
              >
                + Add
              </button>
            </form>
          </div>

          {/* Filter Bar & Items */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-5">
              <h3 className="text-base sm:text-lg font-black text-white">
                Showcase Items{" "}
                <span className="text-yellow-400">
                  ({filteredShowcase.length})
                </span>
              </h3>

              <div className="flex flex-wrap gap-1.5">
                {["All", "Photos", "Videos", "3D / Unreal", "Reels"].map(
                  (sub) => (
                    <button
                      key={sub}
                      onClick={() => setShowcaseFilter(sub)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                        showcaseFilter === sub
                          ? "bg-yellow-400 text-neutral-950"
                          : "bg-[#18181c] text-neutral-400 hover:text-white border border-neutral-800"
                      }`}
                    >
                      {sub}
                    </button>
                  ),
                )}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {filteredShowcase.map((item) => {
                const thumb =
                  item.thumbnail_url ||
                  (item.youtube_id
                    ? `https://i.ytimg.com/vi/${item.youtube_id}/hqdefault.jpg`
                    : "/photos/p01.jpg");
                return (
                  <div
                    key={item.id}
                    className="p-3 rounded-2xl bg-[#141417] border border-neutral-800/80 hover:border-neutral-700 flex items-center gap-3 transition-all"
                  >
                    <img
                      src={thumb}
                      alt={item.title}
                      className="w-16 h-12 object-cover rounded-lg shrink-0 bg-neutral-900 border border-neutral-800"
                      loading="lazy"
                    />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-white line-clamp-1">
                        {item.title}
                      </h4>
                      <span className="text-[10px] font-mono text-yellow-400 uppercase tracking-wider block mt-0.5">
                        {item.category}
                      </span>
                    </div>
                    <div className="flex gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditProject(item)}
                        className="px-2.5 py-1 rounded-lg bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteProject(item.id)}
                        className="px-2.5 py-1 rounded-lg bg-red-950/40 text-red-400 text-xs font-bold hover:bg-red-900/60"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 2: VIDEO TESTIMONIALS ================= */}
      {activeTab === "testimonials" && (
        <div className="space-y-10">
          <form
            onSubmit={handleSaveVideoTestimonial}
            className="p-5 sm:p-7 rounded-3xl bg-[#141417] border border-neutral-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                {editingVtId
                  ? "Edit Video Testimonial"
                  : "Add Video Testimonial"}
              </h3>
              {editingVtId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingVtId(null);
                    setVtName("");
                    setVtCompany("");
                    setVtYt("");
                  }}
                  className="text-xs font-bold text-yellow-400 hover:underline"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Client / Speaker Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Daniel Carter"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={vtName}
                  onChange={(e) => setVtName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Role or Company
                </label>
                <input
                  type="text"
                  placeholder="e.g. Media Production Director"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={vtCompany}
                  onChange={(e) => setVtCompany(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  YouTube URL or Video ID
                </label>
                <input
                  type="text"
                  placeholder="https://youtube.com/shorts/... or ID"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={vtYt}
                  onChange={(e) => setVtYt(e.target.value)}
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300 transition-all shadow-md mt-2"
            >
              {editingVtId ? "Update Testimonial" : "Publish Video Testimonial"}
            </button>
          </form>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4">
              Active Video Testimonials{" "}
              <span className="text-yellow-400">
                ({testimonialsList.length})
              </span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {testimonialsList.map((t) => (
                <div
                  key={t.id}
                  className="p-3.5 bg-[#141417] border border-neutral-800 rounded-2xl flex flex-col justify-between gap-3 shadow-md"
                >
                  <div className="aspect-[9/16] w-full rounded-xl overflow-hidden bg-black relative">
                    <img
                      src={`https://i.ytimg.com/vi/${t.youtube_id}/hqdefault.jpg`}
                      alt={t.client_name}
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-black/30 flex items-center justify-center">
                      <span className="w-10 h-10 rounded-full bg-yellow-400 text-neutral-950 flex items-center justify-center font-bold text-xs">
                        ▶
                      </span>
                    </div>
                  </div>
                  <div>
                    <h4 className="font-bold text-xs text-white line-clamp-1">
                      {t.client_name}
                    </h4>
                    <p className="text-[10px] text-neutral-400 font-mono line-clamp-1 mt-0.5">
                      {t.company}
                    </p>
                  </div>
                  <div className="flex gap-2 pt-2 border-t border-neutral-800">
                    <button
                      onClick={() => startEditVt(t)}
                      className="flex-1 py-1.5 rounded-lg bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVt(t.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-950/40 text-red-400 text-xs font-bold hover:bg-red-900/60"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 3: CLIENT REVIEWS ================= */}
      {activeTab === "reviews" && (
        <div className="space-y-10">
          <form
            onSubmit={handleSaveReview}
            className="p-5 sm:p-7 rounded-3xl bg-[#141417] border border-neutral-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                {editingReviewId ? "Edit Review" : "Add Upwork / Client Review"}
              </h3>
              {editingReviewId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReviewId(null);
                    setRevTitle("");
                    setRevClient("");
                    setRevRating("5.0");
                    setRevDates("");
                    setRevBudget("");
                    setRevText("");
                    setRevTags("");
                  }}
                  className="text-xs font-bold text-yellow-400 hover:underline"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Job / Contract Title
                </label>
                <input
                  type="text"
                  placeholder="e.g. Longterm Youtube Podcast editor"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revTitle}
                  onChange={(e) => setRevTitle(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Client Name / Role
                </label>
                <input
                  type="text"
                  placeholder="e.g. Creative Producer"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revClient}
                  onChange={(e) => setRevClient(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Rating (out of 5.0)
                </label>
                <input
                  type="text"
                  placeholder="5.0"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revRating}
                  onChange={(e) => setRevRating(e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Date Range
                </label>
                <input
                  type="text"
                  placeholder="e.g. Oct 31, 2025 - Mar 2, 2026"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revDates}
                  onChange={(e) => setRevDates(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Earnings / Budget
                </label>
                <input
                  type="text"
                  placeholder="e.g. $3,145.00"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revBudget}
                  onChange={(e) => setRevBudget(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Contract Type
                </label>
                <select
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={revType}
                  onChange={(e) => setRevType(e.target.value as any)}
                >
                  <option value="Fixed price">Fixed price</option>
                  <option value="Hourly">Hourly</option>
                </select>
              </div>
            </div>

            <div>
              <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                Review / Feedback Quote
              </label>
              <textarea
                rows={3}
                placeholder="Client quote..."
                className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                value={revText}
                onChange={(e) => setRevText(e.target.value)}
              />
            </div>

            <div>
              <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                Endorsements / Skills Badges (comma separated)
              </label>
              <input
                type="text"
                placeholder="Committed to Quality, Clear Communicator, Detail Oriented"
                className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                value={revTags}
                onChange={(e) => setRevTags(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300 transition-all shadow-md mt-2"
            >
              {editingReviewId ? "Update Review" : "Publish Review"}
            </button>
          </form>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4">
              Verified Client Reviews{" "}
              <span className="text-yellow-400">({reviewsList.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {reviewsList.map((r) => (
                <div
                  key={r.id}
                  className="p-5 bg-[#141417] border border-neutral-800 rounded-2xl flex flex-col justify-between shadow-md"
                >
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-yellow-400 text-xs font-bold">
                        ★ {r.rating.toFixed(1)}
                      </span>
                      <span className="text-[10px] font-mono text-neutral-500">
                        {r.date_range}
                      </span>
                    </div>
                    <h4 className="font-bold text-xs sm:text-sm text-white line-clamp-2">
                      {r.project_title}
                    </h4>
                    {r.review_text && (
                      <p className="text-xs text-neutral-300 italic mt-2.5 line-clamp-3">
                        "{r.review_text}"
                      </p>
                    )}
                    {r.endorsed && r.endorsed.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-3">
                        {r.endorsed.map((tag) => (
                          <span
                            key={tag}
                            className="text-[8px] font-mono text-yellow-400 bg-yellow-400/10 px-1.5 py-0.5 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  <div className="flex items-center justify-between pt-3 mt-4 border-t border-neutral-800 text-xs font-mono text-neutral-400">
                    <span className="font-bold text-white">{r.budget}</span>
                    <div className="flex gap-2">
                      <button
                        onClick={() => startEditReview(r)}
                        className="px-2.5 py-1 rounded bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteReview(r.id)}
                        className="px-2 py-1 rounded bg-red-950/40 text-red-400 text-xs font-bold hover:bg-red-900/60"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* ================= TAB 4: CHANNELS & ACCOUNTS ================= */}
      {activeTab === "channels" && (
        <div className="space-y-10">
          <form
            onSubmit={handleSaveChannel}
            className="p-5 sm:p-7 rounded-3xl bg-[#141417] border border-neutral-800 space-y-4"
          >
            <div className="flex items-center justify-between">
              <h3 className="text-base sm:text-lg font-black text-white flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-yellow-400" />
                {editingChId
                  ? "Edit Channel / Partner"
                  : "Add Channel or Client Account"}
              </h3>
              {editingChId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingChId(null);
                    setChName("");
                    setChHandle("");
                    setChUrl("");
                    setChAvatar("");
                  }}
                  className="text-xs font-bold text-yellow-400 hover:underline"
                >
                  Cancel Edit ✕
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Account / Channel Name
                </label>
                <input
                  type="text"
                  placeholder="e.g. Watchdog BWC"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chName}
                  onChange={(e) => setChName(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Handle
                </label>
                <input
                  type="text"
                  placeholder="e.g. @WatchdogBWC"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chHandle}
                  onChange={(e) => setChHandle(e.target.value)}
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Platform
                </label>
                <select
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chPlatform}
                  onChange={(e) => setChPlatform(e.target.value)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Brand">Brand</option>
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Direct URL
                </label>
                <input
                  type="text"
                  placeholder="https://www.youtube.com/@... or instagram.com/..."
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chUrl}
                  onChange={(e) => setChUrl(e.target.value)}
                  required
                />
              </div>

              <div>
                <label className="text-[11px] font-mono text-neutral-400 mb-1.5 block">
                  Custom Avatar Image URL (optional)
                </label>
                <input
                  type="text"
                  placeholder="https://... or leave empty"
                  className="w-full p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chAvatar}
                  onChange={(e) => setChAvatar(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-3 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300 transition-all shadow-md mt-2"
            >
              {editingChId ? "Update Channel" : "Save Channel to Portfolio"}
            </button>
          </form>

          <div>
            <h3 className="text-base sm:text-lg font-black text-white mb-4">
              Connected Channels & Clients{" "}
              <span className="text-yellow-400">({channelsList.length})</span>
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {channelsList.map((c) => (
                <div
                  key={c.id}
                  className="p-4 bg-[#141417] border border-neutral-800 rounded-2xl flex items-center justify-between shadow-md"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-xs text-yellow-400">
                      {c.platform === "YouTube" ? "▶" : "📸"}
                    </div>
                    <div>
                      <h4 className="font-bold text-xs text-white">{c.name}</h4>
                      <span className="text-[10px] font-mono text-neutral-400">
                        {c.handle}
                      </span>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => startEditChannel(c)}
                      className="px-2.5 py-1 rounded bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteChannel(c.id)}
                      className="px-2 py-1 rounded bg-red-950/40 text-red-400 text-xs font-bold hover:bg-red-900/60"
                    >
                      ✕
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </main>
  );
}
