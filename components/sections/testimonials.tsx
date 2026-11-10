"use client";

import { useState, useEffect } from "react";

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

export const INITIAL_REVIEWS: ReviewItem[] = [
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
    client_name: "Local Service Brand",
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
    client_name: "Creative Agency",
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
    client_name: "Channel Owner",
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
    client_name: "E-Commerce Store",
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
    client_name: "Media Studio",
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
    client_name: "Content Creator",
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

export default function TestimonialsSection() {
  const [reviews, setReviews] = useState<ReviewItem[]>(INITIAL_REVIEWS);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("portfolio_reviews");
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) {
          setReviews(parsed);
          return;
        }
      }
      localStorage.setItem(
        "portfolio_reviews",
        JSON.stringify(INITIAL_REVIEWS),
      );
    } catch (e) {}
  }, []);

  return (
    <section
      id="reviews"
      className="py-24 px-4 sm:px-6 max-w-7xl mx-auto scroll-mt-20"
    >
      <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 gap-4">
        <div>
          <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest bg-yellow-400/10 px-3 py-1 rounded-full border border-yellow-400/20">
            Upwork Verified Reviews
          </span>
          <h2 className="text-4xl sm:text-5xl font-black tracking-tight text-white mt-4">
            CLIENT <span className="text-yellow-400">FEEDBACK.</span>
          </h2>
          <p className="text-neutral-400 text-xs sm:text-sm mt-2">
            Real contract reviews and ratings from client projects worldwide.
          </p>
        </div>

        <div className="flex items-center gap-2 bg-[#141417] border border-neutral-800 px-4 py-2 rounded-2xl self-start sm:self-auto">
          <span className="text-yellow-400 text-base">★★★★★</span>
          <span className="text-white font-bold text-xs sm:text-sm">
            5.0 Star Average
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.map((r) => (
          <div
            key={r.id}
            className="p-6 rounded-3xl bg-[#141417] border border-neutral-800/80 hover:border-yellow-400/50 transition-all duration-300 shadow-xl flex flex-col justify-between"
          >
            <div>
              {/* Header: Rating & Date */}
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-1.5">
                  <span className="text-yellow-400 text-sm">★</span>
                  <span className="text-white font-black text-xs">
                    {r.rating.toFixed(1)}
                  </span>
                </div>
                <span className="text-[10px] font-mono text-neutral-500">
                  {r.date_range}
                </span>
              </div>

              {/* Contract Title */}
              <h4 className="font-bold text-sm sm:text-base text-white group-hover:text-yellow-400 transition-colors line-clamp-2">
                {r.project_title}
              </h4>

              {/* Review Text */}
              {r.review_text && (
                <p className="text-xs sm:text-sm text-neutral-300 italic mt-3 leading-relaxed">
                  "{r.review_text}"
                </p>
              )}

              {/* Endorsement Tags */}
              {r.endorsed && r.endorsed.length > 0 && (
                <div className="flex flex-wrap gap-1.5 mt-4">
                  {r.endorsed.map((tag) => (
                    <span
                      key={tag}
                      className="text-[9px] font-mono uppercase tracking-wider text-yellow-400 bg-yellow-400/10 border border-yellow-400/20 px-2 py-0.5 rounded-md"
                    >
                      ✓ {tag}
                    </span>
                  ))}
                </div>
              )}
            </div>

            {/* Bottom: Compensation & Contract Specs */}
            <div className="flex items-center justify-between pt-4 mt-5 border-t border-neutral-800/80 text-xs font-mono text-neutral-400">
              <span className="font-bold text-white">{r.budget}</span>
              <span>
                {r.type} {r.hours ? `• ${r.hours}` : ""}
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
