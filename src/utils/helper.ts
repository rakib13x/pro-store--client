export const convertSlugToName = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b[a-z]/g, (match) => {
    return match.toUpperCase();
  });
};

export const convertNameToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
