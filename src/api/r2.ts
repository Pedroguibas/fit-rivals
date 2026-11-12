import { privateApi } from "@/utils/api";
import { File } from "expo-file-system";

export const uploadImage = async (uri: string): Promise<string> => {
  const image = new File(uri);
  const response = await privateApi.post("/images", {
    contentType: image.type,
  });
  const { url, key } = await response.data;

  const res = await fetch(url, {
    method: "PUT",
    body: image,
    headers: { "Content-Type": image.type },
  });

  if (!res.ok) throw new Error("unable to upload image");

  return key;
};
