import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useLoader } from '@react-three/fiber'
import { TextureLoader, SRGBColorSpace, BackSide } from 'three'
import { Float, OrbitControls, Stars, Sphere, Line } from '@react-three/drei'
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion'
import { ArrowDown, ArrowRight, ArrowUpRight, Atom, BarChart3, BrainCircuit, Check, ChevronDown, Code2, Database, Download, ExternalLink, Github, GraduationCap, Layers3, Linkedin, Mail, Menu, Moon, Network, Send, Sparkles, Sun, X, Music2, Pause, Volume2, VolumeX, SkipBack, SkipForward, ListMusic } from 'lucide-react'
import { portfolio } from './config/portfolio'
import { projects } from './data/projects'
import emailjs from '@emailjs/browser';

const navItems = ['About', 'Skills', 'Projects', 'Journey', 'Contact']
const skillGroups = {
  Programming: ['Python', 'Java', 'JavaScript', 'SQL'],
  'Data Science': ['Pandas', 'NumPy', 'Matplotlib', 'Seaborn', 'Scikit-learn'],
  'AI & Machine Learning': ['Classification', 'Regression', 'Model Evaluation', 'Computer Vision', 'Deep Learning'],
  'Web Development': ['HTML', 'CSS', 'React', 'Flask', 'Django', 'REST APIs'],
  Databases: ['MySQL', 'PostgreSQL'],
  Tools: ['Git', 'GitHub', 'Jupyter', 'VS Code', 'Power BI'],
}
const categories = ['All', 'Data Science', 'Machine Learning', 'Web Development', 'Analytics']

const musicTracks = [
  { title: 'Portfolio Soundtrack', artist: 'Ambient Technology', src: 'music/portfolio.mp3' },
  { title: 'Gaming Mode', artist: 'Vaitsez', src: 'music/gaming.mp3' },
]

function GlobeScene() {
  const earthTexture = useLoader(TextureLoader, `${import.meta.env.BASE_URL}textures/earth-realistic.png`)
  earthTexture.colorSpace = SRGBColorSpace
  const points = useMemo(() => Array.from({ length: 120 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 120)
    const theta = Math.sqrt(120 * Math.PI) * phi
    return [Math.cos(theta) * Math.sin(phi) * 1.515, Math.cos(phi) * 1.515, Math.sin(theta) * Math.sin(phi) * 1.515]
  }), [])
  const connections = useMemo(() => {
    const links = []
    for (let i = 0; i < 26; i++) {
      const a = points[(i * 7 + 3) % points.length].map(v => v / 1.515)
      const b = points[(i * 19 + 27) % points.length].map(v => v / 1.515)
      const dot = Math.max(-0.999, Math.min(0.999, a.reduce((sum, v, j) => sum + v * b[j], 0)))
      const angle = Math.acos(dot)
      const sinAngle = Math.sin(angle) || 1
      const arc = Array.from({ length: 22 }, (_, step) => {
        const t = step / 21
        const wa = Math.sin((1 - t) * angle) / sinAngle
        const wb = Math.sin(t * angle) / sinAngle
        const xyz = a.map((v, j) => wa * v + wb * b[j])
        const length = Math.hypot(...xyz) || 1
        return xyz.map(v => (v / length) * 1.508)
      })
      links.push(arc)
    }
    return links
  }, [points])
  return <Canvas camera={{ position: [0, 0, 5.2], fov: 42 }} dpr={[1, 1.5]}>
    <ambientLight intensity={0.7} />
    <pointLight position={[3, 2, 3]} intensity={35} color="#28caff" />
    <pointLight position={[-3, -1, 2]} intensity={20} color="#6b55ff" />
    <pointLight position={[0, 1, -3]} intensity={8} color="#187aff" />
    <Stars radius={70} depth={30} count={1100} factor={2.2} saturation={0.3} fade speed={0.45} />
    <Float speed={0.7} rotationIntensity={0.06} floatIntensity={0.1}>
      <group rotation={[0, 1.05, 0]}>
        <Sphere args={[1.5, 128, 128]}>
          <meshStandardMaterial map={earthTexture} roughness={0.92} metalness={0.04} emissive="#061b43" emissiveMap={earthTexture} emissiveIntensity={0.12} />
        </Sphere>
        <Sphere args={[1.507, 48, 48]}>
          <meshBasicMaterial color="#168cff" wireframe transparent opacity={0.075} />
        </Sphere>
        {connections.map((pair, i) => <Line key={`link-${i}`} points={pair} color={i % 3 === 0 ? '#b16cff' : '#21cfff'} transparent opacity={i % 3 === 0 ? 0.55 : 0.38} lineWidth={0.7} />)}
        {points.map((p, i) => <mesh key={`node-${i}`} position={p}>
          <sphereGeometry args={[i % 9 === 0 ? 0.025 : 0.009, 8, 8]} />
          <meshBasicMaterial color={i % 9 === 0 ? '#e1a0ff' : '#64edff'} />
        </mesh>)}
        <Sphere args={[1.56, 64, 64]}>
          <meshBasicMaterial color="#168dff" side={BackSide} transparent opacity={0.16} />
        </Sphere>
      </group>
    </Float>
    <OrbitControls enableZoom={false} enablePan={false} autoRotate autoRotateSpeed={0.38} />
  </Canvas>
}

