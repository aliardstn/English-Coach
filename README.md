# English Coach — ElevenLabs v4

This version uses ElevenLabs for natural pronunciation through a Vercel serverless function.

## Vercel setup
1. Add the repository to Vercel.
2. In **Vercel → Project → Settings → Environment Variables**, add:
   - Name: `ELEVENLABS_API_KEY`
   - Value: your ElevenLabs API key
3. Redeploy the project.

The ElevenLabs API key must **not** be placed in `index.html` or committed to GitHub.

The default Voice ID is the one selected for this project: `rsMwNQrvMR1sC0YMsK2a`. You can change it in Settings.

The app calls `/api/tts`, which forwards text to ElevenLabs without exposing the API key to the browser.
