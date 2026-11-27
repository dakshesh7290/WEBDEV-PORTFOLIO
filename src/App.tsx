import {useCallback,useEffect,useRef,useState,type PointerEvent as RPE,type CSSProperties} from 'react';
import {m,LazyMotion,domAnimation,useScroll,useTransform,useReducedMotion,MotionValue} from 'framer-motion';
import {ArrowUpRight,ArrowDown,Menu,X,Plus,Minus,Instagram,Mail,ArrowUp,MessageCircle} from 'lucide-react';
import {FadeIn,AnimatedText,Btn,HeroVideo,Panel,useClock,style} from './components';
import {ChatDemo,FlowDemo} from './demos';
import {NAV,TILES1,TILES2,ABOUT,SERVICES,PROJECTS,STEPS,FAQ,EMAIL,IG,OBSORA,OBSORA_IG,OBSORA_URL,waLink,type Project} from './data';
const Logo=({h=22}:{h?:number})=><img src="/brand/dakshesh-metallic-320.webp" alt="DAKSHESH." width={Math.round(h*817/121)} height={h} decoding="async" style={{height:h,width:'auto'}}/>;

const ROT=['Web development','SEO & growth','AI chatbots','Automation'];
function Rot(){const[i,setI]=useState(0);const r=useReducedMotion();useEffect(()=>{if(r)return;const t=setInterval(()=>setI(x=>(x+1)%ROT.length),2400);return()=>clearInterval(t)},[r]);return <span key={i} className="rot text-silver">{r?ROT.join(' · '):ROT[i]}</span>}
function Dots({active}:{active:string}){return <nav aria-label="Section progress" className="dots">{NAV.map(([id,l])=><a key={id} href={'#'+id} aria-label={l} aria-current={active===id?'true':undefined}><span>{l}</span></a>)}</nav>}
function BackTop(){const[v,setV]=useState(false);useEffect(()=>{const f=()=>setV(scrollY>700);f();addEventListener('scroll',f,{passive:true});return()=>removeEventListener('scroll',f)},[]);
return <button aria-label="Back to top" onClick={()=>scrollTo({top:0,behavior:'smooth'})} className={'glass fixed bottom-5 right-5 z-50 grid h-12 w-12 place-items-center rounded-full transition-opacity duration-300 '+(v?'opacity-100':'pointer-events-none opacity-0')} tabIndex={v?0:-1}><ArrowUp size={18}/></button>}
function Band({items,tone}:{items:readonly string[];tone:'violet'|'blue'}){const row=[...items,...items,...items,...items];
return <div className={'band fullbleed '+tone} aria-hidden="true"><div className="band-track">{row.map((w,i)=><span key={i}>{w}<i>✦</i></span>)}</div></div>}
function Header({active}:{active:string}){
const[open,setO]=useState(false);const[sc,setSc]=useState(false);
useEffect(()=>{const f=()=>setSc(scrollY>40);const k=(e:KeyboardEvent)=>e.key==='Escape'&&setO(false);f();addEventListener('scroll',f,{passive:true});addEventListener('keydown',k);return()=>{removeEventListener('scroll',f);removeEventListener('keydown',k)}},[]);
return <header className={'glass-nav '+(sc||open?'glass':'')}><a href="#top" aria-label="DAKSHESH. home"><Logo/></a>
<nav id="menu" aria-label="Primary" className={open?'open':''}><ul>{NAV.map(([id,l])=><li key={id}><a href={'#'+id} onClick={()=>setO(false)} aria-current={active===id?'true':undefined}>{l}</a></li>)}<li className="lg:hidden"><a className="btn btn-chrome" href="#contact" onClick={()=>setO(false)}>Start a project</a></li></ul></nav><a className="btn btn-chrome nav-cta" href="#contact">Start a project</a>
<button className="lg:hidden grid h-11 w-11 place-items-center" aria-expanded={open} aria-controls="menu" aria-label="Menu" onClick={()=>setO(!open)}>{open?<X size={20}/>:<Menu size={20}/>}</button></header>}

