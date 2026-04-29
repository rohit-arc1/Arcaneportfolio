import React, { useEffect, useState, useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, AnimatePresence } from 'motion/react';
import { Play, ArrowRight, MessageSquare, MonitorPlay, Smartphone, Gamepad2, Video, Film, Sparkles, ChevronRight, ChevronLeft, Star, Camera, Film as FilmIcon } from 'lucide-react';
import { ThreeScene } from './components/ThreeScene';

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const cursorX = useSpring(0, { damping: 20, stiffness: 200 });
  const cursorY = useSpring(0, { damping: 20, stiffness: 200 });

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16);
      cursorY.set(e.clientY - 16);
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <motion.div
      className="fixed top-0 left-0 w-8 h-8 rounded-full border border-accent/50 pointer-events-none z-[100] hidden md:block mix-blend-difference"
      style={{
        x: cursorX,
        y: cursorY,
        scale: isHovering ? 2 : 1,
      }}
    >
      <div className="absolute inset-0 bg-accent/20 rounded-full blur-sm" />
    </motion.div>
  );
};

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 bg-black/50 backdrop-blur-md border-b border-white/5">
      <div className="flex items-center gap-2">
        <div className="w-8 h-8 flex items-center justify-center overflow-hidden rounded-sm">
          <img src="https://unavatar.io/youtube/@Arcane-n15" alt="Arcane Logo" className="w-full h-full object-cover" />
        </div>
        <span className="text-white font-bold tracking-widest uppercase text-sm font-display text-glow">Arcane</span>
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

