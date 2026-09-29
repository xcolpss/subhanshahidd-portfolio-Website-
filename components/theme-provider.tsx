
'use client';
import { createContext, useContext, useEffect, useState } from "react";

type Mode = 'dark'|'light';
const ThemeCtx = createContext<{mode:Mode; setMode:(m:Mode)=>void}>({mode:'dark', setMode:()=>{}});

export function ThemeProvider({children}:{children:React.ReactNode}){
  const [mode, setMode] = useState<Mode>(() => (typeof window==='undefined' ? 'dark' : (localStorage.getItem('theme') as Mode) || 'dark'));
  useEffect(()=>{
    const root = document.documentElement;
    root.classList.toggle('light', mode==='light');
    localStorage.setItem('theme', mode);
  },[mode]);
  return <ThemeCtx.Provider value={{mode, setMode}}>{children}</ThemeCtx.Provider>;
}

export function ThemeToggle(){
  const {mode, setMode} = useContext(ThemeCtx);
  return (
    <button onClick={()=>setMode(mode==='dark'?'light':'dark')} className="rounded-full border border-border px-3 py-1 bg-card text-ink">
      {mode==='dark'?'🌙':'☀️'}
    </button>
  )
}
