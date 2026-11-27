import {useEffect,useRef,useState} from 'react';
import {Play,RotateCcw,Check,ArrowLeft,Phone,Video,MoreVertical,Smile,Paperclip,Mic,SendHorizontal,CheckCheck,Store} from 'lucide-react';
import {LH_COLS,LH_CORE,LH_DIAG,LH_PROD,ISSUES,SEO_STEPS,CHAT_STEPS,NODES} from './data';

function Tabs({tabs,t,setT,label}:{tabs:string[];t:number;setT:(i:number)=>void;label:string}){
return <div role="tablist" aria-label={label} className="flex flex-wrap gap-2">{tabs.map((n,i)=><button key={n} role="tab" aria-selected={t===i} onClick={()=>setT(i)} className={'atab atab-s'+(t===i?' on':'')}>{n}</button>)}</div>}
const Steps=({s,compact}:{s:readonly(readonly[string,string])[];compact?:boolean})=><ol className={'st2'+(compact?' compact':'')}>{s.map(([a,b],i)=><li key={a}><b>{i+1}</b><div><h4 className="font-display text-base">{a}</h4><p className="mt-1 text-sm text-chrome">{b}</p></div></li>)}</ol>;

const Rows=({rows}:{rows:readonly(readonly[string,string,string,string])[]})=><tbody>{rows.map(([m,a,b,c])=><tr key={m}><td>{m}</td><td className="lb">{a}</td><td>{b}</td><td className="la">{c}</td><td>{LH_PROD[m]??<span className="pend">Re-test pending</span>}</td></tr>)}</tbody>;
export function SeoProof(){const[t,setT]=useState(0);
return <div className="dpanel"><Tabs tabs={['Overview','Reports','Issues & fixes','Process']} t={t} setT={setT} label="SEO audit sections"/>
<div role="tabpanel" key={t} className="dbody">
{t===0&&<><p className="text-silver/85">An audit of my own portfolio site. Lighthouse showed what slowed it down and which accessibility, SEO and best-practice checks failed. I fixed them in order of impact and re-tested after each round.</p><div className="mt-4 flex flex-wrap gap-2">{['Lighthouse','Core Web Vitals','Technical SEO','Accessibility','Image delivery','Agent discoverability'].map(x=><span key={x} className="achip">{x}</span>)}</div></>}
{t===1&&<><div className="overflow-x-auto"><table className="lh"><thead><tr><th>Metric</th>{LH_COLS.map(c=><th key={c}>{c}</th>)}</tr></thead><Rows rows={LH_CORE}/><thead><tr><th colSpan={5} className="sub">Diagnostics</th></tr></thead><Rows rows={LH_DIAG}/></table></div><p className="note">All three runs were taken on the development build (the JavaScript was still unminified), so numbers vary from run to run. The production-build column is added once that version has been tested.</p></>}
{t===2&&<ul className="fix">{ISSUES.map(([i,f,s])=><li key={i}><span className="bad">Found: {i}</span><span className="good"><Check size={14}/>{f}</span><span className={'stat '+(s.startsWith('Confirmed')?'ok':s.startsWith('Improved')||s.startsWith('No longer')?'imp':s.startsWith('Still')||s.startsWith('Open')?'op':'ap')}>{s}</span></li>)}</ul>}
{t===3&&<Steps s={SEO_STEPS}/>}</div></div>}

