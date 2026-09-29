'use client';

import { useState, useEffect } from 'react';
import { supabase } from '@/lib/supabaseClient';
import Link from 'next/link';

export default function AdminDashboard() {
  const [session, setSession] = useState<any>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [activeTab, setActiveTab] = useState<'showcase' | 'testimonials' | 'reviews' | 'channels' | 'stats'>('showcase');

  // Showcase state
  const [showcaseFilter, setShowcaseFilter] = useState('All');
  const [categories, setCategories] = useState<string[]>(['Photos', 'Videos', '3D / Unreal', 'Reels']);
  const [newCategory, setNewCategory] = useState('');
  const [projectsList, setProjectsList] = useState<any[]>([]);
  const [title, setTitle] = useState('');
  const [selectedCat, setSelectedCat] = useState('Videos');
  const [ytUrlOrId, setYtUrlOrId] = useState('');
  const [customThumb, setCustomThumb] = useState('');
  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);

  // Video Testimonials state
  const [testimonialsList, setTestimonialsList] = useState<any[]>([]);
  const [vtName, setVtName] = useState('');
  const [vtCompany, setVtCompany] = useState('');
  const [vtYt, setVtYt] = useState('');
  const [editingVtId, setEditingVtId] = useState<string | null>(null);

  // Reviews state
  const [reviewsList, setReviewsList] = useState<any[]>([]);
  const [clientName, setClientName] = useState('');
  const [clientRole, setClientRole] = useState('');
  const [company, setCompany] = useState('');
  const [reviewText, setReviewText] = useState('');
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  // Channels & Clients state
  const [channelsList, setChannelsList] = useState<any[]>([]);
  const [chName, setChName] = useState('');
  const [chPlatform, setChPlatform] = useState('YouTube');
  const [chUrl, setChUrl] = useState('');
  const [chAvatar, setChAvatar] = useState('');
  const [editingChId, setEditingChId] = useState<string | null>(null);

  // Stats state
  const [statsList, setStatsList] = useState<any[]>([]);
  const [savingStatId, setSavingStatId] = useState<string | null>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    loadData();
    return () => subscription.unsubscribe();
  }, []);

  const loadData = async () => {
    const [{ data: cats }, { data: projs }, { data: vts }, { data: revs }, { data: chs }, { data: stats }] = await Promise.all([
      supabase.from('categories').select('*').order('display_order', { ascending: true }),
      supabase.from('showcase').select('*').order('display_order', { ascending: true }),
      supabase.from('video_testimonials').select('*').order('created_at', { ascending: false }),
      supabase.from('reviews').select('*').order('created_at', { ascending: false }),
      supabase.from('clients_channels').select('*').order('display_order', { ascending: true }),
      supabase.from('stats').select('*').order('display_order', { ascending: true }),
    ]);

    if (cats && cats.length > 0) setCategories(cats.map((c) => c.name));
    if (projs) setProjectsList(projs);
    if (vts) setTestimonialsList(vts);
    if (revs) setReviewsList(revs);
    if (chs) setChannelsList(chs);
    if (stats) setStatsList(stats);
  };

  const extractYouTubeId = (input: string) => {
    if (!input) return null;
    const match = input.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([\w-]{11})/);
    return match ? match[1] : input.trim();
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) alert(error.message);
  };

  const handleAddCategory = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const { error } = await supabase.from('categories').insert([{ name: newCategory.trim() }]);
    if (error) alert(error.message);
    else {
      alert('Category created!');
      setNewCategory('');
      loadData();
    }
  };

  // Save / Update Project
  const handleSaveProject = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanYt = extractYouTubeId(ytUrlOrId);
    const thumbUrl = customThumb || (cleanYt ? `https://i.ytimg.com/vi/${cleanYt}/hqdefault.jpg` : '/photos/p01.jpg');

    if (editingProjectId) {
      const { error } = await supabase.from('showcase').update({
        title,
        category: selectedCat,
        youtube_id: cleanYt,
        thumbnail_url: thumbUrl,
      }).eq('id', editingProjectId);

      if (error) alert(error.message);
      else {
        alert('Showcase item updated!');
        setEditingProjectId(null);
      }
    } else {
      const { error } = await supabase.from('showcase').insert([
        { title, category: selectedCat, youtube_id: cleanYt, thumbnail_url: thumbUrl },
      ]);
      if (error) alert(error.message);
      else alert('Showcase item added!');
    }

    setTitle('');
    setYtUrlOrId('');
    setCustomThumb('');
    loadData();
  };

  const startEditProject = (item: any) => {
    setEditingProjectId(item.id);
    setTitle(item.title);
    setSelectedCat(item.category);
    setYtUrlOrId(item.youtube_id || '');
    setCustomThumb(item.thumbnail_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteProject = async (id: string) => {
    if (!confirm('Delete this project?')) return;
    const { error } = await supabase.from('showcase').delete().eq('id', id);
    if (error) alert(error.message);
    else loadData();
  };

  // Save / Update Video Testimonial
  const handleSaveVideoTestimonial = async (e: React.FormEvent) => {
    e.preventDefault();
    const cleanYt = extractYouTubeId(vtYt);

    if (editingVtId) {
      const { error } = await supabase.from('video_testimonials').update({
        client_name: vtName,
        company: vtCompany,
        youtube_id: cleanYt,
      }).eq('id', editingVtId);

      if (error) alert(error.message);
      else {
        alert('Testimonial updated!');
        setEditingVtId(null);
      }
    } else {
      const { error } = await supabase.from('video_testimonials').insert([
        { client_name: vtName, company: vtCompany, youtube_id: cleanYt, aspect_ratio: '9:16' },
      ]);
      if (error) alert(error.message);
      else alert('Testimonial added!');
    }

    setVtName('');
    setVtCompany('');
    setVtYt('');
    loadData();
  };

  const startEditVt = (vt: any) => {
    setEditingVtId(vt.id);
    setVtName(vt.client_name);
    setVtCompany(vt.company || '');
    setVtYt(vt.youtube_id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteVt = async (id: string) => {
    if (!confirm('Delete this testimonial?')) return;
    const { error } = await supabase.from('video_testimonials').delete().eq('id', id);
    if (error) alert(error.message);
    else loadData();
  };

  // Save / Update Review
  const handleSaveReview = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingReviewId) {
      const { error } = await supabase.from('reviews').update({
        client_name: clientName,
        client_role: clientRole,
        company,
        review_text: reviewText,
      }).eq('id', editingReviewId);

      if (error) alert(error.message);
      else {
        alert('Review updated!');
        setEditingReviewId(null);
      }
    } else {
      const { error } = await supabase.from('reviews').insert([
        { client_name: clientName, client_role: clientRole, company, review_text: reviewText },
      ]);
      if (error) alert(error.message);
      else alert('Review added!');
    }

    setClientName('');
    setClientRole('');
    setCompany('');
    setReviewText('');
    loadData();
  };

  const startEditReview = (r: any) => {
    setEditingReviewId(r.id);
    setClientName(r.client_name);
    setClientRole(r.client_role);
    setCompany(r.company || '');
    setReviewText(r.review_text);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteReview = async (id: string) => {
    if (!confirm('Delete this review?')) return;
    const { error } = await supabase.from('reviews').delete().eq('id', id);
    if (error) alert(error.message);
    else loadData();
  };

  // Save / Update Channel
  const handleSaveChannel = async (e: React.FormEvent) => {
    e.preventDefault();
    if (editingChId) {
      const { error } = await supabase.from('clients_channels').update({
        name: chName,
        platform: chPlatform,
        url: chUrl,
        avatar_url: chAvatar,
      }).eq('id', editingChId);

      if (error) alert(error.message);
      else {
        alert('Channel updated!');
        setEditingChId(null);
      }
    } else {
      const { error } = await supabase.from('clients_channels').insert([
        { name: chName, platform: chPlatform, url: chUrl, avatar_url: chAvatar },
      ]);
      if (error) alert(error.message);
      else alert('Channel added!');
    }

    setChName('');
    setChUrl('');
    setChAvatar('');
    loadData();
  };

  const startEditChannel = (ch: any) => {
    setEditingChId(ch.id);
    setChName(ch.name);
    setChPlatform(ch.platform);
    setChUrl(ch.url);
    setChAvatar(ch.avatar_url || '');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteChannel = async (id: string) => {
    if (!confirm('Delete this channel?')) return;
    const { error } = await supabase.from('clients_channels').delete().eq('id', id);
    if (error) alert(error.message);
    else loadData();
  };

  // Save Stat with live update
  const handleUpdateStat = async (id: string, value: string, label: string) => {
    setSavingStatId(id);
    const { error } = await supabase.from('stats').update({ value, label }).eq('id', id);
    setSavingStatId(null);
    if (error) alert('Error updating stat: ' + error.message);
    else {
      alert('Counter updated live!');
      loadData();
    }
  };

  const filteredShowcase = showcaseFilter === 'All'
    ? projectsList
    : projectsList.filter((p) => p.category.toLowerCase().includes(showcaseFilter.toLowerCase()));

  if (!session) {
    return (
      <div className="min-h-screen bg-[#0e0e10] flex items-center justify-center p-6 text-white font-sans">
        <form onSubmit={handleLogin} className="w-full max-w-sm bg-[#161619] border border-neutral-800 p-8 rounded-3xl shadow-2xl">
          <div className="w-10 h-10 rounded-xl bg-yellow-400 text-neutral-950 font-black text-sm flex items-center justify-center mb-4">
            S.
          </div>
          <h2 className="text-2xl font-black text-white">Admin Access</h2>
          <p className="text-xs text-neutral-500 mb-6 mt-1">Sign in with your admin credentials</p>
          <div className="flex flex-col gap-4">
            <input
              type="email"
              placeholder="Admin Email"
              className="p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-sm text-white"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="Password"
              className="p-3 bg-[#1c1c20] border border-neutral-700 rounded-xl text-sm text-white"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="py-3 rounded-xl bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider hover:bg-yellow-300">
              Sign In
            </button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0e0e10] text-white p-6 md:p-12 max-w-6xl mx-auto font-sans selection:bg-yellow-400 selection:text-neutral-950">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center pb-8 border-b border-neutral-800 gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-black text-white">Admin Command Center</h1>
          <p className="text-xs text-neutral-500 font-mono mt-1">Logged in: {session.user.email}</p>
        </div>
        <div className="flex items-center gap-3">
          <Link href="/" className="text-xs font-bold text-yellow-400 uppercase tracking-widest px-4 py-2 border border-neutral-800 rounded-xl hover:border-yellow-400">
            View Live Site ↗
          </Link>
          <button
            onClick={() => supabase.auth.signOut()}
            className="text-xs font-bold text-neutral-400 px-4 py-2 bg-neutral-900 border border-neutral-800 rounded-xl hover:text-white"
          >
            Sign Out
          </button>
        </div>
      </div>

      {/* 5 DISTINCT SECTIONS */}
      <div className="flex flex-wrap gap-2 border-b border-neutral-800 pb-4 mb-8">
        {(['showcase', 'testimonials', 'reviews', 'channels', 'stats'] as const).map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={`px-5 py-2.5 rounded-xl text-xs font-black tracking-wider uppercase transition-all ${
              activeTab === tab ? 'bg-yellow-400 text-neutral-950 shadow-lg shadow-yellow-400/20' : 'bg-neutral-900 text-neutral-400 hover:text-white'
            }`}
          >
            {tab === 'showcase'
              ? '1. Showcase'
              : tab === 'testimonials'
              ? '2. Video Testimonials'
              : tab === 'reviews'
              ? '3. Reviews'
              : tab === 'channels'
              ? '4. Channels & Accounts'
              : '5. Live Stats'}
          </button>
        ))}
      </div>

      {/* SECTION 1: SHOWCASE MANAGER */}
      {activeTab === 'showcase' && (
        <div className="space-y-12">
          {/* Create category */}
          <div className="p-6 rounded-2xl bg-[#141416] border border-neutral-800">
            <h3 className="text-sm font-bold text-yellow-400 uppercase tracking-wider mb-2">Create New Category</h3>
            <form onSubmit={handleAddCategory} className="flex gap-4">
              <input
                type="text"
                placeholder="Category Name (e.g. CGI Ads, 3D Automotive)..."
                className="flex-1 p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                required
              />
              <button type="submit" className="px-6 py-3 bg-neutral-800 text-yellow-400 font-black text-xs uppercase rounded-xl hover:bg-neutral-700">
                + Add Category
              </button>
            </form>
          </div>

          {/* Add / Edit Project Form */}
          <form onSubmit={handleSaveProject} className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">
                {editingProjectId ? 'Edit Showcase Item' : 'Add Item to Showcase'}
              </h3>
              {editingProjectId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingProjectId(null);
                    setTitle('');
                    setYtUrlOrId('');
                    setCustomThumb('');
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Title</label>
                <input
                  type="text"
                  placeholder="e.g. Commercial 3D Can Animation"
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Category</label>
                <select
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={selectedCat}
                  onChange={(e) => setSelectedCat(e.target.value)}
                >
                  {categories.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">YouTube URL or ID (Auto thumbnail)</label>
                <input
                  type="text"
                  placeholder="https://youtu.be/... or ID"
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={ytUrlOrId}
                  onChange={(e) => setYtUrlOrId(e.target.value)}
                />
              </div>
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Custom Thumbnail URL (optional if using YouTube)</label>
                <input
                  type="text"
                  placeholder="/photos/p01.jpg"
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={customThumb}
                  onChange={(e) => setCustomThumb(e.target.value)}
                />
              </div>
            </div>

            <button type="submit" className="py-3.5 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300 mt-2">
              {editingProjectId ? 'Update Project' : 'Publish To Showcase'}
            </button>
          </form>

          {/* Sub-category filter pills inside admin */}
          <div>
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
              <h3 className="text-lg font-black text-white">Existing Showcase Items ({filteredShowcase.length})</h3>
              <div className="flex flex-wrap gap-2">
                {['All', 'Photos', 'Videos', '3D / Unreal', 'Reels'].map((sub) => (
                  <button
                    key={sub}
                    onClick={() => setShowcaseFilter(sub)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                      showcaseFilter === sub
                        ? 'bg-yellow-400 text-neutral-950'
                        : 'bg-[#1c1c20] text-neutral-400 hover:text-white'
                    }`}
                  >
                    {sub}
                  </button>
                ))}
              </div>
            </div>

            {/* Showcase items with visible thumbnails */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {filteredShowcase.map((item) => {
                const thumb = item.thumbnail_url || (item.youtube_id ? `https://i.ytimg.com/vi/${item.youtube_id}/hqdefault.jpg` : '/photos/p01.jpg');
                return (
                  <div key={item.id} className="p-3.5 rounded-2xl bg-[#141416] border border-neutral-800 flex items-center gap-3">
                    <img src={thumb} alt={item.title} className="w-16 h-12 object-cover rounded-lg shrink-0 bg-neutral-900 border border-neutral-700" />
                    <div className="flex-1 min-w-0">
                      <h4 className="font-bold text-xs text-white line-clamp-1">{item.title}</h4>
                      <span className="text-[10px] font-mono text-yellow-400 uppercase">{item.category}</span>
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
                        className="px-2.5 py-1 rounded-lg bg-red-900/40 text-red-400 text-xs font-bold hover:bg-red-900/80"
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

      {/* SECTION 2: VIDEO TESTIMONIALS */}
      {activeTab === 'testimonials' && (
        <div className="space-y-12">
          <form onSubmit={handleSaveVideoTestimonial} className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">
                {editingVtId ? 'Edit Video Testimonial' : 'Add Video Testimonial'}
              </h3>
              {editingVtId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingVtId(null);
                    setVtName('');
                    setVtCompany('');
                    setVtYt('');
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={vtName}
                onChange={(e) => setVtName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company / Agency"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={vtCompany}
                onChange={(e) => setVtCompany(e.target.value)}
              />
              <input
                type="text"
                placeholder="YouTube URL or Video ID"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={vtYt}
                onChange={(e) => setVtYt(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="py-3.5 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300">
              {editingVtId ? 'Update Testimonial' : 'Publish Video Testimonial'}
            </button>
          </form>

          <div>
            <h3 className="text-lg font-black text-white mb-4">Existing Video Testimonials ({testimonialsList.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {testimonialsList.map((vt) => (
                <div key={vt.id} className="p-3.5 rounded-2xl bg-[#141416] border border-neutral-800 flex items-center gap-3">
                  <img src={`https://i.ytimg.com/vi/${vt.youtube_id}/hqdefault.jpg`} alt={vt.client_name} className="w-16 h-12 object-cover rounded-lg shrink-0 border border-neutral-700" />
                  <div className="flex-1 min-w-0">
                    <h4 className="font-bold text-xs text-white line-clamp-1">{vt.client_name}</h4>
                    <span className="text-[10px] font-mono text-neutral-400">{vt.company}</span>
                  </div>
                  <div className="flex gap-1.5 shrink-0">
                    <button
                      onClick={() => startEditVt(vt)}
                      className="px-2.5 py-1 rounded-lg bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteVt(vt.id)}
                      className="px-2.5 py-1 rounded-lg bg-red-900/40 text-red-400 text-xs font-bold hover:bg-red-900/80"
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

      {/* SECTION 3: REVIEWS MANAGER */}
      {activeTab === 'reviews' && (
        <div className="space-y-12">
          <form onSubmit={handleSaveReview} className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">
                {editingReviewId ? 'Edit Client Review' : 'Add New Client Review'}
              </h3>
              {editingReviewId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingReviewId(null);
                    setClientName('');
                    setClientRole('');
                    setCompany('');
                    setReviewText('');
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <input
                type="text"
                placeholder="Client Name"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Role / Platform (e.g. Upwork)"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={clientRole}
                onChange={(e) => setClientRole(e.target.value)}
                required
              />
              <input
                type="text"
                placeholder="Company (optional)"
                className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={company}
                onChange={(e) => setCompany(e.target.value)}
              />
            </div>
            <textarea
              rows={3}
              placeholder="Review text..."
              className="p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              required
            />
            <button type="submit" className="py-3.5 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300">
              {editingReviewId ? 'Update Review' : 'Publish Review'}
            </button>
          </form>

          <div>
            <h3 className="text-lg font-black text-white mb-4">Existing Reviews ({reviewsList.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {reviewsList.map((r) => (
                <div key={r.id} className="p-4 rounded-2xl bg-[#141416] border border-neutral-800 flex items-center justify-between">
                  <div className="pr-4">
                    <h4 className="font-bold text-sm text-white line-clamp-1">{r.client_name} ({r.client_role})</h4>
                    <p className="text-xs text-neutral-400 line-clamp-1 mt-0.5">"{r.review_text}"</p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEditReview(r)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteReview(r.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-900/40 text-red-400 text-xs font-bold hover:bg-red-900/80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 4: CHANNELS & ACCOUNTS MANAGER */}
      {activeTab === 'channels' && (
        <div className="space-y-12">
          <form onSubmit={handleSaveChannel} className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-white">
                {editingChId ? 'Edit Channel / Client Account' : 'Add New Channel or Client Account'}
              </h3>
              {editingChId && (
                <button
                  type="button"
                  onClick={() => {
                    setEditingChId(null);
                    setChName('');
                    setChUrl('');
                    setChAvatar('');
                  }}
                  className="text-xs text-neutral-400 hover:text-white underline"
                >
                  Cancel Edit
                </button>
              )}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Account / Channel Name</label>
                <input
                  type="text"
                  placeholder="e.g. Watchdog BWC"
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chName}
                  onChange={(e) => setChName(e.target.value)}
                  required
                />
              </div>
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Platform</label>
                <select
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chPlatform}
                  onChange={(e) => setChPlatform(e.target.value)}
                >
                  <option value="YouTube">YouTube</option>
                  <option value="Instagram">Instagram</option>
                  <option value="TikTok">TikTok</option>
                  <option value="Brand">Brand / Company</option>
                </select>
              </div>
              <div>
                <label className="text-xs font-mono text-neutral-400 mb-1 block">Direct URL</label>
                <input
                  type="text"
                  placeholder="https://youtube.com/@... or instagram.com/..."
                  className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                  value={chUrl}
                  onChange={(e) => setChUrl(e.target.value)}
                  required
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-mono text-neutral-400 mb-1 block">Custom Avatar Image URL (optional)</label>
              <input
                type="text"
                placeholder="https://... or leave empty for auto letter logo"
                className="w-full p-3 bg-[#1a1a1e] border border-neutral-700 rounded-xl text-xs text-white"
                value={chAvatar}
                onChange={(e) => setChAvatar(e.target.value)}
              />
            </div>

            <button type="submit" className="py-3.5 bg-yellow-400 text-neutral-950 font-black text-xs uppercase tracking-wider rounded-xl hover:bg-yellow-300">
              {editingChId ? 'Update Channel' : 'Add Channel to Portfolio'}
            </button>
          </form>

          <div>
            <h3 className="text-lg font-black text-white mb-4">Existing Channels & Clients ({channelsList.length})</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {channelsList.map((ch) => (
                <div key={ch.id} className="p-4 rounded-2xl bg-[#141416] border border-neutral-800 flex items-center justify-between">
                  <div className="pr-4 flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-neutral-900 border border-neutral-700 flex items-center justify-center font-bold text-xs text-yellow-400 overflow-hidden">
                      {ch.avatar_url ? (
                        <img src={ch.avatar_url} alt="" className="w-full h-full object-cover" />
                      ) : (
                        ch.name.slice(0, 2).toUpperCase()
                      )}
                    </div>
                    <div>
                      <h4 className="font-bold text-sm text-white line-clamp-1">{ch.name}</h4>
                      <span className="text-[10px] font-mono text-neutral-400">{ch.platform}</span>
                    </div>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEditChannel(ch)}
                      className="px-3 py-1.5 rounded-lg bg-neutral-800 text-yellow-400 text-xs font-bold hover:bg-neutral-700"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDeleteChannel(ch.id)}
                      className="px-3 py-1.5 rounded-lg bg-red-900/40 text-red-400 text-xs font-bold hover:bg-red-900/80"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* SECTION 5: LIVE STATS */}
      {activeTab === 'stats' && (
        <div className="p-8 rounded-3xl bg-[#141416] border border-neutral-800 space-y-6">
          <h3 className="text-lg font-black text-white">Live Stats Counters</h3>
          <p className="text-xs text-neutral-400">Edit values and labels. Click Save to immediately update the live website:</p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {statsList.map((s) => (
              <div key={s.id} className="p-4 rounded-xl bg-[#1a1a1e] border border-neutral-800 flex items-center gap-3">
                <input
                  type="text"
                  defaultValue={s.value}
                  id={`val-${s.id}`}
                  className="w-24 p-2 bg-[#222228] border border-neutral-700 rounded-lg text-yellow-400 font-black text-lg text-center"
                />
                <input
                  type="text"
                  defaultValue={s.label}
                  id={`lbl-${s.id}`}
                  className="flex-1 p-2 bg-[#222228] border border-neutral-700 rounded-lg text-xs font-bold text-white"
                />
                <button
                  disabled={savingStatId === s.id}
                  onClick={() => {
                    const v = (document.getElementById(`val-${s.id}`) as HTMLInputElement).value;
                    const l = (document.getElementById(`lbl-${s.id}`) as HTMLInputElement).value;
                    handleUpdateStat(s.id, v, l);
                  }}
                  className="px-4 py-2 rounded-lg bg-yellow-400 text-neutral-950 font-bold text-xs hover:bg-yellow-300 disabled:opacity-50"
                >
                  {savingStatId === s.id ? 'Saving...' : 'Save'}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
