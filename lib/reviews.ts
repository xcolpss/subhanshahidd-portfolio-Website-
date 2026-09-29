// lib/reviews.ts

export type ReviewItem = {
  who: string;
  role?: string;
  source: string;   // "Upwork", "Direct Client", etc.
  text: string;
  href?: string;    // optional external proof link
};

// Only authentic Upwork reviews (verbatim)
export const REVIEWS: ReviewItem[] = [
  {
    who: "Andreas",
    source: "Upwork",
    text:
      "I cannot speak highly enough of the amazing service provided by Subhan Shahid. I HIGHLY recommend him to anyone who has big ideas or challenging concepts they need to bring to life. Subhan is truly a master digital designer who possesses an incredible ability to translate complex visions into stunning realities. It was an absolute pleasure to work with him from start to finish. I am extremely grateful for his expertise and utterly satisfied with the results!"
  },
  {
    who: "Cullen",
    source: "Upwork",
    text:
      "Subhan has been a real pleasure to deal with. He works quickly, is open to all sorts of feedback, and he's always got interesting suggestions that I otherwise wouldn't have considered. To top it all off, he's a genuinely good man who won't rest until you are completely satisfied with the final product. I highly recommend this freelancer."
  },
  {
    who: "Dave",
    role: "VFX & CGI",
    source: "Upwork",
    text:
      "Subhan does great work and is a great professional. He is constantly trying to find ways to improve and grow my project."
  },
  {
    who: "Prasad",
    source: "Upwork",
    text: "Good helpful resource. Will work with him again"
  },
  {
    who: "Roddy Hanson",
    source: "Upwork",
    text: "Love working with Subhan he always does a great job."
  },
  {
    who: "Dave",
    source: "Upwork",
    text:
      "Subhan was pleasure to work with. His attention to details is great, his commutation is amazing, and he is the ultimate professional. I will be working with Subhan again in the future!"
  },
  {
    who: "Avi Cohen",
    role: "Photoshop Artist",
    source: "Upwork",
    text:
      "Subhan has been a real pleasure to deal with. He works quickly, is open to all sorts of feedback, and he's always got interesting suggestions that I otherwise wouldn't have considered. To top it all off, he's a genuinely good man who won't rest until you are completely satisfied with the final product. I highly recommend this freelancer."
  }
];
