'use client';

import { useState } from "react";
import { useForm } from "react-hook-form";
import { Mail, Phone, Send, User } from "lucide-react";

type FormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone?: string;
  service: "Photo Editing" | "Video Editing" | "3D / Unreal";
  message: string;
  hp?: string; // honeypot
};

export default function ContactSection() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      service: "Video Editing",
      message: "",
      hp: "",
    },
  });

  const [status, setStatus] = useState<"idle" | "ok" | "error">("idle");

  async function onSubmit(values: FormData) {
    setStatus("idle");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify(values),
      });
      const json = await res.json();
      if (!res.ok || !json.ok) throw new Error(json.error || "Failed");
      setStatus("ok");
      reset();
    } catch (e) {
      console.error(e);
      setStatus("error");
    }
  }

  return (
    <section className="section" id="contact">
      <div className="container-rl grid md:grid-cols-2 gap-8 items-start">
        {/* Left: intro + quick links */}
        <div>
          <div className="kicker">Let’s work together</div>
          <h2 className="h1 text-accent drop-shadow">Contact</h2>
          <p className="p-muted mt-3">
            Tell me about your project—photo editing, high-impact video (VFX/CGI),
            or real-time 3D/Unreal. I’ll reply ASAP with the next steps.
          </p>

          <div className="mt-6 space-y-3">
            <a
              href="mailto:rajasubhanahmed123456@gmail.com"
              className="inline-flex items-center gap-2 text-ink underline underline-offset-4 hover:text-accent"
            >
              <Mail size={18} /> rajasubhanahmed123456@gmail.com
            </a>
            <div className="text-ink-muted flex items-center gap-2">
              <Phone size={18} /> WhatsApp: <a className="underline hover:text-accent" href="https://wa.me/923171511108" target="_blank" rel="noreferrer">+92 317 1511108</a>
            </div>
            <div className="text-ink-muted">
              Also on{" "}
              <a className="underline hover:text-accent" href="https://instagram.com" target="_blank" rel="noreferrer">
                Instagram
              </a>{" "}
              and{" "}
              <a className="underline hover:text-accent" href="https://www.upwork.com/" target="_blank" rel="noreferrer">
                Upwork
              </a>
              .
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div className="glass p-5 md:p-6 rounded-2xl border border-border">
          <form onSubmit={handleSubmit(onSubmit)} noValidate>
            {/* Honeypot (hidden) */}
            <input type="text" className="hidden" tabIndex={-1} autoComplete="off" {...register("hp")} />

            <div className="grid md:grid-cols-2 gap-4">
              <Field label="First name" error={errors.firstName?.message}>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3">
                  <User size={16} className="text-ink-muted" />
                  <input
                    {...register("firstName", { required: "First name is required", minLength: { value: 2, message: "Too short" } })}
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="Subhan"
                  />
                </div>
              </Field>
              <Field label="Last name" error={errors.lastName?.message}>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3">
                  <User size={16} className="text-ink-muted" />
                  <input
                    {...register("lastName", { required: "Last name is required", minLength: { value: 2, message: "Too short" } })}
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="Shahid"
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4 grid md:grid-cols-2 gap-4">
              <Field label="Email" error={errors.email?.message}>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3">
                  <Mail size={16} className="text-ink-muted" />
                  <input
                    {...register("email", {
                      required: "Email is required",
                      pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email" },
                    })}
                    type="email"
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="you@email.com"
                  />
                </div>
              </Field>
              <Field label="Phone (optional)" error={errors.phone?.message}>
                <div className="flex items-center gap-2 rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3">
                  <Phone size={16} className="text-ink-muted" />
                  <input
                    {...register("phone")}
                    className="w-full bg-transparent py-3 outline-none"
                    placeholder="+92 ..."
                  />
                </div>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Service" error={errors.service?.message}>
                <select
                  {...register("service", { required: "Select a service" })}
                  className="w-full rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3 py-3 outline-none"
                >
                  <option>Photo Editing</option>
                  <option>Video Editing</option>
                  <option>3D / Unreal</option>
                </select>
              </Field>
            </div>

            <div className="mt-4">
              <Field label="Project details" error={errors.message?.message}>
                <textarea
                  {...register("message", { required: "Please add some details", minLength: { value: 10, message: "Tell me a little more" } })}
                  rows={6}
                  className="w-full rounded-lg border border-border bg-[rgba(255,255,255,.04)] px-3 py-3 outline-none"
                  placeholder="What are we making? Deadline, budget, references, links…"
                />
              </Field>
            </div>

            {/* Status */}
            {status === "ok" && (
              <div className="mt-4 rounded-lg border border-border bg-[rgba(0,255,155,.1)] px-3 py-2">
                Message sent! I’ll get back to you shortly.
              </div>
            )}
            {status === "error" && (
              <div className="mt-4 rounded-lg border border-border bg-[rgba(255,60,0,.12)] px-3 py-2">
                Sorry—something went wrong. Try again or email me directly.
              </div>
            )}

            <div className="mt-6 flex items-center gap-3">
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn btn-primary inline-flex items-center gap-2 disabled:opacity-60"
              >
                {isSubmitting ? (
                  <span className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-[#0a0e1a] border-t-transparent" />
                ) : (
                  <Send size={16} />
                )}
                Send message
              </button>

              <a href="mailto:rajasubhanahmed123456@gmail.com" className="btn btn-ghost">
                Or email directly
              </a>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <div className="mb-1 text-sm text-ink-muted">{label}</div>
      {children}
      {error && <div className="mt-1 text-xs text-[#ff7a7a]">{error}</div>}
    </label>
  );
}
