import { storage } from "@/lib/firebase";
import { ref, uploadString } from "firebase/storage";

export async function uploadImageToFirebase(image: string, fileName: string) {
  const storageRef = ref(storage, `images/${fileName}`);
  uploadString(storageRef, image, "data_url").then(() => {
    console.log("Uploaded a base64url string!");
  });
  const publicImageURL = `https://firebasestorage.googleapis.com/v0/b/cosmic-blog.appspot.com/o/images%2F${fileName}?alt=media`;
  return publicImageURL;
}
