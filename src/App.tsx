import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { Play, ArrowRight, MessageSquare, MonitorPlay, Smartphone, Gamepad2, Video, Film, Sparkles, ChevronRight, ChevronLeft, Star } from 'lucide-react';

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-sm">
          <img src="https://unavatar.io/youtube/@Arcane-n15" alt="Arcane Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-bold tracking-widest uppercase text-sm">Arcane</span>
      </div>
      <div className="hidden md:flex items-center gap-8 text-sm font-medium text-white/60">
        <a href="#work" className="hover:text-white transition-colors">Work</a>
        <a href="#services" className="hover:text-white transition-colors">Services</a>
        <a href="#testimonials" className="hover:text-white transition-colors">Testimonials</a>
      </div>
      <a href="#contact" className="btn-beam px-5 py-2 text-sm font-medium text-white">
        <span className="btn-beam-inner"></span>
        <span className="btn-beam-content">Let's Talk</span>
      </a>
    </nav>
  );
};

const Particles = () => {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; duration: number; delay: number }>>([]);

  useEffect(() => {
    const newParticles = Array.from({ length: 30 }).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      duration: Math.random() * 20 + 10,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute bg-white rounded-full opacity-20"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -100, 0],
            x: [0, Math.random() * 50 - 25, 0],
            opacity: [0.1, 0.5, 0.1],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
};

const Hero = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-30"></div>
      <div className="absolute inset-0 animated-gradient"></div>
      <div className="absolute inset-0 beam-texture"></div>
      <Particles />
      
      {/* Glowing Orb / Black Hole effect */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-accent/20 rounded-full blur-[120px] pointer-events-none"></div>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-black rounded-full shadow-[0_0_80px_40px_rgba(139,92,246,0.3)] pointer-events-none"></div>

      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-8"
        >
          <Sparkles className="w-4 h-4 text-accent" />
          <span className="text-xs font-medium tracking-wide text-white/80 uppercase">Premium Video Editing</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: "easeOut" }}
          className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tighter mb-6 leading-[1.1]"
        >
          I Turn Raw Footage Into <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-white/40">Viral Content 🎬</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
          className="text-lg md:text-xl text-white/60 mb-10 max-w-2xl"
        >
          Helping creators & brands grow with high-retention video edits.
        </motion.p>

        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
          className="flex flex-col sm:flex-row items-center gap-4"
        >
          <a href="#work" className="btn-beam px-8 py-4 text-sm font-medium text-white w-full sm:w-auto">
            <span className="btn-beam-inner"></span>
            <span className="btn-beam-content flex items-center justify-center gap-2">
              View My Work <ArrowRight className="w-4 h-4" />
            </span>
          </a>
          <a href="#contact" className="px-8 py-4 text-sm font-medium text-white/80 hover:text-white transition-colors w-full sm:w-auto flex items-center justify-center gap-2">
            Contact me <MessageSquare className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
};

