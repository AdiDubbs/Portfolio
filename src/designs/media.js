// Compressed copies of the portfolio images, keyed by the imageKeys used in profile.js
const files = import.meta.glob("./media/*.webp", { eager: true, import: "default" });

export const media = Object.fromEntries(
  Object.entries(files).map(([path, url]) => [path.split("/").pop().replace(".webp", ""), url])
);
