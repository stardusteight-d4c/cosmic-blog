import { chooseAvatars } from "./data";
import { avatars } from "./data";

export function getAvatarUrlById(id: string): string | undefined {
  const avatar = chooseAvatars.find((avatar) => avatar.id === id);
  return avatar?.url;
}

export const getAvatarUrls = (avatarData: string) => {
  const result: { [key: string]: string } = {};
  for (const [_, avatar] of avatars.entries()) {
    let i = 1
    for (const [url, name] of avatar) {
      if (name.toLocaleLowerCase().includes(avatarData.toLocaleLowerCase())) {
        const key = `url${i++}`;
        result[key] = url;
      }
    }
  }
  return result;
};