type Msg={f:'bot'|'me';t:string;ts:string};
const now=()=>new Date().toLocaleTimeString([],{hour:'2-digit',minute:'2-digit',hour12:false});
const MENU=['What do you offer?','Book a slot','Business hours','Talk to a person'];
const SAMPLES=['Do you build websites?','How much does it cost?','What are your timings?','Can I talk to someone?','Do you do SEO?','Can you build a chatbot for me?'];
const intent=(x:string):[string,string[]]=>{const l=x.toLowerCase();
if(/\b(thanks|thank you|thx|bye)\b/.test(l))return['You’re welcome! Message me any time.',['Back to menu']];
if(/^(hi|hello|hey|hii|namaste)\b/.test(l))return['Hello! I’m the assistant. Ask me anything or tap a button below.',MENU];
if(/\b(human|person|agent|someone|somebody|owner|talk to)/.test(l))return['Of course. I’m passing this chat to a person, who will reply here.',['Back to menu']];
if(/\b(book|appointment|slot|schedul|meeting|call)/.test(l))return['Happy to help with that. Which day works for you?',['Tomorrow','This weekend','Next week']];
if(/\b(price|pricing|cost|quote|budget|rate|charge|how much)/.test(l))return['Pricing depends on what you need. I can pass your details to a person, who will reply with a clear quote.',['Talk to a person','Back to menu']];
if(/\b(hours|timing|open|opening|clos)/.test(l))return['Mon–Sat, 10:00–18:00.',['Book a slot','Back to menu']];
if(/\b(seo|search|google|rank)/.test(l))return['Yes, search growth is one of the services: site structure, speed and content that search engines understand. Want to book a slot to talk it through?',['Book a slot','Back to menu']];
if(/\b(chatbots?|chat bots?|whatsapp|bots?\b)/.test(l))return['Yes. A WhatsApp chatbot can answer common questions, take bookings and hand over to a person when needed.',['Book a slot','Back to menu']];
if(/\b(website|web site|site|web|store|shop)/.test(l))return['Yes, websites and online stores are on the list. Tell me what you need and I’ll pass it on to a person.',['Book a slot','Talk to a person']];
if(/\b(automat|workflow|n8n)/.test(l))return['Yes. Automations can handle scheduling, messages and tracking so repeat tasks run on their own.',['Book a slot','Back to menu']];
return['I’m not sure I understood that. Pick an option below, or I can hand you to a person.',MENU]};
const SEED:Msg[]=[{f:'bot',t:'Hi! Welcome. How can I help?',ts:now()},{f:'me',t:SAMPLES[0],ts:now()},{f:'bot',t:intent(SAMPLES[0])[0],ts:now()}];
export function ChatDemo(){
const[msgs,setMsgs]=useState<Msg[]>(SEED);const[opts,setOpts]=useState<string[]>(intent(SAMPLES[0])[1]);const[busy,setBusy]=useState(false);const[val,setVal]=useState('');
const day=useRef('');const box=useRef<HTMLDivElement>(null);const timer=useRef<number>();
useEffect(()=>{box.current?.scrollTo({top:box.current.scrollHeight})},[msgs,busy]);useEffect(()=>()=>clearTimeout(timer.current),[]);
const flow=(l:string):[string,string[]]|null=>{
if(l==='What do you offer?')return['Websites, search growth, chat assistants and automation. Would you like to book a slot?',['Book a slot','Back to menu']];
if(l==='Book a slot')return['Great! Which day works for you?',['Tomorrow','This weekend','Next week']];
if(['Tomorrow','This weekend','Next week'].includes(l)){day.current=l;return[l+' it is. What time suits you?',['Morning','Afternoon','Evening']]}
if(['Morning','Afternoon','Evening'].includes(l))return['Booked: '+(day.current||'your day').toLowerCase()+', '+l.toLowerCase()+'. A reminder will be sent before your slot.',['Back to menu']];
if(l==='Business hours')return['Mon–Sat, 10:00–18:00.',['Book a slot','Back to menu']];
if(l==='Talk to a person')return['No problem. I’m passing this chat to a person, who will reply here.',['Back to menu']];
if(l==='Back to menu')return['Anything else I can help with?',MENU];return null};
const send=(raw:string)=>{const l=raw.trim();if(!l||busy)return;setMsgs(m=>[...m,{f:'me',t:l,ts:now()}]);setOpts([]);setVal('');setBusy(true);
timer.current=window.setTimeout(()=>{const[txt,o]=flow(l)??intent(l);setMsgs(m=>[...m,{f:'bot',t:txt,ts:now()}]);setOpts(o);setBusy(false)},650)};
const restart=()=>{clearTimeout(timer.current);setMsgs([{f:'bot',t:'Hi! Welcome. How can I help?',ts:now()}]);setOpts(MENU);setBusy(false);setVal('')};
return <div className="grid gap-4 lg:grid-cols-[minmax(0,420px)_1fr]"><div className="wa"><div className="wa-h"><ArrowLeft size={20}/><span className="wa-av"><Store size={18}/></span><div className="wa-t"><b>Sample business</b><small>{busy?'typing…':'Business account'}</small></div><Video size={19}/><Phone size={18}/><button onClick={restart} aria-label="Restart the chat" className="wa-ib"><MoreVertical size={19}/></button></div>
<div ref={box} className="wa-m" aria-live="polite"><span className="wa-day">Today</span>{msgs.map((m,i)=><div key={i} className={'wa-b'+(m.f==='me'?' me':'')}>{m.t}<span className="wa-ts">{m.ts}{m.f==='me'&&<CheckCheck size={14}/>}</span></div>)}{busy&&<div className="wa-b wa-typing" aria-label="typing"><i/><i/><i/></div>}</div>
<div className="wa-q">{opts.map(o=><button key={o} onClick={()=>send(o)}>{o}</button>)}</div>
<form className="wa-in" onSubmit={e=>{e.preventDefault();send(val)}}><div className="wa-pill"><Smile size={20}/><input value={val} onChange={e=>setVal(e.target.value)} maxLength={120} placeholder="Message" aria-label="Type a message to the chatbot" disabled={busy}/><Paperclip size={19}/></div><button type="submit" className="wa-send" disabled={busy||!val.trim()} aria-label="Send">{val.trim()?<SendHorizontal size={20}/>:<Mic size={20}/>}</button></form></div>
<div className="dbody flex flex-col gap-5"><div><p className="mb-2 text-sm text-chrome">Try typing, or tap a sample message:</p><div className="flex flex-wrap gap-2">{SAMPLES.map(x=><button key={x} onClick={()=>send(x)} disabled={busy} className="achip cursor-pointer disabled:opacity-50">{x}</button>)}</div></div>
<div><h4 className="mb-3 font-display text-base">How it’s built</h4><Steps s={CHAT_STEPS} compact/></div>
<p className="note" style={{marginTop:0}}>This is a simulated conversation, not connected to a live WhatsApp number.</p></div></div>}

