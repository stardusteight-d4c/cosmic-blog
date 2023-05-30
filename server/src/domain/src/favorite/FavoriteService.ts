import { Favorite, IFavoriteRepository, IFavoriteService } from ".";
import Validators from "@/domain/@utils/validators";
import { IUserRepository } from "../user";
import { IPostRepository } from "../post";

export class FavoriteService implements IFavoriteService {
  #favoriteRepository: IFavoriteRepository;
  #postRepository: IPostRepository;
  #userRepository: IUserRepository;

  constructor(implementations: {
    favoriteRepository: IFavoriteRepository;
    postRepository: IPostRepository;
    userRepository: IUserRepository;
  }) {
    this.#favoriteRepository = implementations.favoriteRepository;
    this.#postRepository = implementations.postRepository;
    this.#userRepository = implementations.userRepository;
  }

  public async toggleFavoritePost(request: {
    postId: string;
    userId: string;
  }): Promise<Favorite | undefined> {
    const { postId, userId } = request;
    Validators.checkPrimitiveType({ validating: userId, type: "string" });
    Validators.checkPrimitiveType({ validating: postId, type: "string" });
    await this.#postRepository.findById(postId);
    await this.#userRepository.findById(userId);
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
