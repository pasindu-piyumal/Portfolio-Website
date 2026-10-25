# Creative Interactive Portfolio

A responsive React + Vite portfolio concept for Pasindu Piyumal Amarasinghe, built with Framer Motion, Three.js / React Three Fiber, and Lucide icons.

## Requirements
- Node.js 20 LTS or newer recommended
- npm
- VS Code (recommended)

## Run locally on Windows
```powershell
cd creative-interactive-portfolio
npm install
npm run dev
```
Open the local URL printed by Vite (usually http://localhost:5173).

## Production build
```powershell
npm run build
npm run preview
```
The production site is generated in `dist/`.

## Customize your profile
Edit `src/config/portfolio.js`:
- name, headline, introduction
- GitHub, LinkedIn, email
- education and location

Update project content in `src/data/projects.js`. Use real repository/demo URLs when you have them. Unavailable URLs are deliberately not rendered as active links.

## Add your CV
1. Export your real CV as PDF.
2. Put it in `public/resume/`.
3. Name it `Pasindu-Piyumal-CV.pdf`.
4. The Download CV button points to `/resume/Pasindu-Piyumal-CV.pdf`.

## Contact form
The form validates input in the browser but does not pretend to send email. Connect a trusted form provider or a backend endpoint before using it in production. Do not place secret keys in frontend code.

## Deploy
### Vercel (recommended)
1. Push this folder to a GitHub repository.
2. Import the repository in Vercel.
3. Framework preset: Vite; build command `npm run build`; output directory `dist`.
4. Deploy.

### GitHub Pages
This project uses Vite. For a repository project page, set `base: '/YOUR-REPOSITORY-NAME/'` in `vite.config.js`, then install and configure a Pages deployment workflow. For a user/organization site at `username.github.io`, use `base: '/'`.

## Notes
- Project examples are editable portfolio entries, not claims of verified results.
- The 3D globe is decorative and client-rendered. It has a lightweight CSS fallback if WebGL is unavailable.
- GitHub profile link is real; LinkedIn and email remain configurable placeholders until supplied.


### Globe texture

The hero globe uses a bundled 2:1 equirectangular satellite-style Earth texture at `public/textures/earth-realistic.png`, so it does not need a third-party image API at runtime. The texture is stylized artwork, not a live satellite feed or a geospatially authoritative dataset.
