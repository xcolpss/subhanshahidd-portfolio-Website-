
export default function Footer(){
  return (
    <footer className="section border-t border-border">
      <div className="container-rl flex items-center justify-between">
        <p className="text-ink-muted">© {new Date().getFullYear()} Subhan Shahid</p>
        <p className="text-ink-muted">Built with Next.js • Tailwind</p>
      </div>
    </footer>
  )
}
