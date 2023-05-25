import { IEventPublisher } from "@/domain/@interfaces";
import {
  Favorite,
  IFavoriteRepository,
  IFavoriteService,
  ToggleFavoritePostEvent,
} from ".";
import { Post } from "@/domain/post";

export class FavoriteService implements IFavoriteService {
  #favoritePublisher: IEventPublisher;
  #favoriteRepository: IFavoriteRepository;

  constructor(implementations: {
    favoritePublisher: IEventPublisher;
    favoriteRepository: IFavoriteRepository;
  }) {
    this.#favoritePublisher = implementations.favoritePublisher;
    this.#favoriteRepository = implementations.favoriteRepository;
  }

  public async emitToggleFavoritePostEvent(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined> {
    const { postId, userId } = request;
    const newFavorite = new Favorite({ postId, userId });
    const favorite = await this.#favoriteRepository.findFavoriteByKey(
      `${newFavorite.postId}-${newFavorite.userId}`,
    );
    let toggleFavoritePostEvent: ToggleFavoritePostEvent;
    if (favorite) {
      await this.#favoriteRepository.delete(newFavorite);
      toggleFavoritePostEvent = new ToggleFavoritePostEvent(
        newFavorite,
        "delete",
      );
    } else {
      await this.#favoriteRepository.create(newFavorite);
      toggleFavoritePostEvent = new ToggleFavoritePostEvent(
        newFavorite,
        "create",
      );
    }
    this.#favoritePublisher.emit(toggleFavoritePostEvent);
    return newFavorite;
  }
}
