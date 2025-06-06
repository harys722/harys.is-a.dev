export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  const { content } = req.body;
  if (!content) {
    res.status(400).send("Missing 'content' in request body");
    return;
  }

  try {
    const encodedContent = Buffer.from(content).toString('base64');
    
    res.json({
      encoded: encodedContent,
      credits: 'Made by harys722, available only for cool people.',
      website: 'https://harys.is-a.dev/'
    });
  } catch (error) {
    res.status(500).send('Error encoding content');
  }
}
