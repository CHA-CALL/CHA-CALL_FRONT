import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import ImagePreview from '@components/image-preview/ImagePreview';

interface SortableImagePreviewProps {
  id: number | string;
  handleClose: () => void;
  src?: string;
  alt: string;
  className?: string;
  isMain?: boolean;
}

export default function SortableImagePreview({
  id,
  ...props
}: SortableImagePreviewProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    opacity: isDragging ? 0.5 : 1,
    touchAction: 'none',
  };

  return (
    <div ref={setNodeRef} style={style} {...attributes}>
      <ImagePreview
        {...props}
        dragListeners={listeners}
        className='h-[9rem] w-[9rem] m-[1rem]'
      />
    </div>
  );
}