export function FlowDemo(){
const[sel,setSel]=useState(0);const[step,setStep]=useState(-1);const timer=useRef<number>();const n=NODES.length;
useEffect(()=>()=>clearInterval(timer.current),[]);
const run=()=>{clearInterval(timer.current);let i=0;setStep(0);setSel(0);timer.current=window.setInterval(()=>{i++;if(i>=n){clearInterval(timer.current);setStep(n);return}setStep(i);setSel(i)},800)};
const reset=()=>{clearInterval(timer.current);setStep(-1)};const run_=step>=0&&step<n;
return <div className="dpanel"><div className="flex flex-wrap items-center gap-2"><button className="btn btn-chrome" style={{padding:'8px 18px',fontSize:'.9rem'}} onClick={run} disabled={run_}><Play size={14}/>Run demo</button><button className="atab atab-s" onClick={reset} aria-label="Reset the demo"><RotateCcw size={13} className="inline"/></button>
</div>
<div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_300px]"><div className="dbody"><div className="wf">{NODES.map(([name,type,tool],i)=><button key={name} data-t={type} onClick={()=>setSel(i)} className={'wn'+(sel===i?' sel':'')+(step===i?' act':'')+(i<step?' done':'')}><small>{i+1} · {type}</small><strong>{name}</strong><i>{tool}</i></button>)}</div></div>
<div className="dbody flex flex-col gap-3"><div aria-live="polite" className="wdet"><p className="text-sm text-chrome">{step>=n?'Workflow complete.':run_?'Running step '+(step+1)+' of '+n+'…':'Select a step to see what it does.'}</p><h4 className="mt-1 font-display text-base">{NODES[sel][0]}</h4><p className="mt-1 text-sm text-silver/80">{NODES[sel][3]}</p></div>
</div></div></div>}