function Hero(){const t=useClock();
return <section id="top" className="relative flex min-h-[100svh] flex-col justify-end overflow-hidden px-5 pb-10 pt-32 md:px-10 md:pb-14 isolate">
<HeroVideo/><div className="sweep" aria-hidden/><div className="absolute inset-x-0 bottom-0 -z-10 h-1/3 bg-gradient-to-t from-ink to-transparent" aria-hidden/><div className="absolute inset-0 -z-10 bg-gradient-to-r from-ink/80 via-ink/30 to-transparent" aria-hidden/>

<div className="max-w-5xl"><FadeIn delay={.1}><p className="mb-5 flex items-center gap-3 text-sm text-chrome"><span className="pulse"/>Web, SEO & AI solutions · India · {t} IST</p></FadeIn>
<FadeIn delay={.2} y={40}><h1 className="hero-heading font-display text-[clamp(2.1rem,6vw,5.2rem)] font-black leading-[1] tracking-tight">Websites that turn visitors into enquiries.</h1></FadeIn>
<div className="mt-8 flex flex-col gap-8 md:flex-row md:items-end md:justify-between"><FadeIn delay={.4} y={20}><p className="max-w-md text-base text-silver/80 md:text-lg">Web development, SEO, AI chat assistants and automation — built around one goal: more of the right people finding you, trusting you and getting in touch.</p><p className="mt-4 text-sm text-chrome">Right now focused on: <Rot/></p></FadeIn>
<FadeIn delay={.5} y={20} className="flex flex-wrap gap-3"><Btn href="#contact">Start your project</Btn><Btn ghost href="#projects">See projects</Btn></FadeIn></div></div>
<a href="#about" aria-label="Scroll to About" className="absolute bottom-10 right-10 hidden items-center gap-2 text-xs tracking-widest text-chrome md:flex lg:right-14"><ArrowDown size={14} className="bob"/></a></section>}

function Marquee(){
const ref=useRef<HTMLElement>(null);const r=useReducedMotion();const{scrollYProgress:p}=useScroll({target:ref,offset:['start end','end start']});
const a=useTransform(p,[0,1],[0,-420]),b=useTransform(p,[0,1],[-420,0]);
const R=({x,tiles,pal}:{x:MotionValue<number>;tiles:readonly(readonly[string,string])[];pal:string})=><m.div style={r?undefined:{x}} className="flex w-max gap-2 will-change-transform sm:gap-3">{[...tiles,...tiles].map(([l,t],i)=><article key={i} className={'tile '+pal+(i%6)}><span>{l}</span><strong>{t.split('\n').map((ln,k)=><span key={k}>{ln}</span>)}</strong></article>)}</m.div>;
return <section ref={ref} aria-label="Capabilities" className="grid gap-2 overflow-hidden bg-ink pb-8 pt-14 sm:gap-3 sm:pb-10 sm:pt-24 md:pt-36"><R x={a} tiles={TILES1} pal="t"/><R x={b} tiles={TILES2} pal="u"/></section>}

function About(){
const top=useRef(0);const raf=useRef(0);
const enter=(e:RPE<HTMLElement>)=>{top.current=e.currentTarget.offsetTop};
const mv=(e:RPE<HTMLElement>)=>{const el=e.currentTarget,x=e.clientX,y=e.pageY-top.current;cancelAnimationFrame(raf.current);raf.current=requestAnimationFrame(()=>{el.style.setProperty('--mx',x+'px');el.style.setProperty('--my',y+'px')})};
return <section id="about" onPointerEnter={enter} onPointerMove={mv} className="spotwrap relative flex min-h-screen flex-col items-center justify-center overflow-hidden bg-ink px-5 py-24 md:px-10"><div className="spot" aria-hidden="true"/>
<div className="relative z-10 flex w-full flex-col items-center gap-14 sm:gap-16">
<FadeIn><h2 className="hero-heading text-center font-display text-[clamp(2.6rem,11vw,9rem)] font-black leading-none tracking-tight">About me</h2></FadeIn>
<AnimatedText className="max-w-[600px] text-center text-[clamp(1.05rem,2vw,1.4rem)] font-medium leading-relaxed text-silver" text="I’m Dakshesh. I help businesses get found, look credible and win more enquiries — with websites, search, AI assistants and automation that work together. I start with your goal, then build only what moves you toward it."/>
<div className="grid w-full max-w-5xl gap-4 md:grid-cols-2">{ABOUT.map(([name,head,text,tags],i)=><FadeIn key={name} delay={i*.08} className="h-full"><article className="ab h-full"><p className="ab-k">{name}</p><h3 className="font-display text-xl">{head}</h3><p className="mt-3 text-silver/80">{text}</p><div className="mt-5 flex flex-wrap gap-2">{tags.map(x=><span key={x} className="achip">{x}</span>)}</div></article></FadeIn>)}</div>
<Btn href="#contact">Let’s talk about your project</Btn></div></section>}