function IconTile({ icon: Icon, label, detail }) {
  return <div className="icon-tile"><span className="tile-icon"><Icon size={19} /></span><div><strong>{label}</strong><small>{detail}</small></div></div>
}

function ProjectVisual({ type }) {
  return <div className={`project-visual visual-${type}`}>
    <div className="visual-grid" />
    {type === 'flood' && <><div className="wave wave-a" /><div className="wave wave-b" /><span className="visual-label">FLOOD RISK / LIVE CONCEPT</span><div className="visual-stat"><span>Risk signals</span><b>Rainfall · Terrain · History</b></div></>}
    {type === 'ship' && <><div className="route route-one" /><div className="route route-two" /><span className="port-dot dot-a" /><span className="port-dot dot-b" /><span className="visual-label">ROUTE GRAPH / COLOMBO</span><div className="visual-stat"><span>Optimization</span><b>Distance ↔ Preference</b></div></>}
    {type === 'churn' && <><div className="chart-bars">{[28, 45, 35, 64, 52, 79, 58, 92, 68].map((h, i) => <i key={i} style={{ height: `${h}%` }} />)}</div><span className="visual-label">CUSTOMER ANALYTICS</span><div className="visual-stat"><span>Workflow</span><b>Prepare · Model · Explain</b></div></>}
    {type === 'brain' && <><div className="brain-orb"><BrainCircuit size={70} strokeWidth={1.1} /></div><span className="visual-label">COMPUTER VISION / MRI</span><div className="visual-stat"><span>Learning focus</span><b>Image classification</b></div></>}
    {type === 'tourism' && <><div className="tourism-chart"><span /><span /><span /><span /><span /><span /><span /></div><span className="visual-label">TOURISM DATA / SRI LANKA</span><div className="visual-stat"><span>Insights</span><b>Arrivals · Trends · Regions</b></div></>}
  </div>
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    if (!project) return
    const close = e => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', close)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', close); document.body.style.overflow = '' }
  }, [project, onClose])
  if (!project) return null
  return <AnimatePresence>
    <motion.div className="modal-backdrop" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onMouseDown={e => e.target === e.currentTarget && onClose()}>
      <motion.div className="project-modal" initial={{ opacity: 0, y: 24, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: 18 }} role="dialog" aria-modal="true" aria-labelledby="modal-title">
        <button className="icon-button modal-close" onClick={onClose} aria-label="Close project details"><X size={19} /></button>
        <ProjectVisual type={project.visual} />
        <div className="modal-content">
          <span className="eyebrow">{project.status} · {project.category}</span>
          <h2 id="modal-title">{project.title}</h2><p className="modal-subtitle">{project.subtitle}</p>
          <p>{project.details}</p>
          <div className="detail-grid"><div><h4>Problem</h4><p>{project.problem}</p></div><div><h4>Approach</h4><p>{project.approach}</p></div><div className="detail-wide"><h4>Future improvements</h4><p>{project.future}</p></div></div>
          <div className="tag-list">{project.stack.map(tag => <span className="tag" key={tag}>{tag}</span>)}</div>
          <div className="modal-links">{project.github ? <a className="button button-secondary" href={project.github} target="_blank" rel="noreferrer">Repository <ExternalLink size={16}/></a> : <span className="muted-note">Repository link not configured yet</span>}{project.demo && <a className="button button-primary" href={project.demo} target="_blank" rel="noreferrer">Live demo <ArrowUpRight size={16}/></a>}</div>
        </div>
      </motion.div>
    </motion.div>
  </AnimatePresence>
}

