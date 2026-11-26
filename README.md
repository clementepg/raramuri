# Rarámuri en familia

Illustrated mobile and tablet test preview for Spanish-speaking families of Guachochi with children aged 12–24 months. An adult accompanies picture looking, listening and shared real-world play.

## Test website

https://clementepg.github.io/raramuri/

Static HTML, CSS and JavaScript. Publish from the root of the main branch using GitHub Pages. To develop locally, run `python -m http.server 8765` in this repository and open http://localhost:8765/ .

## Actual Rarámuri content

Three exact published Choguita source forms are included, labeled as source transcription:

- ˈkuíra (ba) — hola, Caballero (2022), p. 387, (41b).
- peˈlôta — pelota, Caballero (2022), p. 608, (7b).
- baʔˈwí — agua, Caballero (2022), p. 202, (2e).

The Agua scene plays an unaltered recording by Jesusita Loya Guerra from the grammar's companion audio, CC BY 4.0. Rarámuri greeting and ball audio are not supplied. No synthetic native speech is used.

See [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md) for complete book, collaborator, audio and license attribution. Source transcription is preserved rather than presented as a standardized practical spelling. Further teaching content and practical spelling should be reviewed with participating speakers.

## Included

The family view opens directly on Agua, the scene with a speaker recording. It shows one picture, the Rarámuri word, its Spanish meaning, an Escuchar button and an Otra imagen button. Another tap cycles to the next scene. The paired language selector keeps Rarámuri beside the family’s chosen companion language. Scenes without recordings say Todavía sin audio. Short parent guidance is behind Ayuda; sources, credits and the original PDF are inside a collapsed section there.

Three original fictional family illustrations, source references, native water audio and the initial six-page visual mockup PDF are included. Application assets are cached for offline use after loading; the PDF is not precached. No child accounts, analytics or microphone recording.

## Family language bridge

The same three pictures now support Rarámuri, Spanish, English, French, Italian, German and Mandarin. Rarámuri is always visible alongside one chosen language. Spanish is the starting companion language. One Escuchar button plays Rarámuri first, then the chosen language, while the same picture stays in place; the parent guidance remains in Spanish.

There are 21 written forms and 14 real speaker recordings. Agua/Water is playable in all seven languages. Other scenes explicitly say when a recording is unavailable. Mandarin uses Chinese characters; pinyin is available under Ayuda. No synthetic pronunciation is used.

Curated vocabulary and per-recording source/author/license details are in `bridge-data.js`; full media credits are in `THIRD_PARTY_NOTICES.md`. The MP3 recordings are Wikimedia-provided transcodes, copied without further edits. The app uses only local static assets while playing. Language and picture choices can be shared in the URL, for example `?lang=en#agua`.

The service worker caches the picture and audio pack and supports byte-range audio responses for tablet playback. Run `node --test audio-range.test.cjs` to check cached audio range behavior.
