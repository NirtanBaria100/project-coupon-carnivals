/**
 * Convert an HTML string to a clean text snippet.
 * @param html   Raw HTML string from the blog.content field
 * @param length Max length of returned text (default 150 chars)
 */
export const excerptFromHtml = (html: string, length = 150): string => {
  if (!html) return "";

  // 1. Parse HTML → get only the text inside `<body>`
  const doc = new DOMParser().parseFromString(html, "text/html");
  const text = doc.body.textContent || "";

  // 2. Collapse multiple spaces / line breaks
  const clean = text.replace(/\s+/g, " ").trim();

  // 3. Trim to desired length
  return clean.length > length ? clean.slice(0, length) + "…" : clean;
};
