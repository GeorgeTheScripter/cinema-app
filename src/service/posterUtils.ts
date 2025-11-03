export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    return '/placeholder-image.jpg'; // или любой плейсхолдер
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
