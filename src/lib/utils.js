import axios from "axios";
import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}

export const ImageBB = async (imageFile) => {
  const imageHostingKey = import.meta.env.VITE_IMGBB_API_KEY;

  const imageHostApi = `https://api.imgbb.com/1/upload?key=${imageHostingKey}`;

  const formData = new FormData()
  formData.append("image", imageFile)

  try {
    const { data } = await axios.post(imageHostApi, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      }
    })
    return data?.data?.url;
  } catch (error) {
    console.log("Image upload failed", error)
    throw error;
  }
}

// Helper function for uploading a  images to Cloudinary
const uploadImageToCloudinary = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "gmhridu");

    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/dyq0ij1yk/image/upload`,
      formData,
      {
        onUploadProgress: (progressEvent) => {
          const progress = Math.round(
            (progressEvent.loaded / (progressEvent.total || 0)) * 100
          );
        },
        cancelToken: axios.CancelToken.source().token,
      }
    );
    return response.data;
  } catch (error) {
    console.error("Error uploading image to Cloudinary:", error);
    return null;
  }
};

// Function to handle image upload
export const ImageUpload = async (acceptedFiles) => {
  try {
    const uploadPromises = acceptedFiles?.map((file) =>
      uploadImageToCloudinary(file.File)
    );
    const results = await Promise.all(uploadPromises);
    return results;
  } catch (err) {
    console.log("Error during image upload:", err?.message);
    return null;
  }
};
