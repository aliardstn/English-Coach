# English Coach — v6 Offline Dictionary

This version keeps the existing English Coach learning experience and ElevenLabs voice setup, but removes the live Dictionary API dependency for the built-in vocabulary.

## What changed
- 500 core vocabulary words now have definitions stored locally in `index.html`.
- Existing `localStorage` progress is preserved.
- Existing user-entered meanings are not overwritten.
- No `dictionaryapi.dev` request is made for the built-in vocabulary.
- ElevenLabs pronunciation still uses `/api/tts` and the `ELEVENLABS_API_KEY` Vercel environment variable.
- The old “Definition will be added when an internet connection is available” message is removed.

## Deployment
Upload `index.html`, `api/tts.js`, and this README to the repository root. Keep the ElevenLabs key only in Vercel Environment Variables.
