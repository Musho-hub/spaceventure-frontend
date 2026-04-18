function escapeHtml(text: string) {
  return text
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export function getFirstParagraphHtml(html: string) {
  const match = html.match(/<p\b[^>]*>[\s\S]*?<\/p>/i);

  if (match) return match[0];

  const trimmed = html.trim();

  if (!trimmed) return "";

  return `<p>${escapeHtml(trimmed)}</p>`;
}
