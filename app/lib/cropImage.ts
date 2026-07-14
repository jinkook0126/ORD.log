export interface PixelCrop {
  x: number;
  y: number;
  width: number;
  height: number;
}

const MAX_FILE_SIZE_BYTES = 4.5 * 1024 * 1024;
const MIN_QUALITY = 0.3;
const MIN_SCALE = 0.3;

function createImage(src: string): Promise<HTMLImageElement> {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.crossOrigin = 'anonymous';
    image.src = src;
  });
}

function canvasToBlob(canvas: HTMLCanvasElement, mimeType: string, quality: number): Promise<Blob> {
  return new Promise((resolve, reject) => {
    canvas.toBlob(
      (blob) => (blob ? resolve(blob) : reject(new Error('이미지 압축에 실패했습니다.'))),
      mimeType,
      quality,
    );
  });
}

function scaleCanvas(source: HTMLCanvasElement, scale: number): HTMLCanvasElement {
  const scaled = document.createElement('canvas');
  scaled.width = Math.max(1, Math.round(source.width * scale));
  scaled.height = Math.max(1, Math.round(source.height * scale));
  const ctx = scaled.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context를 생성할 수 없습니다.');
  }
  ctx.drawImage(source, 0, 0, scaled.width, scaled.height);
  return scaled;
}

async function compressToMaxSize(canvas: HTMLCanvasElement, mimeType: string): Promise<Blob> {
  let blob = await canvasToBlob(canvas, mimeType, 0.9);

  for (
    let quality = 0.8;
    blob.size > MAX_FILE_SIZE_BYTES && quality >= MIN_QUALITY;
    quality -= 0.1
  ) {
    blob = await canvasToBlob(canvas, mimeType, quality);
  }

  let workingCanvas = canvas;
  for (let scale = 0.9; blob.size > MAX_FILE_SIZE_BYTES && scale >= MIN_SCALE; scale -= 0.1) {
    workingCanvas = scaleCanvas(workingCanvas, 0.9);
    blob = await canvasToBlob(workingCanvas, mimeType, 0.8);
  }

  return blob;
}

export async function getCroppedImageFile(
  imageSrc: string,
  crop: PixelCrop,
  fileName: string,
  mimeType = 'image/webp',
): Promise<File> {
  const image = await createImage(imageSrc);
  const canvas = document.createElement('canvas');
  canvas.width = crop.width;
  canvas.height = crop.height;
  const ctx = canvas.getContext('2d');
  if (!ctx) {
    throw new Error('Canvas context를 생성할 수 없습니다.');
  }

  ctx.drawImage(image, crop.x, crop.y, crop.width, crop.height, 0, 0, crop.width, crop.height);

  const blob = await compressToMaxSize(canvas, mimeType);

  return new File([blob], fileName, { type: mimeType });
}

export async function compressImageFile(file: File): Promise<File> {
  if (file.size <= MAX_FILE_SIZE_BYTES) {
    return file;
  }

  const objectUrl = URL.createObjectURL(file);
  try {
    const image = await createImage(objectUrl);
    const canvas = document.createElement('canvas');
    canvas.width = image.naturalWidth;
    canvas.height = image.naturalHeight;
    const ctx = canvas.getContext('2d');
    if (!ctx) {
      throw new Error('Canvas context를 생성할 수 없습니다.');
    }
    ctx.drawImage(image, 0, 0);

    const mimeType = file.type === 'image/png' ? 'image/png' : 'image/jpeg';
    const blob = await compressToMaxSize(canvas, mimeType);

    return new File([blob], file.name, { type: mimeType });
  } finally {
    URL.revokeObjectURL(objectUrl);
  }
}
