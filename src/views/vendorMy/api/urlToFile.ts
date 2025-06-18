export default async function urlToFile(
  url: string,
  fileName: string,
  mimeType?: string,
): Promise<File> {
  const res = await fetch(url);
  const blob = await res.blob();
  return new File([blob], fileName, { type: mimeType || blob.type });
}