const VideoEmbed = ({ videoId, title, isShort = false, className = "", autoLoad = false }: { videoId: string, title: string, isShort?: boolean, className?: string, autoLoad?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(autoLoad);
  const aspectClass = isShort ? "aspect-[9/16] w-full max-w-[340px] mx-auto" : "aspect-video w-full";
  
  if (isPlaying) {
    return (
      <div className={`${aspectClass} rounded-2xl overflow-hidden border border-white/10 bg-black relative ${className}`}>
        <iframe
          className="absolute inset-0 w-full h-full"
          src={`https://www.youtube.com/embed/${videoId}${autoLoad ? '' : '?autoplay=1'}`}
          title={title}
          frameBorder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </div>
    );
  }

  return (
    <div 
      onClick={() => setIsPlaying(true)}
      className={`${aspectClass} bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative group cursor-pointer transition-transform hover:-translate-y-1 ${className}`}
    >
      <img 
        src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
        alt={title}
        className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-opacity duration-300"
        onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
      />
      <div className="absolute inset-0 flex items-center justify-center bg-black/20 group-hover:bg-transparent transition-colors duration-300">
        <div className="w-16 h-16 rounded-full bg-accent/80 flex items-center justify-center backdrop-blur-sm border border-white/30 group-hover:scale-110 transition-transform duration-300 shadow-[0_0_30px_rgba(139,92,246,0.4)]">
          <Play className="w-6 h-6 text-white ml-1 fill-white" />
        </div>
      </div>
      {isShort && (
        <div className="absolute top-4 left-4 px-2 py-1 bg-black/50 backdrop-blur-md rounded text-xs font-medium border border-white/10">
          Shorts
        </div>
      )}
    </div>
  );
};

const FeaturedWork = () => {
  const marqueeVideos = [
    { id: "5rdkg-j7O6A", title: "Unlocking the GOD PICKAXE in Roblox The Forge.." },
    { id: "n1xZL67yfCQ", title: "Why F1 Abandoned Monza's Deadliest Track" },
    { id: "dd7oJ_9Bips", title: "Gogeta vs All Gods Power Levels" },
    { id: "2r6f4Z_8Us4", title: "The Worst Ragebaiter From Every Generation" },
    { id: "1hHm8qKJdYs", title: "Unlocking OP SECRET Octo God In Squid Evolution! (Roblox)" },
    { id: "bVw316fo3QQ", title: "Silent Hill 2 : History & Cut Content" },
    { id: "CxtY92pAE08", title: "The GREATEST Naruto ADDON for BEDROCK MINECRAFT!?!" },
    { id: "ZDXVEfcpqxQ", title: "THE OPPS MADE A DISSTRACK SO I CAUGHT THEM LACKING AT THE STUDIO (Roblox Hood RP)" },
    { id: "hsVxyKL9pGs", title: "Princess Peach is NOT Who You Think She Is..." },
    { id: "HmRJCvNjnRU", title: "Minecraft, But Chests Give OP Items" },
    { id: "uULQ-iO12eQ", title: "TRAPPED by QUICKSAND POOL in Roblox!" },
    { id: "tygjAuzkolo", title: "Can We ESCAPE THE BACKROOMS!?" }
  ];

  const scrollRef = useRef<HTMLDivElement>(null);

  const scroll = (direction: 'left' | 'right') => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth / 2 : scrollLeft + clientWidth / 2;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  return (
    <section id="work" className="py-32 relative border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Featured Work</h2>
          <p className="text-white/50 text-lg">A showcase of high-retention edits.</p>
        </div>

        {/* Subsection 1: F1 Video */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <VideoEmbed videoId="RsBnUZi0oCE" title="Why F1 Had to Abandon the Nürburgring Nordschleife" autoLoad={true} />
          <div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">Helped a client go from <span className="text-accent">100 to 200K+</span> views</h3>
            <p className="text-white/60">Strategic pacing, engaging visuals, and a compelling narrative structure designed to maximize audience retention.</p>
          </div>
        </div>

        {/* Subsection 2: Graph */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <div className="order-2 md:order-1">
            <div className="flex items-center gap-4 mb-6">
              <div className="w-16 h-16 rounded-full bg-white/10 border border-white/20 flex items-center justify-center overflow-hidden">
                <img src="https://unavatar.io/youtube/@Voiceonyoutube" alt="VOICE" className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = 'https://ui-avatars.com/api/?name=VOICE&background=random'; }} />
              </div>
              <div>
                <h4 className="text-xl font-bold">VOICE</h4>
                <p className="text-white/50 text-sm">Channel Growth</p>
              </div>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">Rising from <span className="text-accent">30k to 100k</span> subscribers</h3>
            <p className="text-white/60">Consistent high-quality edits that build loyal audiences and drive channel growth.</p>
          </div>
          <motion.div 
            whileHover={{ y: -5 }}
            className="order-1 md:order-2 aspect-video bg-[#050505] rounded-2xl border border-white/10 p-6 relative overflow-hidden"
          >
            {/* Abstract Graph Representation */}
            <svg viewBox="0 0 400 200" className="w-full h-full overflow-visible">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.2)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,1)" />
                </linearGradient>
                <linearGradient id="fillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(139,92,246,0.3)" />
                  <stop offset="100%" stopColor="rgba(139,92,246,0)" />
                </linearGradient>
              </defs>
              <path d="M0,180 C50,180 80,150 120,160 C180,175 220,50 280,60 C320,65 360,30 400,20 L400,200 L0,200 Z" fill="url(#fillGrad)" />
              <path d="M0,180 C50,180 80,150 120,160 C180,175 220,50 280,60 C320,65 360,30 400,20" fill="none" stroke="url(#lineGrad)" strokeWidth="4" strokeLinecap="round" />
              <circle cx="400" cy="20" r="6" fill="#fff" className="animate-pulse" />
            </svg>
          </motion.div>
        </div>

        {/* Subsection 3: Short Video */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <VideoEmbed videoId="UAy3fzD-MJE" title="I turned a boring clip into THIS 🚀" isShort={true} autoLoad={true} />
          <div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">I turned a boring clip into THIS 🚀</h3>
            <p className="text-white/60">Fast-paced, engaging short-form content optimized for virality on TikTok, Reels, and Shorts.</p>
          </div>
        </div>

        {/* Subsection 3.5: Raw to Engaging */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">From raw footage → engaging, high-retention content 🚀</h3>
          </div>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <VideoEmbed videoId="vfYzjkUMXsw" title="Raw to Engaging 1" isShort={true} autoLoad={true} />
            <VideoEmbed videoId="IfC1jNPDV2c" title="Raw to Engaging 2" isShort={true} autoLoad={true} />
          </div>
        </div>
      </div>

      {/* Subsection 4: Video Slider */}
      <div className="w-full py-16 bg-white/[0.02] border-y border-white/5 relative group">
        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-2xl font-bold">More Work</h3>
            <div className="flex gap-3">
              <button 
                onClick={() => scroll('left')} 
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <button 
                onClick={() => scroll('right')} 
                className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-white/10 hover:border-white/20 transition-all text-white/70 hover:text-white"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
          
          <div 
            ref={scrollRef}
            className="flex gap-6 overflow-x-auto snap-x snap-mandatory pb-8 -mx-6 px-6 md:mx-0 md:px-0"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {marqueeVideos.map((vid, i) => (
              <div key={i} className="flex-none w-[300px] md:w-[350px] snap-center">
                <VideoEmbed videoId={vid.id} title={vid.title} className="mb-4" />
                <h4 className="text-sm font-medium text-white/80 line-clamp-2">{vid.title}</h4>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Services = () => {
  const services = [
    {
      icon: <MonitorPlay className="w-6 h-6" />,
      title: "YouTube Video Editing",
      desc: "High-retention edits designed to keep viewers hooked and increase watch time."
    },
    {
      icon: <Smartphone className="w-6 h-6" />,
      title: "Short-Form Content",
      desc: "Fast-paced, engaging edits optimized for virality and audience growth."
    },
    {
      icon: <Gamepad2 className="w-6 h-6" />,
      title: "Gaming Videos",
      desc: "Dynamic edits with memes, sound effects, and pacing that keep viewers entertained."
    },
    {
      icon: <Video className="w-6 h-6" />,
      title: "IRL / Vlogs",
      desc: "Clean, natural storytelling edits that make real-life content feel engaging and professional."
    },
    {
      icon: <Film className="w-6 h-6" />,
      title: "Documentary-Style",
      desc: "Story-driven edits with smooth transitions, music, and visuals that keep viewers invested."
    },
    {
      icon: <Sparkles className="w-6 h-6" />,
      title: "Motion Graphics & Effects",
      desc: "Captions, transitions, sound design, and visual effects to enhance overall quality."
    }
  ];

  return (
    <section id="services" className="py-32 relative">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">What I Offer</h2>
          <p className="text-white/50 text-lg max-w-2xl mx-auto">Comprehensive editing services tailored to your content style.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
            const [isHovered, setIsHovered] = useState(false);

            const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMousePosition({
                x: e.clientX - rect.left,
                y: e.clientY - rect.top,
              });
            };

            return (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                onMouseMove={handleMouseMove}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                className="p-6 rounded-2xl bg-white/[0.02] border border-white/5 hover:border-white/10 transition-colors group relative overflow-hidden"
              >
                {/* Cursor Proximity Glow */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    opacity: isHovered ? 1 : 0,
                    background: `radial-gradient(circle 150px at ${mousePosition.x}px ${mousePosition.y}px, rgba(139, 92, 246, 0.15), transparent 100%)`
                  }}
                />
                
                <div className="relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center mb-6 text-white/60 group-hover:text-accent group-hover:scale-110 transition-all">
                    {service.icon}
                  </div>
                  <h3 className="text-xl font-bold mb-3">{service.title}</h3>
                  <p className="text-white/50 text-sm leading-relaxed">{service.desc}</p>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

const Testimonials = () => {
  const reviews = [
    { name: "ThrottleRush", review: "He completely transformed my content — highly recommend.", img: "https://unavatar.io/youtube/@ThrottleRush1" },
    { name: "FakeYN", review: "Worked fast and always did what I requested", img: "https://unavatar.io/youtube/FakeYN" },
    { name: "llxllie", review: "Reliable, skilled, and easy to work with", img: "https://unavatar.io/youtube/llxllie" },
    { name: "The Obsessive gamer", review: "Exceeded my expectations honestly", img: "https://unavatar.io/youtube/TheObsessivegamer" },
    { name: "Nezar", review: "Helped me save my time", img: "https://unavatar.io/youtube/Nezar" },
    { name: "Cheesymembey", review: "Took my ideas and made them even better.", img: "https://unavatar.io/youtube/Cheesymembey" }
  ];

  return (
    <section id="testimonials" className="py-32 relative border-t border-white/5 bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="mb-20 text-center">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 mb-4">
            <span className="text-[10px] font-bold tracking-widest text-accent uppercase">Testimonials</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight">Our trusted clients</h2>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((item, i) => (
            <motion.div 
              key={i}
              whileHover={{ y: -5 }}
              className="p-8 rounded-2xl bg-[#0A0A0A] border border-white/10 flex flex-col justify-between"
            >
              <div className="mb-8">
                <div className="text-accent mb-4">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                    <path d="M14.017 21L16.41 14.596C16.68 13.882 16.815 13.155 16.815 12.414C16.815 10.59 16.12 9.07 14.73 7.854C13.34 6.638 11.665 6.03 9.705 6.03V9.63C10.785 9.63 11.64 9.945 12.27 10.575C12.9 11.205 13.215 12.06 13.215 13.14V13.5H9.51V21H14.017ZM21.517 21L23.91 14.596C24.18 13.882 24.315 13.155 24.315 12.414C24.315 10.59 23.62 9.07 22.23 7.854C20.84 6.638 19.165 6.03 17.205 6.03V9.63C18.285 9.63 19.14 9.945 19.77 10.575C20.4 11.205 20.715 12.06 20.715 13.14V13.5H17.01V21H21.517Z" />
                  </svg>
                </div>
                <p className="text-white/80 text-sm leading-relaxed">"{item.review}"</p>
              </div>
              <div className="flex items-center gap-3">
                <img src={item.img} alt={item.name} className="w-10 h-10 rounded-full object-cover border border-white/10" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&background=random`; }} />
                <div>
                  <h4 className="text-sm font-bold">{item.name}</h4>
                  <div className="flex text-accent">
                    {[...Array(5)].map((_, j) => (
                      <Star key={j} className="w-3 h-3 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = () => {
  return (
    <footer id="contact" className="py-20 border-t border-white/10 relative overflow-hidden">
      <div className="absolute inset-0 bg-accent/5"></div>
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">Ready to elevate your content?</h2>
        <p className="text-white/60 mb-10 text-lg">Let's work together to create high-retention videos that grow your audience.</p>
        
        <div className="inline-flex flex-col items-center gap-4">
          <a href="mailto:arcane.vfx1@gmail.com" className="btn-beam px-10 py-4 text-base font-bold text-white">
            <span className="btn-beam-inner"></span>
            <span className="btn-beam-content flex items-center gap-2">
              Contact Me <MessageSquare className="w-5 h-5" />
            </span>
          </a>
          <div className="flex flex-col sm:flex-row items-center gap-3">
            <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-sm">Discord ID:</span>
              <span className="font-mono text-white">arcane_.1</span>
            </div>
            <div className="flex items-center gap-2 text-white/50 bg-white/5 px-4 py-2 rounded-full border border-white/10">
              <span className="text-sm">Email ID:</span>
              <span className="font-mono text-white">arcane.vfx1@gmail.com</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

const AbstractShapes = () => {
  const { scrollYProgress } = useScroll();
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, 300]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
      <motion.div style={{ y: y1 }} className="absolute top-[20%] left-[10%] w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      <motion.div style={{ y: y2 }} className="absolute top-[60%] right-[5%] w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-3xl" />
      <motion.div style={{ y: y3 }} className="absolute top-[80%] left-[20%] w-64 h-64 bg-purple-500/5 rounded-full blur-3xl" />
    </div>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-white relative">
      <AbstractShapes />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <FeaturedWork />
        <Services />
        <Testimonials />
      </main>
      <Footer />
    </div>
  );
}