const Hero = () => {
  return (
    <section className="relative min-h-[110vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      <div className="relative z-10 flex flex-col items-center text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 mb-8 font-mono backdrop-blur-xl"
        >
          <Sparkles className="w-4 h-4 text-accent animate-pulse" />
          <span className="text-xs font-semibold tracking-wider text-white/90 uppercase">The Art of Retention</span>
        </motion.div>

        <motion.h1 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="text-6xl md:text-8xl lg:text-9xl font-bold tracking-tighter mb-8 leading-[0.9] font-display"
        >
          High-End Editing for <br className="hidden md:block" />
          <span className="text-accent text-glow italic font-accent">Modern Creators</span>
        </motion.h1>

        <motion.p 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="text-xl md:text-2xl text-white/50 mb-12 max-w-3xl leading-relaxed italic font-accent"
        >
          Crafting high-end visual experiences for the next generation of narrative-driven creators.
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

const Card3D = ({ children, className = "" }: { children: React.ReactNode, className?: string }) => {
  const [rotate, setRotate] = useState({ x: 0, y: 0 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setRotate({ x: y * -20, y: x * 20 });
  };

  return (
    <motion.div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setRotate({ x: 0, y: 0 })}
      animate={{ rotateX: rotate.x, rotateY: rotate.y }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      style={{ transformStyle: "preserve-3d" }}
      className={`relative group ${className}`}
    >
      <div 
        style={{ transform: "translateZ(50px)" }}
        className="w-full h-full"
      >
        {children}
      </div>
      <div className="absolute inset-0 bg-accent/10 blur-xl opacity-0 group-hover:opacity-100 transition-opacity rounded-2xl pointer-events-none" />
    </motion.div>
  );
};

const VideoEmbed = ({ videoId, title, isShort = false, className = "", autoLoad = false }: { videoId: string, title: string, isShort?: boolean, className?: string, autoLoad?: boolean }) => {
  const [isPlaying, setIsPlaying] = useState(autoLoad);
  const aspectClass = isShort ? "aspect-[9/16] w-full max-w-[340px] mx-auto" : "aspect-video w-full";
  
  if (isPlaying) {
    return (
      <div className={`${aspectClass} rounded-2xl overflow-hidden border border-white/20 bg-black relative shadow-2xl ${className}`}>
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
    <Card3D className={aspectClass}>
      <div 
        onClick={() => setIsPlaying(true)}
        className="w-full h-full bg-white/5 rounded-2xl border border-white/10 overflow-hidden relative group cursor-pointer"
      >
        <img 
          src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`} 
          alt={title}
          className="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-100 transition-all duration-700 scale-110 group-hover:scale-100"
          onError={(e) => { e.currentTarget.src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`; }}
        />
        <div className="absolute inset-0 flex items-center justify-center bg-black/40 group-hover:bg-transparent transition-colors duration-500">
          <div className="w-20 h-20 rounded-full bg-accent flex items-center justify-center backdrop-blur-md border border-white/30 group-hover:scale-110 transition-transform duration-500 shadow-2xl">
            <Play className="w-8 h-8 text-white ml-1 fill-white" />
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-500">
           <p className="text-white font-bold text-lg line-clamp-1">{title}</p>
        </div>
        {isShort && (
          <div className="absolute top-4 left-4 px-3 py-1 bg-accent rounded-full text-[10px] font-bold tracking-widest uppercase border border-white/20">
            Shorts
          </div>
        )}
      </div>
    </Card3D>
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
          <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display">Featured Work</h2>
          <p className="text-white/50 text-lg italic font-accent">A showcase of high-retention edits.</p>
        </div>

        {/* Subsection 1: F1 Video */}
        <div className="grid md:grid-cols-2 gap-12 items-center mb-32">
          <VideoEmbed videoId="RsBnUZi0oCE" title="Why F1 Had to Abandon the Nürburgring Nordschleife" autoLoad={true} />
          <div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight font-display">Helped a client go from <span className="text-accent">100 to 200K+</span> views</h3>
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
                <h4 className="text-xl font-bold font-display">VOICE</h4>
                <p className="text-white/50 text-sm font-mono">Channel Growth</p>
              </div>
            </div>
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight font-display">Rising from <span className="text-accent">30k to 100k</span> subscribers</h3>
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
            <h3 className="text-2xl md:text-4xl font-bold mb-4 leading-tight font-display">I turned a boring clip into THIS 🚀</h3>
            <p className="text-white/60">Fast-paced, engaging short-form content optimized for virality on TikTok, Reels, and Shorts.</p>
          </div>
        </div>

        {/* Subsection 3.5: Raw to Engaging */}
        <div className="mb-32">
          <div className="text-center mb-16">
            <h3 className="text-3xl md:text-5xl font-bold tracking-tight mb-4 font-display">From raw footage → engaging, high-retention content 🚀</h3>
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
            <h3 className="text-2xl font-bold font-display">More Work</h3>
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
      icon: <FilmIcon className="w-8 h-8" />,
      title: "YouTube Editing",
      desc: "Narrative-driven edits that prioritize retention and storytelling excellence."
    },
    {
      icon: <Smartphone className="w-8 h-8" />,
      title: "Short-Form",
      desc: "High-octane edits for TikTok and Reels that stop the scroll instantly."
    },
    {
      icon: <MonitorPlay className="w-8 h-8" />,
      title: "Commercial Ads",
      desc: "Cinematic promotional content designed to convert and leave a lasting impression."
    },
    {
      icon: <Gamepad2 className="w-8 h-8" />,
      title: "Gaming Features",
      desc: "Dynamic gaming storytelling with advanced sound design and visual flair."
    }
  ];

  return (
    <section id="services" className="py-32 relative overflow-hidden bg-white/[0.01]">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display">Specialized Creative Agency Services</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto italic font-accent">Elevating raw footage into premium visual narratives.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              viewport={{ once: true }}
              className="p-8 rounded-3xl bg-white/[0.03] border border-white/10 hover:border-accent/40 transition-all group backdrop-blur-sm"
            >
              <div className="w-16 h-16 rounded-2xl bg-accent/20 border border-white/10 flex items-center justify-center mb-8 text-accent group-hover:scale-110 group-hover:rotate-6 transition-transform">
                {service.icon}
              </div>
              <h3 className="text-2xl font-bold mb-4 font-display">{service.title}</h3>
              <p className="text-white/40 leading-relaxed font-accent italic">{service.desc}</p>
            </motion.div>
          ))}
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
    <section id="testimonials" className="py-32 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="mb-24 text-center">
          <h2 className="text-4xl md:text-6xl font-bold tracking-tight mb-6 font-display">Voices of Satisfied Creators</h2>
          <p className="text-white/40 text-xl max-w-2xl mx-auto italic font-accent">Real feedback from real channel growth.</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {reviews.map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, rotateY: 45 }}
              whileInView={{ opacity: 1, rotateY: 0 }}
              transition={{ delay: i * 0.1, duration: 0.8 }}
              viewport={{ once: true }}
              className="p-10 rounded-[2.5rem] bg-white/[0.03] border border-white/10 hover:border-accent/30 transition-all group backdrop-blur-md relative"
              style={{ transformStyle: "preserve-3d" }}
            >
              <div className="absolute -top-4 -right-4 w-12 h-12 bg-accent/20 rounded-full blur-xl group-hover:bg-accent/40 transition-colors" />
              
              <div className="mb-10 text-accent">
                <Star className="w-6 h-6 fill-current" />
              </div>
              
              <p className="text-white/70 text-lg leading-relaxed mb-10 italic font-accent">"{item.review}"</p>
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-accent/20">
                  <img src={item.img} alt={item.name} className="w-full h-full object-cover" onError={(e) => { e.currentTarget.src = `https://ui-avatars.com/api/?name=${item.name}&background=random`; }} />
                </div>
                <div>
                  <h4 className="font-bold font-display uppercase tracking-wider">{item.name}</h4>
                  <p className="text-white/30 text-xs font-mono">Content Creator</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Contact = () => {
  return (
    <footer id="contact" className="py-40 relative overflow-hidden bg-black">
      <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
        <motion.div
           initial={{ opacity: 0, scale: 0.9 }}
           whileInView={{ opacity: 1, scale: 1 }}
           transition={{ duration: 1 }}
           className="relative inline-block"
        >
          <h2 className="text-5xl md:text-8xl font-bold tracking-tighter mb-10 font-display text-glow text-accent italic font-accent">
            Ready To Launch?
          </h2>
          <div className="absolute -inset-4 bg-accent/10 blur-3xl -z-10 rounded-full" />
        </motion.div>
        
        <p className="text-white/40 mb-16 text-xl max-w-2xl mx-auto italic font-accent">
          Let's collaborate to build your next viral masterpiece.
        </p>
        
        <div className="flex flex-col items-center gap-10">
          <motion.a 
            href="https://mail.google.com/mail/?view=cm&fs=1&to=arcane.vfx1@gmail.com" 
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-beam px-14 py-6 text-xl font-bold text-white shadow-2xl relative group overflow-hidden"
          >
            <span className="btn-beam-inner"></span>
            <span className="btn-beam-content flex items-center gap-3">
              Request a Quote <ArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
            </span>
          </motion.a>
          
          <div className="flex flex-col md:flex-row gap-6 mt-10">
             <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-white/5 bg-white/[0.02] flex items-center gap-4 backdrop-blur-xl hover:bg-white/5 transition-colors group">
                <MessageSquare className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <div className="text-left">
                   <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Discord Profile</p>
                   <p className="font-bold text-white font-mono">arcane_.1</p>
                </div>
             </a>
             <a href="https://mail.google.com/mail/?view=cm&fs=1&to=arcane.vfx1@gmail.com" target="_blank" rel="noopener noreferrer" className="px-8 py-4 rounded-full border border-white/5 bg-white/[0.02] flex items-center gap-4 backdrop-blur-xl hover:bg-white/5 transition-colors group">
                <Star className="w-5 h-5 text-accent group-hover:scale-110 transition-transform" />
                <div className="text-left">
                   <p className="text-[10px] uppercase tracking-widest text-white/30 font-mono">Direct Inquiry</p>
                   <p className="font-bold text-white font-mono leading-none">arcane.vfx1@gmail.com</p>
                </div>
             </a>
          </div>
        </div>
      </div>
      
      <div className="mt-40 border-t border-white/5 py-10 text-center">
         <p className="text-white/20 text-xs font-mono tracking-widest uppercase">© 2026 Arcane Creative Agency • All Rights Reserved</p>
      </div>
    </footer>
  );
};

export default function App() {
  return (
    <div className="min-h-screen selection:bg-accent/30 selection:text-white relative bg-black">
      <CustomCursor />
      <ThreeScene />
      <Navbar />
      <main className="relative z-10">
        <Hero />
        <FeaturedWork />
        <Services />
        <Testimonials />
        <Contact />
      </main>
    </div>
  );
}
