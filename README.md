# Rarámuri en familia

A parent-led language bridge for Guachochi families and children beginning to speak, approximately 12–24 months. One picture remains on screen beside Rarámuri and one chosen companion language, then the family continues with a real object, gesture or conversation.

## Preview

https://clementepg.github.io/raramuri/

GitHub Pages serves the root of main. Static HTML/CSS/JavaScript; no build or accounts. Local preview: `python -m http.server 8768`, then http://localhost:8768/.

## Everyday vocabulary

50 starter concepts plus 4 preserved enrichment scenes, organized into 6 small groups: requests/connection, family, actions, everyday things, body/comfort and familiar surroundings. All 54 pictures have written Spanish, English, French, Italian, German and Mandarin forms (324 companion entries). This is a flexible editorial curriculum, not a developmental test or completion deadline.

25 Rarámuri source forms are included with exact references from Gabriela Caballero (2022), A grammar of Choguita Rarámuri, CC BY 4.0. The remaining 29 target expressions stay explicitly pending. Practical orthography and natural local expressions need community review. The app does not substitute an infinitive for a first-person request or their mother for Mom. A structured 54-row review sheet is in NATIVE_REVIEW.csv.

There are 102 genuine speaker recordings: 3 Rarámuri and 99 companion recordings. Canonical Spanish and English human-recording coverage is 42/50 each, plus the preserved enrichment recordings. When an exact companion recording is missing, a matching browser/device voice is offered and labelled Voz del dispositivo. Availability depends on the device and can require internet. Unavailable voices remain clearly marked; a wrong-language fallback is never used. Mandarin never falls back to a Cantonese zh-HK voice. Rarámuri is never synthesized.

One Escuchar tap plays the available Rarámuri recording first, then the selected companion. A word highlight follows playback. Changing a word, group, language or dialog cancels queued playback.

## Voices of the family

Choose a picture, open Ayuda and select Añadir una voz familiar. An adult who speaks Rarámuri can enter the natural expression and record up to 20 seconds, review it and save it in this browser. The microphone is requested only when Grabar is pressed. Closing the dialog, hiding the tab or reaching the time limit stops capture. These personal entries are labelled Voz familiar and are not presented as published source verification.

Family recordings stay in IndexedDB on this device; the app has no upload endpoint. Download a JSON backup from Guardar y recuperar copias to retain it or restore it on another device. Clearing browser data can remove local voices. Imported backups are validated before a single atomic database write. The app never asks a child to record.

The Family Guide includes a short explanation of family connection, intergenerational use, community knowledge and learning additional languages while Rarámuri remains part of everyday life. The wording is a project proposal for discussion with families, grounded in UNESCO and INALI sources linked in the guide. It does not claim that identity depends on fluency or promise IQ, employment or school-performance gains.

## Evidence, artwork and privacy

Book: https://langsci-press.org/catalog/book/324 . Published native recordings: https://zenodo.org/records/7268366 . Per-word references and recording SHA256s: bridge-data.js. Complete author/source/licence attribution: THIRD_PARTY_NOTICES.md.

The 41 new illustrations use the built-in image tool; originals are stored locally under output/imagegen/everyday-v7. WebP delivery assets are in the root. Final prompts and asset names are in IMAGE_PROMPTS.md. Older illustrations and the mockup PDF remain intact. No analytics or child accounts.

## Offline and validation

The service worker caches the illustrated recording pack and supports byte-range audio playback. Device speech depends on the browser and is not a bundled offline recording. The PDF is not precached. Family voices use local browser storage and can play locally after recording/import.

Run node --test audio-range.test.cjs vocabulary.test.cjs lesson-player.test.cjs family-voices.test.cjs. Tests cover media/source/hash integrity, 50 + 4 coverage, audio ranges, cancellation, native-speech exclusions, Mandarin voice matching, backup validation and microphone-permission races. Browser QA covers grouped navigation, image rendering, paired recorded/device playback, parent guidance and phone/tablet geometry. Actual microphone recording is left to an adult choosing to grant permission on their own device.
