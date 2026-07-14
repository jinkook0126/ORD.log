import 'react-image-crop/dist/ReactCrop.css';

import { useRef, useState } from 'react';
import ReactCrop, { centerCrop, type Crop, makeAspectCrop, type PixelCrop } from 'react-image-crop';

import { getCroppedImageFile } from '~/lib/cropImage';

import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '../ui/dialog';

const ASPECT_OPTIONS = [
  { label: '자유', value: undefined },
  { label: '1:1', value: 1 },
  { label: '4:3', value: 4 / 3 },
  { label: '16:9', value: 16 / 9 },
] as const;

function centerAspectCrop(mediaWidth: number, mediaHeight: number, aspect: number): Crop {
  return centerCrop(
    makeAspectCrop({ unit: '%', width: 90 }, aspect, mediaWidth, mediaHeight),
    mediaWidth,
    mediaHeight,
  );
}

const DEFAULT_CROP: Crop = { unit: '%', x: 5, y: 5, width: 90, height: 90 };

interface ImageCropDialogProps {
  open: boolean;
  imageSrc: string;
  fileName: string;
  onOpenChange: (open: boolean) => void;
  onComplete: (file: File) => void;
}

const ImageCropDialog = ({
  open,
  imageSrc,
  fileName,
  onOpenChange,
  onComplete,
}: ImageCropDialogProps) => {
  const imgRef = useRef<HTMLImageElement | null>(null);
  const [crop, setCrop] = useState<Crop>(DEFAULT_CROP);
  const [completedCrop, setCompletedCrop] = useState<PixelCrop | null>(null);
  const [aspect, setAspect] = useState<number | undefined>(undefined);
  const [isCropping, setIsCropping] = useState(false);

  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = event.currentTarget;
    setCrop(aspect ? centerAspectCrop(width, height, aspect) : DEFAULT_CROP);
  };

  const handleAspectChange = (value: number | undefined) => {
    setAspect(value);
    const image = imgRef.current;
    if (image) {
      setCrop(value ? centerAspectCrop(image.width, image.height, value) : DEFAULT_CROP);
    }
  };

  const handleConfirm = async () => {
    const image = imgRef.current;
    if (!image || !completedCrop || !completedCrop.width || !completedCrop.height) return;

    setIsCropping(true);
    try {
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;
      const croppedFile = await getCroppedImageFile(
        imageSrc,
        {
          x: completedCrop.x * scaleX,
          y: completedCrop.y * scaleY,
          width: completedCrop.width * scaleX,
          height: completedCrop.height * scaleY,
        },
        fileName,
      );
      onComplete(croppedFile);
    } finally {
      setIsCropping(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>사진 크롭</DialogTitle>
        </DialogHeader>

        <div className="bg-muted flex max-h-[60vh] w-full items-center justify-center overflow-auto rounded-lg">
          <style>{`
            .ReactCrop__drag-handle { border-radius: 9999px; }
            .ReactCrop__crop-selection:focus { outline: none; }
          `}</style>
          <ReactCrop
            crop={crop}
            onChange={(_, percentCrop) => setCrop(percentCrop)}
            onComplete={(pixelCrop) => setCompletedCrop(pixelCrop)}
            aspect={aspect}
            className="max-h-[60vh]"
          >
            <img
              ref={imgRef}
              src={imageSrc}
              alt="크롭할 이미지"
              onLoad={handleImageLoad}
              className="max-h-[60vh] w-full object-contain"
            />
          </ReactCrop>
        </div>

        <div className="flex gap-2">
          {ASPECT_OPTIONS.map((option) => (
            <button
              type="button"
              key={option.label}
              onClick={() => handleAspectChange(option.value)}
              className={`flex-1 cursor-pointer rounded-md px-2 py-1.5 text-xs font-medium transition ${
                aspect === option.value
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-muted text-foreground hover:bg-muted/80'
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>

        <DialogFooter>
          <button
            type="button"
            onClick={() => onOpenChange(false)}
            className="bg-muted text-foreground hover:bg-muted/80 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            취소
          </button>
          <button
            type="button"
            onClick={handleConfirm}
            disabled={isCropping}
            className="bg-primary text-primary-foreground hover:bg-primary/90 flex flex-1 cursor-pointer items-center justify-center gap-2 rounded-lg py-3 font-semibold transition disabled:cursor-not-allowed disabled:opacity-50"
          >
            {isCropping ? '적용 중...' : '적용'}
          </button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ImageCropDialog;