function Services(){const[o,setO]=useState(-1);
return <section id="services" className="relative z-[2] -mt-10 rounded-t-[40px] bg-white px-5 pb-24 pt-24 text-ink md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32">
<FadeIn><h2 className="text-center font-display text-[clamp(2.6rem,11vw,9rem)] font-black uppercase leading-none tracking-tight">Services</h2><p className="mx-auto mb-16 mt-6 max-w-xl text-center text-lg opacity-70 md:mb-24">Choose what you need and let’s talk through the scope — no guesswork.</p></FadeIn>
<ul className="mx-auto max-w-5xl">{SERVICES.map(([n,d,tags,more],i)=><FadeIn as="li" key={n} delay={i*.1}><div className="border-t border-ink/15 py-8 md:py-12" style={style({'--n':'clamp(2.6rem,9vw,7rem)'})}><button className="flex w-full items-start gap-5 text-left md:gap-10" aria-expanded={o===i} onClick={()=>setO(o===i?-1:i)}>
<span style={{fontSize:'var(--n)',width:'calc(var(--n)*1.95)'}} className="shrink-0 font-display font-black leading-none">{String(i+1).padStart(2,'0')}</span>
<span className="flex-1"><span className="block font-display text-[clamp(1rem,2.2vw,1.9rem)] font-medium uppercase">{n}</span><span className="mt-3 block max-w-2xl text-[clamp(.9rem,1.6vw,1.2rem)] leading-relaxed opacity-60">{d}</span></span>
<span className="mt-2 grid h-10 w-10 shrink-0 place-items-center rounded-full border border-ink/30">{o===i?<Minus size={16}/>:<Plus size={16}/>}</span></button>
<div className={'grid transition-[grid-template-rows] duration-500 '+(o===i?'grid-rows-[1fr]':'grid-rows-[0fr]')}><div className="overflow-hidden"><div className="ml-[calc(var(--n)*1.95_+_1.25rem)] mt-6 grid items-start gap-5 md:ml-[calc(var(--n)*1.95_+_2.5rem)] md:grid-cols-[1fr_auto]"><div><p className="max-w-xl">{more}</p><a href={waLink(`Hi Dakshesh, I’d like to start a conversation about ${n}.`)} target="_blank" rel="noopener noreferrer" className="btn btn-dark mt-5">Let’s start a conversation for {n}<ArrowUpRight size={16}/></a></div><div className="flex flex-wrap content-start items-start gap-2 md:max-w-xs md:justify-end">{tags.map(t=><span key={t} className="inline-flex items-center rounded-full border border-ink/25 px-4 py-1.5 text-sm leading-tight">{t}</span>)}</div></div></div></div></div></FadeIn>)}</ul><div className="mt-20"><Band items={['Web development','SEO & growth','AI chatbots','Automation']} tone="violet"/></div></section>}

function Frame({p}:{p:Project}){const[ok,setOk]=useState(true);
const body=<div className="fbody" style={{aspectRatio:'2880 / 1560',flex:'none'}}>{ok&&p.img&&<img src={p.img} srcSet={p.img.replace('.webp','-800.webp')+' 800w, '+p.img+' 1600w'} sizes="(min-width:1024px) 900px, 100vw" alt={p.name+' website screenshot'} width={1600} height={867} decoding="async" loading="lazy" onError={()=>setOk(false)} className="h-full w-full object-cover object-top"/>}{(!ok||!p.img)&&<div className="fph"><strong>{p.name}</strong><span>{p.cat}</span></div>}</div>;
return <div className="frame mx-auto" style={{width:'min(100%, max(280px, calc((85vh - 20rem) * 1.85)))'}}><div className="fbar"><i/><i/><i/>{p.url?<a href={p.url} target="_blank" rel="noopener noreferrer" className="fdom">{p.domain}</a>:<b>{p.domain??''}</b>}</div>
{p.url?<a href={p.url} target="_blank" rel="noopener noreferrer" aria-label={'Open '+p.name+' in a new tab'} className="block">{body}</a>:body}</div>}

