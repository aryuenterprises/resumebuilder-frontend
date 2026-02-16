export interface CropArea {
  x: number;
  y: number;
  width: number;
  height: number;
}

/**
 * Creates a cropped image from the source image based on crop coordinates
 * @param imageSrc - Source image URL or data URL
 * @param crop - Crop area coordinates
 * @returns Promise that resolves with the cropped image as a Blob URL
 */
export const getCroppedImg = async (imageSrc: string, crop: CropArea): Promise<string> => {
  // Helper function to create Image object from URL
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      // Allow cross-origin images to be used with canvas
      image.crossOrigin = 'anonymous';
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    // Set canvas dimensions to match crop area
    canvas.width = crop.width;
    canvas.height = crop.height;

    // Draw the cropped portion of the image onto the canvas
    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    // Convert canvas to blob and create object URL
    return new Promise((resolve, reject) => {
      canvas.toBlob(
        (blob) => {
          if (!blob) {
            reject(new Error("Canvas is empty"));
            return;
          }
          
          // Create object URL from the blob
          const croppedUrl = URL.createObjectURL(blob);
          resolve(croppedUrl);
        },
        "image/jpeg",
        0.95 // Quality setting (0.95 = 95% quality)
      );
    });
  } catch (error) {
    console.error("Error cropping image:", error);
    throw error;
  }
};

/**
 * Alternative version that returns different output types
 */
export const getCroppedImgWithOptions = async (
  imageSrc: string,
  crop: CropArea,
  outputType: 'blob' | 'base64' | 'canvas' = 'blob'
): Promise<string | HTMLCanvasElement> => {
  const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
      const image = new Image();
      image.crossOrigin = 'anonymous';
      image.addEventListener("load", () => resolve(image));
      image.addEventListener("error", (error) => reject(error));
      image.src = url;
    });

  try {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    if (!ctx) {
      throw new Error("Failed to get canvas context");
    }

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
      image,
      crop.x,
      crop.y,
      crop.width,
      crop.height,
      0,
      0,
      crop.width,
      crop.height
    );

    switch (outputType) {
      case 'base64':
        return canvas.toDataURL("image/jpeg", 0.95);
      
      case 'canvas':
        return canvas;
      
      case 'blob':
      default:
        return new Promise((resolve, reject) => {
          canvas.toBlob(
            (blob) => {
              if (!blob) {
                reject(new Error("Canvas is empty"));
                return;
              }
              const croppedUrl = URL.createObjectURL(blob);
              resolve(croppedUrl);
            },
            "image/jpeg",
            0.95
          );
        });
    }
  } catch (error) {
    console.error("Error cropping image:", error);
    throw error;
  }
};

/**
 * Utility function to clean up object URLs to prevent memory leaks
 */
export const revokeObjectUrl = (url: string): void => {
  if (url.startsWith('blob:')) {
    URL.revokeObjectURL(url);
  }
};

/**
 * Utility to get image dimensions
 */
export const getImageDimensions = (url: string): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      resolve({
        width: img.width,
        height: img.height
      });
    };
    img.onerror = reject;
    img.src = url;
  });
};