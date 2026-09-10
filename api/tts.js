export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: 'Method not allowed' });
  const apiKey = process.env.ELEVENLABS_API_KEY;
  if (!apiKey) return res.status(500).json({ error: 'ELEVENLABS_API_KEY is not configured in Vercel.' });
  try {
    const { text, voiceId, modelId = 'eleven_multilingual_v2', speed = 0.88 } = req.body || {};
    if (!text || typeof text !== 'string') return res.status(400).json({ error: 'Text is required.' });
    if (!voiceId || typeof voiceId !== 'string') return res.status(400).json({ error: 'Voice ID is required.' });
    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`, {
      method: 'POST', headers: { 'xi-api-key': apiKey, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
      body: JSON.stringify({ text: text.slice(0, 1000), model_id: modelId, output_format: 'mp3_44100_128', voice_settings: { stability: 0.45, similarity_boost: 0.8, style: 0.2, use_speaker_boost: true, speed: Math.max(0.7, Math.min(1.2, Number(speed) || 0.88)) } })
    });
    if (!response.ok) { const detail = await response.text(); return res.status(response.status).json({ error: `ElevenLabs: ${detail.slice(0, 500)}` }); }
    const audio = Buffer.from(await response.arrayBuffer());
    res.setHeader('Content-Type', 'audio/mpeg'); res.setHeader('Cache-Control', 'public, max-age=86400');
    return res.status(200).send(audio);
  } catch (error) { return res.status(500).json({ error: error.message || 'Unexpected server error.' }); }
}
