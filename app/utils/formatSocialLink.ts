export const formatSocialLink = (
  url: string | undefined | null,
  platform: "linkedin" | "github" | "portfolio",
): string => {
  if (!url) return "";

  const clean = url
    .replace(/^https?:\/\//, "")
    .replace(/^www\./, "")
    .replace(/\/$/, "");

  if (platform === "linkedin") {
    const match = clean.match(/linkedin\.com\/in\/([^/?]+)/i);
    return match ? `in/${match[1]}` : clean;
  }

  if (platform === "github") {
    const match = clean.match(/github\.com\/([^/?]+)/i);
    return match ? `@${match[1]}` : clean;
  }

  return clean; // portfolio — bare domain
};