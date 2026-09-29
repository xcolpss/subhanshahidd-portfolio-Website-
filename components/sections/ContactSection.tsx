'use client';

import { useState } from 'react';

export default function ContactSection() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [service, setService] = useState('Video Editing');
  const [details, setDetails] = useState('');

  const handleWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const text = `Hey Subhan, my name is ${firstName} ${lastName} (${email}). I'm inquiring about ${service}. Details: ${details}`;
    window.open(`https://wa.me/923171511108?text=${encodeURIComponent(text)}`, '_blank');
  };

  const handleEmailDirect = () => {
    const subject = `Project Inquiry: ${service} - ${firstName} ${lastName}`;
    const body = `Name: ${firstName} ${lastName}\nPhone: ${phone}\nService: ${service}\n\nProject Details:\n${details}`;
    window.location.href = `mailto:rajasubhanahmed@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section id="contact" className="py-24 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 bg-[#121215] border border-neutral-800 rounded-3xl p-8 sm:p-14">
        {/* Left Side Info */}
        <div className="lg:col-span-5 flex flex-col justify-between">
          <div>
            <span className="text-yellow-400 font-mono text-xs uppercase tracking-widest font-bold">
              Let's Work Together
            </span>
            <h2 className="text-5xl font-black text-yellow-400 tracking-tight mt-2 mb-6">
              Contact
            </h2>
            <p className="text-neutral-400 text-sm leading-relaxed mb-8">
              Tell me about your project—photo editing, high-impact video (VFX/CGI), or real-time 3D/Unreal. I'll reply ASAP with the next steps.
            </p>

            <div className="space-y-4 text-sm font-medium">
              <div className="flex items-center gap-3">
                <span className="text-yellow-400">✉</span>
                <a href="mailto:rajasubhanahmed@gmail.com" className="text-neutral-200 hover:text-yellow-400 underline">
                  rajasubhanahmed@gmail.com
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-yellow-400">✆</span>
                <span className="text-neutral-400">WhatsApp:</span>
                <a href="https://wa.me/923171511108" target="_blank" className="text-neutral-200 hover:text-yellow-400 font-mono">
                  +92 317 1511108
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-neutral-800/80 text-xs text-neutral-500 font-mono">
            Also on <a href="https://instagram.com" target="_blank" className="text-neutral-300 underline">Instagram</a> and <a href="https://upwork.com" target="_blank" className="text-neutral-300 underline">Upwork</a>.
          </div>
        </div>

        {/* Right Side Form */}
        <form onSubmit={handleWhatsApp} className="lg:col-span-7 flex flex-col gap-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 mb-1 block">First name</label>
              <input
                type="text"
                placeholder="Subhan"
                className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-neutral-400 mb-1 block">Last name</label>
              <input
                type="text"
                placeholder="Shahid"
                className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-neutral-400 mb-1 block">Email</label>
              <input
                type="email"
                placeholder="you@email.com"
                className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div>
              <label className="text-xs font-mono text-neutral-400 mb-1 block">Phone (optional)</label>
              <input
                type="text"
                placeholder="+92 ..."
                className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 mb-1 block">Service</label>
            <select
              className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
              value={service}
              onChange={(e) => setService(e.target.value)}
            >
              <option value="Poster Design">Poster Design & Key Visuals</option>
              <option value="Video Editing">Video Editing & Montage</option>
              <option value="3D / VFX">3D Modeling & Visual Effects</option>
              <option value="Reels">Shorts / Reels Content</option>
              <option value="3D Animation">3D Character & Motion Animation</option>
            </select>
          </div>

          <div>
            <label className="text-xs font-mono text-neutral-400 mb-1 block">Project details</label>
            <textarea
              rows={4}
              placeholder="What are we making? Deadline, budget, references, links..."
              className="w-full p-3 bg-[#18181b] border border-neutral-800 rounded-xl text-sm text-white focus:outline-none focus:border-yellow-400"
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              required
            />
          </div>

          <div className="flex flex-wrap gap-4 mt-2">
            <button
              type="submit"
              className="flex-1 py-3.5 px-6 rounded-xl bg-yellow-400 text-neutral-950 font-black text-sm uppercase tracking-wider hover:bg-yellow-300 transition-all shadow-lg shadow-yellow-400/20"
            >
              Send via WhatsApp
            </button>
            <button
              type="button"
              onClick={handleEmailDirect}
              className="py-3.5 px-6 rounded-xl bg-neutral-900 border border-neutral-700 text-neutral-200 font-bold text-sm hover:border-yellow-400 hover:text-yellow-400 transition-all"
            >
              Or Email Directly
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
