import {defineConfig,type Plugin} from 'vite';import react from '@vitejs/plugin-react';
// This site publishes no AI catalogue, so /.well-known/* must answer "not found" instead of the web page.
const noWellKnown=():Plugin=>{const h=(req:{url?:string},res:{statusCode:number;end:(s:string)=>void},next:()=>void)=>{if(req.url?.startsWith('/.well-known/')){res.statusCode=404;res.end('Not found');return}next()};
return {name:'no-well-known',configureServer(s){s.middlewares.use(h)},configurePreviewServer(s){s.middlewares.use(h)}}};
export default defineConfig({plugins:[react(),noWellKnown()]});
