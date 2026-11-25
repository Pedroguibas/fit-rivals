export const toImageUrl = (url: string): string => {
  if (url.includes("https://") || url.includes("http://")) return url;

  return `${process.env.EXPO_PUBLIC_CLOUDFLARE_R2_BASE_URL}/${url}`;
};
