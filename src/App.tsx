import { motion, useScroll, useTransform, AnimatePresence } from "motion/react";
import {
  ArrowRight, Music, Zap, Target, Mic2,
  Shield, Terminal, ChevronRight, Star, Heart, Flame, User, X,
  ExternalLink,
  Info,
  Instagram
} from "lucide-react";
import React, { useState, useEffect, useRef } from "react";

// --- Types ---

interface WrappedItem {
  id: string;
  type: string;
  title: string;
  subtitle: string;
  quote?: string;
  content: string;
  stats?: { label: string; value: string; color?: string }[];
  tagline?: string;
  image?: string;
  color?: string;
}

// --- Data ---

const WRAPPED_DATA: WrappedItem[] = [
  {
    id: "origins",
    type: "PHASE 01 // ORIGINS",
    title: "YOUR STORY STARTS HERE",
    subtitle: "THE BEGINNING",
    quote: "It started before you even knew what a cultural event was.",
    content: `2 years as Head of Choir. 

Every single morning, you were part of everyone's day before they even realised it. Small moments. Quiet ones. But they mattered. You were setting the tone for the entire school, day after day, year after year.`,
    image: "Me.jpeg"
  },
  {
    id: "stadium",
    type: "PHASE 01 // ORIGINS",
    title: "THE STADIUM MOMENT",
    subtitle: "SENSORY SHIFT",
    quote: "Then came the annual day.",
    content: `Your parents. Watching their son do something different. Something that wasn't expected of him. Something special.
    
This was the first time they saw you in this light. Not just as their son, but as a performer. Something special was happening, and the scale of the stadium only amplified the realization that this was where you belonged.`,
    image: "Stadium.jpeg"
  },
  {
    id: "first-rush",
    type: "PHASE 02 // THE INTENSITY",
    title: "YOUR FIRST RUSH",
    subtitle: "HIGH SCHOOL FRESHERS",
    quote: "Then came freshers. High school.",
    content: `5 other anchors that day. 1 who took over the entire event.
    
You were the only junior on the OC team also the anchor at the same time. Your hands were shaking, your brain completely blank. Your senior said "Talk to them like you'd talk to me."

You don't know exactly what happened. But for the first time in your life, you felt that rush. That feeling you spend the rest of your life chasing.`,
    image: "Freshers.jpeg"
  },
  {
    id: "backbone",
    type: "PHASE 02 // THE INTENSITY",
    title: "YOUR MUSICAL BACKBONE",
    subtitle: "THE POLYMATH",
    quote: "Here's the thing about being musically inclined that nobody really talks about.",
    content: `keyboard. tabla. guitar. drums. head of choir.

When you've played all of these. When you've performed on stages big and small, you don't just see a cultural event the way most people do. You've been on that stage. You've felt what a bad sound check does to a performer. The panic in their eyes. The way their hands start sweating. 

You've felt what it means when the spotlight hits, when you see all those people in front of you, how it transforms a person. How it makes the ordinary feel like something sacred.

And not every performance goes well. That's actually where the real experience comes from. You've seen things go wrong from both sides: as a performer, and as the person making sure it doesn't. That combination isn't common.

Times you froze in front of something you'd never touched before: I honestly don’t know. 
But that's the best thing, That's what makes you special. You look at it. And understand it. And make sure it works when it matters most.`,
    image: "Hehe.jpeg"
  },
  {
    id: "euphony",
    type: "PHASE 02 // THE INTENSITY",
    title: "EUPHONY",
    subtitle: "RESPONSIBILITY CORE",
    quote: "Somethings are just meant to be done",
    content: `Sound check. Speakers. Setup.
    
This time, you weren’t just there because you couldn’t stay away. You were there because it was your responsibility to make sure everything worked. And you took that seriously.

Euphony taught you what goes wrong, what needs to be checked twice, what performers need before they even walk on stage. The things nobody sees. The things that make or break the whole night. You were there for all of it.`,
    image: "Euphony.jpeg"
  },
  {
    id: "delirium",
    type: "PHASE 03 // THE STAKES",
    title: "DELIRIUM",
    subtitle: "THE SENSORY OVERLOAD",
    quote: "This one is different.",
    stats: [
      { label: "Panic", value: "2/10" },
      { label: "Hesitation", value: "2/10" },
      { label: "Clarity", value: "11/10", color: "text-primary" }
    ],
    content: `You communicated with the bands. Let them know everything they needed to know. Set up the stage. Made sure everything was in place. And then, all of a sudden, you just wanted to be there, you wanted to take that responsibility in your hands.

Because when you've grown up around music, when you understand what that stage means to the people standing on it, you want to freeze.. take a moment for yourself, then you realise you don’t have time so you just do what needs to be done.

Delirium is the event that showed you what you're actually capable of when the stakes are real.`,
    image: "Delirium.jpeg"
  },
  {
    id: "crescendo",
    type: "PHASE 03 // THE STAKES",
    title: "CRESCENDO",
    subtitle: "HYPER HUSTLE",
    quote: "Timings were clashing with Vanity. Two events. Same time. One person.",
    content: `Most people would've picked one and called it a day.
    
You helped set up Crescendo, made sure everything was in place before the performances started. (You also helped in the practice of your band as well). 

And then ran (To vanity). Because that's just what you do. No excuses, no missing pieces. Just pure execution.`,
    image: "Crescendo.jpeg"
  },
  {
    id: "vanity",
    type: "PHASE 03 // THE STAKES",
    title: "VANITY",
    subtitle: "COORDINATION MASTERY",
    quote: "One team performing. Potential bt everywhere.",
    content: `You made sure everyone had their roles. Handled the coordination. Kept everything together (quietly), without making it a bigger deal than it needed to be.
    
Sometimes the best thing you can do is just handle it. And move on. That is exactly what u did`,
    image: "Vanity.jpeg"
  },
  {
    id: "proscenium",
    type: "PHASE 04 // THE CORE IDENTITY",
    title: "PROSCENIUM",
    subtitle: "YOUR MOST STREAMED MOMENT",
    quote: "the one that says everything",
    content: `EC members started leaving one by one. You left too. You won't lie. You were exhausted. Hadn't eaten since morning. Running completely on empty. You were just an EC member. Nobody would've blamed you. You had every reason to go and not come back.

But then something hit you. Your co-coordinators were still there. Still working. Still giving everything they had. And you thought, “I’m tired just from taking care of this one event. How tired must they be. They had put way more at stake than me. Way more.” And you just couldn't process leaving all of that on them.

So you went back. Sat in the wings. Operated the lights. Handled the sound. Stayed till the very end, when only two or three EC members were left in the entire venue. That moment wasn't planned. It wasn't something you did to be noticed. It just happened. Because that's who you are.`,
    image: "Proscenium2.jpeg"
  },
  {
    id: "leader",
    type: "PHASE 04 // THE CORE IDENTITY",
    title: "THE ARCHITECT",
    subtitle: "VISIONARY EXECUTION",
    quote: "Responsibility is a privilege, execution is the goal.",
    content: `You were one of the only EC members who got the opportunity to pick the people you wanted to work with and handle an entire event under you.
    
That responsibility—choosing your team, ensuring they deliver, and sculpting the event from the wings—showed everyone that you weren't just participating. You were orchestrating. This was the moment you proved you could lead without needing to be loud.`,
    image: "Proscenium.jpeg"
  },
  {
    id: "amplifi",
    type: "PHASE 04 // THE CORE IDENTITY",
    title: "AMPLIF-I",
    subtitle: "YOUR TOP COLLABORATION",
    tagline: "Result: Best SIG Award",
    content: `Your coordinator gave you the freedom to do what you thought was right. And you used every bit of it. 

On-the-spot decisions. The Christmas jamming session that was your idea. The unofficial poster-making event in the music room that nobody asked for but everyone loved. Every little moment where people could just have fun and feel something real.

You won't say the award was only because of you. But you'd like to believe you were a significant part of it.`,
    image: "Amplif-i.jpeg"
  },
  {
    id: "culcom",
    type: "PHASE 05 // THE PHILOSOPHY",
    title: "CULCOM",
    subtitle: "THE PHILOSOPHY OF PRESENCE",
    quote: "showing up without being asked",
    content: `Culcom was the only JC1 process you filled. The only one. And when you didn't get it you didn't walk away. 

Events you showed up to without a title, without a position, without anyone asking:
- Christmas: helped with the decor, made the Secret Santa Google Form, organised the jamming session.
- Mela Quiz: Culcom members weren't at the venue. You were there as Amplif-i. Made sure the event happened and ran smoothly.
- New Year: audio setup, visual setup, showed up and got it done.
- Transition Night: designed the T-shirts for the Scribble Day event. Helped make the collage for the bookmarks given out to the outgoing batch. Took care of all the technical logistics. AV for Amplif-i. AV for the entire event as a whole. Running around making sure everything works. Making sure nothing goes wrong.

And after everything ended, you stayed back and cleaned the entire auditorium. By yourself.

Quoting Azeem bhaiya that night:
"If you weren't there, I don't know if the event would have even been possible to pull off. Amazing work. I've never seen anyone use that room in the past three years of my life."

Because it was never about the title. It was never about being asked. It was always just about showing up.`,
    image: "CULCOM.jpeg"
  },
  {
    id: "flip",
    type: "THE TURNING POINT",
    title: "THE FLIP",
    subtitle: "PART 2 IS COMING",
    quote: "That was Part 1. Here's what you don't know yet.",
    content: `Why does any of this matter to him?

You've spent years building, performing, and making sure everything works. But the real story isn't just about the events that happened. It's about why you keep going back. It's about the pull that you cannot ignore.`,
    image: "Haha.jpeg"
  },
  {
    id: "pull",
    type: "THE WHY",
    title: "THE PULL",
    subtitle: "ESSENCE",
    quote: "You genuinely cannot explain what the stage does to you. You've just always known.",
    content: `School choir in the mornings.
Freshers with shaking hands.
GTM with 450 moving pieces.
Delirium with everything on the line.
Proscenium… showing up anyway.

The stage has always pulled you in. Not just to perform on it. But to make sure everyone else's moment on it is perfect. That's the difference. That's always been the difference.`,
    image: "Pull.jpeg"
  },
  {
    id: "feeling",
    type: "THE WHY",
    title: "REPLAYED FEELING",
    subtitle: "DRIVE",
    quote: "There is a very specific feeling.",
    content: `When you do something that makes someone else's moment special. When you watch someone walk on stage terrified and walk off glowing. When that 1 performance hits exactly right and you can feel the room shift. When an event that could have fallen apart, doesn't. Because you were there.

That feeling, that rush is indescribable. It's the reason you showed up to every event without being asked. The reason you went back to Proscenium when you had every reason to leave. The reason you were the last one in the auditorium at Transition Night.

The satisfaction of doing something that effects someone else, that leaves a mark on people, that feeling is just everything to you. Always has been. Always will be.`,
    image: "Feeling.jpeg"
  }
];

