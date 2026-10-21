# Khalil Meftehi · Portfolio v2 (block world)

Static site, no build step. Open with any static server:

```
python -m http.server 8765
```
then visit http://127.0.0.1:8765

## Where to edit
| What | File |
|---|---|
| Text in EN / DE / FR / AR | `js/i18n.js` |
| Projects, skills, certificates, links | `js/data.js` |
| 3D world (terrain, buildings, avatar, camera) | `js/world.js` |
| Navigation, chat, contact form, sound | `js/ui.js` |
| Look and layout | `css/style.css` |
| CVs, photo, certificates | `files/` |
| Case-study figures (WebP, no raw data) | `files/projects/` |

After each deploy, bump `CACHE` in `sw.js` so visitors get the new files.

## Stack
Three.js r128 (CDN, SRI-pinned) · vanilla JS · Google Fonts (Press Start 2P, Pixelify Sans, Noto Kufi Arabic) · web3forms for the contact form · PWA (manifest + service worker).
All block textures are drawn in code (no copied game assets).
