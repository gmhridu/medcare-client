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
