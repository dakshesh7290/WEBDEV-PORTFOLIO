import '@fontsource/unbounded/500.css';import '@fontsource/unbounded/700.css';import '@fontsource/unbounded/900.css';import '@fontsource/instrument-sans/400.css';import '@fontsource/instrument-sans/500.css';
import {createRoot} from 'react-dom/client';import App from './App';import './index.css';
{const p=location.pathname.replace(/\/+$/,'');if(p&&p!=='/index.html'&&!p.startsWith('/404')){location.replace('/404.html')}}
if('scrollRestoration' in history)history.scrollRestoration='manual';
if(location.hash)history.replaceState(null,'',location.pathname+location.search);
scrollTo({top:0,left:0,behavior:'instant'});
addEventListener('pageshow',e=>{if((e as PageTransitionEvent).persisted)scrollTo({top:0,left:0,behavior:'instant'})});
createRoot(document.getElementById('root')!).render(<App/>);
