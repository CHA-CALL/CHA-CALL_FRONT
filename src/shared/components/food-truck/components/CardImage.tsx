import { cn } from '@utils/cn';

interface CardImageProps {
  imageUrl: string;
  altText?: string;
  className?: string;
}

export default function CardImage({
  imageUrl,
  altText,
  className
}: CardImageProps) {
  return (
    <img
      src={imageUrl || 'https://placehold.co/100'}
      alt={altText || 'Card Image'}
      className={cn(
        'rounded-[1.6rem] object-cover',
        className,
      )}
    />
  );
}
