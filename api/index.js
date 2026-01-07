export default async function handler(req, res) {
  const {
    prompt,
    download,
    improve,
    format,
    random
  } = req.query;

  if (!prompt) {
    return res.status(400).json({
      status: false,
      message: "Prompt is required"
    });
  }

  let finalPrompt = prompt;

  if (improve === "true") {
    finalPrompt =
      `ultra realistic, highly detailed, cinematic, 4k, ${prompt}`;
  }

  const width = format === "wide" ? 1280 : 1024;
  const height = format === "wide" ? 720 : 1024;

  const seed = random || Math.floor(Math.random() * 999999);

  const imageUrl = `https://image.pollinations.ai/prompt/${encodeURIComponent(
    finalPrompt
  )}?width=${width}&height=${height}&seed=${seed}&nologo=true`;

  // Direct download mode
  if (download === "true") {
    const img = await fetch(imageUrl);
    const buffer = await img.arrayBuffer();

    res.setHeader("Content-Type", "image/png");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename="Aotpy_Image.png"`
    );
    return res.send(Buffer.from(buffer));
  }

  res.status(200).json({
    status: true,
    engine: "pollinations",
    prompt: finalPrompt,
    width,
    height,
    seed,
    image: imageUrl,
    dev: "@Aotpy / @obitostuffs",
    telegram: "@obitoapi"
  });
}
