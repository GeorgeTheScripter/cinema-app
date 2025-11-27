import defaultImage from '@/assets/images/not-found-img.jpg';

export const handleImageError = (event: Event) => {
  const target = event.target as HTMLImageElement;
  target.src = defaultImage;
};
