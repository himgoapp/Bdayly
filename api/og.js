
export default async function handler(req, res) {
  const slug = req.query.slug;

  if (!slug || typeof slug !== "string") {
    return res.status(400).send("Birthday slug missing");
  }

  const siteUrl = `https://${req.headers.host}`;
  const pageUrl = `${siteUrl}/w/${encodeURIComponent(slug)}`;

  const supabaseUrl = process.env.VITE_SUPABASE_URL;
  const supabaseKey = process.env.VITE_SUPABASE_PUBLISHABLE_KEY;

  if (!supabaseUrl || !supabaseKey) {
    return res.status(500).send("Supabase environment variables missing");
  }

  const escapeHtml = (value = "") =>
    String(value).replace(/[&<>"']/g, (char) => ({
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    })[char]);

  try {
    const queryUrl = new URL(
      `${supabaseUrl}/rest/v1/birthday_pages`
    );

    queryUrl.searchParams.set("slug", `eq.${slug}`);
    queryUrl.searchParams.set(
      "select",
      "recipient_name,sender_name,message,photo_url"
    );

    const response = await fetch(queryUrl, {
      headers: {
        apikey: supabaseKey,
        Authorization: `Bearer ${supabaseKey}`,
      },
    });

    if (!response.ok) {
      console.error("Supabase error:", await response.text());
      return res.status(502).send("Unable to load birthday details");
    }

    const pages = await response.json();
    const birthday = pages[0];

    if (!birthday) {
      return res.status(404).send("Birthday page not found");
    }

    const recipient = birthday.recipient_name || "Someone Special";
    const sender = birthday.sender_name || "Someone special";
    const message =
      birthday.message || `A special birthday surprise from ${sender}.`;

    const title = `Happy Birthday ${recipient}! 🎂`;
    const description = message;
    const image = birthday.photo_url || `${siteUrl}/bdayly-preview.png`;

    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "public, max-age=60, s-maxage=300");

    return res.status(200).send(`<!doctype html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">

  <title>${escapeHtml(title)}</title>
  <meta name="description" content="${escapeHtml(description)}">

  <meta property="og:type" content="website">
  <meta property="og:site_name" content="Bdayly">
  <meta property="og:title" content="${escapeHtml(title)}">
  <meta property="og:description" content="${escapeHtml(description)}">
  <meta property="og:url" content="${escapeHtml(pageUrl)}">
  <meta property="og:image" content="${escapeHtml(image)}">
  <meta property="og:image:alt" content="Birthday surprise for ${escapeHtml(recipient)}">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${escapeHtml(title)}">
  <meta name="twitter:description" content="${escapeHtml(description)}">
  <meta name="twitter:image" content="${escapeHtml(image)}">

  <script>
    window.location.replace(${JSON.stringify(pageUrl)});
  </script>
</head>
<body>
  <p>Opening your birthday surprise...</p>
  <a href="${escapeHtml(pageUrl)}">Open birthday surprise</a>
</body>
</html>`);
  } catch (error) {
    console.error("Birthday preview error:", error);
    return res.status(500).send("Unable to create birthday preview");
  }
}
