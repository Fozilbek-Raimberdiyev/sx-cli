export function replaceSlashes(url: string) {
  if (!url) return '';
  return url.replace(/\//g, "\\");
}
