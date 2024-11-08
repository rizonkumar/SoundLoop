import cloudinary from "cloudinary";

export const uploadToCloudinary = async (file) => {
  try {
    const result = await cloudinary.uploader.upload(file.tempFilePath, {
      resourve_type: "auto",
    });
    return result.secure_url;
  } catch (error) {
    console.error("Error uploading file to cloudinary", error);
    throw new Error(error);
  }
};
