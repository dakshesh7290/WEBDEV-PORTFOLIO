# DAKSHESH. landing page (React + TypeScript + Vite)
Stack: React 18, TypeScript, Tailwind CSS 3, Framer Motion, Lucide React, hls.js (loaded only when a video source is set).
Run: `npm install` · `npm run dev` · `npm run build` (type-checks, then builds) · `npm run preview`.
Config: copy `.env.example` to `.env`.
- `VITE_HERO_HLS_SRC` — your .m3u8 URL. Empty or failing = designed fallback. Skipped under reduced motion.
- `VITE_CONTACT_EMAIL` — defaults to the site email, shown only as a “Mail” link. The form opens an email draft; if the variable is cleared, it says nothing was sent.
- `VITE_INSTAGRAM_URL` — defaults to the dakshesh.obsora profile.
Fonts: Unbounded (display) + Instrument Sans (text). Content lives in `src/data.ts`.
The three projects are concept demos. Replace them only with real, approved work.

## Contact
No form: the Contact section has WhatsApp, Mail and Instagram buttons. Set `VITE_WHATSAPP_NUMBER` (country code, digits only) in `.env`.

## Hero video not showing?
Open the site with `?debug` at the end of the address (for example http://localhost:5173/?debug). A small label in the hero says what the video is doing (no source, reduced motion, stream error, playing). After editing `.env`, stop and restart `npm run dev`.
