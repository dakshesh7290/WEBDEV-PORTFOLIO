import {useEffect,useRef,useState,ReactNode,CSSProperties} from 'react';
import {m,useScroll,useReducedMotion,useMotionValueEvent,MotionValue} from 'framer-motion';
export const fine=()=>typeof matchMedia!=='undefined'&&matchMedia('(hover:hover) and (pointer:fine)').matches;

export function FadeIn({children,delay=0,x=0,y=30,className='',as='div'}:{children:ReactNode;delay?:number;x?:number;y?:number;className?:string;as?:'div'|'li'|'p'}){
const r=useReducedMotion();const M=m[as] as typeof m.div;
return <M className={className} initial={r?false:{opacity:0,x,y}} whileInView={{opacity:1,x:0,y:0}} viewport={{once:true,margin:'50px'}} transition={{duration:.8,delay,ease:[.25,.1,.25,1]}}>{children}</M>}

export function Magnet({children,pad=120,strength=3,className=''}:{children:ReactNode;pad?:number;strength?:number;className?:string}){
const el=useRef<HTMLDivElement>(null);const[on,setOn]=useState(false);const[p,setP]=useState({x:0,y:0});const r=useReducedMotion();
useEffect(()=>{if(r||!fine())return;const mv=(e:PointerEvent)=>{const b=el.current!.getBoundingClientRect();const dx=Math.abs(b.left+b.width/2-e.clientX),dy=Math.abs(b.top+b.height/2-e.clientY);
if(dx<b.width/2+pad&&dy<b.height/2+pad){setOn(true);setP({x:(e.clientX-b.left-b.width/2)/strength,y:(e.clientY-b.top-b.height/2)/strength})}else{setOn(false);setP({x:0,y:0})}};
addEventListener('pointermove',mv);return()=>removeEventListener('pointermove',mv)},[pad,strength,r]);
return <div ref={el} className={'inline-block '+className}><div style={{transform:`translate3d(${p.x}px,${p.y}px,0)`,transition:on?'transform .3s ease-out':'transform .6s ease-in-out',willChange:'transform'}}>{children}</div></div>}

export function AnimatedText({text,className=''}:{text:string;className?:string}){
const ref=useRef<HTMLParagraphElement>(null);const r=useReducedMotion();const{scrollYProgress:p}=useScroll({target:ref,offset:['start 0.8','end 0.2']});
useMotionValueEvent(p,'change',v=>ref.current?.style.setProperty('--p',String(v)));
if(r)return <p ref={ref} className={className}>{text}</p>;
let i=0;const n=text.length;
return <p ref={ref} className={className} style={{'--p':0} as CSSProperties}><span className="sr-only">{text}</span><span aria-hidden="true">{text.split(' ').map((w,wi)=><span key={wi} className="inline-block whitespace-nowrap">{[...w,' '].map(ch=>{const k=i++;return <span key={k} className="ch" style={{'--k':k/n} as CSSProperties}>{ch===' '?'\u00a0':ch}</span>})}</span>)}</span></p>}

export function Btn({children,href,onClick,type,ghost,dark,disabled}:{children:ReactNode;href?:string;onClick?:()=>void;type?:'submit';ghost?:boolean;dark?:boolean;disabled?:boolean}){
const c='btn '+(ghost?'btn-ghost':dark?'btn-dark':'btn-chrome');return href?<a className={c} href={href}>{children}</a>:<button type={type??'button'} onClick={onClick} disabled={disabled} className={c}>{children}</button>}

export function HeroVideo(){
const v=useRef<HTMLVideoElement>(null);const[ok,setOk]=useState(false);const[info,setInfo]=useState('starting');const[ready,setReady]=useState(false);const[bad,setBad]=useState(false);
useEffect(()=>{const f=()=>setTimeout(()=>setReady(true),200);if(document.readyState==='complete'){f();return}addEventListener('load',f,{once:true});return()=>removeEventListener('load',f)},[]);
const src=(import.meta.env.VITE_HERO_VIDEO||import.meta.env.VITE_HERO_HLS_SRC) as string|undefined;const r=useReducedMotion();
const saver=!!(navigator as Navigator&{connection?:{saveData?:boolean}}).connection?.saveData;const start=!r&&!saver;const dbg=location.search.includes('debug');
useEffect(()=>{if(!src){setInfo('no video source set (VITE_HERO_VIDEO is empty: add it to .env and restart npm run dev)');return}
if(!start){setInfo(r?'reduced motion is on, so the video is skipped':'data saver is on, so the video is skipped');return}
if(!ready)return;const el=v.current!;el.muted=true;
const onPlaying=()=>{setOk(true);setBad(false);setInfo('playing')};const onErr=()=>{setBad(true);setInfo('video error code '+(el.error?.code??'?'))};
el.addEventListener('playing',onPlaying);el.addEventListener('error',onErr);
const tryPlay=()=>el.play().catch(e=>{if(e?.name!=='AbortError')setInfo('autoplay blocked: '+(e?.name||e))});
if(!/\.m3u8(\?|$)/i.test(src)||el.canPlayType('application/vnd.apple.mpegurl')){el.src=src;tryPlay()}else setInfo('HLS needs a native player here; use an .mp4 file instead');
return()=>{el.removeEventListener('playing',onPlaying);el.removeEventListener('error',onErr)}},[src,start,ready]);
return <><div className="absolute inset-0 -z-20" aria-hidden><div className="hero-fb"><i/><i/></div><video ref={v} autoPlay muted loop playsInline preload="none" poster="/hero/poster.webp" className={'absolute inset-0 h-full w-full object-cover transition-opacity duration-700 '+(bad?'opacity-0':'opacity-90')}/></div>

{dbg&&<div className="glass absolute left-5 top-28 z-30 max-w-sm rounded-2xl px-4 py-2 text-xs">Hero video: {info}</div>}</>}

