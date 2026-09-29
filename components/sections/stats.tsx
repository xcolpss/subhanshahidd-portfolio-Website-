
'use client';
import stats from '@/data/stats.json';

export default function Stats(){
  return (
    <section className="section bg-bgsoft">
      <div className="container-rl grid grid-cols-2 md:grid-cols-4 gap-6">
        {stats.map((s,i)=>(
          <div key={i} className="text-center h-card py-6">
            <div className="text-3xl font-extrabold text-accent">{s.value}</div>
            <div className="text-ink-muted text-sm mt-1">{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
