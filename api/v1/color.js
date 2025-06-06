function getColorInfo(hex) {
  const sanitizedHex = hex.replace('#', '').toLowerCase();
  if (!/^([0-9a-f]{3}|[0-9a-f]{6})$/.test(sanitizedHex)) {
    return { error: "Invalid hex color code." };
  }

  let fullHex = sanitizedHex;
  if (sanitizedHex.length === 3) {
    fullHex = sanitizedHex.split('').map(c => c + c).join('');
  }

  const r = parseInt(fullHex.substring(0, 2), 16);
  const g = parseInt(fullHex.substring(2, 4), 16);
  const b = parseInt(fullHex.substring(4, 6), 16);

  const intCode = parseInt(fullHex, 16);

  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  const textColor = brightness > 125 ? 'black' : 'white';

  return {
    hex: `#${fullHex}`,
    intCode: intCode,
    rgb: [r, g, b],
    brightness: brightness,
    textColor: textColor
  };
}

export default function handler(req, res) {
  const { hex } = req.query;

  let colorInfo;

  if (hex) {
    colorInfo = getColorInfo(hex);
    if (colorInfo.error) {
      return res.status(400).json({ error: colorInfo.error });
    }
  } else {
    const randomHex = '#' + Math.floor(Math.random() * 0xffffff).toString(16).padStart(6, '0');
    colorInfo = getColorInfo(randomHex);
  }

  res.json({
    hex: colorInfo.hex,
    intCode: colorInfo.intCode,
    rgb: colorInfo.rgb,
    brightness: colorInfo.brightness,
    textColor: colorInfo.textColor,
    info: {
      credits: "Made by harys722, available only for cool people.",
      website: "https://harys.is-a.dev"
    }
  });
}