const ARCHETYPES = [
  {
    id: "asta",
    name: "ASTA",
    source: "BLACK CLOVER",
    tagline: "The Gritty Underdog",
    desc: "No magic in a world full of magic. But showing up harder than everyone anyway. Every single time. The hustle is the magic.",
    img: "Asta.png"
  },
  {
    id: "harry",
    name: "HARRY",
    source: "HP",
    tagline: "The Growth Arc",
    desc: "Told he wasn't enough. Kept going. The stage is your lightning bolt and your path to being more than they said you could be.",
    img: "Harry.jpg"
  },
  {
    id: "cooper",
    name: "COOPER",
    source: "INTERSTELLAR",
    tagline: "The Explorer",
    desc: "Going further than anyone thought possible because something bigger is pulling you forward. \"Do not go gentle into that good night.\"",
    img: "Inter.jpg"
  }
];

// --- Sub-components ---

const SectionLabel = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => (
  <span className={`font-mono text-[11px] uppercase tracking-[0.5em] text-primary-container mb-4 block bg-primary-container/10 px-4 py-1 self-start w-fit border-l-2 border-primary-container ${className}`}>
    {children}
  </span>
);

const CursorFollower = () => {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => setMousePos({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 border border-primary/50 rounded-full pointer-events-none z-[9999] hidden lg:block"
      animate={{ x: mousePos.x - 16, y: mousePos.y - 16 }}
      transition={{ type: "spring", damping: 25, stiffness: 250, mass: 0.5 }}
    >
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1 h-1 bg-primary rounded-full shadow-[0_0_10px_#ff5252]" />
    </motion.div>
  );
};

const SystemLoader = ({ onComplete }: { onComplete: () => void }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(onComplete, 800);
          return 100;
        }
        return prev + Math.random() * 12;
      });
    }, 80);
    return () => clearInterval(timer);
  }, []);

  return (
    <motion.div 
      exit={{ opacity: 0, scale: 1.1, filter: "blur(20px)" }}
      className="fixed inset-0 z-[100] bg-background flex flex-col items-center justify-center p-8"
    >
      <div className="w-full max-w-md space-y-8">
        <div className="flex justify-between items-end">
          <SectionLabel>INITIALIZING WRAPPED</SectionLabel>
          <span className="font-mono text-sm text-primary">{Math.round(progress)}%</span>
        </div>
        <div className="h-1 w-full bg-white/5 relative overflow-hidden">
          <motion.div 
            initial={{ scaleX: 0 }}
            animate={{ scaleX: progress / 100 }}
            className="absolute inset-0 bg-primary origin-left"
          />
        </div>
        <div className="grid grid-cols-2 gap-4">
          <div className="font-mono text-[10px] text-on-surface/40 uppercase tracking-widest">System Check: OK</div>
          <div className="font-mono text-[10px] text-on-surface/40 uppercase tracking-widest text-right">Data Found: INFINITE</div>
        </div>
      </div>
    </motion.div>
  );
};