function Card({i,n,pin,h,onH,p,range,s,d}:{i:number;n:number;pin?:number;h?:number;onH:(i:number,h:number)=>void;p:MotionValue<number>;range:[number,number];s:number;d:Project}){
const r=useReducedMotion();const sc=useTransform(p,range,[1,s]);const cls=d.status==='Live'?'live':d.status==='In progress'?'prog':'';
const art=useRef<HTMLElement>(null);const inner=useRef<HTMLDivElement>(null);
useEffect(()=>{const a=art.current,el=inner.current;if(!a||!el)return;const f=()=>{const cs=getComputedStyle(a);onH(i,Math.ceil(el.offsetHeight+parseFloat(cs.paddingTop)+parseFloat(cs.paddingBottom)+parseFloat(cs.borderTopWidth)+parseFloat(cs.borderBottomWidth)))};f();const ro=new ResizeObserver(f);ro.observe(el);addEventListener('resize',f);return()=>{ro.disconnect();removeEventListener('resize',f)}},[i,onH]);
return <div className="mb-[14vh]" style={{position:'sticky',top:pin,zIndex:i}}><m.article ref={art} style={{scale:r?1:sc,top:i*24,transformOrigin:'top center',minHeight:h}} className="relative rounded-[36px] border-2 border-silver bg-ink p-4 sm:p-6 md:rounded-[56px] md:p-8"><div ref={inner} className="flex flex-col">
<div className="flex flex-wrap items-start justify-between gap-3"><div className="flex items-start gap-4 md:gap-8"><span className="hero-heading font-display text-[clamp(2.4rem,8vw,6rem)] font-black leading-none">{String(n).padStart(2,'0')}</span>
<div><p className="text-sm text-chrome">{d.cat}</p><h3 className="font-display text-[clamp(1.1rem,2.6vw,2.2rem)] font-medium">{d.name}</h3>{d.status!=='In progress'&&<span className={'tag mt-2 '+cls}>{d.status}</span>}</div></div>
{d.url&&<a className="btn btn-chrome" href={d.url} target="_blank" rel="noopener noreferrer">Visit live site<ArrowUpRight size={16}/></a>}</div>
<div className="mt-4">{d.kind==='chat'?<ChatDemo/>:d.kind==='auto'?<FlowDemo/>:<Frame p={d}/>}</div></div></m.article></div>}

function Projects(){const ref=useRef<HTMLDivElement>(null);const[hs,setHs]=useState<number[]>([]);const[vh,setVh]=useState(()=>innerHeight);const[vw,setVw]=useState(()=>innerWidth);
useEffect(()=>{const f=()=>{setVh(innerHeight);setVw(innerWidth)};addEventListener('resize',f);return()=>removeEventListener('resize',f)},[]);
const report=useCallback((i:number,h:number)=>setHs(a=>a[i]===h?a:Object.assign([...a],{[i]:h})),[]);
const mobile=vw<768;const H=hs.filter(Boolean).length?Math.max(...hs.filter(Boolean)):undefined;
const pinFor=(i:number)=>{if(mobile){const h=hs[i];return h?Math.min(88,vh-h-20-i*24):undefined}const base=104;return H?Math.max(76,Math.min(base,vh-H-20-(PROJECTS.length-1)*24)):undefined};
const{scrollYProgress:p}=useScroll({target:ref,offset:['start start','end end']});
return <section id="projects" className="relative z-[3] -mt-10 rounded-t-[40px] bg-ink px-5 pb-24 pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pt-32">
<FadeIn><h2 className="hero-heading text-center font-display text-[clamp(2.6rem,11vw,9rem)] font-black uppercase leading-none tracking-tight">Project</h2><p className="mx-auto mt-5 max-w-xl text-center text-chrome">Real work where it exists, and clearly labelled proofs and demonstrations where it doesn’t.</p></FadeIn>
<div ref={ref} className="mx-auto mt-14 flow-root max-w-6xl">{PROJECTS.map((d,i)=><Card key={d.key} i={i} n={i+1} pin={pinFor(i)} h={mobile?undefined:H} onH={report} d={d} p={p} s={1-(PROJECTS.length-1-i)*.03} range={[(i/PROJECTS.length)*0.8,0.85]}/>)}</div></section>}

