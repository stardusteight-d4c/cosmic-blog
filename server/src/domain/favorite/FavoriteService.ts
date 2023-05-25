import { IEventPublisher } from "@/domain/@interfaces";
import { Favorite, IFavoriteRepository, IFavoriteService } from ".";
import Validators from "@/domain/@utils/validators";

export class FavoriteService implements IFavoriteService {
  #favoriteRepository: IFavoriteRepository;

  constructor(implementations: { favoriteRepository: IFavoriteRepository }) {
    this.#favoriteRepository = implementations.favoriteRepository;
  }

  public async toggleFavoritePost(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined> {
    const { postId, userId } = request;
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    const newFavorite = new Favorite({ postId, userId });
    const favorite = await this.#favoriteRepository.findFavoriteByKey(
      `${newFavorite.postId}-${newFavorite.userId}`,
    );
    if (favorite) {
      await this.#favoriteRepository.delete(newFavorite);
    } else {
      await this.#favoriteRepository.create(newFavorite);
    }
    return newFavorite;
  }

  public async getFavoriteAmountFromPost(postId: string): Promise<number> {
    const favorites = await this.#favoriteRepository.findAllByPostId(postId);
    if (favorites) {
      const favoriteAmount = favorites.length;
      return favoriteAmount;
    } else {
      return 0;
    }
  }
}
