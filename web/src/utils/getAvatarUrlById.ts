import { chooseAvatars } from "./data";

export function getAvatarUrlById(id: string): string | undefined {
  const avatar = chooseAvatars.find((avatar) => avatar.id === id);
  return avatar?.url;
}