export default function App() {
  const [loading, setLoading] = useState(true);
  const [selectedItem, setSelectedItem] = useState<WrappedItem | null>(null);
  
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") setSelectedItem(null);
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  const handleScrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="bg-background text-on-background selection:bg-primary selection:text-black min-h-screen font-sans overflow-x-hidden">
      <AnimatePresence>
        {loading && <SystemLoader onComplete={() => setLoading(false)} />}
      </AnimatePresence>

      <AnimatePresence>
        {selectedItem && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-12 overflow-hidden">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedItem(null)}
              className="absolute inset-0 bg-black/95 backdrop-blur-3xl"
            />
            
            <motion.div
              layoutId={selectedItem.id}
              className="relative w-full max-w-6xl max-h-[90vh] bg-surface-container-lowest border border-white/10 rounded-3xl overflow-hidden flex flex-col md:flex-row shadow-2xl"
            >
              <button 
                onClick={() => setSelectedItem(null)}
                className="absolute top-6 right-6 z-50 p-3 bg-white/10 hover:bg-white/20 rounded-full transition-colors text-white"
              >
                <X size={24} />
              </button>

              <div className="w-full md:w-5/12 h-64 md:h-auto overflow-hidden relative">
                <img 
                  src={selectedItem.image || "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?auto=format&fit=crop&q=80&w=1200"}
                  alt={selectedItem.title}
                  className="w-full h-full object-cover grayscale-0 brightness-110"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-x-0 bottom-0 p-8 bg-gradient-to-t from-black to-transparent">
                   <SectionLabel className="mb-2">{selectedItem.type}</SectionLabel>
                   <h2 className="text-4xl md:text-5xl font-display uppercase leading-none tracking-tighter text-white">
                     {selectedItem.title}
                   </h2>
                </div>
              </div>

              <div className="w-full md:w-7/12 p-12 md:p-20 overflow-y-auto custom-scrollbar bg-surface/20">
                <div className="max-w-2xl mx-auto space-y-20">
                  <div className="space-y-8">
                    <p className="font-mono text-primary uppercase tracking-[0.4em] text-xs">{selectedItem.subtitle}</p>
                    {selectedItem.quote && (
                      <p className="text-4xl md:text-5xl lg:text-6xl font-display italic text-white leading-tight">
                        "{selectedItem.quote}"
                      </p>
                    )}
                  </div>

                  {selectedItem.stats && (
                    <div className="grid grid-cols-3 gap-8 p-8 glass-panel rounded-2xl">
                      {selectedItem.stats.map((s, idx) => (
                        <div key={idx} className="space-y-2">
                          <p className="font-mono text-[10px] text-on-surface/40 uppercase tracking-widest">{s.label}</p>
                          <p className={`text-4xl font-display ${s.color || "text-white"}`}>{s.value}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  <div className="space-y-12">
                    {selectedItem.tagline && (
                      <p className="font-mono text-primary-container text-base font-bold uppercase tracking-[0.2em] bg-primary-container/10 px-8 py-3 self-start w-fit rounded-lg border border-primary-container/20">
                        {selectedItem.tagline}
                      </p>
                    )}
                    <p className="text-2xl md:text-4xl text-on-surface/90 leading-[1.6] font-normal whitespace-pre-line text-glow-light">
                      {selectedItem.content}
                    </p>
                  </div>

                  <div className="pt-12 flex items-center gap-4 text-white/20">
                    <div className="h-px flex-1 bg-white/10" />
                    <Info size={16} />
                    <span className="font-mono text-[10px] uppercase tracking-[0.3em]">Isolated View</span>
                    <div className="h-px flex-1 bg-white/10" />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <CursorFollower />

      {/* Background Layer */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 cinematic-grid opacity-[0.03]" />
        <div className="absolute inset-0 bg-gradient-to-br from-background via-surface-container-lowest/50 to-background opacity-95" />
        <div className="absolute inset-0 bg-[url('https://grain-gradient.vercel.app/noise.svg')] brightness-100 contrast-150 opacity-[0.04]" />
      </div>

      {!loading && (
        <motion.main 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ duration: 1 }}
          className="relative z-10"
        >
          {/* Header Navigation */}
          <nav className="fixed top-0 left-0 w-full z-50 p-8 flex justify-between items-center pointer-events-none">
            <div className="pointer-events-auto flex items-center gap-6">
              <div 
                className="text-primary font-display text-2xl tracking-tighter cursor-pointer hover:scale-105 transition-transform"
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              >
                EVENTS : CULTURALS
              </div>
            </div>
            <div className="flex gap-4 md:gap-8 pointer-events-auto items-center">
              {['Foundation', 'Intensity', 'Stakes', 'Identity', 'Philosophy', 'Flip', 'Why', 'Archetypes'].map((tab) => (
                <button 
                  key={tab}
                  onClick={() => handleScrollTo(tab.toLowerCase())}
                  className="font-mono text-[10px] uppercase tracking-widest text-on-surface/60 hover:text-white transition-colors cursor-pointer hidden md:block"
                >
                  {tab}
                </button>
              ))}
              <a 
                href="https://www.instagram.com/_sxtvikbhukya/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-primary flex items-center justify-center text-black shadow-[0_0_15px_rgba(255,179,175,0.5)] cursor-pointer tooltip-trigger relative group hover:scale-110 transition-transform"
              >
                <Instagram size={20} strokeWidth={2.5} />
                <div className="absolute top-12 right-0 bg-surface-container-high p-4 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap border border-white/10">
                  <p className="font-mono text-[10px] uppercase tracking-widest text-primary">Follow @_sxtvikbhukya</p>
                </div>
              </a>
            </div>
          </nav>

          {/* Hero Section */}
          <section className="min-h-screen relative flex items-center justify-center overflow-hidden pt-32 px-12 md:px-24">
            <div className="absolute inset-0 z-0 opacity-60">
              <img 
                alt="Satvik Cinematic" 
                className="w-full h-full object-cover object-top grayscale contrast-125" 
                src="https://lh3.googleusercontent.com/aida/ADBb0uiVt5Y71D1ZRYQsskYJGE0DJ-v8mndpNL-cpqBEYp8f5CO6Q_2xwoJjdh309Z4gk7OhZKHTFFpOiTaagKPBUrkhB4aojtE2_fAsqeQvOIH3XHEYP419RFCki7boqSr53lWhwg0nmn2WFVMUOTmKsoDjvSKYe9RTs83-VxyluMYkMofLPa-sYS467ij0JZl3e91NztdkurUN6qwDjp5naorcPI3z6hn2KAy8fpBDEEFHYnZYDF-7EUb2a3rJPI9kDfzZkzpYEsCI80g"
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background z-10"></div>

            <div className="relative z-20 text-center max-w-5xl">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-center mb-12"
              >
                <span className="font-mono text-xs px-8 py-3 border border-primary/40 text-primary tracking-[1em] uppercase bg-primary/5 backdrop-blur-md rounded-full shadow-[0_0_20px_rgba(255,179,175,0.2)]">Cultural 2026</span>
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="font-display text-7xl md:text-[180px] leading-none mb-4 tracking-tighter uppercase text-white"
              >
                SATVIK'S<br/>CULTURAL <span className="text-primary text-glow-red">WRAPPED</span>
              </motion.h1>
              <motion.p 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="font-mono text-2xl md:text-3xl tracking-[0.4em] text-on-surface/40 uppercase italic"
              >
                a life, not a year
              </motion.p>
              
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
                className="mt-24"
              >
                <div className="flex flex-col items-center gap-12 group cursor-pointer" onClick={() => handleScrollTo('opening')}>
                  <span className="font-mono text-[10px] tracking-[0.5em] text-primary uppercase">Read the story</span>
                  <motion.div 
                    animate={{ y: [0, 10, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="w-px h-24 bg-gradient-to-b from-primary to-transparent"
                  />
                </div>
              </motion.div>
            </div>
          </section>

          {/* Opening Statement */}
          <section id="opening" className="py-64 px-12 md:px-24 flex items-center justify-center min-h-screen relative">
            <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none opacity-5">
              <h2 className="text-[30vw] font-display font-black leading-none uppercase -rotate-12 translate-x-1/4">HISTORY</h2>
            </div>
            <div className="max-w-6xl text-center relative z-10 space-y-16">
              <SectionLabel className="mx-auto">OPENING</SectionLabel>
              <motion.p 
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                className="font-display text-5xl md:text-8xl leading-[1.1] uppercase text-white"
              >
                Every year, <span className="text-on-surface/30">Spotify tells you what you listened to.</span><br/>
                This is <span className="text-primary italic">different.</span><br/>
                This is <span className="text-glow-red">everything you've lived.</span>
              </motion.p>
            </div>
          </section>

          {/* Content Sections */}
          <div className="space-y-48 lg:space-y-64 pb-64">
            
            {/* Foundation */}
            <section id="foundation" className="max-w-6xl mx-auto px-12 md:px-24">
              <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-8">
                <div>
                  <SectionLabel>PHASE 01</SectionLabel>
                  <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display uppercase leading-none tracking-tighter">FOUNDATION</h2>
                </div>
                <p className="text-on-surface/40 text-base font-light italic hidden lg:block">The roots of the journey.</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
                {WRAPPED_DATA.filter(d => d.type.includes("PHASE 01")).map((item) => (
                  <WrappedCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>

            {/* Intensity */}
            <section id="intensity" className="max-w-6xl mx-auto px-12 md:px-24">
              <div className="mb-24 flex items-end justify-between border-b border-white/5 pb-8">
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display uppercase leading-none tracking-tighter">INTENSITY</h2>
                <SectionLabel>PHASE 02</SectionLabel>
              </div>
              <div className="space-y-20 lg:space-y-24">
                {WRAPPED_DATA.filter(d => d.type.includes("PHASE 02")).map((item) => (
                  <WrappedCardWide key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>

            {/* Stakes */}
            <section id="stakes" className="bg-surface-container-low/30 py-64 border-y border-white/5 px-12 md:px-24">
              <div className="max-w-6xl mx-auto">
                <div className="mb-32 text-center">
                  <SectionLabel className="mx-auto">PHASE 03</SectionLabel>
                  <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display uppercase leading-none tracking-tighter">THE STAKES</h2>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-12">
                  {WRAPPED_DATA.filter(d => d.type.includes("PHASE 03")).map((item) => (
                    <WrappedCardCompact key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                  ))}
                </div>
              </div>
            </section>

            {/* Identity */}
            <section id="identity" className="max-w-7xl mx-auto px-12 md:px-24">
              <div className="mb-48">
                <SectionLabel>PHASE 04</SectionLabel>
                <h2 className="text-6xl md:text-8xl lg:text-[7rem] font-display uppercase leading-none tracking-tighter">IDENTITY</h2>
              </div>
              <div className="md:col-start-1 md:col-span-11 bg-primary text-black p-10 md:p-20 transform md:-rotate-1 relative overflow-hidden group mb-32 rounded-[2.5rem]">
                <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:scale-110 transition-transform duration-700">
                  <Star size={300} />
                </div>
                <div className="relative z-10 space-y-12">
                  <span className="font-mono text-sm uppercase tracking-[0.6em] border-b border-black/20 pb-4 inline-block">YOUR MOST STREAMED MOMENT</span>
                  <h3 className="font-display text-6xl md:text-[7rem] lg:text-[8rem] leading-none uppercase tracking-tighter">PROSCENIUM</h3>
                  <p className="font-body-md text-xl md:text-2xl italic font-bold">"the one that says everything"</p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-24 lg:gap-32">
                {WRAPPED_DATA.filter(d => d.type.includes("PHASE 04") && d.id !== "proscenium").map((item) => (
                  <WrappedCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>

            {/* Philosophy */}
            <section id="philosophy" className="max-w-6xl mx-auto px-12 md:px-24">
              <div className="mb-32 text-right">
                <SectionLabel className="ml-auto">PHASE 05</SectionLabel>
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display uppercase leading-none tracking-tighter">PHILOSOPHY</h2>
              </div>
              {WRAPPED_DATA.filter(d => d.type.includes("PHASE 05")).map((item) => (
                <WrappedCardEpic key={item.id} item={item} onClick={() => setSelectedItem(item)} />
              ))}
            </section>

            {/* The Flip */}
            <section id="flip" className="py-80 relative flex items-center justify-center overflow-hidden">
               <div className="absolute inset-0 bg-primary/5 skewed-bg -skew-y-3 transform scale-110 z-0" />
               <div className="max-w-6xl mx-auto px-12 md:px-24 relative z-10 text-center space-y-24">
                 <div className="space-y-8">
                    <SectionLabel className="mx-auto">PART 01 // COMPLETE</SectionLabel>
                    <h2 className="text-8xl md:text-[10rem] lg:text-[12rem] font-display uppercase leading-none tracking-tighter group cursor-pointer hover:text-primary transition-all duration-700">
                      THE FLIP
                    </h2>
                 </div>
                 <p className="text-3xl md:text-5xl font-display italic text-on-surface/60 uppercase">
                   "That was Part 1. Here's what you don't know yet."
                 </p>
                 <div className="h-px w-64 bg-primary mx-auto" />
                 <p className="text-2xl md:text-4xl font-headline text-white uppercase tracking-[0.2em] text-glow-red leading-tight max-w-4xl mx-auto">
                   Why does any of this matter to him?
                 </p>
               </div>
            </section>

            {/* The "Why" */}
            <section id="why" className="max-w-6xl mx-auto px-12 md:px-24">
              <div className="mb-32 text-center">
                <SectionLabel className="mx-auto">CORE ESSENCE</SectionLabel>
                <h2 className="text-5xl md:text-7xl lg:text-[6rem] font-display uppercase leading-none tracking-tighter">THE "WHY"</h2>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 lg:gap-24">
                {WRAPPED_DATA.filter(d => d.type === "THE WHY").map((item) => (
                  <WrappedCard key={item.id} item={item} onClick={() => setSelectedItem(item)} />
                ))}
              </div>
            </section>

            {/* Archetypes / Relatable Characters */}
            <section id="archetypes" className="py-64 bg-surface-container-lowest/50 border-y border-white/5 relative overflow-hidden px-12 md:px-24">
               <div className="absolute inset-0 cinematic-grid opacity-[0.02]" />
               <div className="max-w-6xl mx-auto relative z-10">
                <div className="text-center mb-32 space-y-8">
                   <SectionLabel className="mx-auto">YOUR MOST RELATABLE CHARACTERS</SectionLabel>
                   <h3 className="text-5xl md:text-7xl lg:text-[6rem] font-display italic uppercase tracking-tighter leading-none">"because why not"</h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-16">
                  {ARCHETYPES.map((char) => (
                    <motion.div 
                      key={char.id}
                      whileHover={{ y: -15, scale: 1.01 }}
                      className="group relative aspect-[3/4.2] overflow-hidden rounded-[2.5rem] border border-white/10 hover:border-primary/50 transition-all duration-700 shadow-xl"
                    >
                      <img src={char.img} alt={char.name} className="w-full h-full object-cover grayscale transition-all duration-1000 group-hover:grayscale-0 group-hover:scale-110" referrerPolicy="no-referrer" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent p-10 md:p-12 flex flex-col justify-end">
                        <span className="font-mono text-[10px] text-primary uppercase tracking-[0.4em] mb-4 border-b border-primary/20 pb-2 self-start">{char.tagline}</span>
                        <h3 className="font-display text-5xl uppercase mb-3">{char.name}</h3>
                        <p className="font-mono text-xs opacity-40 uppercase mb-8 tracking-widest">{char.source}</p>
                        <p className="text-lg md:text-xl text-white/90 leading-relaxed font-light italic">"{char.desc}"</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </section>
          </div>

          {/* Final Statement / Outro */}
          <footer className="footer bg-background py-80 px-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-32 opacity-[0.02] pointer-events-none">
               <span className="font-display text-[50vw] leading-none uppercase">SATVIK</span>
            </div>
            
            <div className="max-w-6xl relative z-10 mx-auto space-y-32">
              <div className="space-y-12">
                <SectionLabel>OUTRO</SectionLabel>
                <motion.h2 
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  className="font-display text-5xl md:text-8xl uppercase leading-[0.9] border-l-8 border-primary pl-12 text-white"
                >
                  “Events : Culturals is the heart of Atharv Ranbhoomi. Where artistry, expression, and competition come together."
                </motion.h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-16 text-2xl font-light text-on-surface/40 leading-relaxed max-w-4xl">
                  <p>You said it yourselves. And you've been living that sentence your entire life.</p>
                  <p>Not here because you were assigned to be. Not here because it looks good on a resume. Not here because someone told you to try.</p>
                </div>
              </div>

              <div className="space-y-16">
                 <p className="text-4xl md:text-6xl font-display uppercase italic text-primary">HERE BECAUSE YOU GENUINELY CANNOT STAY AWAY.</p>
                 <div className="max-w-2xl text-xl text-on-surface/60 font-light space-y-8">
                   <p>Because every time you try to walk away from a stage, something pulls you right back.</p>
                   <p className="text-white font-bold text-3xl">AND YOU'VE STOPPED FIGHTING IT.</p>
                 </div>
              </div>

              <div className="pt-32 space-y-12 border-t border-white/5">
                <p className="font-mono text-sm uppercase tracking-widest leading-loose max-w-3xl text-primary-container bg-primary-container/5 p-8 border border-primary-container/20 rounded-2xl">
                  Powered By: Music, stage fright, an unhealthy obsession with making events work, and my love for my girlfriend.
                </p>
                <div className="flex flex-col md:flex-row justify-between items-center gap-12 text-[10px] font-mono uppercase tracking-[0.4em] opacity-40">
                  <span>© 2026 CULTURAL NARRATIVE</span>
                  <span>BUILT FOR THE STAGE // SATVIK BHUKYA</span>
                </div>
              </div>
            </div>
          </footer>
        </motion.main>
      )}
    </div>
  );
}

// --- Card Components ---

const WrappedCard = ({ item, onClick }: { item: WrappedItem; onClick: () => void }) => (
  <motion.div
    layoutId={item.id}
    whileHover={{ y: -8, scale: 1.01 }}
    transition={{ type: "spring", stiffness: 300, damping: 25 }}
    onClick={onClick}
    className="group relative h-[450px] md:h-[550px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-primary transition-all bg-surface-container-low shadow-xl"
  >
    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-1000 group-hover:grayscale-0" referrerPolicy="no-referrer" />
    <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent p-12 lg:p-16 flex flex-col justify-end">
      <div className="transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
        <SectionLabel className="mb-6">{item.subtitle}</SectionLabel>
        <h3 className="text-5xl md:text-6xl font-display uppercase leading-none tracking-tighter text-white mb-6 group-hover:text-primary transition-colors text-shadow-glow">
          {item.title}
        </h3>
        <motion.div 
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          className="flex items-center gap-4 text-[10px] font-mono text-primary uppercase tracking-[0.4em] opacity-0 group-hover:opacity-100 transition-opacity"
        >
          <ArrowRight size={14} className="animate-pulse" />
          <span>Unlock Archives</span>
        </motion.div>
      </div>
    </div>
  </motion.div>
);

const WrappedCardWide = ({ item, onClick }: { item: WrappedItem; onClick: () => void }) => (
  <motion.div
    layoutId={item.id}
    whileHover={{ scale: 0.998 }}
    onClick={onClick}
    className="group relative h-[350px] md:h-[400px] rounded-[2.5rem] overflow-hidden cursor-pointer border border-white/5 hover:border-primary/50 bg-surface-container-low flex items-center shadow-xl"
  >
    <img src={item.image} alt={item.title} className="absolute right-0 w-1/2 h-full object-cover grayscale opacity-20 group-hover:opacity-40 group-hover:scale-105 transition-all duration-1000 pointer-events-none" referrerPolicy="no-referrer" />
    <div className="absolute inset-0 bg-gradient-to-r from-background via-background/90 to-transparent pointer-events-none" />
    
    <div className="relative z-10 px-12 md:px-24 space-y-8 max-w-3xl">
      <SectionLabel>{item.subtitle}</SectionLabel>
      <h3 className="text-6xl md:text-[7rem] font-display uppercase leading-none tracking-tighter text-white group-hover:text-primary transition-colors">
        {item.title}
      </h3>
      <p className="text-xl md:text-2xl font-body italic text-on-surface/40 group-hover:text-on-surface/80 transition-colors leading-relaxed">
        "{item.quote}"
      </p>
    </div>
  </motion.div>
);

const WrappedCardCompact = ({ item, onClick }: { item: WrappedItem; onClick: () => void }) => (
  <motion.div
    layoutId={item.id}
    whileHover={{ y: -5, x: 5, scale: 1.01 }}
    onClick={onClick}
    className="group p-12 rounded-[2rem] border border-white/5 hover:border-primary/40 bg-surface-container-lowest/30 backdrop-blur-md cursor-pointer transition-all space-y-10"
  >
    <div className="flex justify-between items-start">
      <SectionLabel>{item.subtitle}</SectionLabel>
      <div className="p-3 bg-white/5 rounded-full group-hover:bg-primary group-hover:text-black transition-all">
        <ArrowRight size={18} />
      </div>
    </div>
    <h3 className="text-5xl font-display uppercase leading-none text-white transition-colors group-hover:text-primary">{item.title}</h3>
    <div className="flex gap-4 text-[9px] font-mono text-primary/40 uppercase tracking-[0.2em]">
      <span>PHASE_03</span>
      <span>•</span>
      <span>READY_TO_DRIVE</span>
    </div>
  </motion.div>
);

const WrappedCardEpic = ({ item, onClick }: { item: WrappedItem; onClick: () => void }) => (
  <motion.div
    layoutId={item.id}
    onClick={onClick}
    className="group relative min-h-[80vh] rounded-[4rem] overflow-hidden cursor-pointer border border-white/5 bg-surface-container-high transition-all"
  >
    <img src={item.image} alt={item.title} className="absolute inset-0 w-full h-full object-cover grayscale opacity-10 group-hover:opacity-30 transition-all duration-1000" referrerPolicy="no-referrer" />
    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-background/40 to-background" />
    
    <div className="relative z-10 h-full p-12 md:p-24 flex flex-col justify-end items-center text-center gap-12">
      <div className="space-y-4">
        <SectionLabel className="mx-auto">{item.subtitle}</SectionLabel>
        <h3 className="text-8xl md:text-[14rem] font-display uppercase leading-none tracking-tighter text-white group-hover:text-primary transition-all duration-700">
          {item.title}
        </h3>
      </div>
      <p className="text-2xl md:text-5xl font-headline italic text-on-surface/40 max-w-4xl group-hover:text-on-surface transition-colors">
        "{item.quote}"
      </p>
      <div className="w-1 h-24 bg-gradient-to-b from-primary to-transparent" />
      <div className="flex items-center gap-4 text-xs font-mono text-primary uppercase tracking-[0.8em]">
        <span>CLICK TO REVEAL TRUE PHILOSOPHY</span>
      </div>
    </div>
  </motion.div>
);