function App() {
  const [theme, setTheme] = useState(() => localStorage.getItem('pap-theme') || 'dark')
  const [musicPlaying, setMusicPlaying] = useState(false)
  const [musicPanelOpen, setMusicPanelOpen] = useState(false)
  const [trackIndex, setTrackIndex] = useState(0)
  const [trackMenuOpen, setTrackMenuOpen] = useState(false)
  const [volume, setVolume] = useState(15)
  const [musicMuted, setMusicMuted] = useState(false)
  const audioRef = useRef(null)
  const previousTrackRef = useRef(0)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeNav, setActiveNav] = useState('Home')
  const [skillGroup, setSkillGroup] = useState('Programming')
  const [filter, setFilter] = useState('All')
  const [search, setSearch] = useState('')
  const [selectedProject, setSelectedProject] = useState(null)
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [formNotice, setFormNotice] = useState('')
  const [isSending, setIsSending] = useState(false);
  const reduceMotion = useReducedMotion()
  // Try autoplay on every page load. If the browser blocks audible autoplay,
  // retry after the visitor interacts anywhere except the music toggle.
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    audio.volume = volume / 100
    audio.loop = false
    audio.muted = musicMuted

    let disposed = false

    const removeRetryListeners = () => {
      window.removeEventListener('pointerdown', handleFirstInteraction)
      window.removeEventListener('keydown', handleFirstInteraction)
    }

    const startMusic = async () => {
      if (!audio.paused || disposed) return

      try {
        await audio.play()
        if (!disposed) {
          setMusicPlaying(true)
          removeRetryListeners()
        }
      } catch {
        if (!disposed) setMusicPlaying(false)
      }
    }

    function handleFirstInteraction(event) {
      // Let the music button itself remain a reliable play/pause control.
      if (event.target instanceof Element && event.target.closest('.music-toggle')) return
      void startMusic()
    }

    void startMusic()
    window.addEventListener('pointerdown', handleFirstInteraction)
    window.addEventListener('keydown', handleFirstInteraction)

    return () => {
      disposed = true
      removeRetryListeners()
    }
  }, [])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.volume = volume / 100
  }, [volume])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    audio.muted = musicMuted
  }, [musicMuted])
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return
    if (previousTrackRef.current === trackIndex) return
    previousTrackRef.current = trackIndex
    if (musicPlaying) {
      audio.play().then(() => setMusicPlaying(true)).catch(() => setMusicPlaying(false))
    }
  }, [trackIndex, musicPlaying])
  const changeTrack = async (nextIndex) => {
    const audio = audioRef.current
    if (!audio) return
    setTrackIndex((nextIndex + musicTracks.length) % musicTracks.length)
  }
  const toggleMusic = async () => {
    const audio = audioRef.current
    if (!audio) return
    if (audio.paused) {
      try { await audio.play(); setMusicPlaying(true) }
      catch (error) { console.info('Music playback could not start.', error); setMusicPlaying(false) }
    } else { audio.pause(); setMusicPlaying(false) }
  }
  useEffect(() => {
    document.documentElement.dataset.theme = theme
    localStorage.setItem('pap-theme', theme)
  }, [theme])
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) setActiveNav(entry.target.id === 'hero' ? 'Home' : entry.target.dataset.nav || entry.target.id)
    }), { rootMargin: '-35% 0px -55% 0px' })
    document.querySelectorAll('main section[id]').forEach(section => observer.observe(section))
    return () => observer.disconnect()
  }, [])
  const visibleProjects = projects.filter(p => (filter === 'All' || p.category === filter) && `${p.title} ${p.description} ${p.stack.join(' ')}`.toLowerCase().includes(search.toLowerCase()))
  const motionProps = reduceMotion ? {} : { initial: { opacity: 0, y: 22 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true, amount: 0.15 }, transition: { duration: 0.6 } }
  const socialLinks = [
    { label: 'GitHub', href: portfolio.github, icon: Github },
    ...(portfolio.linkedin ? [{ label: 'LinkedIn', href: portfolio.linkedin, icon: Linkedin }] : []),
    ...(portfolio.email ? [{ label: 'Email', href: `mailto:${portfolio.email}`, icon: Mail }] : []),
  ]
  const submitContact = async (e) => {
    e.preventDefault();
    setFormNotice('Sending your message...');

    try {
      await emailjs.send(
        'service_uukp94j',
        'template_vj02g13',
        {
          name: form.name,
          email: form.email,
          subject: form.subject,
          message: form.message,
        },
        'P0RuVh_12JshKCYLg'
      );

      setFormNotice('Message sent successfully!');
      setForm({ name: '', email: '', subject: '', message: '' });
    } catch (error) {
      console.error('EmailJS error:', error);
      setFormNotice('Failed to send your message. Please try again.');
    }
  };
  return <div className="app-shell">
    <div className="ambient ambient-one" /><div className="ambient ambient-two" />
    <audio ref={audioRef} src={`${import.meta.env.BASE_URL}${musicTracks[trackIndex].src}`} preload="auto" aria-label="Portfolio background music" />
    <header className="site-header">
      <a className="brand" href="#hero" aria-label="PAP home">
        <img
          className="brand-photo"
          src={`${import.meta.env.BASE_URL}brand-photo/profile.png`}
          alt="Pasindu Piyumal"
        />
        <span className="brand-copy">
          <strong>PASINDU PIYUMAL</strong>
          <small>DATA SCIENCE PORTFOLIO</small>
        </span>
      </a>
      <nav className={menuOpen ? 'main-nav nav-open' : 'main-nav'} aria-label="Main navigation">
        {['Home', ...navItems].map(item => <a key={item} className={activeNav === item ? 'nav-link active' : 'nav-link'} href={`#${item === 'Home' ? 'hero' : item.toLowerCase()}`} onClick={() => setMenuOpen(false)}>{item}</a>)}
      </nav>
      <div className="header-actions"><button className="icon-button music-toggle" onClick={toggleMusic} aria-label={musicPlaying ? 'Pause background music' : 'Play background music'} title={musicPlaying ? 'Pause music' : 'Play music'}>{musicPlaying ? <Pause size={18}/> : <Music2 size={18}/>}</button><button className="icon-button" onClick={() => setMusicPanelOpen(open => !open)} aria-label="Open music controls" title="Music controls" aria-expanded={musicPanelOpen}><ListMusic size={18}/></button><button className="icon-button theme-toggle" onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} aria-label={`Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`}>{theme === 'dark' ? <Sun size={18}/> : <Moon size={18}/>}</button><a href="#contact" className="button button-small button-outline">Let's Connect <ArrowUpRight size={15}/></a><button className="icon-button menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle navigation">{menuOpen ? <X/> : <Menu/>}</button></div>
    </header>
    {musicPanelOpen && <section className="music-panel" aria-label="Music player controls" style={{ position: 'fixed', top: '84px', right: 'max(18px, calc((100vw - 1200px) / 2))', zIndex: 1000, width: 'min(340px, calc(100vw - 32px))', padding: '20px', borderRadius: '18px', border: '1px solid var(--border, rgba(128,128,128,.35))', background: 'var(--panel, rgba(18, 24, 42, .96))', color: 'var(--text, inherit)', boxShadow: '0 18px 55px rgba(0,0,0,.28)', backdropFilter: 'blur(20px)' }}>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px', marginBottom: '16px' }}>
        <div><strong style={{ display: 'block', fontSize: '15px' }}>Music player</strong><span style={{ opacity: .7, fontSize: '12px' }}>Customize your listening</span></div>
        <button className="icon-button" onClick={() => setMusicPanelOpen(false)} aria-label="Close music controls"><X size={17}/></button>
      </div>
      <label style={{ display: 'block', fontSize: '11px', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--muted, #94a3b8)', marginBottom: '9px' }}>Now playing</label>
      <div style={{ position: 'relative', marginBottom: '18px' }}>
        <button
          type="button"
          className="music-track-trigger"
          aria-haspopup="listbox"
          aria-expanded={trackMenuOpen}
          onClick={() => setTrackMenuOpen(open => !open)}
          style={{
            display: 'flex', alignItems: 'center', gap: '12px', width: '100%', minHeight: '66px',
            padding: '11px 13px', textAlign: 'left', borderRadius: '14px', cursor: 'pointer',
            border: trackMenuOpen ? '1px solid rgba(139, 92, 246, .8)' : '1px solid rgba(148, 163, 184, .24)',
            background: 'linear-gradient(135deg, rgba(99,102,241,.13), rgba(15,23,42,.62))',
            color: 'var(--text, #f8fafc)', boxShadow: trackMenuOpen ? '0 0 0 3px rgba(139,92,246,.12)' : 'inset 0 1px 0 rgba(255,255,255,.035)',
            transition: 'border-color .18s ease, box-shadow .18s ease'
          }}
        >
          <span style={{ width: '40px', height: '40px', flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '11px', color: '#c4b5fd', background: 'linear-gradient(145deg, rgba(139,92,246,.24), rgba(59,130,246,.13))', border: '1px solid rgba(167,139,250,.2)' }}><Music2 size={19}/></span>
          <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', minWidth: 0, flex: 1 }}>
            <strong style={{ fontSize: '13px', fontWeight: 650, lineHeight: 1.25, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{musicTracks[trackIndex].title}</strong>
            <span style={{ fontSize: '11px', color: 'var(--muted, #94a3b8)', lineHeight: 1.2 }}>{musicTracks[trackIndex].artist}</span>
          </span>
          <ChevronDown size={17} style={{ flexShrink: 0, color: '#a5b4fc', transition: 'transform .2s ease', transform: trackMenuOpen ? 'rotate(180deg)' : 'rotate(0deg)' }}/>
        </button>
        {trackMenuOpen && <>
          <button type="button" aria-label="Close track menu" onClick={() => setTrackMenuOpen(false)} style={{ position: 'fixed', inset: 0, zIndex: 1000, background: 'transparent', border: 0, padding: 0, cursor: 'default' }}/>
          <div role="listbox" aria-label="Choose music track" style={{ position: 'absolute', zIndex: 1001, top: 'calc(100% + 8px)', left: 0, right: 0, padding: '6px', borderRadius: '15px', border: '1px solid rgba(148,163,184,.22)', background: 'var(--panel, #111827)', boxShadow: '0 20px 48px rgba(0,0,0,.42)', backdropFilter: 'blur(22px)', overflow: 'hidden' }}>
            {musicTracks.map((track, index) => {
              const selected = index === trackIndex
              return <button key={track.src} type="button" role="option" aria-selected={selected} onClick={() => { void changeTrack(index); setTrackMenuOpen(false) }} style={{ display: 'flex', alignItems: 'center', gap: '11px', width: '100%', padding: '10px', textAlign: 'left', border: selected ? '1px solid rgba(139,92,246,.28)' : '1px solid transparent', borderRadius: '10px', background: selected ? 'linear-gradient(100deg, rgba(139,92,246,.2), rgba(59,130,246,.09))' : 'transparent', color: 'var(--text, #f8fafc)', cursor: 'pointer', transition: 'background .15s ease' }} onMouseEnter={e => { if (!selected) e.currentTarget.style.background = 'rgba(148,163,184,.09)' }} onMouseLeave={e => { if (!selected) e.currentTarget.style.background = 'transparent' }}>
                <span style={{ width: '34px', height: '34px', flexShrink: 0, display: 'grid', placeItems: 'center', borderRadius: '9px', background: selected ? 'rgba(139,92,246,.2)' : 'rgba(148,163,184,.09)', color: selected ? '#c4b5fd' : 'var(--muted, #94a3b8)' }}>{selected ? <Check size={16}/> : <Music2 size={16}/>}</span>
                <span style={{ display: 'flex', flexDirection: 'column', gap: '4px', flex: 1, minWidth: 0 }}>
                  <strong style={{ fontSize: '12px', fontWeight: selected ? 650 : 500, lineHeight: 1.3 }}>{track.title}</strong>
                  <span style={{ fontSize: '11px', color: 'var(--muted, #94a3b8)' }}>{track.artist}</span>
                </span>
                {selected && <span style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#a78bfa', boxShadow: '0 0 10px rgba(167,139,250,.7)'}}/>}
              </button>
            })}
          </div>
        </>}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '14px', marginBottom: '17px' }}>
        <button className="icon-button" onClick={() => changeTrack(trackIndex - 1)} aria-label="Previous track"><SkipBack size={18}/></button>
        <button className="icon-button music-toggle" onClick={toggleMusic} aria-label={musicPlaying ? 'Pause music' : 'Play music'}>{musicPlaying ? <Pause size={19}/> : <Music2 size={19}/>}</button>
        <button className="icon-button" onClick={() => changeTrack(trackIndex + 1)} aria-label="Next track"><SkipForward size={18}/></button>
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
        <button className="icon-button" onClick={() => setMusicMuted(muted => !muted)} aria-label={musicMuted ? 'Unmute music' : 'Mute music'} title={musicMuted ? 'Unmute' : 'Mute'}>{musicMuted || volume === 0 ? <VolumeX size={18}/> : <Volume2 size={18}/>}</button>
        <input aria-label="Music volume" type="range" min="0" max="100" value={volume} onChange={e => setVolume(Number(e.target.value))} style={{ flex: 1, accentColor: 'var(--accent, #6c63ff)', cursor: 'pointer' }} />
        <span style={{ minWidth: '38px', textAlign: 'right', fontSize: '12px', fontVariantNumeric: 'tabular-nums' }}>{musicMuted ? 'Muted' : `${volume}%`}</span>
      </div>
      <p style={{ fontSize: '11px', opacity: .65, margin: '14px 0 0', lineHeight: 1.5 }}>Tip: add your MP3 files to the <code>public/music</code> folder. Browsers may require a click before music can start.</p>
    </section>}

    <main>
      <section id="hero" className="hero section-wrap">
        <div className="hero-copy">
          <motion.div {...motionProps} className="availability"><span className="status-dot" /> Curious mind. Building what’s next.</motion.div>
          <motion.p {...motionProps} className="hello">Hello, I'm</motion.p>
          <motion.h1 {...motionProps}>Pasindu <span className="gradient-text">Piyumal</span><br/><span className="gradient-text">Amarasinghe</span></motion.h1>
          <motion.p {...motionProps} className="hero-role">Data Science Undergraduate <i /> AI/ML Enthusiast <i /> Full-Stack Developer</motion.p>
          <motion.p {...motionProps} className="hero-intro">{portfolio.intro}</motion.p>
          <motion.div {...motionProps} className="hero-buttons"><a className="button button-primary" href="#projects"><Sparkles size={17}/> Explore My Projects <ArrowRight size={17}/></a><a className="button button-secondary" href={portfolio.cvPath} download><Download size={17}/> Download CV</a></motion.div>
          <motion.div {...motionProps} className="social-row">{socialLinks.map(({ label, href, icon: Icon }) => <a key={label} href={href} aria-label={label} target={label === 'GitHub' || label === 'LinkedIn' ? '_blank' : undefined} rel="noreferrer"><Icon size={19}/></a>)}<span className="social-hint">{portfolio.linkedin ? 'Find me online' : 'GitHub profile · LinkedIn link can be added'}</span></motion.div>
          <div className="hero-scroll"><span className="scroll-line" /> Scroll to explore <ChevronDown size={14}/></div>
        </div>
        <motion.div className="hero-art" initial={reduceMotion ? false : { opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 1 }}>
          <div className="art-orbit orbit-one" /><div className="art-orbit orbit-two" /><div className="globe-wrap"><GlobeScene /></div>
          <div className="float-card card-analysis"><span className="mini-icon"><BarChart3 size={17}/></span><div><strong>Data Analysis</strong><small>Discover patterns</small></div><div className="mini-bars"><i/><i/><i/><i/><i/></div></div>
          <div className="float-card card-ml"><span className="mini-icon purple"><BrainCircuit size={17}/></span><div><strong>Machine Learning</strong><small>Learn from data</small></div><div className="node-network"><i/><i/><i/><i/><b/><b/></div></div>
          <div className="float-card card-code"><span className="mini-icon cyan"><Code2 size={17}/></span><div><strong>Build & Create</strong><small>Ideas into products</small></div></div>
          <div className="art-caption"><span className="caption-pulse"/> EXPLORING THE DATA UNIVERSE</div>
        </motion.div>
        <div className="hero-stats">
          <IconTile icon={GraduationCap} label="BSc (Hons)" detail="Data Science" />
          <IconTile icon={Network} label="Sri Lanka" detail="Based here" />
          <IconTile icon={Code2} label="Build & Learn" detail="Across the stack" />
          <IconTile icon={Database} label={`${projects.length} Projects`} detail="In the showcase" />
        </div>
      </section>

      <section id="about" data-nav="About" className="section-wrap content-section">
        <motion.div {...motionProps} className="section-heading"><span className="eyebrow"><span className="eyebrow-dot"/> THE PERSON BEHIND THE PIXELS</span><h2>Curiosity first.<br/><span className="gradient-text">Impact by design.</span></h2><p>I'm interested in the space where data, intelligent systems, and thoughtful software meet.</p></motion.div>
        <div className="about-grid">
          <motion.div {...motionProps} className="about-copy glass-panel"><span className="panel-index">01 / ABOUT ME</span><h3>Making complex things<br/>easier to understand.</h3><p>As a Data Science undergraduate at Sabaragamuwa University of Sri Lanka, I'm developing my skills in data analysis, machine learning, and software development.</p><p>I enjoy breaking down challenging problems, experimenting with ideas, and building practical projects that connect technical work with real-world questions.</p><p>My goal is to keep learning, contribute to meaningful projects, and grow into a data and AI professional.</p><a className="text-link" href="#projects">Explore the work <ArrowRight size={16}/></a></motion.div>
          <div className="about-cards">
            <motion.div {...motionProps}><IconTile icon={BarChart3} label="Data & Insights" detail="Explore data, find patterns" /></motion.div>
            <motion.div {...motionProps}><IconTile icon={BrainCircuit} label="AI & Machine Learning" detail="Build and evaluate models" /></motion.div>
            <motion.div {...motionProps}><IconTile icon={Code2} label="Software Development" detail="Turn concepts into apps" /></motion.div>
            <motion.div {...motionProps}><IconTile icon={Atom} label="Research Mindset" detail="Ask, test, iterate" /></motion.div>
          </div>
        </div>
      </section>

      <section id="skills" data-nav="Skills" className="section-wrap content-section">
        <motion.div {...motionProps} className="section-heading centered"><span className="eyebrow"><span className="eyebrow-dot"/> MY TOOLKIT</span><h2>Tools for <span className="gradient-text">turning ideas real.</span></h2><p>A growing toolkit across programming, data, machine learning, and development.</p></motion.div>
        <motion.div {...motionProps} className="skills-panel glass-panel">
          <div className="skill-tabs" role="tablist" aria-label="Skill categories">{Object.keys(skillGroups).map(group => <button role="tab" aria-selected={skillGroup === group} className={skillGroup === group ? 'skill-tab selected' : 'skill-tab'} onClick={() => setSkillGroup(group)} key={group}>{group}</button>)}</div>
          <AnimatePresence mode="wait"><motion.div key={skillGroup} className="skill-chips" initial={reduceMotion ? false : { opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} transition={{ duration: 0.2 }}>{skillGroups[skillGroup].map((skill, i) => <div className="skill-chip" key={skill}><span className="skill-number">0{i + 1}</span><span>{skill}</span><ArrowUpRight size={15}/></div>)}</motion.div></AnimatePresence>
          <p className="skills-note"><Sparkles size={15}/> Skills are presented as areas of study and practice—not proficiency scores.</p>
        </motion.div>
      </section>

      <section id="projects" data-nav="Projects" className="section-wrap content-section">
        <motion.div {...motionProps} className="projects-heading"><div className="section-heading"><span className="eyebrow"><span className="eyebrow-dot"/> SELECTED EXPLORATIONS</span><h2>Projects with a <span className="gradient-text">purpose.</span></h2><p>A selection of academic and learning projects across data science, AI, and analytics.</p></div><span className="project-count"><strong>0{projects.length}</strong><small>PROJECTS</small></span></motion.div>
        <div className="project-controls"><div className="filter-list" aria-label="Filter projects">{categories.map(c => <button key={c} onClick={() => setFilter(c)} className={filter === c ? 'filter-pill selected' : 'filter-pill'}>{c}</button>)}</div><label className="search-box"><span className="sr-only">Search projects</span><input value={search} onChange={e => setSearch(e.target.value)} placeholder="Search projects..." /></label></div>
        <div className="projects-grid">{visibleProjects.map((project, i) => <motion.article layout key={project.id} className="project-card" initial={reduceMotion ? false : { opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}><button className="project-open" onClick={() => setSelectedProject(project)} aria-label={`View details for ${project.title}`}><ProjectVisual type={project.visual}/><div className="project-body"><div className="project-meta"><span>{project.category}</span><span className="project-status">{project.status}</span></div><h3>{project.title}<ArrowUpRight size={18}/></h3><p className="project-subtitle">{project.subtitle}</p><p className="project-description">{project.description}</p><div className="tag-list">{project.stack.slice(0, 3).map(tag => <span className="tag" key={tag}>{tag}</span>)}</div><div className="project-footer"><span>View project details</span><span className="round-arrow"><ArrowRight size={16}/></span></div></div></button></motion.article>)}</div>
        {visibleProjects.length === 0 && <div className="empty-state">No projects match that search. Try another keyword or category.</div>}
        <p className="project-disclaimer">Project summaries describe the intended scope. Add verified repository links, results, and demos as they become available.</p>
      </section>

      <section id="journey" data-nav="Journey" className="section-wrap content-section">
        <motion.div {...motionProps} className="section-heading centered"><span className="eyebrow"><span className="eyebrow-dot"/> THE ROAD SO FAR</span><h2>Learning by <span className="gradient-text">building.</span></h2><p>My current journey is focused on learning foundations and applying them through projects.</p></motion.div>
        <div className="journey-grid">
          <motion.div {...motionProps} className="journey-card glass-panel"><span className="journey-icon"><GraduationCap size={22}/></span><span className="eyebrow">EDUCATION</span><h3>BSc (Hons) in Data Science</h3><p className="journey-place">Sabaragamuwa University of Sri Lanka</p><p>Developing a foundation in data science, programming, statistics, databases, and machine-learning concepts.</p><div className="journey-tags"><span>Data Science</span><span>Statistics</span><span>Computing</span></div></motion.div>
          <motion.div {...motionProps} className="journey-card glass-panel"><span className="journey-icon purple"><Layers3 size={22}/></span><span className="eyebrow">PROJECT-BASED LEARNING</span><h3>Build. Test. Improve.</h3><p className="journey-place">Academic and independent explorations</p><p>Exploring practical problems through predictive modelling, data visualization, web applications, and graph-based route comparisons.</p><div className="journey-tags"><span>Experimentation</span><span>Iteration</span><span>Research</span></div></motion.div>
        </div>
        <div className="journey-footnote"><span className="status-dot"/> Professional experience and certifications can be added here when verified details are available.</div>
      </section>

      
      
      <section
        id="contact"
        data-nav="Contact"
        className="section-wrap content-section contact-section"
      >
        <motion.div {...motionProps} className="contact-banner">
          <div className="contact-glow" />

          {/* Left side */}
          <div className="contact-copy">
            <span className="eyebrow">
              <span className="eyebrow-dot" />
              LET'S MAKE SOMETHING MEANINGFUL
            </span>

            <h2>
              Have a good problem?
              <br />
              <span className="gradient-text">Let's explore it.</span>
            </h2>

            <p>
              I'm open to connecting with people who care about data, AI,
              and building useful things.
            </p>

            <div className="contact-links">
              <a
                href={portfolio.github}
                target="_blank"
                rel="noreferrer"
              >
                <Github size={17} />
                GitHub
                <ArrowUpRight size={14} />
              </a>

              {portfolio.linkedin && (
                <a
                  href={portfolio.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={17} />
                  LinkedIn
                  <ArrowUpRight size={14} />
                </a>
              )}
            </div>

            {/* Profile portrait below social buttons */}
            <div className="contact-portrait">
              <div className="portrait-orb" />
              <div className="portrait-ring" />

              <img
                src={`${import.meta.env.BASE_URL}brand-photo/profile2.png`}
                alt="Pasindu Piyumal"
                className="contact-portrait-img"
                loading="lazy"
              />

              <span className="portrait-dot portrait-dot-one" />
              <span className="portrait-dot portrait-dot-two" />
              <span className="portrait-dot portrait-dot-three" />
              <span className="portrait-dot portrait-dot-four" />
              <span className="portrait-dot portrait-dot-five" />
              <span className="portrait-dot portrait-dot-six" />
            </div>
          </div>

          {/* Right side: keep the contact form functional */}
          <form className="contact-form" onSubmit={submitContact}>
            <div className="form-heading">
              <Send size={18} />
              <strong>Send a message</strong>
            </div>

            <label>
              Your name
              <input
                required
                value={form.name}
                onChange={e =>
                  setForm({ ...form, name: e.target.value })
                }
                placeholder="Name"
              />
            </label>

            <label>
              Email address
              <input
                required
                type="email"
                value={form.email}
                onChange={e =>
                  setForm({ ...form, email: e.target.value })
                }
                placeholder="you@example.com"
              />
            </label>

            <label>
              Subject
              <input
                required
                value={form.subject}
                onChange={e =>
                  setForm({ ...form, subject: e.target.value })
                }
                placeholder="What would you like to discuss?"
              />
            </label>

            <label>
              Message
              <textarea
                required
                minLength={10}
                rows="3"
                value={form.message}
                onChange={e =>
                  setForm({ ...form, message: e.target.value })
                }
                placeholder="Tell me a little about it..."
              />
            </label>

            <button
              className="button button-primary form-submit"
              type="submit"
              disabled={isSending}
            >
              {isSending ? 'Sending...' : 'Send message'}
              <ArrowRight size={16} />
            </button>

            {formNotice && (
              <p className="form-notice" role="status">
                <Check size={15} />
                {formNotice}
              </p>
            )}

            <p className="form-footnote">
              Your message will be sent directly to my inbox.
            </p>
          </form>
        </motion.div>
      </section>

    </main>
    <footer className="site-footer section-wrap"><a className="brand footer-brand" href="#hero"><span className="brand-mark">PAP</span><span className="brand-copy"><strong>PASINDU PIYUMAL</strong><small>CURIOUS BY NATURE</small></span></a><p>Designed with curiosity. Built to keep learning.</p><a className="back-top" href="#hero">Back to top <ArrowDown size={14}/></a><span className="copyright">© {new Date().getFullYear()} Pasindu Piyumal</span></footer>
    <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
  </div>
}

export default App
