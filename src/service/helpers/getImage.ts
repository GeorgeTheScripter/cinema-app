import defaultImage from '@/assets/images/not-found-img.jpg';

export const getImageUrl = (path: string | null, size: string = 'w500'): string => {
  if (!path) {
    return defaultImage;
  }
  return `https://image.tmdb.org/t/p/${size}${path}`;
};
