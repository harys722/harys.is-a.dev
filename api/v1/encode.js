export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.status(405).send('Method Not Allowed');
    return;
  }

  let { content } = req.body;

  // Convert content to string if it's not
  if (content === undefined || content === null) {
    res.status(400).send("Missing 'content' in request body");
    return;
  }

  // If content is a number or other type, convert to string
  if (typeof content !== 'string') {
    content = String(content);
  }

  try {
    const encodedContent = Buffer.from(content).toString('base64');

    res.json({
      encoded: encodedContent,
      credits: 'Made by harys722, available only for cool people.',
      website: 'https://harys.is-a.dev/'
    });
  } catch (error) {
    console.error('Encoding error:', error);
    res.status(500).send('Error encoding content');
  }
}
