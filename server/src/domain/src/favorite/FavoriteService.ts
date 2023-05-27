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

  public async deleteAllFavoritesByPostId(postId: string): Promise<void> {
    return await this.#favoriteRepository.deleteAllByPostId(postId);
  }

  public async deleteAllFavoritesByUserId(userId: string): Promise<void> {
    return await this.#favoriteRepository.deleteAllByUserId(userId);
  }

  public async getPostFavoriteAmount(postId: string): Promise<number> {
    return (await this.#favoriteRepository.findAllByPostId(postId)).length;
  }

  public async getUserFavoriteAmount(userId: string): Promise<number> {
    return (await this.#favoriteRepository.findAllByUserId(userId)).length;
  }

  public async getAllFavoritesByPostId(postId: string): Promise<Favorite[]> {
    return await this.#favoriteRepository.findAllByPostId(postId);
  }
}
