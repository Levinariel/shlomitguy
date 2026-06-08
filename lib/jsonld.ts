// Serialize a value for safe embedding inside a <script type="application/ld+json"> tag.
// JSON.stringify alone is not safe: a stray "</script>" (or the U+2028 / U+2029 line
// separators) in any field would break out of the script element. Escaping the
// HTML-significant characters as \uXXXX keeps the JSON valid while making breakout
// impossible. Relevant because much of this site's content was migrated from a
// scraped WordPress source that historically contained injected markup.
export function jsonLd(data: unknown): string {
  const lineSep = String.fromCharCode(0x2028);
  const paraSep = String.fromCharCode(0x2029);
  return JSON.stringify(data)
    .split("<").join("\\u003c")
    .split(">").join("\\u003e")
    .split("&").join("\\u0026")
    .split(lineSep).join("\\u2028")
    .split(paraSep).join("\\u2029");
}
