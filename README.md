# Rarámuri en familia

An illustrated language bridge for Spanish-speaking families of Guachochi and children beginning to speak, approximately 12–24 months. A caregiver shares one picture and hears Rarámuri alongside one chosen language, then continues with real objects, gestures and conversation.

## Preview

https://clementepg.github.io/raramuri/

GitHub Pages publishes the root of `main`. Static HTML, CSS and JavaScript; no build, account, analytics or microphone access. To develop locally: `python -m http.server 8768` and open http://localhost:8768/.

## Current library

13 picture concepts, 91 written forms and 36 genuine speaker recordings. Rarámuri stays visible; choose Spanish, English, French, Italian, German or Mandarin alongside it. The main view keeps one picture, paired words, Listen and Next; the thumbnail chooser lets families return to a familiar word. Tablet portrait uses a larger image and the space below for useful choices.

- Water, yes, no, eat, hello, ball, nose, dog, fresh corn, squash, sun, night and mouse.
- Water has recordings in all seven languages. Every additional concept has Spanish and English recordings. New native recordings are available for sun and fresh corn; other native recordings remain pending.
- Missing recordings are labelled honestly. No synthetic Rarámuri pronunciation is used. One Listen tap plays the available native recording, then the selected companion.
- Mandarin yes/no cards are natural responses to an offer: 要 / 不要 (want / don't want). Context and pinyin appear under Help.

The Family Guide proposes 50 useful concepts, beginning with requests, refusal, help and family connection, then everyday actions, objects, body/comfort and familiar surroundings. This is a curriculum proposal rather than a required word count or developmental test. Most of the 50-concept route still needs community translation and recording. The guide links ASHA, NIDCD and AAP/ASHA sources and encourages live parent–child interaction, including gestures and sound attempts.

## Rarámuri evidence

All 13 forms preserve the published transcription and reference in Gabriela Caballero (2022), *A grammar of Choguita Rarámuri*, CC BY 4.0. They are source forms, not a claim of standardized practical spelling or completed community validation. Kinship, body-part possessives and natural family expressions require appropriate context; the project does not manufacture bare forms by removing suffixes.

Book: https://langsci-press.org/catalog/book/324 . Native audio: https://zenodo.org/records/7268366 . Full collaborator, author, source and license attribution: [THIRD_PARTY_NOTICES.md](THIRD_PARTY_NOTICES.md). Curated lesson data and recording hashes: `bridge-data.js`.

Three native recordings are copied unchanged. New Spanish sources include varieties from Spain, Costa Rica and Colombia and are not collectively labelled Mexican Spanish. All audio is locally served; no speech service is called during playback.

The ten new illustrations were generated with the built-in image tool. Original PNGs are saved locally in `output/imagegen/first-words/`; small WebP delivery versions are in the repository root. [Final image prompts and asset names](IMAGE_PROMPTS.md).

## Offline and checks

The service worker caches the lesson images and recordings after loading, with byte-range responses for tablet audio. The original mockup PDF remains available from Help and is not precached.

Run `node --test audio-range.test.cjs vocabulary.test.cjs`. The checks cover offline audio ranges and lesson media/source/hash integrity. Responsive sizes, paired playback, library navigation and the parent guide are also checked in the browser.
