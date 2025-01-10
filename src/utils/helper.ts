export const convertSlugToName = (slug: string) => {
  return slug.replace(/-/g, " ").replace(/\b[a-z]/g, function () {
    return arguments[0];
  });
};

export const convertNameToSlug = (text: string) => {
  return text
    .toLowerCase()
    .replace(/ /g, "-")
    .replace(/[^\w-]+/g, "");
};