function Obsora(){
return <section id="obsora" className="relative z-[4] -mt-10 rounded-t-[40px] bg-white px-5 pb-28 pt-24 text-ink md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-36 md:pt-32"><div className="mx-auto max-w-6xl">
<FadeIn><p className="mb-4 text-sm text-ink/60">In collaboration with OBSORA Digital</p><h2 className="dark-heading font-display text-[clamp(2.2rem,6vw,5rem)] font-black leading-none tracking-tight">Need more than I offer alone?</h2>
<p className="mt-6 max-w-2xl text-lg text-ink/70">For work beyond my own services, I collaborate with OBSORA Digital, a digital studio. Tell me what you need and I’ll point you to the right support.</p></FadeIn>
<div className="mt-12 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">{OBSORA.map(([t,d],i)=><FadeIn key={t} delay={i*.08}><div className="pr pr-l h-full"><h3 className="font-display text-lg">{t}</h3><p className="mt-2 text-ink/60">{d}</p></div></FadeIn>)}</div>
<FadeIn delay={.1}><div className="mt-10 flex flex-wrap items-center gap-3"><a className="btn btn-dark" href={OBSORA_URL} target="_blank" rel="noopener noreferrer">Visit OBSORA Digital<ArrowUpRight size={16}/></a><a className="btn btn-ghost btn-ghost-l" href={OBSORA_IG} target="_blank" rel="noopener noreferrer"><Instagram size={16}/>Follow OBSORA Digital on Instagram</a></div>
</FadeIn><div className="mt-14"><Band items={OBSORA.map(o=>o[0])} tone="blue"/></div></div></section>}

function Process(){const ref=useRef<HTMLOListElement>(null);const{scrollYProgress:p}=useScroll({target:ref,offset:['start 0.7','end 0.6']});const w=useTransform(p,[0,1],['0%','100%']);
return <section id="process" className="relative z-[5] -mt-10 rounded-t-[40px] bg-ink px-5 pb-24 pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"><FadeIn><h2 className="hero-heading text-center font-display text-[clamp(2.6rem,11vw,9rem)] font-black uppercase leading-none tracking-tight">Process</h2><p className="mx-auto mt-5 max-w-xl text-center text-chrome">Six clear steps, so you always know what happens next.</p></FadeIn>
<ol ref={ref} className="relative mx-auto mt-20 grid max-w-6xl gap-10 md:grid-cols-6 md:gap-5"><div className="absolute left-5 top-0 hidden h-px w-full bg-white/10 md:block md:left-0 md:top-5"/><m.div style={{width:w}} className="absolute left-0 top-5 hidden h-px bg-silver md:block"/>
{STEPS.map(([t,d],i)=><FadeIn as="li" key={t} delay={i*.08}><div className="step group text-left"><span className="stepn">{i+1}</span><h3 className="mt-6 font-display text-lg">{t}</h3><p className="mt-2 text-sm text-chrome">{d}</p></div></FadeIn>)}</ol><FadeIn><div className="mt-12 text-center"><a className="btn btn-chrome" href={waLink('Hi Dakshesh, I’d like to start a conversation about a project.')} target="_blank" rel="noopener noreferrer">Let’s start the conversation<ArrowUpRight size={16}/></a></div></FadeIn></section>}

