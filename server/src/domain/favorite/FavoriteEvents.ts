import { IEvent } from "@/domain/@interfaces";
import { Favorite } from "./Favorite";

export class ToggleFavoritePostEvent implements IEvent {
  name = "toggle_favorite_post";
  constructor(
    readonly favorite: Favorite,
    readonly operation: "create" | "delete",
  ) {}
}