export function Panel({kind,slot}:{kind:string;slot:'a'|'b'|'c'}){
const bars=[40,70,52,88,60,78,46];
return <div className={`pn pn-${kind}-${slot}`} aria-hidden>
{kind==='store'&&slot==='a'&&<><b>FORME</b><span>Objects for everyday living.</span></>}
{kind==='store'&&slot==='b'&&<div className="flex h-full items-end gap-3"><u className="vase h-3/4"/><u className="vase h-full"/><u className="vase h-2/3"/></div>}
{kind==='store'&&slot==='c'&&<div className="orb"/>}
{kind==='fit'&&slot==='a'&&<><b>This week</b><div className="mt-3 flex gap-2"><em className="ring"/><em className="ring r2"/><em className="ring r3"/></div></>}
{kind==='fit'&&slot==='b'&&<div className="flex h-full items-end gap-1.5">{bars.map((h,i)=><s key={i} style={{height:h+'%'}}/>)}</div>}
{kind==='fit'&&slot==='c'&&<svg viewBox="0 0 200 120" className="h-full w-full" preserveAspectRatio="none"><path d="M0 100 C30 90 40 60 70 66 S120 30 150 38 S185 14 200 10" fill="none" stroke="#d9dde2" strokeWidth="1.5"/><path d="M0 100 C30 90 40 60 70 66 S120 30 150 38 S185 14 200 10 V120 H0z" fill="url(#g)" opacity=".25"/><defs><linearGradient id="g" x1="0" x2="0" y1="0" y2="1"><stop stopColor="#d9dde2"/><stop offset="1" stopColor="#d9dde2" stopOpacity="0"/></linearGradient></defs></svg>}
{kind==='flow'&&slot==='a'&&<div className="flex items-center gap-2"><i className="nd"/><i className="ln"/><i className="nd"/><i className="ln"/><i className="nd"/></div>}
{kind==='flow'&&slot==='b'&&<div className="grid gap-2"><span className="bub">New enquiry received</span><span className="bub me">Reply drafted · awaiting review</span></div>}
{kind==='flow'&&slot==='c'&&<div className="grid gap-2.5">{['Classify enquiry','Draft reply','Human review','Send'].map((t,i)=><div key={t} className="row2"><i style={{opacity:1-i*.18}}/>{t}</div>)}</div>}
{kind==='wa'&&slot==='a'&&<div className="grid gap-2"><b>Business chat</b><span className="bub">Hi, can I book a slot?</span><span className="bub me">Sure! Pick a time below.</span></div>}
{kind==='wa'&&slot==='b'&&<div className="flex flex-wrap gap-2"><em className="slot">Mon 10:00</em><em className="slot on">Tue 14:30</em><em className="slot">Wed 11:00</em></div>}
{kind==='wa'&&slot==='c'&&<div className="grid gap-2.5">{['Message received','Auto-reply sent','Slot booked','Reminder scheduled','Handover to a person'].map((t,i)=><div key={t} className="row2"><i style={{opacity:1-i*.14}}/>{t}</div>)}</div>}
</div>}

export function useClock(){const[t,setT]=useState('');useEffect(()=>{const f=()=>setT(new Intl.DateTimeFormat('en-IN',{hour:'2-digit',minute:'2-digit',hour12:false,timeZone:'Asia/Kolkata'}).format(new Date()));f();const i=setInterval(f,30000);return()=>clearInterval(i)},[]);return t}
export const style=(v:Record<string,string|number>)=>v as CSSProperties;
