import { cn } from '@utils/cn';

interface LoadingProps {
  className?: string;
}

export default function Loading({ className }: LoadingProps) {
  return (
    <div className={cn(className, 'flex items-center justify-center')}>
      Loading
    </div>
  );
}