function Faq(){const[o,setO]=useState(-1);
return <section className="relative z-[6] -mt-10 rounded-t-[40px] bg-white px-5 pb-24 pt-24 text-ink md:-mt-14 md:rounded-t-[60px] md:px-10"><div className="mx-auto max-w-4xl"><FadeIn><h2 className="mb-10 font-display text-3xl font-black md:text-5xl">Quick answers</h2></FadeIn>{FAQ.map(([q,a],i)=><div key={q} className="border-t border-ink/15"><h3><button className="flex w-full items-center justify-between gap-4 py-5 text-left text-lg" aria-expanded={o===i} onClick={()=>setO(o===i?-1:i)}>{q}{o===i?<Minus size={18}/>:<Plus size={18}/>}</button></h3>
<div className={'grid transition-[grid-template-rows] duration-500 '+(o===i?'grid-rows-[1fr]':'grid-rows-[0fr]')}><p className="overflow-hidden text-ink/70"><span className="block pb-5">{a}</span></p></div></div>)}
<div className="mt-10 border-t border-ink/15 pt-8"><p className="mb-4 text-lg">Still have a question? Ask it directly.</p><a className="btn btn-dark" href="#contact">Ask a question<ArrowUpRight size={16}/></a></div></div></section>}

function Contact(){
const mail=`mailto:${EMAIL}?subject=${encodeURIComponent('Project enquiry')}&body=${encodeURIComponent('Hi Dakshesh,\n\nI’d like to talk about a project.\n\n')}`;
const items=[
{k:'wa',icon:<MessageCircle size={22}/>,title:'WhatsApp',text:'Message me directly with a few lines about what you need.',cta:'Message on WhatsApp',href:waLink('Hi Dakshesh, I’d like to talk about a project.'),primary:true},
{k:'mail',icon:<Mail size={22}/>,title:'Mail',text:'Prefer email? Send the details and any examples you like.',cta:'Mail me',href:mail,primary:true},
{k:'ig',icon:<Instagram size={22}/>,title:'Instagram',text:'Follow the work and say hello on Instagram.',cta:'Follow on Instagram',href:IG,primary:true}];
return <section id="contact" className="relative z-[7] -mt-10 overflow-hidden rounded-t-[40px] bg-ink px-5 pb-24 pt-24 md:-mt-14 md:rounded-t-[60px] md:px-10 md:pb-32 md:pt-32"><div className="mx-auto max-w-6xl">
<FadeIn><h2 className="hero-heading max-w-3xl font-display text-[clamp(2.2rem,6vw,5rem)] font-black leading-none tracking-tight">Ready to start your project?</h2><p className="mt-6 max-w-xl text-chrome">Message me on WhatsApp or send a mail, whichever is easier. I’ll reply with clear next steps.</p></FadeIn>
<div className="mt-12 grid gap-4 md:grid-cols-3">{items.map((c,i)=><FadeIn key={c.k} delay={i*.08} className="h-full"><div className={'ctile'+(c.primary?' ctile-p':'')}><span className="cico">{c.icon}</span><h3 className="font-display text-xl">{c.title}</h3><p className="text-chrome">{c.text}</p>
<a className={'btn mt-auto w-fit '+(c.primary?'btn-chrome':'btn-ghost')} href={c.href} {...(c.k==='mail'?{}:{target:'_blank',rel:'noopener noreferrer'})}>{c.cta}<ArrowUpRight size={16}/></a></div></FadeIn>)}</div></div></section>}

export default function App(){
const ids=NAV.map(n=>n[0]);const[active,setA]=useState('');const{scrollYProgress}=useScroll();
useEffect(()=>{const on=new Set<string>();const o=new IntersectionObserver(es=>{es.forEach(e=>{if(e.isIntersecting)on.add(e.target.id);else on.delete(e.target.id)});setA(ids.filter(i=>on.has(i)).pop()??'')},{rootMargin:'-45% 0px -50% 0px'});ids.forEach(i=>{const n=document.getElementById(i);n&&o.observe(n)});return()=>o.disconnect()},[]);
return <LazyMotion features={domAnimation} strict><div style={{overflowX:'clip'}}><a href="#main" className="skip">Skip to content</a><m.div className="prog" style={{scaleX:scrollYProgress}} aria-hidden/><Header active={active}/><Dots active={active}/><BackTop/>
<main id="main"><Hero/><Marquee/><About/><Services/><Projects/><Obsora/><Process/><Faq/><Contact/></main>
<footer className="grid items-center gap-4 border-t border-white/10 bg-char px-5 py-8 text-center text-sm text-chrome md:grid-cols-3 md:px-10"><div className="flex justify-center md:justify-start"><Logo h={18}/></div><span>© {new Date().getFullYear()} DAKSHESH. All rights reserved.</span><span aria-hidden/></footer></div></LazyMotion>}
