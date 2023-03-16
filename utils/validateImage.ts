export type ImageType = {
  url: string;
  size: number;
  type: string;
  secure_url?: string;
};

const allowedImageTypes = ["image/png", "image/jpeg", "image/jpg"];

const ValidateImages: (image: ImageType) => string = ({
  type,
  size,
  secure_url,
  url,
}: ImageType) => {
  // Image not detected
  if (!secure_url && !url) return "error";
  if (url) {
    // checks if the model is new as it would have imageBase64 string
    // Image should not be more than 1MB
    if (size > 1000000) return "error";
    if (!allowedImageTypes.includes(type))
      // Invalid image type. Only JPG and PNG formats allowed
      return "error";
    // clean to be uploaded to cloud
    return "ok";
  } else {
    // checks if the model has a previously uploaded image
    // Image not detected
    if (!secure_url) return "error";
    return "oldImage";
  }
};

export default ValidateImages;
